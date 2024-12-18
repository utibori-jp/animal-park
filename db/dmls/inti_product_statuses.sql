-- product_statuses テーブルへのデータ挿入
INSERT INTO product_statuses (product_status_id, status, description, created_at, updated_at)
VALUES
('PS001', 'Sold_Out', 'この商品は売り切れで、現在販売されていません。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PS002', 'Available', 'この商品は現在販売中で、在庫があります。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PS003', 'Discontinued', 'この商品は販売停止となっており、再入荷はありません。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PS004', 'Out_Of_Stock', 'この商品は現在在庫切れで、入荷待ちです。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

