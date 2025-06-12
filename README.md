# Forum website frontend

This project was made as a discussion forum dedicated to Garry's Mod servers. It is based on Nextjs and PostgreSQL. 

If you want the version with separate backend and mongodb, switch to v1 tag on github. For backend docs please go to [Forum-website-backend](https://github.com/Highlighted-dev/forum-website-backend).



## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Install with docker](#install-with-docker)
- [Usage](#usage)
- [License](#license)


## Features

- User registration and authentication via Google OAuth
- Discussion forums
- Content moderation
- User profiles

## Requirements

- Node.js (v18 or higher)
- pnpm (but npm should work too - not tested)
- docker (for local database setup or docker-compose)


## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/highlighted-dev/forum-website-frontend.git
   cd strefa-gier
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Set up the database:

   - Make sure you have Docker installed and running.
   - Start the PostgreSQL database using Docker:

     ```sh
     docker run --name forum-db -e POSTGRES_USER=forumuser -e POSTGRES_PASSWORD=forumpassword -e POSTGRES_DB=forum -p 5432:5432 -d postgres
     ```

   - Alternatively, you can set up a PostgreSQL database manually and update the connection string in `.env`.

4. Create a `.env` file and add your environment variables:

   ```sh
   cp .env.example .env
   ```

5. Run the development server:
   ```sh
   pnpm run dev
   ```

## Install with docker
I've included a docker-compose file to make it easier see the project in action without having to set up a local database manually. It is running in production mode. To use it, follow these steps:
1. Make sure you have Docker and Docker Compose installed on your machine.
2. Create a `.env` file based on the `.env.example` file and set your environment variables.
3. Run the following command to start the application and the database:

   ```sh
   docker-compose up --build
   ```

## Usage

After starting the server, you can access the application at `http://localhost:3000`.

## Testing
To run tests, use the following command:

```sh
pnpm run test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
