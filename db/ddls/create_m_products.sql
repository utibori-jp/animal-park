CREATE TABLE m_products (
    product_id INTEGER PRIMARY KEY,
    brand_id INTEGER ,
    user_id INTEGER ,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    sample_file_path VARCHAR(300) NOT NULL,
    file_path VARCHAR(300) NOT NULL,
    description VARCHAR(500),
    product_status_id INTEGER ,
    product_seq INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES m_brands(brand_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES m_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_status_id) REFERENCES m_product_statuses(product_status_id)
);

