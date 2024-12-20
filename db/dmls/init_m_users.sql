INSERT INTO m_users (user_id, name, email, password, currency_balance, status_id, created_at, updated_at)
VALUES
    (1, '山田 太郎', 'taro.yamada@example.com', 'hashed_password_1', 100.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '佐藤 花子', 'hanako.sato@example.com', 'hashed_password_2', 200.50, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, '鈴木 一郎', 'ichiro.suzuki@example.com', 'hashed_password_3', 150.75, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '高橋 美咲', 'misaki.takahashi@example.com', 'hashed_password_4', 300.00, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, '田中 剛', 'go.tanaka@example.com', 'hashed_password_5', 50.25, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
