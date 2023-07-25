# Tecnologies

- NestJS
- TypeORM
- PostgreSQL
- JWT Token
- Swagger

# How to run

Dependencies:

- docker. See [https://docs.docker.com/engine/installation](https://docs.docker.com/engine/install/ubuntu/)

## Set environment variables

Define varibles cloning `.env-dev-example` to `.env`, For JWT_SECRET_KEY use the follow command to generate a strong key:

```bash
openssl rand -base64 32
```

```json
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=parking_management

JWT_SECRET_KEY=abcdef12345
```

Once you're done, simply `cd` to your project and run. This will initialise and start the
container, then leave them running in the background.

```bash
docker compose up -d
```

## Start application

```bash
yarn start:dev
```

## Using

- Access swagger [http://localhost:3000](http://localhost:3000):
  - Create a user.
  - Log-in application.
  - Use the JWT to authorize access to anothers requests.
