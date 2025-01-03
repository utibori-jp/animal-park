
# Webアプリケーション画面要件定義

## 1. ホーム画面
### 概要:
サイトに訪れた際に最初に表示される画面。ユーザーが欲しい画像を探すための検索機能と、画像を見つけやすいレイアウトを提供します。

### 要件:
- **検索機能**:
  - キーワード検索バーを設置。
  - 検索結果に対するフィルターオプション（価格帯、人気順、アップロード日時順など）を表示。
  - タグやジャンルによるフィルタリングを追加（例:「風景」「ポートレート」など）。
- **画像表示**:
  - カード型レイアウトで画像を表示（サムネイル、タイトル、価格、ダウンロードボタン）。
  - 画像の簡単なプレビュー表示。
- **おすすめセクション**:
  - 「人気画像」「新着画像」「注目ブランド」などを動的に表示。
- **通貨残高表示**:
  - 画面上部にユーザーのサイト内通貨残高を表示。

---

## 2. 詳細画面
### 概要:
ユーザーがホーム画面で気になった画像を選択した際に遷移する画面。画像の詳細情報と、購入を促進するための情報を提供します。

### 要件:
- **画像の詳細情報**:
  - 画像の解像度、ファイル形式、ライセンス情報（使用許諾等）を表示。
  - 価格（必要通貨数）を強調表示。
  - 画像に対する「評価点」や「レビュー」を表示。
- **レビュー機能**:
  - ユーザーによる評価とコメントを追加可能。
  - 「良い点」「改善点」をタグ付けして、他のユーザーが簡単に理解できるように。
- **関連商品**:
  - 「関連画像」や「このブランドの他の画像」を動的に表示。
- **ダウンロードボタン**:
  - 通貨残高を確認し、足りない場合は「通貨をチャージ」する案内を表示。

---

## 3. ログイン画面
### 概要:
画像のダウンロードやアップロードを行うために、ユーザーにログインを促す画面です。現段階では簡易的な認証を行います。

### 要件:
- **ログイン**:
  - ユーザーIDを入力することで簡易ログインを実現。
  - パスワードなしでID入力のみでログイン可能。
- **新規アカウント作成案内**:
  - ログインがまだのユーザーに「新規アカウント作成」ボタンを目立つ位置に設置。
  - 新規登録ページに遷移するリンクを提供。
- **将来の認証強化案**:
  - 今後のリリースで「2段階認証」や「ソーシャルログイン（Google、Facebookなど）」を検討。

---

## 4. 新規アカウント作成画面
### 概要:
新規ユーザーがアカウントを作成する画面です。最低限の情報でアカウント作成を簡単に行えるようにします。

### 要件:
- **入力項目**:
  - ユーザー名、ID、メールアドレスを入力させる。
  - IDは一意でなければならない（重複チェック）。
  - 必要最低限の情報で、アカウント作成後に追加情報を後から編集可能にする。
- **新規登録後の案内**:
  - アカウント作成後に、「最初のステップ」や「ブランド立ち上げ方法」を案内するポップアップやチュートリアルを表示。
- **アカウント作成完了後**:
  - ログイン画面へ遷移する案内を表示。

---

## 5. アカウント管理画面
### 概要:
ユーザーが自身のアカウント情報を管理する画面。ブランドの立ち上げや、ブランド情報の編集もここで行います。

### 要件:
- **ユーザー情報管理**:
  - プロフィール情報（名前、メールアドレス、通貨残高）の編集が可能。
  - セキュリティ設定（パスワード変更、2段階認証設定）を将来的に追加。
- **ブランド管理**:
  - ユーザーが複数のブランドを立ち上げ、管理できる機能。
  - 各ブランドの売上やアップロードした画像数、ダウンロード回数を確認できるダッシュボード。
  - ブランド名、画像、紹介文の編集。
- **通貨管理**:
  - 現在の通貨残高の確認。
  - 通貨購入履歴や、取引履歴を表示。

---

## 6. 商品管理画面
### 概要:
ブランドごとにアップロードした画像を管理し、新規画像のアップロードや画像の詳細設定ができる画面です。

### 要件:
- **画像アップロード**:
  - ドラッグ＆ドロップで複数の画像を一度にアップロード可能。
  - アップロード後に「タイトル」「価格」「タグ」を入力するフォームを提供。
- **画像管理**:
  - 画像ごとの「ダウンロード回数」「収益」などの売上管理機能。
  - 画像のステータス（「アップロード済み」「公開中」「非公開」）を管理する機能。
- **商品情報編集**:
  - 画像のタイトル、価格、説明文、タグを後から編集できるインターフェース。
  - 画像の削除や公開設定を簡単に変更可能。
- **売上レポート**:
  - 画像ごとに売上状況を確認できるレポート機能（グラフや表形式で表示）。

---

### 追加事項:
- **セキュリティ**:
  - 各画面での個人情報や取引データのセキュリティを強化（暗号化、認証強化）。
- **モバイル対応**:
  - 各画面がレスポンシブデザインに対応し、スマートフォンやタブレットでも快適に利用できるようにする。
