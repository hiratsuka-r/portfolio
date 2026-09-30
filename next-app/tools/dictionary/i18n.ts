import { messages as englishMessages } from '@/data/locales/en';
import { messages } from '@/data/locales/ja';
import type { Work, WorkSource } from '@/data/works';

export type Locale = 'ja' | 'en';
export const defaultLocale: Locale = 'ja';

const dictionaries = {
    ja: messages,
    en: englishMessages,
} as const;

// JSONの値から、さらにキーを指定して取り出せるオブジェクトだけを表す型。
type DictionaryObject = Record<string, unknown>;

// 日本語辞書から、葉ノードまでのドット区切りキーを型として生成する。
type TranslationKeys<T> = T extends readonly unknown[]
    ? `${number}`
    : T extends object
      ? {
            [Key in keyof T & string]: T[Key] extends readonly unknown[]
                ? `${Key}.${number}` | Key
                : T[Key] extends object
                  ? `${Key}.${TranslationKeys<T[Key]>}` | Key
                  : Key;
        }[keyof T & string]
      : never;

export type TranslationKey = TranslationKeys<typeof messages>;

type LocalizedWorkFields = Omit<Work, keyof WorkSource>;

export type BasicInfoTranslation = {
    種類?: string;
    分野?: string;
    形式?: string;
    期間?: string;
    担当?: string;
    担当工程?: string;
    体制?: string;
};

export type WorkTranslation = {
    タイトル: string;
    サブタイトル?: string;
    カテゴリ: string[];
    担当タグ: string[];
    プロジェクト?: {
        案件名: string;
        会社名?: string;
    };
    概要?: string;
    基本情報?: BasicInfoTranslation;
    担当内容?: string[];
    技術?: Record<string, string[]>;
    実績?: string[];
    注記?: string;
};

type WorkTranslationField = Exclude<keyof WorkTranslation, 'プロジェクト' | '基本情報'>;

// localeの制作実績キーと、Work型の表示用プロパティ名の対応表。
const workTranslationKeyMap = {
    タイトル: 'title',
    サブタイトル: 'subtitle',
    カテゴリ: 'category',
    担当タグ: 'responsibilityTags',
    概要: 'description',
    担当内容: 'responsibilities',
    技術: 'technologies',
    実績: 'achievements',
    注記: 'note',
} as const satisfies Record<WorkTranslationField, keyof LocalizedWorkFields>;

// localeの日本語キーと、Work.BasicInfoの英語プロパティ名の対応表。
const basicInfoKeyMap: Record<keyof BasicInfoTranslation, keyof NonNullable<Work['basicInfo']>> = {
    種類: 'serviceType',
    分野: 'industry',
    形式: 'format',
    期間: 'period',
    担当: 'role',
    担当工程: 'process',
    体制: 'teamSize',
};

// nullはtypeofがobjectになるため、辞書オブジェクトとして扱えるかを明示的に判定する。
const isDictionaryObject = (value: unknown): value is DictionaryObject => typeof value === 'object' && value !== null;

// 「profile.自己紹介」のようなドット区切りのキーを、辞書の階層に沿って解決する。
const getValue = (dictionary: DictionaryObject, key: string): unknown =>
    key.split('.').reduce<unknown>((value, part) => {
        if (isDictionaryObject(value)) {
            return value[part];
        }
        return undefined;
    }, dictionary);

// localeに保存されたHTMLエンティティを、画面に表示する文字へ戻す。
// 文字列だけでなく配列・オブジェクトも再帰的に処理し、翻訳値の取得時に統一して適用する。
const decodeHtmlEntities = (value: unknown): unknown => {
    if (typeof value === 'string') {
        return value.replace(
            /&(?:quot|amp|lt|gt|apos|#39|#x[0-9a-f]+|#[0-9]+);/gi,
            (entity) => {
                const namedEntities: Record<string, string> = {
                    '&quot;': '"',
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&apos;': "'",
                    '&#39;': "'",
                };
                const namedValue = namedEntities[entity.toLowerCase()];
                if (namedValue) return namedValue;

                const codePointText = entity.startsWith('&#x')
                    ? entity.slice(3, -1)
                    : entity.slice(2, -1);
                const codePoint = Number.parseInt(
                    codePointText,
                    entity.startsWith('&#x') ? 16 : 10
                );
                return Number.isSafeInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
                    ? String.fromCodePoint(codePoint)
                    : entity;
            }
        );
    }

    if (Array.isArray(value)) {
        return value.map(decodeHtmlEntities);
    }

    if (isDictionaryObject(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, decodeHtmlEntities(item)])
        );
    }

    return value;
};

