-- user_statuses テーブルへのデータ挿入
INSERT INTO user_statuses (status_id, status, description, created_at, updated_at)
VALUES
('US001', 'Inactive', '一時的にサービスの利用を停止している状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('US002', 'Suspended', 'アカウントが停止されており、サービスを利用できない状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('US003', 'Active', 'サービスが正常に利用可能な状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

