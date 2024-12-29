FROM golang:1.23.4-alpine

WORKDIR /go-backend
COPY ./ /go-backend

RUN go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
RUN make tidy

ENTRYPOINT [ "go", "run", "main.go" ]
