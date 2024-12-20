INSERT INTO m_products (product_id, brand_id, user_id, title, price, sample_file_path, file_path, description, product_status_id, product_seq, created_at, updated_at)
VALUES
    (1, 1, 1, 'Real Gorilla', 50.00, '/sample/real_gorilla', '/products/real_gorilla', 'リアルなゴリラです。', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 3, 3, 'Ueno Panda', 30.00, '/sample/ueno_panda', '/products/ueno_panda', '上野のパンダです。', 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 4, 2, 'Ukiyo Gorilla', 80.00, '/sample/ukiyo_gorilla', '/products/ukiyo_gorilla', '浮世絵風のゴリラです。', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
