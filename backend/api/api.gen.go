// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.4.1 DO NOT EDIT.
package api

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
	strictgin "github.com/oapi-codegen/runtime/strictmiddleware/gin"
)

// Product defines model for Product.
type Product struct {
	Availability  *string   `json:"availability,omitempty"`
	ImageUrl      *string   `json:"image_url,omitempty"`
	Price         *int      `json:"price,omitempty"`
	ProductId     *int      `json:"product_id,omitempty"`
	ProductName   *string   `json:"product_name,omitempty"`
	Rating        *float32  `json:"rating,omitempty"`
	StockQuantity *int      `json:"stock_quantity,omitempty"`
	Tags          *[]string `json:"tags,omitempty"`
}

// ProductDetailResponse defines model for ProductDetailResponse.
type ProductDetailResponse struct {
	Availability       *string `json:"availability,omitempty"`
	ImageUrl           *string `json:"image_url,omitempty"`
	Price              *int    `json:"price,omitempty"`
	ProductDescription *string `json:"product_description,omitempty"`
	ProductId          *int    `json:"product_id,omitempty"`
	ProductName        *string `json:"product_name,omitempty"`
	RelatedProducts    *[]int  `json:"related_products,omitempty"`
	Reviews            *[]struct {
		Comment *string  `json:"comment,omitempty"`
		Rating  *float32 `json:"rating,omitempty"`
		User    *string  `json:"user,omitempty"`
	} `json:"reviews,omitempty"`
	StockQuantity *int `json:"stock_quantity,omitempty"`
}

// ProductListResponse defines model for ProductListResponse.
type ProductListResponse struct {
	CategoryId   *int       `json:"category_id,omitempty"`
	CategoryName *string    `json:"category_name,omitempty"`
	Proucts      *[]Product `json:"proucts,omitempty"`
}

// CategoryId defines model for category_id.
type CategoryId = int

// ProductId defines model for product_id.
type ProductId = int

// BadRequest defines model for BadRequest.
type BadRequest struct {
	Error *string `json:"error,omitempty"`
}

// NotFound defines model for NotFound.
type NotFound struct {
	Error *string `json:"error,omitempty"`
}

// GetProductsParams defines parameters for GetProducts.
type GetProductsParams struct {
	// CategoryId The ID of the category to filter products.
	CategoryId CategoryId `form:"category_id" json:"category_id"`
}

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Get product list by category
	// (GET /products)
	GetProducts(c *gin.Context, params GetProductsParams)
	// Get product details by product ID
	// (GET /products/{product_id})
	GetProductsProductId(c *gin.Context, productId ProductId)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// GetProducts operation middleware
