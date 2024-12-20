CREATE TABLE t_uploads (
    upload_id INTEGER PRIMARY KEY,
    user_id INTEGER ,
    product_id INTEGER ,
    initial_quantity INTEGER  CHECK (initial_quantity > 0),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES m_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES m_products(product_id) ON DELETE CASCADE
);

