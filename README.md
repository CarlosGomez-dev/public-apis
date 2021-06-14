# Public APIs [![Test and Deploy](https://github.com/CarlosGomez-dev/public-apis/actions/workflows/test-and-deploy.yml/badge.svg?branch=main)](https://github.com/CarlosGomez-dev/public-apis/actions/workflows/test-and-deploy.yml)

React App to display a list of free APIs for use in software and web development.

Allows filtering and sorting, and includes mobile and desktop layouts.

Access the live project: <http://public-apis-assignment.s3-website-us-east-1.amazonaws.com>

## Testing

Tests included for react components using `jest` and `react-testing-library`, run tests with `npm test`.

## Local Production build

Docker configuration included to quickly build and run a production instance locally.

1. Build an updated image with `npm run docker:build`
2. Start a container with `npm run docker:run`
3. Access the running container at `localhost:3001`

Both docker commands can be run sequentially with `npm run docker`.

## Deploying

The project includes a github action to test and deploy to an AWS S3 bucket configured as static website hosting. The action is triggered by any push to main branch.

Setup could be further improved by starting a `test` action when a `development` branch receives a push, and a `deploy` action when merging from `development` to `main`.

This action requires the following secrets configured in the repo:

1. `AWS_S3_BUCKET` - example bucket name: `public-apis-assignment`
2. `AWS_ACCESS_KEY_ID` - example access key: `AKIA5EZN0TMM6UR34L6M`
3. `AWS_SECRET_ACCESS_KEY` - example secret access key: `FUVjUth!SlJP3+YWiS3A297wf4K3ZoRwcP7ItPz7`
