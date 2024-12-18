CREATE TABLE download_histories (
    download_id INT PRIMARY KEY,
    transaction_id INT,
    user_id INT,
    product_id INT,
    product_seq INT,
    price DECIMAL(10, 2) CHECK (price >= 0),
    download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

