# VILLE CAREER

未経験から、今よりいい条件へ。

原則紹介制の就職・転職支援サービス「VILLE CAREER」のランディングページです。
React + TypeScript + Vite 製のシングルページサイトとして動作します。

## デザイン

- 黒 × アシッドイエロー1色のエディトリアル・ブルータリズム
- 明朝(Shippori Mincho B1)の巨大タイポグラフィ × モノスペースの英字ラベル
- 粒子ノイズ、マーキー、スクロール連動のリビール演出
- `prefers-reduced-motion` 対応、モバイルファーストのレスポンシブ

## セクション構成

1. **HERO** — 未経験から、今よりいい条件へ。
2. **01 INVITATION ONLY** — 原則、ご紹介の方のみ。
3. **02 BETTER LIFE** — 転職するなら、生活を良くしよう。
4. **03 GOOD CONDITIONS** — 未経験でも、条件は妥協しない。
5. **04 SIMPLE** — 大事なことを、わかりやすく。
6. **05 HOW IT WORKS** — ご紹介から、入社まで。
7. **CLOSING / FOOTER** — 株式会社ヴィレ

## 公開(デプロイ)

`claude/ville-career-site-mwwxhg`(または `main`)へのpushで GitHub Actions がビルドし、
`gh-pages` ブランチ経由で GitHub Pages に公開されます。

- 公開ドメイン: **https://career.ville-ville.com/**(`public/CNAME` で指定)
- `public/CNAME` が存在するとビルドのベースパスは `/`、削除すると `/calcio/`(プロジェクトページ用)に自動で切り替わります(`vite.config.ts`)
- DNS側では `career.ville-ville.com` の CNAME レコードを `igawowwow.github.io` に向けてください
- 本体サイト(STUDIO等)が同じドメインの apex / www を使っていても、サブドメインのレコード追加だけで共存できます

## 応募フォームURLの設定

CTAボタンのリンク先は `src/App.tsx` 冒頭の `APPLY_URL` 定数です。
運用開始時に専用フォームのURLへ差し替えてください。

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run preview  # ビルドのプレビュー
npm run lint     # lint
```
