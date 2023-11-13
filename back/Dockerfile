FROM golang:1.21-rc-alpine3.17

ENV PROJECT_DIR=/app \
    GO111MODULE=on \
    CGO_ENABLED=0

RUN mkdir /app
COPY .. /app
WORKDIR /app

# COPY go.* ./

# COPY . .
RUN go mod download
# RUN go build -o /project/go-docker/build/myapp .

EXPOSE 8080
CMD ["go", "run", "main.go", "serve"]

# The build flag sets how to build after a change has been detected in the source code
# The command flag sets how to run the app after it has been built
# ENTRYPOINT CompileDaemon -build="go build -o api" -command="./api"
# ENTRYPOINT CompileDaemon -build="go build -o api" -command="echo'yeah' && ./api serve"