include .env
export
AUTH_DB_SERVICE_FULL_DOMAIN=$(auth-AUTH_DB_HOST).todo-ms.svc.cluster.local


env_up:
	kubectl create -f infra/configmap.yaml
	kubectl create -f infra/secret.yaml

build_entrypoint:
	docker build -t todo-ms/entrypoint --progress=plain --no-cache -f ./entrypoint-srv/Dockerfile .

build_auth:
	docker build -t todo-ms/auth --progress=plain --no-cache -f ./auth-srv/Dockerfile .

load_entrypoint:
	kubectl create -f infra/entrypoint.yaml

load_auth:
	kubectl create -f infra/auth.yaml

reload_entrypoint:
	kubectl delete -f infra/entrypoint.yaml; \
	kubectl create -f infra/entrypoint.yaml; \

reload_auth-db:
	kubectl delete -f infra/auth-db.yaml; \
	kubectl create -f infra/auth-db.yaml; \

reload_auth:
	kubectl delete -f infra/auth-dpl.yaml; \
	kubectl create -f infra/auth-dpl.yaml; \

reload_configmap:
	kubectl delete -f infra/configmap.yaml; \
	kubectl create -f infra/configmap.yaml; \

create_all: env_up load_entrypoint load_auth

delete_all: kubectl delete all -n todo-ms

migrate-auth-db:
	migrate --path auth-srv/db/migration --database "postgresql://user:pass@localhost:5432/todo?sslmode=disable" --verbose up;

open-auth-db:
	@AUTH_POD_NAME=$$(kubectl get pods | grep auth-db | cut -d " " -f 1); \
	kubectl port-forward $$AUTH_POD_NAME 5432:5432 

# migrate-authdb-up:
# 	kubectl exec deployments/auth -- migrate --path server/db/migration --database "postgresql://$(AUTH_DB_USER):$(AUTH_DB_PASSWORD)@$(AUTH_DB_SERVICE_FULL_DOMAIN):$(AUTH_DB_PORT)/$(AUTH_DB_NAME)?sslmode=disable" --verbose up
# kubectl port-forward $(kubectl get pods | grep auth-db | cut -d " " -f 1) 5432:5432 & \
# 
# PORT_FORWARD_PID=lsof -i :5432 | grep -m1 kubectl | cut -d " " -f 2

# migrate-authdb-up:
# 	@AUTH_POD_NAME=$$(kubectl get pods | grep auth-db | cut -d " " -f 1); \
# 	echo "-->user $$AUTH_DB_USER"; \
# 	echo "-->AUTH_POD_NAME $$AUTH_POD_NAME"; \
# 	kubectl port-forward $$AUTH_POD_NAME 5432:5432 & \
# 	SERVER_PID=$$! && \
# 	echo "--> PID : $$SERVER_PID" ;\
# 	sleep 4; \
# 	migrate --path auth-srv/db/migration --database "postgresql://$(AUTH_DB_USER):$(AUTH_DB_PASSWORD)@localhost:$(AUTH_DB_PORT)/$(AUTH_DB_NAME)?sslmode=disable" --verbose up;
# 	kill -9 $(SERVER_PID)

sqlc_auth:
	cd auth-srv && sqlc generate && ./comment-cleaner.sh 

sqlc_task:
	cd task-srv && sqlc generate && ./comment-cleaner.sh 