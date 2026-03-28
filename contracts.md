# Prova Clone - API Contracts & Backend Integration

## A) API Contracts

| Endpoint | Method | Response |
|---|---|---|
| /api/groups | GET | `{ groups: [{id, name, logo_url}] }` |
| /api/stats | GET | `{ stats: [{label, value, suffix, is_decimal}] }` |
| /api/features | GET | `{ tabs, case_items, case_tags }` |
| /api/testimonials | GET | `{ testimonials: [{text, name, initials, role, group_name}] }` |
| /api/pricing | GET | `{ plans: [{name, description, price, ...}] }` |
| /api/faq | GET | `{ items: [{question, answer}] }` |
| /api/guides | GET | `{ articles: [{title, excerpt, author, ...}] }` |
| /api/contact | POST | `{ name, email, message }` → `{ success, id }` |
| /api/waitlist | POST | `{ prompt }` → `{ success, id }` |

## B) Mock Data → Backend
All data from `mockData.js` will be seeded into MongoDB on first startup.

## C) Frontend Integration
- Create `api.js` service using `REACT_APP_BACKEND_URL`
- Replace mock imports with API calls + loading states
- Fallback to local mock data on API failure
