package product

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProductsServer struct {
	ServerId int
}

func (server *ProductsServer) GetProductList(c *gin.Context, params GetProductListParams) {
	// TODO: 値をデータベースから取得するロジックを作成する。
	availability := "In Stock"
	imageUrl := "https://example.com/images/simple_gorilla.jpg"
	price := 45000
	productId := 101
	productName := "Simple Gorilla"
	rating := float32(4.5)
	stockQuantity := 50
	tags := []string{"New Arrival", "Best Seller"}

	productArray := []Product{
		{
			ProductId:     &productId,
			ProductName:   &productName,
			Price:         &price,
			ImageUrl:      &imageUrl,
			StockQuantity: &stockQuantity,
			Availability:  &availability,
			Rating:        &rating,
			Tags:          &tags,
		},
	}

	// レスポンスとして返す構造体
	CategoryId := 1
	CategoryName := "Simple Animal"
	responseBody := []ProductListResponse{
		{
			CategoryId:   &CategoryId,
			CategoryName: &CategoryName,
			Products:     &productArray,
		},
	}

	c.JSON(http.StatusOK, responseBody)
}

func (server *ProductsServer) GetProductDetail(c *gin.Context, productId ProductId) {
	// 仮のデータ（通常はデータベースなどから取得）
	availability := "In Stock"
	imageUrl := "https://example.com/images/simple_gorilla.jpg"
	price := 45000
	productDescription := "A high-quality product for all your needs."
	productName := "Simple Gorilla"
	relatedProducts := []int{102, 103, 104}
	reviews := []struct {
		Comment *string  `json:"comment,omitempty"`
		Rating  *float32 `json:"rating,omitempty"`
		User    *string  `json:"user,omitempty"`
	}{
		{
			Comment: StringPointer("Great product!"),
			Rating:  Float32Pointer(4.5),
			User:    StringPointer("John Doe"),
		},
		{
			Comment: StringPointer("Very durable."),
			Rating:  Float32Pointer(4.0),
			User:    StringPointer("Jane Smith"),
		},
	}
	stockQuantity := 50

	// responseBodyの構築
	responseBody := ProductDetailResponse{
		Availability:       &availability,
		ImageUrl:           &imageUrl,
		Price:              &price,
		ProductDescription: &productDescription,
		ProductId:          &productId,
		ProductName:        &productName,
		RelatedProducts:    &relatedProducts,
		Reviews:            &reviews,
		StockQuantity:      &stockQuantity,
	}

	// JSONレスポンスを返す
	c.JSON(http.StatusOK, responseBody)
}

// ヘルパー関数: *stringを返す
func StringPointer(s string) *string {
	return &s
}

// ヘルパー関数: *float32を返す
func Float32Pointer(f float32) *float32 {
	return &f
}
