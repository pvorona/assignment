## Environment setup

Requirements:

- Docker (to run mongo and redis)
- NPM & node

Install the dependencies

```
npm i
```

Prepare environment variables

```
cp .env.local .env
```

Start & configure mongo

```
docker-compose up mongo -d
docker-compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"
```

Start redis

```
docker-compose up pubsub -d
```

Start worker

```
npx nx serve worker
```

Start server

```
npx nx serve server
```

Start client

```
npx nx serve client
```

Open `localhost:4200/customers`
