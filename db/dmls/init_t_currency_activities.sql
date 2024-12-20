-- 初期データの挿入
INSERT INTO t_currency_activities (curr_trans_id, user_id, trans_type_id, amount, created_at)
VALUES
    (1, 1, 1, 10.00, CURRENT_TIMESTAMP),  
    (2, 2, 2, 50.00, CURRENT_TIMESTAMP),
    (3, 3, 3, 20.00, CURRENT_TIMESTAMP);