func (siw *ServerInterfaceWrapper) GetProducts(c *gin.Context) {

	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetProductsParams

	// ------------- Required query parameter "category_id" -------------

	if paramValue := c.Query("category_id"); paramValue != "" {

	} else {
		siw.ErrorHandler(c, fmt.Errorf("Query argument category_id is required, but not found"), http.StatusBadRequest)
		return
	}

	err = runtime.BindQueryParameter("form", true, true, "category_id", c.Request.URL.Query(), &params.CategoryId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter category_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetProducts(c, params)
}

// GetProductsProductId operation middleware
func (siw *ServerInterfaceWrapper) GetProductsProductId(c *gin.Context) {

	var err error

	// ------------- Path parameter "product_id" -------------
	var productId ProductId

	err = runtime.BindStyledParameterWithOptions("simple", "product_id", c.Param("product_id"), &productId, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter product_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetProductsProductId(c, productId)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.GET(options.BaseURL+"/products", wrapper.GetProducts)
	router.GET(options.BaseURL+"/products/:product_id", wrapper.GetProductsProductId)
}

type BadRequestJSONResponse struct {
	Error *string `json:"error,omitempty"`
}

type NotFoundJSONResponse struct {
	Error *string `json:"error,omitempty"`
}

type GetProductsRequestObject struct {
	Params GetProductsParams
}

type GetProductsResponseObject interface {
	VisitGetProductsResponse(w http.ResponseWriter) error
}

type GetProducts200JSONResponse ProductListResponse

func (response GetProducts200JSONResponse) VisitGetProductsResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetProducts400Response struct {
}

func (response GetProducts400Response) VisitGetProductsResponse(w http.ResponseWriter) error {
	w.WriteHeader(400)
	return nil
}

type GetProducts401Response struct {
}

func (response GetProducts401Response) VisitGetProductsResponse(w http.ResponseWriter) error {
	w.WriteHeader(401)
	return nil
}

type GetProductsProductIdRequestObject struct {
	ProductId ProductId `json:"product_id"`
}

type GetProductsProductIdResponseObject interface {
	VisitGetProductsProductIdResponse(w http.ResponseWriter) error
}

type GetProductsProductId200JSONResponse ProductDetailResponse

func (response GetProductsProductId200JSONResponse) VisitGetProductsProductIdResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetProductsProductId400Response struct {
}

func (response GetProductsProductId400Response) VisitGetProductsProductIdResponse(w http.ResponseWriter) error {
	w.WriteHeader(400)
	return nil
}

type GetProductsProductId401Response struct {
}

func (response GetProductsProductId401Response) VisitGetProductsProductIdResponse(w http.ResponseWriter) error {
	w.WriteHeader(401)
	return nil
}

// StrictServerInterface represents all server handlers.
type StrictServerInterface interface {
	// Get product list by category
	// (GET /products)
	GetProducts(ctx context.Context, request GetProductsRequestObject) (GetProductsResponseObject, error)
	// Get product details by product ID
	// (GET /products/{product_id})
	GetProductsProductId(ctx context.Context, request GetProductsProductIdRequestObject) (GetProductsProductIdResponseObject, error)
}

type StrictHandlerFunc = strictgin.StrictGinHandlerFunc
type StrictMiddlewareFunc = strictgin.StrictGinMiddlewareFunc

func NewStrictHandler(ssi StrictServerInterface, middlewares []StrictMiddlewareFunc) ServerInterface {
	return &strictHandler{ssi: ssi, middlewares: middlewares}
}

type strictHandler struct {
	ssi         StrictServerInterface
	middlewares []StrictMiddlewareFunc
}

// GetProducts operation middleware
func (sh *strictHandler) GetProducts(ctx *gin.Context, params GetProductsParams) {
	var request GetProductsRequestObject

	request.Params = params

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetProducts(ctx, request.(GetProductsRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetProducts")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetProductsResponseObject); ok {
		if err := validResponse.VisitGetProductsResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetProductsProductId operation middleware
func (sh *strictHandler) GetProductsProductId(ctx *gin.Context, productId ProductId) {
	var request GetProductsProductIdRequestObject

	request.ProductId = productId

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetProductsProductId(ctx, request.(GetProductsProductIdRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetProductsProductId")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetProductsProductIdResponseObject); ok {
		if err := validResponse.VisitGetProductsProductIdResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/9RX34/iNhD+V3zTPvqSQHelKm9caU9I1xPa7dtphUwygPcS22tPuEMr/vfKTgIJhC1b",
	"tSvdE2DNj88z34w/niHTpdEKFTlIn8EIK0oktOFXJgjX2u4WMvc/c3SZlYakVpDCXxtksynTK0YbZK0p",
	"I81WsiC0zFidVxm5CDhI7/FUod0BByVKhLQXnYPFp0pazCElWyEHl22wFD4tfhelKRDSEQfaGe8qFeEa",
	"Lez3HJo0V2BsLANEpGzDciQhC8dW2h5AGkGbI8ZO8OsgJkMg997XGa0chrp+EPkdPlXoKFRZK0IVvgpj",
	"CpkJjz5+dP4Kz50sxmqDlmQdBK3VtpccZmorCpkfmzGbwgGOIyvVOpSsOdHLR8yoxtev20AgX72tzDGP",
	"YM/hs6Y/dKXy/xb/b206pYmtQvz/A/6+bV3AMa9bfA5QbIUsxFIWknandWb3pLOv5+g4yFKscVHZou+y",
	"ITIujePmJMp0GQdTFzvpTxZrbWVRiOjRrIfiGisz7MW8uU2ShMNK21IQpLAqtCA4p9/piLxM1qN1PQLd",
	"S9wHpOxjjXQIpRXkv/VgRreXQaqqXNZZnS/o4qkSik7rfZsMwSSxdj2zL/AZv7GJtXIrCuDwAR2xeywK",
	"tPDAQRKWweEMdHMgrBW7IYLxliPTsC/umlH+YRlzueW9MbrceRZwDOd8M6ZhIQjzRfvKeP9Di4+c8JlH",
	"yfhhkEG9vvuQW4nf+pH6Dc50WTar7oj19++ZJ5ki9mflsgLfvbt6Mn69ZjIqhyd78pPeYpPsmgV5ftNX",
	"DtsLI/FJOro8ECcC4qWXnB+NL9JhomQZRnuId2ck+NniClL4KT5KnLjZ+3G79K+Yfn8k1Uqfq4vJfBa0",
	"Q4OLzYX9yplQDN8HotgMmZOEXluQpHCTjimbzGfAYYvW1fG2oyiJkvfjZHwTjcbRaOzhaYNKGAkp/BIl",
	"0Qh4UCjhgnGX+2ukc4R3SJVVjglWSEdeB7UujUjDnC13h3fSA/XtCw/4LIcUPiLN2yS8pw6/DBf4aBJ3",
	"m79/OJFA4yR5lXa4opk9Kg6ogslAEbQNytAZzORKYt4pxZ7DTQ2yH+YcArq4o+iC3+hKv4OOCqKkKkth",
	"d3XZD2o1gO40KZgeWh8/H1fu/h95UAtezJkntN87UqtQBNGWIGvzvsiF5nOWv5oUnQfiLThx8mIPsGI6",
	"VBKx1BV1/zO8gg3iX7JBXMWG9i/Lcnc4mk39vfZ/BwAA//8lXM3Oyw0AAA==",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
