#!/bin/bash

echo "Dropping all existing tables..."
./cascade_tables.sh

echo "Creating new tables..."
./create_tables.sh

echo "Inserting initial data..."
./insert_initial_data.sh

echo "Database initialization completed successfully."
