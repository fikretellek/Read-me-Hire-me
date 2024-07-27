# Read me, Hire me!

The project aims to automate the creation of a graduate directory by harvesting the activity of Code Your Future (CYF) graduates. This system will utilize data from graduates' GitHub profiles to update and maintain an up-to-date directory, showcasing their skills and projects. This initiative ensures that potential employers and collaborators have easy access to relevant and current information about CYF graduates, facilitating better opportunities and networking within the tech community.

These instructions will help you set up and run the project on your local machine for development and testing purposes.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm
- PostgreSQL

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/RbAvci/Read-me-Hire-me.git
cd Read-me-Hire-me
```

Install the necessary packages for both frontend and backend:

```bash
npm install
```

## Database Setup

Initialize the PostgreSQL database using the provided SQL script located at `db/init.sql`. You can run the script using a PostgreSQL client like psql:

```bash
psql -U your_username -d your_database -f db/init.sql
```

## Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

Replace `your_database_url` with the connection string for your PostgreSQL database, and `your_jwt_secret` with a secret key for JWT authentication. Here are some examples:

```env
DATABASE_URL=postgres://username:password@localhost:5432/mydatabase
JWT_SECRET=mysecretkey123
```

Make sure to replace `username`, `password`, and `mydatabase` with your actual database credentials.


## Running the Application

To build the project, run:

```bash
npm run build
```

### Development

To run the project in development mode with hot reloading, execute:

```bash
npm run dev
```

This command starts both the frontend and backend servers and watches for any changes in the source code.
