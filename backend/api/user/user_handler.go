package user

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type UserServer struct {
	ServerId int
}

func GetData(c *gin.Context) {
	fmt.Println("Hello World")
	// rows, err := DB.Query(context.Background(), "SELECT user_id, user_name, email FROM m_users")
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query database"})
	// 	return
	// }
	// defer rows.Close()

	// var data []map[string]interface{}
	// for rows.Next() {
	// 	var user_id int
	// 	var user_name string
	// 	var email string
	// 	err := rows.Scan(&user_id, &user_name, &email)
	// 	if err != nil {
	// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan row"})
	// 		return
	// 	}
	// 	data = append(data, map[string]interface{}{
	// 		"id":    user_id,
	// 		"name":  user_name,
	// 		"email": email,
	// 	})
	// }

	// // JSONとしてレスポンスを返す
	// c.JSON(http.StatusOK, gin.H{"data": data})
}
