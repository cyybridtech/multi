# Remaining Application Redesign Audit

Review scope: authentication, Worker A sale/catalog/customer flows, Worker B dispatch flow, Admin Users, Admin Audit Log, shared app shell/navigation, and shared UI primitives.

## Executive priority order

### P0 — Fix before adding more visual polish

1. Upgrade the shared `Modal` component into an accessible dialog. It currently lacks `role="dialog"`, `aria-modal`, title association, an accessible close name, focus trapping, initial focus, focus restoration, and reliable backdrop-close behavior. This affects customer, product, user, sale, payment, and dispatch dialogs throughout the application.
2. Add explicit API error states and Retry actions. Several pages treat a failed request as an empty list, which can make an outage look like “no customers,” “no products,” “no users,” or “no audit records.”
3. Add form safety to the shared `Button` component. Its default button type can accidentally submit a form when used as a secondary action.

## P1 — Highest-value workflow redesigns

### Authentication

- Guard `/setup-credentials` when there is no valid session and redirect safely to Login.
- Add real labels using `id`/`htmlFor`, inline validation messages, `aria-invalid`, `aria-describedby`, and a live error region.
- Add accessible password visibility controls with comfortable touch targets.
- Add persistent password requirements and matching-password feedback instead of putting requirements only in placeholders.
- Unify Login and Setup Credentials styling, spacing, loading announcements, and error normalization.
- Make the setup layout top-aligned and keyboard-safe on small phones.

### Worker A — Make Sale

- Add catalog and customer query error states with Retry, loading, and explicit no-results states.
- Preserve the cart or ask for confirmation when switching to Payment Only instead of silently clearing it.
- Make sale type and payment mode semantic radio groups with explanatory helper text.
- Make the floating mobile cart button open/focus a checkout drawer or review section instead of only scrolling.
- Add an always-visible settlement summary: subtotal, discount, advance applied, amount paid, remaining balance, and final total.
- Add inline mutation errors beside the submit action while retaining entered data after failure.
- Add accessible labels to search, quantity, remove, close, plus, and minus controls.
- Add a low-price review warning without changing the existing backend contract.

### Worker B — Confirm Sale / Dispatch

- Add products/customer loading, error, retry, and no-results states.
- Add a final review block containing customer, issue type, payment mode, item count, and quantities.
- Explicitly label the workflow as inventory dispatch if no financial total is recorded by the backend.
- When quantity is clamped by available stock, tell the user the exact quantity added and remaining stock.
- Make the mobile Review button open/focus the review area and keep it above the safe-area inset.
- Preserve selected-customer debt context in the review card.
- Add undo or confirmation for Clear Cart and destructive remove actions.

### Worker A Customers and Products

- Separate request failures from legitimate empty results and add Retry actions.
- Distinguish “no customers yet” from “no customers match this search,” with Clear Search.
- Label inventory summaries as filtered results when search/category filters are active.
- Use one shared low-stock threshold across summary cards and product cards.
- Clarify Worker A permissions: distinguish catalog editing from restock submission and show pending restock status after submission.
- Add confirmation before rejecting a restock request.
- Add broken-image fallback to the existing product placeholder.
- Debounce customer/product search requests or provide an explicit search action.

### Admin Users

- Add a proper users-query error branch with Retry.
- Split empty states into “No staff accounts yet” and “No users match these filters,” with Clear Filters.
- Add per-row pending states for Activate/Deactivate/Delete so duplicate taps are prevented.
- Replace crowded icon-heavy mobile actions with a clearer action hierarchy and accessible labels.
- Clarify temporary credentials versus the credentials workers create on first login.
- Add safe fallbacks for missing names/usernames instead of assuming strings always exist.

### Admin Audit Log

- Add query error and Retry states separate from an empty audit log.
- Ensure mobile and desktop expose the same core facts, including IP address and target entity ID.
- Add filters only for fields the API actually supports: date, actor, action, and entity.
- Use trustworthy pagination metadata; do not infer total pages from the current array length.
- Add a detail panel when the response contains additional audit metadata.
- Improve action badge hierarchy based on real action values.
- Add table caption, header scopes, accessible loading announcements, and timezone clarity.

### Shared app shell/navigation

- Turn the mobile sidebar into a proper accessible drawer with focus management, Escape/backdrop close, focus restoration, and background scroll locking.
- Make Sales and Verified Sales active states query-aware so both do not appear active together.
- Add notification error and Retry states; currently a failed notification request can look like “No notifications yet.”
- Add `aria-label`, `aria-expanded`, `aria-controls`, and popup semantics to the notification control.
- Reduce mobile header crowding by moving secondary actions into the account/menu surface.
- Keep one predictable Logout location rather than duplicating it prominently in both header and sidebar.
- Centralize route metadata so nested/query routes retain correct page titles and context.
- Add explicit `:focus-visible` styling and reduced-motion support.

## Shared UI redesign

### Modal

The Modal component is the highest-impact shared redesign. Implement:

- `role="dialog"`
- `aria-modal="true"`
- Generated title ID and `aria-labelledby`
- Accessible close button
- Initial focus
- Focus trap
- Focus restoration
- Correct backdrop click handling
- Mobile-safe height and independently scrolling body
- Wrapping/stacking footer actions
- 44px close target

### Button

- Default `type="button"`.
- Preserve explicit `submit` and `reset` support.
- Add `aria-busy` during loading.
- Announce loading state.
- Establish a consistent minimum touch target.

### Table

- Add optional caption/accessible label.
- Add loading, error, retry, filtered-empty, and no-data states.
- Make row interactions keyboard accessible.
- Offer an opt-in stacked-card mobile renderer instead of forcing horizontal scrolling for every table.

### EmptyState

- Support `empty`, `error`, and `loading` intent.
- Add optional Retry action.
- Improve text contrast.
- Mark decorative icons as hidden from assistive technology.

### StatCard

- Make trend polarity explicit instead of defaulting omitted polarity to a red down arrow.
- Make comparison period caller-provided.
- Support loading and unavailable values.
- Separate units and period labels from the numeric value.

## Recommended implementation sequence

1. Shared Modal, Button, EmptyState, and focus-visible foundation.
2. API error/retry states across Worker A, Worker B, Users, Products, Customers, and Audit Log.
3. Authentication form semantics and session guards.
4. Worker A sale review/checkout flow.
5. Worker B dispatch review flow.
6. Admin Sales and Credits deeper workflow improvements.
7. Audit Log filters/detail/pagination, subject to the actual backend response contract.
8. Component-level tests for dialog keyboard behavior, Button inside forms, query errors, retry actions, and mobile review flows.

## Scope note

This review was read-only. No files were changed during the audit. The earlier redesign commits remain deployed in the repository. Backend-dependent features such as stock movement history, true audit before/after details, password recovery, and SMS message-type fields should only be added after confirming the corresponding API/data contract.
