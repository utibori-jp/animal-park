INSERT INTO m_user_statuses (status_id, status, description, created_at, updated_at)
VALUES
    (1, 'Inactive', '一時的にサービスの利用を停止している状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Suspended', 'アカウントが停止されており、サービスを利用できない状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Active', 'サービスが正常に利用可能な状態。', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

