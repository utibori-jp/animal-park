#!/bin/bash

USER="postgres"
CASCADE_TABLES="
DO \$\$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
    END LOOP;
END \$\$;
"

docker exec -it db psql -U "$USER" -c "$CASCADE_TABLES"

echo "All tables have been dropped."
