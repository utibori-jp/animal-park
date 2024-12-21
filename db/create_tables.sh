#!/bin/bash

USER="postgres"

DDL_FILES=(
    "create_m_user_statuses.sql"
    "create_m_users.sql"
    "create_m_brands.sql"
    "create_m_trans_types.sql"
    "create_m_tags.sql"
    "create_m_product_statuses.sql"
    "create_t_currency_activities.sql"
    "create_m_products.sql"
    "create_s_product_stocks.sql"
    "create_t_product_comments.sql"
    "create_x_products_tags.sql"
    "create_t_downloads.sql"
    "create_t_uploads.sql"
)

for SQL_FILE in "${DDL_FILES[@]}"; do
    echo "Executing $SQL_FILE..."
    docker exec -it db psql -U "$USER" -f "ddls/$SQL_FILE" 
    if [ $? -ne 0 ]; then
        echo "Error executing $SQL_FILE. Exiting."
        exit 1
    fi
done

echo "All tables have been created successfully."
