package main

import (
	"database/sql"
	"log"
	"server/app"

	_ "github.com/lib/pq"
)

func main() {
	db, err := app.NewDB()

	if err != nil {
		log.Fatal(err)
	}

	initStorage(db)

	server := app.NewApiServer("0.0.0.0:8080", db)
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}

func initStorage(db *sql.DB) {
	err := db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("DB: Successfully connected!..")
}
