package check

import (
	"go-backend/api/postgres"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CheckServer struct {
	ServerId int
}

func (server *CheckServer) CheckAPI(c *gin.Context) {
	rows, err := postgres.DB.Query("SELECT user_id, name, email FROM public.m_users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query database"})
		return
	}
	defer rows.Close()

	var data []map[string]interface{}
	for rows.Next() {
		var user_id int
		var user_name string
		var email string
		err := rows.Scan(&user_id, &user_name, &email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan row"})
			return
		}
		data = append(data, map[string]interface{}{
			"id":    user_id,
			"name":  user_name,
			"email": email,
		})
	}

	// JSONとしてレスポンスを返す
	c.JSON(http.StatusOK, gin.H{"data": data})
}
