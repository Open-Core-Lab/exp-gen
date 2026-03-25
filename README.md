# exp-gen 🚀

**exp-gen** is a lightning-fast, interactive CLI tool designed to scaffold Express.js API projects in seconds. Whether you prefer **TypeScript** or **JavaScript**, `exp-gen` sets up your directory structure, configuration, and database boilerplate so you can start coding immediately.

---

## 🚀 Quick Start

To use the generator anywhere on your system, install it globally via npm:

```bash
npm install -g @madhusha_99/exp-gen
```

Once installed, you can initialize a new project using any of the following commands:

```bash
exp
# OR
gen
# OR
express-draft
```

---

## 🛠 User Guide

### 1. Initialize Project

Run `exp` in your terminal. The interactive CLI (powered by `@clack/prompts`) will guide you through the setup:

* **Project Name:** Enter your project folder name (e.g., `my-api`).
* **Language:** Choose between **TypeScript** (Recommended) or **JavaScript**.
* **Database:** Select your preferred database.
  * *Currently Supported:* **MongoDB** (via Mongoose).
  * *Coming Soon:* MySQL, PostgreSQL (Prisma), and SQLite.
* **Install Dependencies:** Choose `Yes` to let the CLI run `npm install` for you automatically.

### 2. Navigate and Run

After the scaffolding is complete, follow the on-screen instructions:

```bash
cd <your-project-name>
npm run dev
```

---

## 📁 Project Structure

`exp-gen` scaffolds a professional **Layered Architecture**, ensuring your code remains scalable and maintainable as it grows:

* **`configs/`**: Environment variables and database connection logic.
* **`controllers/`**: Bridges the routes and the business logic; handles requests/responses.
* **`dtos/`**: Data Transfer Objects for validating and shaping incoming data.
* **`interfaces/`**: TypeScript interfaces and types for strict type safety.
* **`middlewares/`**: Custom Express middlewares (Auth, Error handling, Logging).
* **`models/`**: Database schemas (e.g., Mongoose/MongoDB models).
* **`repositories/`**: The data access layer; handles direct database operations.
* **`routes/`**: API endpoint definitions and mapping to controllers.
* **`services/`**: Core Business Logic layer; where the heavy lifting happens.
* **`utils/`**: Shared helper functions and utility classes.
* **`app.ts`**: The application entry point.

---

## 🤝 Contributing

We love open source! `exp-gen` is a community-driven project, and we welcome contributions to make it better.

### How to contribute

1. **Add Database Templates:** We are looking for contributors to help build out the `MySQL`, `PostgreSQL`, and `SQLite` templates in the `src/templates` folder.
2. **Report Bugs:** Found a glitch? Open an [issue](https://github.com/Open-Core-Lab/exp-gen/issues).
3. **Feature Requests:** Have an idea for a new feature? Let us know!

### Local Development Setup

If you want to work on the CLI itself:

1. Clone the repo: `git clone https://github.com/Open-Core-Lab/exp-gen.git`
2. Install dependencies: `npm install`
3. Make your changes and submit a Pull Request!

---

## 📄 License

This project is licensed under the **[MIT License](https://github.com/Open-Core-Lab/exp-gen/blob/main/LICENSE)**.

---

**Happy coding! 🚀** *Maintained by [Madhusha Prasad](https://github.com/MadhushaPrasad)*
