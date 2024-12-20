INSERT INTO m_trans_types (trans_type_id, trans_type, description, created_at, updated_at)
VALUES
    (1, 'Deposit', 'アカウントにポイントを追加する', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Earned', '商品の対価としてポイントを受け取る', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Payment', '商品やサービスの支払いを行う', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
