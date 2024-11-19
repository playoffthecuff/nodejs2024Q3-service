# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js 22.9.0 or higher](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download, install and run Docker Engine](https://docs.docker.com/engine/install/).

## Downloading

```shell
git clone {repository URL}
```

## Switching to feature branch

```shell
git checkout containerization
```

## Installing NPM modules

```shell
npm install
```

## Running application

```shell
docker-compose up -d
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Checking the application

### Display detailed information on user-defined bridge

```shell
docker network inspect nodejs2024q3-service_app-db
```

### Container auto restart after crash - add unhandled error to the app entry point (./src/main.ts)

```js
throw new Error()
```

#### then rebuild & restart containers

```shell
docker-compose down
docker-compose up
```

### Application is restarting upon changes implemented into src folder - restart containers in watch mode

```shell
docker-compose down
docker-compose up --watch
```

#### then you can change something in ./src and watch logs in the terminal

### Database files and logs to be stored in volumes instead of container

- **see nodejs2024q3-service_db-data & nodejs2024q3-service_db-logs notes in the "volumes" table of Docker Desktop app**

- **or find a container**

```shell
docker ps
```

- **and inspect it**

```shell
docker inspect playoffthecuff779/db
```

### Data is stored in PostgreSQL database and typeorm interacts with the database to manipulate data

- **open Open API doc in the browser [http://localhost:4000/doc/](http://localhost:4000/doc/)**

- **execute relevant queries**

- **restart containers and ensure data integrity**

- **check the source code to get acquainted with data interact methods**

### Final size of the Docker image with application is less than 500 MB - find playoffthecuff779/app repository

```shell
docker images
```

### Implemented npm script for vulnerabilities scanning (free solution)

```shell
npm run scan
```

### Your built image is pushed to DockerHub

- [app](https://hub.docker.com/repository/docker/playoffthecuff779/app)
- [db](https://hub.docker.com/repository/docker/playoffthecuff779/db)

### Variables used for connection to database to be stored in .env

#### see .env (not ignored), Docker.app, Docker.db, compose.yaml in the root dir

### typeorm decorators relations create relations between entities

#### see *.entity.ts files

### Using the application

- Get all users:

```Curl
curl -X GET http://localhost:4000/user -H "accept: application/json"
```

- Get single user by id (specify yours):

```Curl
curl -X GET http://localhost:4000/user/f9fc732c-354c-4baa-8766-20b8e061a8d6 -H "accept: application/json"
```

- Create a new user with the specified login and password:

```Curl
curl -X POST http://localhost:4000/user -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"login\": \"string\", \"password\": \"string\" }"
```

- Updates a user's password by ID:

```Curl
curl -X PUT http://localhost:4000/user/f9fc732c-354c-4baa-8766-20b8e061a8d6 -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ \"oldPassword\": \"string\",   \"newPassword\": \"string\" }'
```

- Delete user by ID:

```Curl
curl -X DELETE http://localhost:4000/user/f9fc732c-354c-4baa-8766-20b8e061a8d6 -H 'accept: */*'
```

- Gets all library tracks list:

```Curl
curl -X GET http://localhost:4000/track -H 'accept: application/json'
```

- Gets single track by id:

```Curl
curl -X GET http://localhost:4000/track/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: application/json'
```

- Add new track information:

```Curl
curl -X POST http://localhost:4000/track -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"string\", \"duration\": 0}'
```

- Update library track information by UUID:

```Curl
curl -X PUT http://localhost:4000/track/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"Bohemian Rhapsody\", \"artistId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\", \"duration\": 355, \"albumId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"}'
```

- Delete track from library:

```Curl
curl -X DELETE http://localhost:4000/track/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: */*'
```

- Gets all library albums list:

```Curl
curl -X GET http://localhost:4000/album -H 'accept: application/json'
```

- Gets single album by id:

```Curl
curl -X GET http://localhost:4000/album/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: application/json'
```

- Add new album information:

```Curl
curl -X POST http://localhost:4000/album -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"string\", \"year\": 0}'
```

- Update library album information by UUID:

```Curl
curl -X PUT http://localhost:4000/album/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"string\", \"year\": 0, \"artistId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"}'
```

- Delete album from library:

```Curl
curl -X DELETE http://localhost:4000/album/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: */*'
```

- Gets all artists:

```Curl
curl -X GET http://localhost:4000/artist -H 'accept: application/json'
```

- Get single artist by id:

```Curl
curl -X GET http://localhost:4000/artist/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: application/json'
```

- Add new artist:

```Curl
curl -X POST http://localhost:4000/artist -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"string\", \"grammy\": true}'
```

- Update artist information by UUID:

```Curl
curl -X PUT http://localhost:4000/artist/3fa85f64-5717-4562-b3fc-2c963f66afa6' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{\"name\": \"string\", \"grammy\": true}'
```

- Delete artist from library:

```Curl
curl -X DELETE http://localhost:4000/artist/3fa85f64-5717-4562-b3fc-2c963f66afa6 -H 'accept: */*'
```

- Gets all favorites movies, tracks and books:

```Curl
curl -X 'GET' http://localhost:4000/favs -H 'accept: application/json'
```

- Add track to the favorites:

```Curl
curl -X POST http://localhost:4000/favs/track/96e0ea16-3971-4d95-8383-96a791551f2f -H 'accept: */*' -d ''
```

- Delete track from favorites:

```Curl
curl -X DELETE http://localhost:4000/favs/track/96e0ea16-3971-4d95-8383-96a791551f2f -H 'accept: */*'
```

- Add album to the favorites:

```Curl
curl -X POST http://localhost:4000/favs/album/62e314db-98ea-44b8-af73-19b35298bbf6 -H 'accept: */*' -d ''
```

- Delete album from favorites:

```Curl
curl -X DELETE http://localhost:4000/favs/album/62e314db-98ea-44b8-af73-19b35298bbf6 -H 'accept: */*'
```

- Add artist to the favorites:

```Curl
curl -X POST http://localhost:4000/favs/artist/bd630bba-842c-47b8-80e9-8eb31e8441c1 -H 'accept: */*' -d ''
```

- Delete artist from favorites:

```Curl
curl -X DELETE http://localhost:4000/favs/artist/bd630bba-842c-47b8-80e9-8eb31e8441c1 -H 'accept: */*'
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
