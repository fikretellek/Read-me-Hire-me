# Read me, Hire me!

The project aims to automate the creation of a graduate directory by harvesting the activity of Code Your Future (CYF) graduates. This system will utilize data from graduates' GitHub profiles to update and maintain an up-to-date directory, showcasing their skills and projects. This initiative ensures that potential employers and collaborators have easy access to relevant and current information about CYF graduates, facilitating better opportunities and networking within the tech community.

### Purpose:
To create a graduate platform that highlights contributions, projects, and skills using GitHub API integrations.

### Key Features:
- GitHub Data Fetching: Fetch contributions, projects, and skills; extract resumes, and LinkedIn profiles from GitHub Profile README; to showcase projects and portfolios. Give an Activity Score to the users!
- User Management: Allow grads to add or remove their GitHub account while they are signing up.
- Visualisations: Create graphs to display activity and show each grad's profile nicely.
- Search and Browse: Add search and sorting to find active grads and those available for work.
### User Roles:
- Graduates: Focus on coding and let their work shine automatically.
- Mentors: Quickly see who's active and who needs help.
- Recruiters: Easily search and filter grads to find the perfect fit.
### How You Can Help:
We know there are still some bugs and missing features, and the project isn't finished yet, but we would love to get your feedback at this stage. Are we covering all the important features? Is the user flow easy to understand for everyone (grads, mentors, recruiters)?

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
