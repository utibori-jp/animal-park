.PHONY: docker-start
docker-start:
	make -C .. docker-start

.PHONY: docker-restart
docker-restart:
	make -C .. docker-restart

.PHONY: docker-reset
docker-reset:
	make -C .. docker-reset

.PHONY: exec-bash
exec-bash:
	make -C .. exec-bash CONTAINER=$(if $(CONTAINER),$(CONTAINER),react-frontend)
