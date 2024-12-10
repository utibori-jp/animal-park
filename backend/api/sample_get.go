package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type SampleServer struct {
	ServerId int
}

func (server *SampleServer) GetSample(c *gin.Context, params GetSampleParams) {
	hello := "Hello World!"
	responseArray := []SampleResponse{
		{Value: params.Param1},
		{Value: lo.ToPtr(strconv.Itoa(server.ServerId))},
		{Value: &hello},
	}
	var responseBody GetSample200JSONResponse = GetSample200JSONResponse(responseArray)
	c.JSON(http.StatusOK, responseBody)
}
