.PHONY: build-and-start
build-and-start:
	@echo "Building Docker images..."
	docker-compose build
	@echo "Starting Docker containers..."
	docker-compose up -d
	@echo "Docker containers are now running."

.PHONY: restart
restart:
	@echo "Restarting Docker..."
	docker-compose down
	docker-compose up -d
	@echo "Docker has been restarted."
