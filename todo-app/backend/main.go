package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/takuto277/todo_go_tutorial_app/database"
	"github.com/takuto277/todo_go_tutorial_app/handlers"
)

func main() {
	log.Println("Starting the application...")
	database.InitDB()

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.GET("/todos", handlers.GetTodos)
	r.POST("/todos", handlers.CreateTodo)
	r.PUT("/todos/:id", handlers.UpdateTodo)
	r.DELETE("/todos/:id", handlers.DeleteTodo)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	log.Println("Build server")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
