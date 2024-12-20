.PHONY: docker-start
docker-start:
	@echo "Building Docker images..."
	docker-compose build
	@echo "Starting Docker containers..."
	docker-compose up -d
	@echo "Docker containers are now running."

.PHONY: docker-restart
docker-restart:
	@echo "Restarting Docker..."
	docker-compose down
	docker-compose up -d
	@echo "Docker has been restarted."

.PHONY: docker-reset
docker-reset:
	@echo "Stopping and removing Docker containers, networks, and volumes..."
	docker-compose down -v
	@echo "Docker containers, networks, and volumes have been stopped and removed."
	@echo "Building and starting the Docker containers..."
	make docker-start
	@echo "Docker containers have been built and started successfully."

.PHONY: exec-bash
exec-bash:
	@echo "Connecting to the container $(CONTAINER)..."
	@docker exec -it $(CONTAINER) sh

.PHONY: psql
psql:
	@echo "Connecting to PostgreSQL..."
	@docker exec -it db psql -U postgres
