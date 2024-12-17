CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    brand_id INTEGER ,
    user_id INTEGER ,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    sample_file_path VARCHAR(300) NOT NULL,
    file_path VARCHAR(300) NOT NULL,
    description VARCHAR(500),
    product_status_id INTEGER ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_status_id) REFERENCES product_statuses(product_status_id)
);

