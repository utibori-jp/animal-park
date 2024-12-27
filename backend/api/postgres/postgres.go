package postgres

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() error {
	var err error

	USER := "postgres"
	PASSWORD := "postgres"
	HOST := "db"
	PORT := "5432"
	DBNAME := "postgres"
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", USER, PASSWORD, HOST, PORT, DBNAME)

	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Println("Unable to connect to database: ", err)
		return err
	}

	err = DB.Ping()
	if err != nil {
		log.Println("Unable to ping database: ", err)
		return err
	}

	fmt.Println("\033[32mConnected to PostgreSQL successfully\033[0m")
	return nil
}

func CloseDB() {
	if DB != nil {
		defer func() {
			err := DB.Close()
			if err != nil {
				fmt.Printf("Error closing the database connection: %v\n", err)
			} else {
				fmt.Println("Database connection closed.")
			}
		}()
	}
}
