CREATE TABLE currency_transactions (
    curr_trans_id INTEGER PRIMARY KEY,
    user_id INTEGER ,
    trans_type_id INTEGER ,
    amount DECIMAL(10, 2) CHECK (amount >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (trans_type_id) REFERENCES trans_types(trans_type_id) ON DELETE CASCADE
);

