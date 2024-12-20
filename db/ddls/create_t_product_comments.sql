CREATE TABLE t_product_comments (
    comment_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    user_id INTEGER,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES m_products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES m_users(user_id) ON DELETE CASCADE
);

