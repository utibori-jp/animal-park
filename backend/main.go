package main

import (
	"go-backend/api"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	server := &api.SampleServer{
		ServerId: 1, // Sample Value
	}
	api.RegisterHandlers(r, server)
	r.Run() // listen and serve on 0.0.0.0:8080
}
