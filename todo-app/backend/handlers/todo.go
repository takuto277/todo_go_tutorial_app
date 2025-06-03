package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/takuto277/todo_go_tutorial_app/database"
	"github.com/takuto277/todo_go_tutorial_app/models"
)

func GetTodos(c *gin.Context) {
	rows, err := database.DB.Query("SELECT id, title, completed, create_at, updated_at FROM todos")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var todos []models.Todo
	for rows.Next() {
		var todo models.Todo
		var createdAt, updatedAt string

		err = rows.Scan(&todo.ID, &todo.Title, &todo.Completed, &createdAt, &updatedAt)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		todo.CreatedAt, _ = time.Parse(time.RFC3339, createdAt)
		todo.UpdatedAt, _ = time.Parse(time.RFC3339, updatedAt)

		todos = append(todos, todo)
	}

	c.JSON(http.StatusOK, todos)
}

func CreateTodo(c *gin.Context) {
	var newTodo models.Todo
	if err := c.ShouldBindJSON(&newTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newTodo.CreatedAt = time.Now()
	newTodo.UpdatedAt = time.Now()

	stmt, err := database.DB.Prepare("INSERT INTO todos(title, completed, created_at, updated_at) VALUES(?, ?, ?, ?)")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	result, err := stmt.Exec(newTodo.Title, newTodo.Completed, newTodo.CreatedAt.Format(time.RFC3339), newTodo.UpdatedAt.Format(time.RFC3339))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	lastInsertId, _ := result.LastInsertId()
	newTodo.ID = lastInsertId

	c.JSON(http.StatusCreated, newTodo)
}

func UpdateTodo(c *gin.Context) {
	id := c.Param("id")

	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo.UpdatedAt = time.Now()

	stmt, err := database.DB.Prepare("UPDATE todos SET title = ?, completed = ?, updated_at = ? WHERE id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(todo.Title, todo.Completed, todo.UpdatedAt.Format(time.RFC3339), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 更新後のTodoを取得
	idInt, _ := strconv.ParseInt(id, 10, 64)
	todo.ID = idInt

	c.JSON(http.StatusOK, todo)
}

// DeleteTodo は指定されたIDのTodoを削除するハンドラー
func DeleteTodo(c *gin.Context) {
	id := c.Param("id")

	stmt, err := database.DB.Prepare("DELETE FROM todos WHERE id = ?")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}
