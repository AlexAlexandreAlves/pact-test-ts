# Project with TypeScript, Pact and Pact Broker via Docker

This project uses **TypeScript** for development, **Pact** for contract testing, and runs the **Pact Broker** using a Docker container.

## About the project

This repository aims to demonstrate the implementation of contract tests using [Pact](https://docs.pact.io/) in a TypeScript project. The generated contracts are published to a Pact Broker, facilitating integration between consumer and provider API development teams.

## Tecnologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Pact JS](https://github.com/pact-foundation/pact-js)
- [Pact Broker](https://docs.pact.io/pact_broker)
- [Docker](https://www.docker.com/)

## Requirements

- [Node.js](https://nodejs.org/) >= >=20.x
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) installed and running on your machine

## Instalation Guide

```bash

### Cloning the repository
git clone https://github.com/seu-usuario/seu-repo.git

### Installing dependencies
cd your-repo
npm install

### Runnign the contract tests
npm run test
```

The contract files (pacts) will be generated in the `pacts` directory.

## Up the Pact files using Docker

```dockerfile
docker-compose up -d
```

- The pact broker will be available in your browser at [http://localhost:9292](http://localhost:9292)

- After running the tests, you publish PACT files to the broker:

```dockerfile
pact-broker publish ./pacts \
  --broker-base-url http://localhost:9292 \
  --consumer-app-version {{version-here}}
```

## References

- [Pact JS Oficial Documentation](https://docs.pact.io/implementation_guides/javascript)
- [Pact Broker Oficial Documentation](https://docs.pact.io/pact_broker)
