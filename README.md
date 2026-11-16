# CIS 3339 Homework 1

Student management app: Vue 3 (Composition API, Vue Router, Pinia) frontend, Express backend, MongoDB for storage. Handles students, courses and enrollments.

## Required software

- Node.js and npm
- MongoDB Community Edition running locally (no Atlas or credentials needed)

## Environment variables

The real `.env` is committed in the repo root:

```
MONGODB_URI=mongodb://127.0.0.1:27017/cis3339_homework1
PORT=3000
```

The database and collections get created automatically on first run, so there's nothing to set up or seed.

## Start MongoDB

Windows (installed as a service):

```bash
net start MongoDB
```

macOS (Homebrew):

```bash
brew services start mongodb-community
```

Linux:

```bash
sudo systemctl start mongod
```

## Install, build and run

```bash
npm install
npm run build
npm start
```

`npm install` at the root also installs the backend and frontend dependencies.

Then open http://localhost:3000

## Development

Run the backend with `npm start`, then in another terminal:

```bash
cd frontend
npm run dev
```

Vite proxies `/api` to the backend on port 3000.

## API

- `GET/POST /api/students`, `DELETE /api/students/:id` (`GET ?name=` searches)
- `GET/POST /api/courses`, `DELETE /api/courses/:id`
- `GET/POST /api/enrollments` (`GET ?course=<id>` gives a course roster)

Student IDs, course IDs and student/course enrollment pairs are unique. Deleting a student or course also deletes its enrollments.
