import fs from 'node:fs';
import path from 'node:path';
import XLSX from 'xlsx';

// import解決されるESM版(xlsx.mjs)はNodeのfsを自動検出しないため、
// 明示的に渡さないとXLSX.readFileが「Cannot access file」で失敗する。
XLSX.set_fs(fs);

/**
 * Excelの1シート1カード形式から、data/works.tsを生成する。
 *
 * Excel
 *   ↓
 * tools/works/generate-works.js
 *   ↓
 * data/works.ts
 *
 * READMEシートと、番号で始まらないシートは生成対象外。
 * data/works.jsonは生成しない。
 */
const projectRoot = path.resolve(import.meta.dirname, '..', '..');
const inputPath = path.resolve(process.argv[2] || path.join(projectRoot, 'data', 'works_master.xlsx'));
const outputPath = path.resolve(process.argv[3] || path.join(projectRoot, 'data', 'works.ts'));
const localePath = path.resolve(path.join(projectRoot, 'data', 'locales', 'ja.ts'));
const englishLocalePath = path.resolve(path.join(projectRoot, 'data', 'locales', 'en.ts'));

const generatedTypes = `export type Project = string | { name: string; company?: string };
export type Technologies = Record<string, string[]>;

export type BasicInfo = {
    serviceType?: string;
    industry?: string;
    format?: string;
    period?: string;
    process?: string;
    role?: string;
    teamSize?: string;
    [key: string]: string | undefined;
};

export type WorkSource = {
    id: string;
    image: string;
    link?: string;
    links?: {
        ja?: string;
        en?: string;
    };
};

export type Work = WorkSource & {
    title: string;
    subtitle?: string;
    category: string[];
    responsibilityTags: string[];
    project?: Project | null;
    description?: string;
    overview?: string;
    basicInfo?: BasicInfo;
    responsibilities?: string[];
    technologies?: Technologies;
    achievements?: string[];
    note?: string;
};`;

const basicInfoKeys = {
    種類: 'serviceType',
    分野: 'industry',
    期間: 'period',
    担当: 'role',
    担当工程: 'process',
    体制: 'teamSize',
};

const sectionHeadings = ['管理情報', '基本情報', '表示情報', '概要', '担当内容', '実績・工夫', '技術'];
const requiredHeadings = sectionHeadings.slice(0, -1);
const requiredManagementFields = ['ID', '画像', 'プロジェクト'];

// ---------------------------------------------------------------------------
// Excelセル・行の読み取り
// ---------------------------------------------------------------------------

const normalize = (value) => String(value ?? '').trim();
const normalizeWorkId = (value) => `data-${normalize(value).replace(/^data-/, '')}`;

/**
 * Excelのセルを、改行・カンマ・読点・スラッシュ区切りの配列へ変換する。
 */
const splitValues = (value) =>
    normalize(value)
        .split(/\r?\n|[,、/／]/)
        .map((item) => item.trim())
        .filter(Boolean);

/**
 * 箇条書きの先頭記号だけを除去する。
 */
const cleanBullet = (value) => normalize(value).replace(/^・\s*/, '');
const getContent = (row) => normalize(row[1] || row[0]);

/**
 * シートを、空セルを含む2次元配列として読み込む。
 */
const readRows = (sheet) => XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });

/**
 * セクション見出しの行番号を返す。
 */
const findHeading = (rows, heading) => rows.findIndex((row) => normalize(row[0]) === heading);

/**
 * 指定した見出しから、次の見出し直前までの行を返す。
 */
const readSectionRows = (rows, startIndex, headingIndexes) => {
    const endIndex = headingIndexes.find((index) => index > startIndex) ?? rows.length;
    return rows.slice(startIndex + 1, endIndex);
};

/**
 * セクション内の「ラベル / 値」形式の行をオブジェクトへ変換する。
 */
const readKeyValueSection = (rows) => {
    const values = {};
    for (const row of rows) {
        const label = normalize(row[0]);
        if (label) values[label] = normalize(row[1]);
    }
    return values;
};

/**
 * 必須セクションの存在を検証する。
 */
const requireHeading = (indexes, heading, sheetName) => {
    if (indexes[heading] < 0) {
        throw new Error(`Section "${heading}" was not found in sheet "${sheetName}"`);
    }
};

