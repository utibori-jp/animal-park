CREATE TABLE x_products_tags (
    product_tags_id INTEGER PRIMARY KEY,
    product_id INTEGER ,
    tag_id INTEGER ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES m_products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES m_tags(tag_id) ON DELETE CASCADE
);