/** 指定された言語の辞書から、ドット区切りのキーに対応する値を取得する。 */
export const getTranslation = <T = string>(locale: Locale, key: TranslationKey): T => {
    const value = getValue(dictionaries[locale], key);
    if (value === undefined) {
        throw new Error(`Translation key not found: ${locale}.${key}`);
    }
    return decodeHtmlEntities(value) as T;
};

/**
 * 日本語辞書から指定したキーの値を取得する。
 * キーが存在しない場合は、表示漏れに気付けるよう例外を投げる。
 */
export const t = <T = string>(key: TranslationKey): T => {
    return getTranslation(defaultLocale, key);
};

/**
 * 日本語キーで構成された制作実績のlocaleデータを、Work型のプロパティへ変換する。
 *
 * localeの構造と画面表示用データの構造が異なるため、
 * 日本語キーと英語プロパティの対応関係を変換表で管理する。
 */
const convertWorkTranslation = (message: WorkTranslation, workId: string): LocalizedWorkFields => {
    const category = message['カテゴリ'];
    const responsibilityTags = message['担当タグ'];

    // カテゴリと担当タグはカード表示に必須の配列。
    if (!Array.isArray(category) || !Array.isArray(responsibilityTags)) {
        throw new Error(`Invalid work translation data: ${workId}`);
    }

    // localeの「プロジェクト」をWork型のprojectへ変換する。
    const project = isDictionaryObject(message['プロジェクト'])
        ? {
              name: String(message['プロジェクト']['案件名'] ?? ''),
              company: message['プロジェクト']['会社名'] ? String(message['プロジェクト']['会社名']) : undefined,
          }
        : undefined;

    // localeの「基本情報」をWork型のbasicInfoへ変換表に沿って変換する。
    const basicInfo = message['基本情報']
        ? Object.entries(basicInfoKeyMap).reduce<NonNullable<Work['basicInfo']>>((result, [localeKey, workKey]) => {
              const value = message['基本情報']?.[localeKey as keyof BasicInfoTranslation];
              if (value) {
                  result[workKey] = value;
              }
              return result;
          }, {})
        : undefined;

    return {
        [workTranslationKeyMap.タイトル]: String(message['タイトル'] ?? ''),
        [workTranslationKeyMap.サブタイトル]: message['サブタイトル'] ? String(message['サブタイトル']) : undefined,
        [workTranslationKeyMap.カテゴリ]: category.map(String),
        [workTranslationKeyMap.担当タグ]: responsibilityTags.map(String),
        project,
        [workTranslationKeyMap.概要]: message['概要'] ? String(message['概要']) : undefined,
        basicInfo,
        [workTranslationKeyMap.担当内容]: Array.isArray(message['担当内容']) ? message['担当内容'].map(String) : undefined,
        [workTranslationKeyMap.技術]: isDictionaryObject(message['技術'])
            ? Object.fromEntries(
                  Object.entries(message['技術']).map(([key, values]) => [key, Array.isArray(values) ? values.map(String) : []])
              )
            : undefined,
        [workTranslationKeyMap.実績]: Array.isArray(message['実績']) ? message['実績'].map(String) : undefined,
        [workTranslationKeyMap.注記]: message['注記'] ? String(message['注記']) : undefined,
    };
};

/**
 * 生成データと辞書の表示文言を結合して、画面表示用の制作実績データを作る。
 * 画像・リンクなど翻訳不要の情報はworks.tsから、表示文言はlocaleから取得する。
 */
export const localizedWork = (source: WorkSource, locale: Locale = defaultLocale): Work => {
    const message = getTranslation<WorkTranslation>(locale, `works.${source.id}` as TranslationKey);

    return {
        ...source,
        ...convertWorkTranslation(message, source.id),
    };
};
