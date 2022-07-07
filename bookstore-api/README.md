# bookstore-api
 Bookstore REST API - Node (Containerized)


# Bookstore REST API - Node (Containerized)

This is a bookstore REST API.

## Run uncontained

Setup:

```bash
$ cd bookstore-api
$ npm install
```

Start a PostgreSQL database and create the tables:

```bash
$ docker run -it -e "POSTGRES_HOST_AUTH_METHOD=trust" -p 5432:5432 postgres
```

Start application:

```bash
$ npm start
```

## Run with Docker Compose: App + DB

```bash
$ docker compose up --build
```

## Run tests with Docker

Stop all containers and execute:

```bash
$ docker compose run bookstore-api npm test
```
