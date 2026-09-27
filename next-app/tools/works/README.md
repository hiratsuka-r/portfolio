# Works生成ツール

ExcelをWorksのマスターデータとして管理し、Next.jsが利用する
`data/works.ts`を生成します。

## データの流れ

```text
Excel（Worksマスター）
  ↓
tools/works/generate-works.js
  ↓
data/works.ts
  ↓
Next.js
```

JSONは生成しません。

## 実行方法

```powershell
cd C:\workspace\portfolio\next-app
npm install
npm run generate
```

以前の`npm run generateWorks`も利用できます。

入力ファイルと出力先を指定する場合:

```powershell
node tools/works/generate-works.js data/works_master.xlsx data/works.ts
```

## Excelの構成

Excelの`README`シートは説明用で、生成対象外です。

各Worksシートが、1つのWorksカードに対応します。
`README`以外でA1が`Works | ...`から始まるシートを動的に処理します。

```text
1シート = 1カード = 1Works
```

表示順はExcelのシート順です。新しいWorksを追加・並べ替えする場合は、Excel上でシートを移動します。

各シートの構成:

- シート先頭のタイトルセル: title
- タイトル直下のセル: subtitle
- `管理情報`: ID、画像、リンク、プロジェクト、会社、注記
- `基本情報`: 種類、分野、期間、担当、担当工程、体制、参画先
- `概要`: description
- `担当内容`: responsibilities（先頭の`・`は生成時に除去）
- `実績・工夫`: achievements（先頭の`・`は生成時に除去）
- `技術`: カテゴリと技術名（`/`区切り）。技術がないWorkは警告のみ
- `表示情報`: カテゴリ、担当タグ

`カテゴリ`と`担当タグ`は、`表示情報`セクションのB列に入力します。担当タグは`、`、`,`、改行、`/`で複数指定できます。

`管理情報`と`表示情報`は新規Workにも必須です。`ID`、`画像`、`リンク`、`プロジェクト`、`カテゴリ`、`担当タグ`が空の場合はエラーになります。`会社`と`注記`は空欄でも生成できます。

セル結合には依存せず、通常のセルをセクション名または管理項目名から検索して読み取ります。先頭に`Works | ...`という識別行があっても無視します。シート名の31文字制限による短縮には依存しません。

先頭のWorksシートをレイアウト基準とし、各シートのタイトル領域、セクションの並び順、必須セクションを実行時に検証します。本文量によるセクションの行番号の違いは許容します。

検証エラー時は`data/works.ts`を生成・更新しません。GeneratorはExcelを読み取り専用で扱い、Excelファイルを書き換えません。

生成先は`data/works.ts`のみです。`data/works.json`は生成しません。
