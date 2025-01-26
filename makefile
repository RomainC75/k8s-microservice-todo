env_up:
	kubectl create -f infra/configmap.yaml
	kubectl create -f infra/secret.yaml

entrypoint_build:
	docker build -t todo-ms/entrypoint --progress=plain --no-cache -f ./entrypoint-srv/Dockerfile .

load_entrypoint:
	kubectl create -f infra/entrypoint.yaml

reload_entrypoint:
	kubectl delete -f infra/entrypoint.yaml
	kubectl create -f infra/entrypoint.yaml


create_all: env_up entrypoint_up

delete_all: k delete all -n todo-ms