# Blog Bliss — Clean, Extensible Blog API (Node.js)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js\&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express.js-Framework-000000?logo=express\&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript\&logoColor=000)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#)

> **Blog Bliss** is a developer‑friendly blog backend focused on clarity and speed: authentication, posts, comments, categories/tags, pagination, and search — ready to pair with any frontend.

---

## ✨ Features

* **Auth & Roles**: JWT‑based login/registration; basic *user/admin* roles.
* **Posts**: CRUD with slugging, excerpts, cover image field, and drafts.
* **Comments**: nested or flat comments (configurable), anti‑spam guards.
* **Taxonomy**: categories & tags, many‑to‑many tagging.
* **Search & Pagination**: keyword search, filter by tag/category, page/limit.
* **Secure by Default**: helmet, rate‑limit, sanitized inputs, CORS.
* **Production‑ready**: environment variables, structured logging, CI‑ready.

> Frontend‑agnostic: hook it up to React/Next.js, Vue/Nuxt, Svelte/SvelteKit, or static sites.

---

## 🧰 Tech Stack

* **Runtime**: Node.js 18+
* **Server**: Express.js
* **Language**: JavaScript (ES2022+)
* **Database**: Bring your own (MongoDB/Postgres/SQLite via your ORM or native drivers)
* **Auth**: JSON Web Tokens (JWT)
* **Docs**: Swagger/OpenAPI (optional)

> If you are using a specific DB/ORM (e.g., MongoDB + Mongoose or Postgres + Prisma), update the sections below accordingly.

---

## 🚀 Quickstart

### 1) Clone

```bash
git clone https://github.com/SamiaShabbir/blog-Bliss.git
cd blog-Bliss/backend
```

### 2) Install

```bash
npm install
```

### 3) Configure `.env`

Create a `.env` file inside `backend/`:

```ini
PORT=4000
DATABASE_URL=<your_db_connection_string>
JWT_SECRET=<your_super_secret>
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 4) Run

**Dev**

```bash
npm run dev
```

**Prod**

```bash
npm run build
npm start
```

Server runs on: `http://localhost:${PORT}` → default `http://localhost:4000`

---

## 📦 Suggested Project Structure

```
blog-Bliss/
└─ backend/
   ├─ src/
   │  ├─ app.js                # express app (helmet, cors, rate limit)
   │  ├─ server.js             # http server bootstrap
   │  ├─ routes/
   │  │  ├─ auth.routes.js
   │  │  ├─ posts.routes.js
   │  │  ├─ comments.routes.js
   │  │  └─ taxonomy.routes.js
   │  ├─ controllers/
   │  │  ├─ auth.controller.js
   │  │  ├─ posts.controller.js
   │  │  ├─ comments.controller.js
   │  │  └─ taxonomy.controller.js
   │  ├─ models/               # DB models (Mongoose/Prisma/Knex)
   │  ├─ middlewares/          # auth, error handler, validators
   │  ├─ services/             # business logic
   │  ├─ utils/                # helpers (slugify, logger)
   │  └─ config/               # db, env loader, constants
   ├─ tests/                   # jest tests
   ├─ package.json
   └─ README.md
```

> Adjust to match your current layout; the README remains valid either way.

---

## 🔌 API Overview

*(examples — align with your actual handlers)*

### Auth

* `POST /api/auth/register` — create account
* `POST /api/auth/login` — obtain access token
* `GET /api/auth/me` — current user profile

### Posts

* `GET /api/posts` — list (supports `page`, `limit`, `q`, `tag`, `category`)
* `GET /api/posts/:slug` — read one
* `POST /api/posts` — create (auth: instructor/admin)
* `PATCH /api/posts/:id` — update (auth)
* `DELETE /api/posts/:id` — delete (auth)

### Comments

* `GET /api/posts/:id/comments`
* `POST /api/posts/:id/comments` — add comment
* `DELETE /api/comments/:id` — remove (owner/admin)

### Taxonomy

* `GET /api/tags` / `GET /api/categories`
* `POST /api/tags` / `POST /api/categories` (admin)

---

## ⚙️ Environment & Config

* `PORT` — API port (default 4000)
* `DATABASE_URL` — DB connection string (e.g., MongoDB Atlas or Postgres URI)
* `JWT_SECRET` — token signing secret
* `CORS_ORIGIN` — allowed frontend origin
* `NODE_ENV` — `development` | `production`

---

## 🧪 Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "build": "echo 'JS project: nothing to build'"
  }
}
```

> If you transpile or bundle, update `build` accordingly.

---

## 🛡️ Security Defaults

* **Helmet** for HTTP headers
* **CORS** locked to `CORS_ORIGIN`
* **Rate Limiting** on `/api/`
* **Validation** with Joi/Zod/express‑validator
* **Centralized Error Handler**

---

## 🧭 Roadmap

* [ ] Swagger at `/docs`
* [ ] Image upload (cover images) with S3/Cloudinary
* [ ] Like/bookmark system
* [ ] Role‑based permission matrix
* [ ] E2E tests for core flows

---

## 🤝 Contributing

PRs welcome — please see `CONTRIBUTING.md` if you adopt the conventions. Keep PRs small, include reproduction or screenshots where suitable.

---

## 📄 License

Released under the **MIT License** — see `LICENSE`.

---
