## Project Name: Ecommerce Admin Dashboard


# Description:

This is a full-featured e-commerce application built with Next.js, providing a seamless and efficient online shopping experience. It leverages the power of TypeScript for enhanced type safety, alongside Prisma for robust interaction with your SQL database. Tailwind CSS empowers you with utility-first styling, while Shadcn UI offers pre-built components to accelerate development.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)


# Tech Stack:

- **Next.js:** Utilizing the power of React with server-side rendering for a seamless user experience.
- **Prisma:** Database ORM for easy and type-safe database interactions.
- **SQL Database:** Storing and managing data using a SQL database.
- **TypeScript:** Adding static types to enhance code readability and maintainability.
- **Tailwind CSS:** A utility-first CSS framework for styling the application with ease.
- **Shadcn UI:** A UI component library for building beautiful and responsive user interfaces.

## Getting Started

Make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- Yarn: [Install Yarn](https://yarnpkg.com/getting-started/install)


## Features:

* Intuitive product browsing and search: Users can easily discover and filter products using categories, search bar, and other relevant features.
* Detailed product pages: Each product page showcases captivating visuals, comprehensive descriptions, and vital information for informed purchase decisions.
* Seamless shopping cart: Users can add, remove, and update items in their shopping cart with ease, ensuring a smooth shopping experience.
* Secure checkout process: The checkout flow prioritizes user security by implementing best practices and integrating with a reliable payment gateway (to be implemented).
* Order management: Users can view their order history, track order status, and manage returns or exchanges (to be implemented).

## Project Structure
The project structure is organized to maintain a clean and scalable codebase. Here is an overview:

* app/: Next.js app directory.
    * (auth)/: Authentication directory.
        * (routes/: All routes related authentication will be there.)
            * sign-in/: Sign in related page
            * sign-up/: Sign up related page
    * (dashboard)/: All pages related to dashboard will apear here
        * [storeId]/: This is a specified store directory
        * (routes) All routes related storeId 
            * billboard/: this is the route for billboards
            * categories/: Categories pages will be there
            * colors/: For color page 
            * orders/: Order pages will apear there
            * products/: Products maintainance pages
            * settings/: Setting related pages
            * size/: Manage all size
        * layout.tsx is a layout for storeId 
    * api/: API routes for serverless functions.
* components/: Components directory.
* hooks/: Reusable React hooks.
* prisma/: Global styles and Tailwind CSS configuration.
* providers/: Utility functions and helper modules.