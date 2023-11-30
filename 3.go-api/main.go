package main

import (
	"go-api/handlers"
	"go-api/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	models.ConnectDatabase() // connecting to db

	router.POST("/create-blog", handlers.CreatePost)      // create blog route
	router.GET("/blogs", handlers.FindAllPost)            // find all posts
	router.GET("/blogs/:id", handlers.FindPostWithId)     // find post with specific id
	router.PATCH("/blogs/:id", handlers.UpdatePostWithId) // to update the post with id
	router.DELETE("/delete-blog/:id", handlers.DeletPostWithId)

	router.Run("localhost:8080") // starting server
}
