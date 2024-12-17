.PHONY: tidy
tidy:
	go mod tidy

.PHONY: build-and-start
build-and-start:
	@echo "Building Docker images..."
	docker-compose -f ../docker-compose.yml build
	@echo "Starting Docker containers..."
	docker-compose -f ../docker-compose.yml up -d
	@echo "Docker containers are now running."

.PHONY: restart
restart:
	@echo "Restarting Docker..."
	docker-compose -f ../docker-compose.yml down
	docker-compose -f ../docker-compose.yml up -d
	@echo "Docker has been restarted."

.PHONY: code-gen
code-gen:
	@echo "Starting code generation with oapi-codegen..."
	oapi-codegen -config config.yml openapi.yml
	@echo "Code generation completed."

.PHONY: psql
psql:
	@echo "Connecting to PostgreSQL..."
	@docker exec -it db psql -U postgres
