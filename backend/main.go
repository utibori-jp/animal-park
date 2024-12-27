package main

import (
	"go-backend/api/check"
	"go-backend/api/postgres"
	"go-backend/api/product"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	checkServer := &check.CheckServer{
		ServerId: 1,
	}
	productServer := &product.ProductsServer{
		ServerId: 1,
	}

	err := postgres.InitDB()
	if err != nil {
		log.Fatal("\033[31mError connecting to the database:", err, "\033[0m")
	}
	defer postgres.CloseDB()

	check.RegisterHandlers(r, checkServer)
	product.RegisterHandlers(r, productServer)
	r.Run() // listen and serve on 0.0.0.0:8080
}
