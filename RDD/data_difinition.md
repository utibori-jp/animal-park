### エンティティリスト

|              エンティティ名               |                                       概要                                       |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| **ユーザー (Users)**                      | ユーザー情報（ID、名前、メールアドレス、通貨残高など）                           |
| **ブランド (Brands)**                     | ユーザーが立ち上げたブランド（名前、説明、ユーザーとの関連など）                 |
| **ステータス（Statuses）**                | ユーザーのステータス情報                                                         |
| **商品 (Products)**                       | アップロードされた商品情報（タイトル、価格、ファイルパス、ダウンロード回数など） |
| **商品ステータス（Product_statuses）**    | 商品ステータス情報                                                               |
| **タグ（Tags）**                          | 商品に設定するタグ情報                                                           |
| **商品タグ（Products_tags）**             | 各商品とそれに紐づくタグ情報                                                     |
| **在庫 (Product_Stocks)**                 | 商品の在庫情報（商品ID、在庫数など）                                             |
| **コメント (Product_Comments)**           | 商品へのユーザーのコメント（評価、コメント内容）                                 |
| **通貨取引 (Currency_Transactions)**      | 通貨取引の履歴（取引額、取引タイプ、関連する商品またはユーザー）                 |
| **取引タイプ（trans_type）**              | 取引の種類情報                                                                   |
| **アップロード履歴 (Upload_histories)**   | ユーザーによる商品（画像）のアップロード履歴（通貨額、ユーザー、商品など）       |
| **ダウンロード履歴 (Download_histories)** | ユーザーによる商品（画像）のダウンロード履歴（通貨額、ユーザー、商品など）       |

---

### 詳細なエンティティ構成
#### 1. **Users (ユーザー)**
- ユーザーの基本情報を管理します。

|       属性名       |    データ型    |                         説明                          |                            制約                            |
| ------------------ | -------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| `user_id`          | INT (PK)       | ユーザーID（ユニーク識別子）                          | PRIMARY KEY                                                |
| `name`             | VARCHAR(100)   | ユーザーの名前                                        | NOT NULL                                                   |
| `email`            | VARCHAR(50)    | ユーザーのメールアドレス                              | UNIQUE, NOT NULL                                           |
| `password`         | VARCHAR(50)    | ユーザーのパスワード（暗号化）                        | NOT NULL                                                   |
| `currency_balance` | DECIMAL(10, 2) | サイト内通貨残高（Decimal型で管理、例えば100.50など） | CHECK (`currency_balance` >= 0)                            |
| `status_id`        | INT (FK)       | ステータスID（`status_id`と関連）                     | FOREIGN KEY (`status_id`) REFERENCES Statuses(`status_id`) |
| `created_at`       | TIMESTAMP      | ユーザーアカウント作成日時                            | DEFAULT CURRENT_TIMESTAMP                                  |
| `updated_at`       | TIMESTAMP      | ユーザー情報更新日時                                  | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP      |

---

#### 2. **User_Statuses（ユーザーステータス）**
- ユーザーのステータスを管理する。

|    属性名     |   データ型   |              説明              |                         制約                          |
| ------------- | ------------ | ------------------------------ | ----------------------------------------------------- |
| `status_id`   | INT (PK)     | ステータスID（ユニーク識別子） | PRIMARY KEY                                           |
| `status`      | VARCHAR(50)  | ステータス                     | UNIQUE, NOT NULL                                      |
| `description` | VARCHAR(500) | ステータスに関する説明         |                                                       |
| `created_at`  | TIMESTAMP    | ステータス作成日時             | DEFAULT CURRENT_TIMESTAMP                             |
| `updated_at`  | TIMESTAMP    | ステータスの更新日時           | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

---

#### 3. **Brands (ブランド)**
- ユーザーが立ち上げたブランドを管理します。各ブランドには関連する商品（画像）が紐づきます。

