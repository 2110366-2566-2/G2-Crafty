FROM golang:alpine AS dependency

WORKDIR /src/app


COPY go.mod .
COPY go.sum .
ENV GO111MODULE=on
RUN go mod download
COPY . . 

FROM dependency AS docs

RUN go install github.com/swaggo/swag/cmd/swag

RUN swag init -g cmd/main.go

FROM dependency AS build

COPY --from=docs /src/app/docs ./docs
RUN go build -o server ./cmd/main.go

FROM golang:alpine AS server

ENV PORT=8000
WORKDIR /app
COPY --from=build /src/app/server .
# COPY --from=build /src/app/docs ./docs
# COPY --from=build /src/app/server .
EXPOSE 8000

CMD ./server