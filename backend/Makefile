.PHONY: tidy
tidy:
	go mod tidy

.PHONY: run
run:
	docker-compose build
	docker-compose up -d

.PHONY: rerun
rerun:
	docker-compose down
	docker-compose up -d

.PHONY: code-gen
code-gen:
	@echo "Starting code generation with oapi-codegen..."
	oapi-codegen -config config.yml openapi.yml
	@echo "Code generation completed."
