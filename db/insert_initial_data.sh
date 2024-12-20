#!/bin/bash

USER="postgres"

INIT_SQL_FILES=(
    "init_m_user_statuses.sql"
    "init_m_users.sql"
    "init_m_brands.sql"
    "init_m_trans_types.sql"
    "init_m_tags.sql"
    "init_m_product_statuses.sql"
    "init_t_currency_activities.sql"
    "init_m_products.sql"
    "init_s_product_stocks.sql"
    "init_t_product_comments.sql"
    "init_x_products_tags.sql"
    "init_t_downloads.sql"
    "init_t_uploads.sql"
)

for SQL_FILE in "${INIT_SQL_FILES[@]}"; do
    echo "Executing $SQL_FILE..."
    docker exec -it db psql -U "$USER" -f "dmls/$SQL_FILE"
    
    if [ $? -ne 0 ]; then
        echo "Error executing $SQL_FILE. Exiting."
        exit 1
    fi
done

echo "All initial data has been successfully inserted."
