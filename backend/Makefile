.PHONY: tidy
tidy:
	echo Hello
	go mod tidy

.PHONY: run
run:
	docker-compose build
	docker-compose up -d

.PHONY: rerun
rerun:
	docker-compose down
	docker-compose up -d
