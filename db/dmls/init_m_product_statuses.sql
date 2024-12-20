INSERT INTO m_product_statuses (product_status_id, status, description, created_at, updated_at)
VALUES
    (1, 'Sold Out', 'この商品は売り切れで、現在販売されていません。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'In Stock', 'この商品は現在販売中で、在庫があります。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Discontinued', 'この商品は販売停止となっており、再入荷はありません。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Out Of Stock', 'この商品は現在在庫切れで、入荷待ちです。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

