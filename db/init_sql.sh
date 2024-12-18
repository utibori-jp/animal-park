#!/bin/bash

USER="postgres"

SQL_FILES=(
    "create_user_statuses.sql"
    "create_users.sql"
    "create_brands.sql"
    "create_trans_types.sql"
    "create_tags.sql"
    "create_product_statuses.sql"
    "create_currency_transactions.sql"
    "create_products.sql"
    "create_product_stocks.sql"
    "create_product_comments.sql"
    "create_products_tags.sql"
    "create_download_histories.sql"
    "create_upload_histories.sql"
)

for SQL_FILE in "${SQL_FILES[@]}"; do
    echo "Executing $SQL_FILE..."
    docker exec -it db psql -U "$USER" -f "ddls/$SQL_FILE" 
    if [ $? -ne 0 ]; then
        echo "Error executing $SQL_FILE. Exiting."
        exit 1
    fi
done

echo "All tables have been created successfully."
