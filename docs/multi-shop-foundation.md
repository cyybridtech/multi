# Multi-shop foundation

This repository is the multi-shop evolution of the original Sackey POS application. The existing Worker A, Worker B, admin verification, inventory, customer credit, payment, and SMS workflows remain the starting point.

## Tenant model

The first implementation uses one MySQL database with a `Shop` tenant record. Business records have an optional `shopId` during the migration phase so existing single-shop data can continue to run while it is assigned to a shop.

The intended production invariant is:

> Every authenticated user belongs to one active shop, and every shop-owned query is scoped by the authenticated user's `shopId` on the server.

The browser must never be trusted to choose a shop. A future request-scoping middleware should derive the tenant from the authenticated user and reject cross-shop IDs before controller logic runs.

## Current schema foundation

`server/prisma/schema.prisma` now includes:

- `Shop`: shop name, slug, owner contact details, active status, and timestamps.
- `ShopInvitation`: one-time invitation metadata for QR onboarding, including hashed token, role, expiry, status, and acceptance details.
- Optional `shopId` relations and indexes on users, products, customers, sales, credit ledgers, notifications, SMS queue records, audit logs, and restock requests.
- Optional `shopId` in the JWT request identity so existing tokens remain compatible while new accounts can carry tenant context.

The fields are intentionally optional for this first migration. Before enabling public owner signup, a data migration must create a shop for the existing business and backfill all existing records before the fields become required.

## QR worker onboarding contract

The owner/admin flow should be:

1. Create an invitation for a selected worker role.
2. Generate a cryptographically random raw token.
3. Store only a SHA-256 hash of the token in `ShopInvitation`.
4. Encode the raw token in a QR URL such as `/join-shop/<token>`.
5. Set a short expiration, normally 15–30 minutes, and allow one use only.
6. On acceptance, verify the hash, status, expiry, and requested role on the server.
7. Create or attach the worker to the invitation's shop, then mark the invitation accepted.
8. Allow the owner to revoke pending invitations.

A QR code must not contain a password, database ID, or sensitive shop information.

## Safe rollout stages

1. Create the existing business's first `Shop` record and backfill all legacy rows.
2. Add server request scoping and cross-tenant ownership checks to controllers.
3. Add owner registration, shop creation, and the first-admin transaction.
4. Add invitation creation, QR rendering, acceptance, and worker activation.
5. Make `shopId` required for new records and reject unscoped writes.
6. Add tenant-isolation tests covering products, customers, sales, payments, reports, notifications, and sockets.
7. Only then enable public registration in production.

Until stages 1–2 are complete, the new optional fields are schema preparation, not a security boundary by themselves.
