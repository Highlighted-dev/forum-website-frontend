# Forum website frontend

This project was made as a discussion forum dedicated to Garry's Mod servers. It is based on Nextjs and PostgreSQL. 

If you want the version with separate backend and mongodb, switch to v1 tag on github. For backend docs please go to [Forum-website-backend](https://github.com/Highlighted-dev/forum-website-backend).



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)


## Features

- User registration and authentication via Google OAuth
- Discussion forums
- Content moderation
- User profiles

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/highlighted-dev/forum-website-frontend.git
   cd strefa-gier
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add your environment variables:

   ```sh
   cp .env.example .env
   ```

4. Run the development server:
   ```sh
   npm run dev
   ```

## Usage

After starting the development server, you can access the application at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
