<p align="center">
  <a href="#" target="blank"><img src="README_static/logo.svg" width="200" alt="wish magic logo" /></a>
</p>

<p align="center">A wishlist service. Share your dreams with your friends</p>

## Description

Each registered user can tell about the gift he would like to receive. And also chip in for a gift
for another user.

## Local Development with Docker

```bash
# run service in detached mode (see logs in terminal):
docker compose -f compose.dev.yaml up -d --build
# or with Makefile
make run-dev

# run service in containers:
docker compose -f compose.dev.yaml up --build
# or with Makefile
make run-dev-d

# stop service in dev mode:
docker compose -f compose.dev.yaml down
# or with Makefile
make stop-dev

```

### Docker Compose comments

#### `compose.dev.yaml`

1. `db` service uses volume `./pgdata:/var/lib/postgresql/data`

I had a problem with `lintstaged`. `prettier:write` don't have access permissions for dev folder
`pgdata` even if I plase it in `.prettierignore`. I solved this problem with
`sudo chmod -R a+rwx ./pgdata/`

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the
amazing backers. If you'd like to join them, please, do it :)

## Stay in touch

- Author - Arty Gvozdenkov
- Telegram - [@gvozdenkov](https://t.me/gvozdenkov)

## License

[MIT licensed](LICENSE).
