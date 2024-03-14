run-dev:
	docker compose -f compose.dev.yaml up -d --build

run-dev-d:
	docker compose -f compose.dev.yaml up --build

stop-dev:
	docker compose -f compose.dev.yaml down
