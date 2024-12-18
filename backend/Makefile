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

.PHONY: docker-reset
docker-reset:
	@echo "Stopping and removing Docker containers, networks, and volumes..."
	docker-compose down -v
	@echo "Docker containers, networks, and volumes have been stopped and removed."
	@echo "Building and starting the Docker containers..."
	make build-and-start
	@echo "Docker containers have been built and started successfully."

.PHONY: code-gen
code-gen:
	@echo "Starting code generation with oapi-codegen..."
	oapi-codegen -config config.yml openapi.yml
	@echo "Code generation completed."

.PHONY: psql
psql:
	@echo "Connecting to PostgreSQL..."
	@docker exec -it db psql -U postgres
