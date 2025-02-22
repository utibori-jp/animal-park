CREATE TABLE s_product_stocks (
    stock_id INTEGER PRIMARY KEY,
    product_id INTEGER ,
    quantity INTEGER  CHECK (quantity >= 0),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES m_products(product_id) ON DELETE CASCADE
);