|    属性名     |   データ型   |                        説明                        |                                 制約                                  |
| ------------- | ------------ | -------------------------------------------------- | --------------------------------------------------------------------- |
| `brand_id`    | INT (PK)     | ブランドID（ユニーク識別子）                       | PRIMARY KEY                                                           |
| `user_id`     | INT (FK)     | ブランドを立ち上げたユーザーID（`User.id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE |
| `name`        | VARCHAR(100) | ブランド名                                         | UNIQUE, NOT NULL                                                      |
| `description` | VARCHAR(500) | ブランド説明文                                     |                                                                       |
| `created_at`  | TIMESTAMP    | ブランド作成日時                                   | DEFAULT CURRENT_TIMESTAMP                                             |
| `updated_at`  | TIMESTAMP    | ブランド情報更新日時                               | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP                 |

---

#### 4. **Products (商品)**
- 商品（画像）の情報を管理します。タイトル、価格、説明、ダウンロード回数、画像ファイルの保存先などを含みます。商品の価格やダウンロード回数などもここで管理します。

|       属性名        |    データ型    |                         説明                         |                                        制約                                        |
| ------------------- | -------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `product_id`        | INT (PK)       | 商品ID（ユニーク識別子）                             | PRIMARY KEY                                                                        |
| `brand_id`          | INT (FK)       | 商品が所属するブランドID（`Brand_id` と関連）        | FOREIGN KEY (`brand_id`) REFERENCES Brands(`brand_id`) ON DELETE CASCADE           |
| `user_id`           | INT (FK)       | 商品をアップロードしたユーザーID（`User_id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE              |
| `title`             | VARCHAR(100)   | 商品タイトル                                         | NOT NULL                                                                           |
| `price`             | DECIMAL(10, 2) | 商品の価格                                           | NOT NULL, CHECK (`price` >= 0)                                                     |
| `sample_file_path`  | VARCHAR(300)   | サンプル商品（画像）のファイルパス                   | NOT NULL                                                                           |
| `file_path`         | VARCHAR(300)   | 商品（画像）のファイルパス                           | NOT NULL                                                                           |
| `description`       | VARCHAR(500)   | 商品の説明                                           |                                                                                    |
| `product_status_id` | INT（FK）      | 商品ステータスID（`product_status_id`）              | FOREIGN KEY (`product_status_id`) REFERENCES Product_statuses(`product_status_id`) |
| `created_at`        | TIMESTAMP      | 商品のアップロード日時                               | DEFAULT CURRENT_TIMESTAMP                                                          |
| `updated_at`        | TIMESTAMP      | 商品情報の更新日時                                   | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP                              |

---

#### 5. **Product_statuses（商品ステータス）**
- 商品のステータスを管理する。

|       属性名        |   データ型   |                説明                |                         制約                          |
| ------------------- | ------------ | ---------------------------------- | ----------------------------------------------------- |
| `product_status_id` | INT (PK)     | 商品ステータスID（ユニーク識別子） | PRIMARY KEY                                           |
| `status`            | VARCHAR(50)  | 商品ステータス                     | UNIQUE, NOT NULL                                      |
| `description`       | VARCHAR(500) | 商品ステータスに関する説明         |                                                       |
| `created_at`        | TIMESTAMP    | ステータス作成日時                 | DEFAULT CURRENT_TIMESTAMP                             |
| `updated_at`        | TIMESTAMP    | ステータスの更新日時               | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

---

#### 6. **Tags（タグ）**
- 商品に関連つけるタグの種類を管理します。

|    属性名     |   データ型   |           説明            |                         制約                          |
| ------------- | ------------ | ------------------------- | ----------------------------------------------------- |
| `tag_id`      | INT (PK)     | タグID（ユニーク識別子）  | PRIMARY KEY                                           |
| `tag_name`    | VARCHAR(100) | タグ名（`tag_id` と関連） | UNIQUE, NOT NULL                                      |
| `description` | VARCHAR(500) | タグに関する説明          |                                                       |
| `created_at`  | TIMESTAMP    | タグが作成された日時      | DEFAULT CURRENT_TIMESTAMP                             |
| `updated_at`  | TIMESTAMP    | タグ情報が更新された日時  | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

---

#### 7. **Products_tags（商品タグ）**
- 商品に関連つけるタグの種類を管理します。

|      属性名       | データ型  |              説明              |                                      制約                                      |
| ----------------- | --------- | ------------------------------ | ------------------------------------------------------------------------------ |
| `product_tags_id` | INT (PK)  | 商品タグID（ユニーク識別子）   | PRIMARY KEY                                                                    |
| `product_id`      | INT (FK)  | 商品ID（`product_id` と関連）  | FOREIGN KEY (`product_id`) REFERENCES Products(`product_id`) ON DELETE CASCADE |
| `tag_id`          | INT (FK)  | タグID（`tag_id` と関連）      | FOREIGN KEY (`tag_id`) REFERENCES Tags(`tag_id`) ON DELETE CASCADE             |
| `created_at`      | TIMESTAMP | 商品タグトランが作成された日時 | DEFAULT CURRENT_TIMESTAMP                                                      |
| `updated_at`      | TIMESTAMP | 商品タグトランが更新された日時 | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP                          |

---

