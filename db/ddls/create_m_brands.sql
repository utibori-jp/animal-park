CREATE TABLE m_brands (
    brand_id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES m_users(user_id) ON DELETE CASCADE
);