const getTitleRows = (rows) => {
    const hasSheetLabel = normalize(rows[0]?.[0]).startsWith('Works |');
    const titleIndex = hasSheetLabel ? 1 : 0;
    return {
        title: normalize(rows[titleIndex]?.[0]),
        subtitle: normalize(rows[titleIndex + 1]?.[0]),
    };
};

// ---------------------------------------------------------------------------
// Excelレイアウトの検証
// ---------------------------------------------------------------------------

const getLayoutSignature = (rows) => ({
    headings: sectionHeadings
        .map((heading) => ({ heading, index: findHeading(rows, heading) }))
        .filter(({ index }) => index >= 0)
        .sort((a, b) => a.index - b.index)
        .map(({ heading }) => heading),
});

// ---------------------------------------------------------------------------
// 各セクションのデータ変換
// ---------------------------------------------------------------------------

/**
 * 「技術」セクションをTechnologies型へ変換する。
 */
const readTechnologies = (rows, sheetName) => {
    const technologies = {};
    for (const row of rows) {
        const category = normalize(row[0]);
        const values = splitValues(row[1]);
        if (category.startsWith('Works |') || category.startsWith('Works #')) break;
        if (!category && !values.length) continue;
        if (!category || !values.length) {
            throw new Error(`Could not interpret technology row in sheet "${sheetName}"`);
        }
        technologies[category] = [...(technologies[category] || []), ...values];
    }
    return technologies;
};

/**
 * シート内の各セクションの開始行をまとめて返す。
 */
const getSectionIndexes = (rows) => Object.fromEntries(sectionHeadings.map((heading) => [heading, findHeading(rows, heading)]));

/**
 * 指定セクションの見出し直後から、次の見出し直前までの行を返す。
 */
const getSectionRows = (rows, indexes, heading) => {
    const headingIndexes = Object.values(indexes).filter((index) => index >= 0);
    return readSectionRows(rows, indexes[heading], headingIndexes);
};

const validateRequiredHeadings = (indexes, sheetName) => {
    for (const heading of requiredHeadings) {
        requireHeading(indexes, heading, sheetName);
    }
};

const parseBasicInfo = (rows, indexes) => {
    const basicInfo = {};
    for (const row of getSectionRows(rows, indexes, '基本情報')) {
        const key = basicInfoKeys[normalize(row[0])];
        if (key && normalize(row[1])) {
            basicInfo[key] = normalize(row[1]);
        }
    }
    return Object.keys(basicInfo).length > 0 ? basicInfo : undefined;
};

const parseDisplayInfo = (rows, indexes, sheetName) => {
    const displayInfo = readKeyValueSection(getSectionRows(rows, indexes, '表示情報'));
    const category = splitValues(displayInfo.カテゴリ);
    const responsibilityTags = splitValues(displayInfo.担当タグ);
    if (category.length === 0) {
        throw new Error(`カテゴリ is empty in sheet "${sheetName}"`);
    }
    if (responsibilityTags.length === 0) {
        throw new Error(`担当タグ is empty in sheet "${sheetName}"`);
    }
    return { category, responsibilityTags };
};

const parseManagementInfo = (rows, indexes, sheetName) => {
    const management = readKeyValueSection(getSectionRows(rows, indexes, '管理情報'));
    for (const field of requiredManagementFields) {
        if (!management[field]) {
            throw new Error(`Management field "${field}" is empty in sheet "${sheetName}"`);
        }
    }
    if (!management.リンク && !management['リンク(JA)'] && !management['リンク(EN)']) {
        throw new Error(`Management field "リンク or リンク(JA)/リンク(EN)" is empty in sheet "${sheetName}"`);
    }
    return management;
};

const parseTextList = (rows, indexes, heading) =>
    getSectionRows(rows, indexes, heading)
        .map((row) => cleanBullet(getContent(row)))
        .filter(Boolean);

const parseDescription = (rows, indexes) => getSectionRows(rows, indexes, '概要').map(getContent).filter(Boolean).join('\n');

const parseLocalizedLinks = (management) => {
    const ja = management['リンク(JA)'];
    const en = management['リンク(EN)'];
    if (!ja && !en) return undefined;
    return {
        ...(ja ? { ja } : {}),
        ...(en ? { en } : {}),
    };
};

/**
 * 番号付きシートを1件のWorkオブジェクトへ変換する。
 */
