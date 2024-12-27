.PHONY: tidy
tidy:
	go mod tidy

.PHONY: docker-start
docker-start:
	make -C .. docker-start

.PHONY: docker-restart
docker-restart:
	make -C .. docker-restart

.PHONY: docker-reset
docker-reset:
	make -C .. docker-reset

.PHONY: code-gen
tags = product check

code-gen:
	@echo "Starting code generation with oapi-codegen..."
	@set -e
	@$(foreach tag, $(tags), \
		echo "Generating code for $(tag)..."; \
		oapi-codegen --include-tags $(tag) -package $(tag) -o api/$(tag)/$(tag).gen.go -config config.yml openapi.yml; \
	)
	@echo "Code generation completed."

.PHONY: exec-bash
exec-bash:
	make -C .. exec-bash CONTAINER=$(if $(CONTAINER),$(CONTAINER),go-backend)

.PHONY: psql
psql:
	make -C .. psql
