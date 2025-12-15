## Instalation Guide

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm run test
```

### Execute PACT broker view through Docker

```dockerfile
docker-compose up -d
```

Then open your browser at [http://localhost:9292](http://localhost:9292)

### At the end, publish PACT files to the broker:

```dockerfile
pact-broker publish ./pacts \
  --broker-base-url http://localhost:9292 \
  --consumer-app-version {{version-here}}
```