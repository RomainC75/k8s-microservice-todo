FROM golang:1.23.5-bookworm

ENV PROJECT_DIR=/app \
    GO111MODULE=on \
    CGO_ENABLED=0

WORKDIR /entrypoint-srv

RUN go install github.com/air-verse/air@latest

COPY ./entrypoint-srv .
COPY ./shared /shared
COPY ./workspaces/entrypoint.go.work /go.work 

RUN ls -l

RUN go mod download


EXPOSE 8080
CMD ["air"]
 