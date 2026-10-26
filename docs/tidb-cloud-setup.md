# TiDB Cloud setup

The `multi` repository is connected locally to a separate TiDB Cloud Starter instance named `multi`.

- Plan: Starter
- Compatibility: MySQL
- Region: AWS Frankfurt (`eu-central-1`)
- Spending limit: `$0/month`
- Application database: `multi_pos`
- Instance ID: `10232376094820984406`
- Host: `gateway01.eu-central-1.prod.aws.tidbcloud.com`
- Port: `4000`

The local connection file is `server/.env`. It is ignored by Git and must never be committed. Use `server/.env.example` as the safe template for another environment.

The database schema was applied using Prisma and verified with `SHOW TABLES`. The original Sackey database was not changed.

## Local setup

```bash
cd server
cp .env.example .env
# Fill in the TiDB username and password locally.
npx prisma generate
npx prisma db push
```

The TiDB root password is managed in the TiDB Cloud console. If it is reset, update only the local ignored `server/.env` file and do not place the password in GitHub, source code, screenshots, or chat messages.
