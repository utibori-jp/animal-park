-- 初期データの挿入
INSERT INTO m_brands (brand_id, user_id, name, description, created_at, updated_at)
VALUES
    (1, 1, 'Real Animal', '実写っぽい動物の絵を投稿します。' , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 2, 'Ueno', '上野動物園の動物たちです。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 3, 'Ueno Panda', '上野動物園のパンダの写真を投稿します。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 4, 'Ukiyo Animal', '浮世絵風の動物のイラストを投稿していきます。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 5, 'Cute Animal Illustration', 'かわいい動物のイラストを書いています。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
