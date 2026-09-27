## hiratsuka-r | ポートフォリオ

<p>
ポートフォリオのソースコードです。<br>
URL: https://hiratsuka-r.github.io/portfolio/
</p>

## 概要

<p>
お仕事受注用の個人ポートフォリオサイトです。<br>
モダンなウェブ技術を活用しつつ、楽しみながら実験的に色々作ってみる予定でいます。
</p>

## 開発

Next.jsアプリは`next-app/`で管理しています。

```powershell
cd next-app
npm run dev
```

GitHub Pages用の静的ファイルは、次のコマンドで生成します。

```powershell
cd next-app
npm run build
```

生成された`next-app/out/`の内容を`docs/`へ配置して公開します。

## 依存パッケージ

`next-app/package.json`の`xlsx`は、脆弱性のあるnpmレジストリ版を避けるため、SheetJS公式CDNの`0.20.2` tarballを指定し、`overrides`でも同じ配布元に固定しています。この指定は意図的なため、通常のnpmバージョン指定へ戻さないでください。
