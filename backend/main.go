package main

import (
	"go-backend/api"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	server := &api.ProductsServer{
		ServerId: 1, // Sample Value
	}

	err := api.InitDB()
	if err != nil {
		log.Fatal("\033[31mError connecting to the database:", err, "\033[0m")
	}
	defer api.CloseDB()

	api.RegisterHandlers(r, server)
	r.Run() // listen and serve on 0.0.0.0:8080
}