const parseWorkSheet = (sheetName, sheet) => {
    const rows = readRows(sheet);
    const { title, subtitle } = getTitleRows(rows);

    if (!title) throw new Error(`title is empty in sheet "${sheetName}"`);
    if (!subtitle) throw new Error(`subtitle is empty in sheet "${sheetName}"`);

    const indexes = getSectionIndexes(rows);
    validateRequiredHeadings(indexes, sheetName);

    if (indexes.技術 < 0) {
        console.warn(`Warning: section "技術" was not found in sheet "${sheetName}"`);
    }

    const { category, responsibilityTags } = parseDisplayInfo(rows, indexes, sheetName);
    const management = parseManagementInfo(rows, indexes, sheetName);
    const technologies = indexes.技術 >= 0 ? readTechnologies(getSectionRows(rows, indexes, '技術'), sheetName) : {};

    return {
        id: normalizeWorkId(management.ID),
        title,
        subtitle,
        category,
        responsibilityTags,
        image: management.画像,
        link: management.リンク || management['リンク(JA)'] || management['リンク(EN)'],
        links: parseLocalizedLinks(management),
        project: {
            name: management.プロジェクト,
            ...(management.会社 ? { company: management.会社 } : {}),
        },
        description: parseDescription(rows, indexes) || undefined,
        basicInfo: parseBasicInfo(rows, indexes),
        responsibilities: parseTextList(rows, indexes, '担当内容'),
        technologies: Object.keys(technologies).length > 0 ? technologies : undefined,
        achievements: parseTextList(rows, indexes, '実績・工夫'),
        note: management.注記 || undefined,
    };
};

// ---------------------------------------------------------------------------
// Workbook全体の検証と出力
// ---------------------------------------------------------------------------

/**
 * READMEなどを除き、番号付きのWorksシートだけを返す。
 */
const getWorkSheetNames = (workbook) => workbook.SheetNames.filter((name) => name.toLowerCase() !== 'readme');

const validateSheetStructure = (sheetName, rows, referenceLayout) => {
    const { title, subtitle } = getTitleRows(rows);
    if (!title) throw new Error(`[${sheetName}] title is empty`);
    if (!subtitle) throw new Error(`[${sheetName}] subtitle is empty`);

    const indexes = getSectionIndexes(rows);
    validateRequiredHeadings(indexes, sheetName);

    const layout = getLayoutSignature(rows);
    if (layout.headings.join('|') !== referenceLayout.headings.join('|')) {
        throw new Error(`[${sheetName}] section order does not match the reference. ` + `Expected: ${sectionHeadings.join(' > ')}`);
    }

    if (indexes.技術 < 0) {
        console.warn(`Warning: section "技術" was not found in sheet "${sheetName}"`);
    }
    return title;
};

const validateUniqueTitles = (titles) => {
    const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
    if (duplicateTitles.length > 0) {
        throw new Error(`Works sheet titles must be unique: ${[...new Set(duplicateTitles)].join(', ')}`);
    }
};

const validateUniqueWorkIds = (works) => {
    const counts = new Map();
    for (const work of works) {
        counts.set(work.id, (counts.get(work.id) || 0) + 1);
    }

    const duplicateIds = [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([id]) => id);
    if (duplicateIds.length > 0) {
        throw new Error(`Normalized Work IDs must be unique: ${duplicateIds.join(', ')}`);
    }
};

/**
 * Workbook全体を検証する。行番号やセル結合には依存しない。
 */
const validateWorkbook = (workbook, workSheets) => {
    const referenceName = workSheets[0];
    if (!referenceName) {
        throw new Error('Reference sheet "01_" was not found');
    }

    const referenceRows = readRows(workbook.Sheets[referenceName]);
    const referenceLayout = getLayoutSignature(referenceRows);
    const titles = [];
    for (const sheetName of workSheets) {
        titles.push(validateSheetStructure(sheetName, readRows(workbook.Sheets[sheetName]), referenceLayout));
    }
    validateUniqueTitles(titles);

    console.log(`✓ Layout reference: ${referenceName}`);
    console.log('✓ Title rows and section order match the reference');
    console.log('✓ Required sections found');
};

/**
 * Excel全体を読み込み、sort順のWorks配列を生成する。
 */
