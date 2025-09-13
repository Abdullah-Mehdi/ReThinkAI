.PHONY: dev-up dev-down prod-up prod-down

dev-up:
	docker-compose up --build

dev-down:
	docker-compose down