#### 8. **Product_Stocks (在庫)**
- 商品の在庫数を管理するためのエンティティです。このテーブルでは、各商品が現在いくつ在庫として存在するのか、どの倉庫に保管されているのかを管理します。

|     属性名     | データ型  |                説明                 |                                      制約                                      |
| -------------- | --------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| `stock_id`     | INT (PK)  | 在庫ID（ユニーク識別子）            | PRIMARY KEY                                                                    |
| `product_id`   | INT (FK)  | 対象の商品ID（`Product_id` と関連） | FOREIGN KEY (`product_id`) REFERENCES Products(`product_id`) ON DELETE CASCADE |
| `quantity`     | INT       | 商品の在庫数                        | CHECK (`quantity` >= 0)                                                        |
| `last_updated` | TIMESTAMP | 在庫数が最後に更新された日時        | DEFAULT CURRENT_TIMESTAMP                                                      |

---

#### 9. **Product_Comments (コメント)**
- ユーザーが商品に対して投稿したコメントを管理します。評価（星の数）やコメント内容などが含まれます。

|    属性名    |   データ型   |                         説明                          |                                      制約                                      |
| ------------ | ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| `comment_id` | INT (PK)     | コメントID（ユニーク識別子）                          | PRIMARY KEY                                                                    |
| `product_id` | INT (FK)     | コメント対象の商品ID（`Product.product_id` と関連）   | FOREIGN KEY (`product_id`) REFERENCES Products(`product_id`) ON DELETE CASCADE |
| `user_id`    | INT (FK)     | レビューを投稿したユーザーID（`User.user_id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE          |
| `rating`     | INT          | 商品の評価（例：1〜5の整数）                          | CHECK (`rating` BETWEEN 1 AND 5)                                               |
| `comment`    | VARCHAR(500) | レビューコメント                                      | NOT NULL                                                                       |
| `created_at` | TIMESTAMP    | レビュー作成日時                                      | DEFAULT CURRENT_TIMESTAMP                                                      |

---

#### 10. **Currency_Transactions (通貨取引)**
- ユーザーが行った通貨取引の履歴を管理します。取引の種類（通貨購入、ダウンロードなど）、取引額などを記録します。

|     属性名      |    データ型    |                    説明                    |                                          制約                                           |
| --------------- | -------------- | ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `curr_trans_id` | INT (PK)       | 取引ID（ユニーク識別子）                   | PRIMARY KEY                                                                             |
| `user_id`       | INT (FK)       | 取引を行ったユーザーID（`User_id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE                   |
| `trans_type_id` | INT (FK)       | 取引タイプID（`trans_type_id`と関連）      | FOREIGN KEY (`trans_type_id`) REFERENCES Trans_types(`trans_type_id`) ON DELETE CASCADE |
| `amount`        | DECIMAL(10, 2) | 取引額（増加または減少）                   | CHECK (`amount` >= 0)                                                                   |
| `created_at`    | TIMESTAMP      | 取引発生日時                               | DEFAULT CURRENT_TIMESTAMP                                                               |

---

#### 11. **Trans_types（取引タイプ）**
- 行った取引の種類を管理する。

|     属性名      |   データ型    |           説明           |                         制約                          |
| --------------- | ------------- | ------------------------ | ----------------------------------------------------- |
| `trans_type_id` | INT (PK)      | 取引ID（ユニーク識別子） | PRIMARY KEY                                           |
| `trans_type`    | VARCHAR(50)   | 取引タイプ               | UNIQUE, NOT NULL                                      |
| `description`   | VARCHAR (500) | 取引タイプに関する説明   |                                                       |
| `created_at`    | TIMESTAMP     | 取引タイプの作成日時     | DEFAULT CURRENT_TIMESTAMP                             |
| `updated_at`    | TIMESTAMP     | 取引タイプの更新日時     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

---

#### 12. **Upload_histories (アップロード)**
- ユーザーが商品をアップロードした履歴を記録します。アップロード日時、設定された在庫数等が含まれます。

