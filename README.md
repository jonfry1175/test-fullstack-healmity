# Test FULLSTACK HEALMITY

Soal
![Gambar Soal](soal.jpeg)

ERD
![Gambar ERD](erd.png)

## Getting Started

### Dependencies

- required Nodejs & PostgreSQL

### Installing

pull:

```bash
git pull origin main
```

Navigate to the server directory:

```bash
cd server
```

install all dependencies:

```bash
pnpm install
```

### Executing program

1. Create database:

```bash
pnpm run create
```

2. Run migrations:

```bash
pnpm run migrate
```

3. Seed the database:

```bash
pnpm run seed
```

4. Run the API server

```bash
node app.js
```

or if you have installed nodemon, run:

```bash
pnpm run dev
```

Add new terminal to the client directory:

```bash
cd client
```

install all dependencies:

```bash
pnpm install
```

```bash
pnpm run dev
```