const readWorkbook = () => {
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Excel master file was not found: ${inputPath}`);
    }
    return XLSX.readFile(inputPath);
};

const parseWorks = (workbook, cardSheets) =>
    cardSheets.map((sheetName) => parseWorkSheet(sheetName, workbook.Sheets[sheetName])).map((work) => work);

const writeWorksFile = (works) => {
    const sourceWorks = works.map(({ id, image, link, links }) => ({ id, image, link, links }));
    const source = `${generatedTypes}\n\nexport const works: WorkSource[] = ${JSON.stringify(sourceWorks, null, 4)};\n`;
    fs.writeFileSync(outputPath, `\uFEFF${source}`, { encoding: 'utf8' });
};

const readLocale = (filePath) => {
    if (!fs.existsSync(filePath)) return {};
    const source = fs.readFileSync(filePath, 'utf8');
    const moduleSource = source
        .replace(/^\uFEFF?export const messages = /, 'const messages = ')
        .replace(/\s+as const;\s*export default messages;\s*$/, '');
    return Function(`${moduleSource}; return messages;`)();
};

const validateEnglishTranslations = (works) => {
    const locale = readLocale(englishLocalePath);
    const englishWorks = locale.works || {};
    const missingIds = works.filter((work) => englishWorks[work.id] === undefined).map((work) => work.id);

    if (missingIds.length > 0) {
        console.warn(`警告: 英語翻訳が未登録の制作実績があります: ${missingIds.join(', ')}`);
    }
};

const writeLocale = (filePath, locale) => {
    const source = `export const messages = ${JSON.stringify(locale, null, 4)} as const;\n\nexport default messages;\n`;
    fs.writeFileSync(filePath, source, { encoding: 'utf8' });
};

const writeJapaneseLocale = (works) => {
    const locale = readLocale(localePath);
    const workLocale = locale.works || {};
    const preservedWorkMessages = {
        ...(workLocale.見出し !== undefined ? { 見出し: workLocale.見出し } : {}),
        ...(workLocale.説明 !== undefined ? { 説明: workLocale.説明 } : {}),
        ...(workLocale.共通 !== undefined ? { 共通: workLocale.共通 } : {}),
        ...(workLocale.詳細を表示 !== undefined ? { 詳細を表示: workLocale.詳細を表示 } : {}),
        ...(workLocale.公開ページを見る !== undefined ? { 公開ページを見る: workLocale.公開ページを見る } : {}),
        ...(workLocale.制作区分 !== undefined ? { 制作区分: workLocale.制作区分 } : {}),
        ...(workLocale.参画プロジェクト !== undefined ? { 参画プロジェクト: workLocale.参画プロジェクト } : {}),
    };

    locale.works = {
        ...preservedWorkMessages,
        ...Object.fromEntries(
            works.map((work) => [
                work.id,
                {
                    タイトル: work.title,
                    サブタイトル: work.subtitle,
                    カテゴリ: work.category,
                    担当タグ: work.responsibilityTags,
                    プロジェクト: work.project
                        ? {
                              案件名: typeof work.project === 'string' ? work.project : work.project.name,
                              ...(typeof work.project === 'object' && work.project.company ? { 会社名: work.project.company } : {}),
                          }
                        : undefined,
                    概要: work.description,
                    基本情報: work.basicInfo
                        ? Object.fromEntries(
                              Object.entries(work.basicInfo).map(([key, value]) => [
                                  {
                                      serviceType: '種類',
                                      industry: '分野',
                                      format: '形式',
                                      period: '期間',
                                      role: '担当',
                                      process: '担当工程',
                                      teamSize: '体制',
                                  }[key] || key,
                                  value,
                              ])
                          )
                        : undefined,
                    担当内容: work.responsibilities,
                    技術: work.technologies,
                    実績: work.achievements,
                    注記: work.note,
                },
            ])
        ),
    };

    fs.mkdirSync(path.dirname(localePath), { recursive: true });
    writeLocale(localePath, locale);
};

const generateWorks = () => {
    const workbook = readWorkbook();
    const workSheets = getWorkSheetNames(workbook);
    if (workSheets.length === 0) {
        throw new Error('No Works sheets were found');
    }

    console.log('Works generation started.');
    validateWorkbook(workbook, workSheets);
    const works = parseWorks(workbook, workSheets);
    validateUniqueWorkIds(works);
    validateEnglishTranslations(works);
    writeWorksFile(works);
    writeJapaneseLocale(works);
    console.log(`✓ ${works.length} Works detected`);
    console.log(`✓ data/works.ts generated`);
    console.log(`✓ data/locales/ja.ts works messages generated (overwritten if it existed)`);
    console.log('Works generation completed.');
};

try {
    generateWorks();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