|       属性名       | データ型  |                        説明                        |                                      制約                                      |
| ------------------ | --------- | -------------------------------------------------- | ------------------------------------------------------------------------------ |
| `upload_id`        | INT (PK)  | アップロードID（ユニーク識別子）                   | PRIMARY KEY                                                                    |
| `user_id`          | INT (FK)  | アップロードを行ったユーザーID（`User_id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE          |
| `product_id`       | INT (FK)  | 商品ID（`Product_id` と関連）                      | FOREIGN KEY (`product_id`) REFERENCES Products(`product_id`) ON DELETE CASCADE |
| `initial_quantity` | INT       | 始めに設定した数量（いくつ入荷させるか）           | CHECK (`initial_quantity` > 0)                                                 |
| `upload_date`      | TIMESTAMP | アップロードした日時                               | DEFAULT CURRENT_TIMESTAMP                                                      |

---

#### 13. **Download_histories (ダウンロード)**
- ユーザーが商品をダウンロードした履歴を記録します。通貨額、ダウンロード日時、関連する商品（画像）などが含まれます。

|      属性名      |    データ型    |                        説明                        |                                       制約                                       |
| ---------------- | -------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `download_id`    | INT (PK)       | ダウンロードID（ユニーク識別子）                   | PRIMARY KEY                                                                      |
| `transaction_id` | INT (PK)       | 取引ID（ユニーク識別子）                           | PRIMARY KEY                                                                      |
| `user_id`        | INT (FK)       | ダウンロードを行ったユーザーID（`User_id` と関連） | FOREIGN KEY (`user_id`) REFERENCES Users(`user_id`) ON DELETE CASCADE            |
| `product_id`     | INT (FK)       | 商品ID（`Product.id` と関連）                      | FOREIGN KEY (`product_id`) REFERENCES Products(`product_id`) ON DELETE CASCADE   |
| `product_seq`    | INT            | 商品連番（`Product.product_seq` と関連）           | FOREIGN KEY (`product_seq`) REFERENCES Products(`product_seq`) ON DELETE CASCADE |
| `price`          | DECIMAL(10, 2) | 取引時の商品の通貨額                               | CHECK (`price` >= 0)                                                             |
| `download_date`  | TIMESTAMP      | ダウンロード日時                                   | DEFAULT CURRENT_TIMESTAMP                                                        |

---

<!-- TODO: フロントエンド作り始めたら、このUser Settingをちゃんと考える。今はいったん無視する。
#### 7. **User Setting (アカウント設定)**
- ユーザーのアカウントに関する設定（通知設定、セキュリティ設定など）を管理します。

|     属性名      | データ型  |                             説明                              |
| --------------- | --------- | ------------------------------------------------------------- |
| `id`            | INT (PK)  | 設定ID（ユニーク識別子）                                      |
| `user_id`       | INT (FK)  | 設定が関連するユーザーID（`User.id` と関連）                  |
| `setting_name`  | VARCHAR   | 設定項目名（例: `email_notifications`, `theme` など）         |
| `setting_value` | VARCHAR   | 設定値（例: `true`, `false`, `dark_mode`, `light_mode` など） |
| `created_at`    | TIMESTAMP | 設定作成日時                                                  |
| `updated_at`    | TIMESTAMP | 設定更新日時                                                  |

--- -->

<!-- TODO:ER図がすごく見づらいから、他のものを使ってER図を作成して画像を貼り付ける方法に変更する。 -->
```mermaid
erDiagram
    USER {
        INT id PK
        VARCHAR name
        VARCHAR email
        VARCHAR password
        DECIMAL currency_balance
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    BRAND {
        INT id PK
        INT user_id FK
        VARCHAR name
        TEXT description
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    PRODUCT {
        INT id PK
        INT brand_id FK
        INT user_id FK
        VARCHAR title
        DECIMAL price
        VARCHAR file_path
        TEXT description
        INT download_count
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    REVIEW {
        INT id PK
        INT product_id FK
        INT user_id FK
        INT rating
        TEXT comment
        TIMESTAMP created_at
    }

    CURRENCY_TRANSACTION {
        INT id PK
        INT user_id FK
        ENUM transaction_type
        DECIMAL amount
        INT related_product_id FK
        TIMESTAMP created_at
    }

    DOWNLOAD {
        INT id PK
        INT user_id FK
        INT product_id FK
        TIMESTAMP download_date
        DECIMAL currency_spent
    }

    USER_SETTING {
        INT id PK
        INT user_id FK
        VARCHAR setting_name
        VARCHAR setting_value
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    | USER    | | --o | BRAND : has                       |
    | BRAND   | | --o | PRODUCT : owns                    |
    | USER    | | --o | PRODUCT : uploads                 |
    | PRODUCT | | --o | REVIEW : receives                 |
    | USER    | | --o | REVIEW : writes                   |
    | USER    | | --o | CURRENCY_TRANSACTION : performs   |
    | PRODUCT | | --o | CURRENCY_TRANSACTION : related_to |
    | USER    | | --o | DOWNLOAD : downloads              |
    | PRODUCT | | --o | DOWNLOAD : related_to             |
    | USER    | | --o | USER_SETTING : customizes         |
```

