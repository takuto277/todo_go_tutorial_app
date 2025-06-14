package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./todo.db")
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to the database")

	createTable()
}

func createTable() {
	query := `CREATE TABLE IF NOT EXISTS todos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	description TEXT,
	completed BOOLEAN DEFAULT FALSE,
	created_at DATETIME,
	updated_at DATETIME
	);`

	log.Printf("Creating table with query: %s", query)

	_, err := DB.Exec(query)
	if err != nil {
		log.Printf("Error creating table: %v", err)
		log.Fatal(err)
	}

	log.Println("Table created successfully")
}
