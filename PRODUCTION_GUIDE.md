# Production Deployment and Maintenance Guide

## 1. Introduction

This guide provides comprehensive instructions for deploying and maintaining this Vite React application in a production environment. It covers environment configuration, building the application, deployment options, security best practices, error monitoring, and ongoing maintenance.

## 2. Prerequisites

Before deploying the application, ensure you have the following:

*   **Node.js and npm:** Required for building the application. Ensure you are using a recent LTS version. (Yarn or Bun can also be used if they are your project's standard package manager).
*   **Git:** For version control and cloning the repository.
*   **Hosting Platform Access:** Credentials and access to your chosen hosting platform (e.g., Vercel, Netlify, AWS) or a Docker environment.

## 3. Environment Variables Configuration

Proper configuration of environment variables is crucial for security and functionality in production.

*   **Reference File:** An `.env.example` file is provided in the project root. This file lists all necessary environment variables.
*   **Required Variables:**
    *   `VITE_SUPABASE_URL`: Your Supabase project URL.
    *   `VITE_SUPABASE_ANON_KEY`: Your Supabase project's public anonymous key.
    *   `VITE_SENTRY_DSN`: Your Sentry Data Source Name (DSN) for error monitoring (if implemented).
*   **Production Setup:** These variables **must** be set in your production hosting environment's settings. Do not hardcode them into the application. Consult your hosting provider's documentation for how to set environment variables.
*   **Security Note:** The live `.env` file containing production keys or any sensitive information **must NOT** be committed to version control. Ensure it is listed in your `.gitignore` file.

## 4. Building the Application

To prepare the application for deployment, you need to create a production build.

*   **Build Command:**
    ```bash
    npm run build
    ```
*   **Output:** This command generates a `dist` folder in the project root. This folder contains all the static assets (HTML, CSS, JavaScript bundles) optimized for production.

## 5. Deployment

This application can be deployed to various platforms.

### Recommended Platforms

For Vite-based React applications (which are essentially static sites after build, possibly with functions for dynamic parts), the following platforms are highly recommended:

*   **Vercel:** Offers seamless integration with Vite projects, providing CI/CD, custom domains, global CDN, and a generous free tier.
*   **Netlify:** Similar to Vercel, Netlify provides easy deployment for Vite apps, with features like continuous deployment, serverless functions, and form handling.
*   **AWS Amplify:** A good option if you're already in the AWS ecosystem. It supports hosting static web apps with CI/CD capabilities.
*   **Render:** Offers deployment for static sites and Node.js services, with a simple setup and auto-deploys from Git.

These platforms typically detect Vite projects and configure the build and deployment settings automatically.

### Using Docker

For more control or to integrate into an existing containerized environment, you can use the provided Docker setup.

*   **Configuration Files:**
    *   `Dockerfile`: Defines the multi-stage build process for the application.
    *   `nginx.conf`: Configures Nginx to serve the static assets.
    *   `.dockerignore`: Excludes unnecessary files from the Docker image.
*   **Build Docker Image:**
    ```bash
    docker build -t my-react-app .
    ```
    (Replace `my-react-app` with your desired image name).
*   **Run Docker Container:**
    ```bash
    docker run -p <host_port>:80 my-react-app
    ```
    For example, to map host port 8080 to the container's port 80:
    ```bash
    docker run -p 8080:80 my-react-app
    ```
    The application will then be accessible at `http://localhost:<host_port>`.

## 6. Security Configuration

Ensure the following security measures are in place for your production deployment:

*   **Supabase Row Level Security (RLS):**
    *   It is **critical** to enable and correctly configure Row Level Security (RLS) for all your tables in Supabase. RLS ensures that users can only access or modify data they are permitted to.
    *   Enable RLS for every table in the Supabase dashboard.
    *   Define specific policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE` operations based on your application's access control requirements.
    *   Refer to the official [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security) for detailed guidance.
*   **HTTPS:**
    *   Always serve your application over HTTPS in production. This encrypts data in transit, protecting user data and credentials.
    *   Most recommended deployment platforms (Vercel, Netlify, etc.) will configure HTTPS for you automatically with free SSL certificates. If using Docker, ensure your reverse proxy or load balancer terminates SSL.
*   **Dependency Vulnerabilities:**
    *   Regularly check your project dependencies for known vulnerabilities.
    *   Use the `npm audit` command:
        ```bash
        npm audit
        ```
    *   Attempt to fix identified vulnerabilities with `npm audit fix`. Stay informed about security advisories for the libraries you use and update them as needed.

## 7. Error Monitoring

Setting up error monitoring is essential for identifying and diagnosing issues in production.

*   **Recommendation:** Use a service like Sentry.
*   **Configuration:**
    *   Ensure the `VITE_SENTRY_DSN` environment variable is set in your production environment with your actual Sentry DSN.
    *   Sentry (or a similar service) is typically initialized in the application's main entry point (e.g., `src/main.tsx`). The `README.md` provides a commented-out example of how this can be done. Ensure this is correctly implemented and enabled for your production build if you choose to use Sentry.

## 8. Maintenance

Ongoing maintenance is key to a stable and secure application:

*   **Update Dependencies:** Regularly update your project's dependencies (npm packages) to the latest stable versions to incorporate bug fixes, performance improvements, and security patches.
*   **Monitor Logs and Dashboards:** Actively monitor logs from your hosting platform and any error reporting dashboards (e.g., Sentry) to catch and address issues proactively.
*   **Review Security Policies:** Periodically review your Supabase Row Level Security policies, hosting platform security settings, and other security configurations to ensure they remain appropriate and effective.
*   **Backups:** While Supabase handles database backups, ensure you have a strategy for any other critical data or configurations if applicable.
*   **Test Updates:** Before rolling out updates or changes to dependencies in production, test them thoroughly in a staging or development environment.

By following this guide, you can establish a robust and secure production environment for your application. Remember to adapt these recommendations to your specific hosting platform and application needs.
