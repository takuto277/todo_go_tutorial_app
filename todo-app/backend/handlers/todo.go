package handlers

import (
	"database/sql"
	"log"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./todo.db")
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to the database")

}

func createTable() {
	todoTable := `CREATE TABLE IF NOT EXISTS todos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		completed BOOLEAN DEFAULT FALSE,
		created_at DATETIME,
		updated_at DATETIME
	);`

	_, err := DB.Exec(todoTable)
	if err != nil {
		log.Fatal(err)
	}
}
