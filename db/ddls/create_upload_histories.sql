CREATE TABLE upload_histories (
    upload_id INTEGER PRIMARY KEY,
    user_id INTEGER ,
    product_id INTEGER ,
    initial_quantity INTEGER  CHECK (initial_quantity > 0),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

