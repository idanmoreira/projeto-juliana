# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d3a8b544-5dd2-45a2-897f-b7f6ea074742

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d3a8b544-5dd2-45a2-897f-b7f6ea074742) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Environment Variables

This project uses Supabase as a backend, which requires API credentials. These credentials should be stored in environment variables.

**Local Development:**

1.  Copy the `.env.example` file to a new file named `.env` in the project root:
    ```sh
    cp .env.example .env
    ```
2.  Open the `.env` file and replace the placeholder values for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with your actual Supabase project URL and Anon Key. You can find these in your Supabase project dashboard under Project Settings > API.

**Production/Hosting Environment:**

Ensure that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set as environment variables in your hosting provider's settings. The method for setting these variables will vary depending on your hosting platform (e.g., Vercel, Netlify, AWS Amplify, etc.).

### Testing

This project uses [Vitest](https://vitest.dev/) for running unit and component tests, along with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing React components.

**Running Tests:**

*   To run all tests in the console:
    ```sh
    npm run test
    ```
*   To run tests with an interactive UI:
    ```sh
    npm run test:ui
    ```

**Testing Strategy:**

To ensure the quality and stability of the application, consider the following testing strategies:

*   **Unit Tests:** Write unit tests for all new utility functions (e.g., in `src/lib/utils.ts`) and complex logic within components.
*   **Component Tests:** Write tests for critical UI components, focusing on:
    *   Correct rendering based on props.
    *   User interactions (e.g., button clicks, form submissions).
    *   Conditional rendering logic.
*   **Critical User Flows:** Aim to have tests covering the main user journeys through the application. This might involve more integrated tests as the application grows.

All test files should be collocated with the code they are testing or placed in a `__tests__` directory, and should follow the `*.test.ts` or `*.test.tsx` naming convention.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Build and Deployment

### Production Deployment Guide
For detailed instructions on building, configuring, deploying, and maintaining this application in a production environment, please see the [PRODUCTION_GUIDE.md](PRODUCTION_GUIDE.md).

### Building the Application
To create a production build, run:
```bash
npm run build
```
This will generate a `dist` folder containing the static assets.

### Deployment Recommendations
This Vite React application can be deployed to various platforms that support static site hosting or Node.js environments. Here are a few recommendations:

*   **Vercel:** Offers seamless integration with Vite projects, providing CI/CD, custom domains, and a generous free tier.
*   **Netlify:** Similar to Vercel, Netlify provides easy deployment for Vite apps, with features like continuous deployment, serverless functions, and form handling.
*   **AWS Amplify:** A good option if you're already in the AWS ecosystem. It supports hosting static web apps with CI/CD capabilities.
*   **Render:** Offers deployment for static sites and Node.js services, with a simple setup and auto-deploys from Git.
*   **Docker (Self-hosted or Cloud Run/ECS):** For more control or to integrate into an existing containerized environment, you can use Docker. A sample Docker setup is provided below.

#### Using Docker
A `Dockerfile` is provided in the root of the project to build and run the application in a container.

To build the Docker image:
```bash
docker build -t my-react-app .
```

To run the Docker container:
```bash
docker run -p 8080:80 my-react-app
```
The application will then be accessible at http://localhost:8080.

## Error Monitoring and Logging

For production applications, it's crucial to have a system for tracking and diagnosing errors that occur in your users' browsers. Services like Sentry, LogRocket, or Datadog provide excellent client-side error monitoring.

### Example: Integrating Sentry

Sentry is a popular choice for error monitoring. Here's a general outline of how to integrate it:

1.  **Sign up for Sentry:** Create an account at [sentry.io](https://sentry.io/) and create a new project to get a DSN (Data Source Name).
2.  **Install Sentry SDK:** Add the Sentry React SDK to your project:
    ```bash
    npm install --save @sentry/react @sentry/tracing
    ```
3.  **Initialize Sentry:** In your application's entry point (e.g., `src/main.tsx`), initialize Sentry with your DSN:

    ```typescript
    // src/main.tsx (example)
    // import React from 'react';
    // import ReactDOM from 'react-dom/client';
    // import App from './App';
    // import './index.css';
    // import * as Sentry from "@sentry/react";

    // --- Sentry Initialization ---
    // IMPORTANT: Replace with your actual Sentry DSN in your .env file or environment variables
    // const VITE_SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

    // if (VITE_SENTRY_DSN) {
    //   Sentry.init({
    //     dsn: VITE_SENTRY_DSN,
    //     integrations: [
    //       Sentry.browserTracingIntegration(),
    //       Sentry.replayIntegration({
    //         maskAllText: false, // Adjust privacy settings as needed
    //         blockAllMedia: false,
    //       }),
    //     ],
    //     // Performance Monitoring
    //     tracesSampleRate: 1.0, // Capture 100% of transactions, adjust in production
    //     // Session Replay
    //     replaysSessionSampleRate: 0.1, // Capture 10% of sessions, adjust in production
    //     replaysOnErrorSampleRate: 1.0, // Capture 100% of sessions when an error occurs
    //   });
    // }
    // --- End Sentry Initialization ---

    // ReactDOM.createRoot(document.getElementById('root')!).render(
    //   <React.StrictMode>
    //     <App />
    //   </React.StrictMode>,
    // );
    ```
4.  **Environment Variable:** Store your Sentry DSN in an environment variable (e.g., `VITE_SENTRY_DSN`) and add it to your `.env.example` and production environment configuration.
    ```
    # .env.example
    VITE_SENTRY_DSN="your_sentry_dsn_here"
    ```

This setup will automatically report unhandled JavaScript errors to Sentry. You can also capture errors manually using `Sentry.captureException()` or `Sentry.captureMessage()`.

Remember to consult the official Sentry documentation for the most up-to-date integration instructions and advanced features.

## Security Best Practices

Ensuring the security of your application and user data is paramount. Here are some best practices to follow:

### Supabase Row Level Security (RLS)
It is **critical** to enable and correctly configure Row Level Security (RLS) for all your tables in Supabase. RLS ensures that users can only access or modify data they are permitted to. Without RLS, your data might be exposed or vulnerable.
- **Enable RLS:** Ensure RLS is enabled for every table.
- **Define Policies:** Write specific policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE` operations based on your application's access control requirements (e.g., users can only see their own data).
- **Default Deny:** Supabase follows a default deny principle when RLS is enabled; no data can be accessed or modified until a policy explicitly grants permission.
- **Further Reading:** [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)

### Cross-Site Scripting (XSS) Prevention
React does a good job of protecting against XSS attacks by automatically escaping string variables before rendering them. However, be cautious if you ever need to use `dangerouslySetInnerHTML`.
- **Avoid `dangerouslySetInnerHTML`:** Prefer alternative methods to render HTML content.
- **Sanitize Input:** If you must use `dangerouslySetInnerHTML`, ensure the HTML content is sanitized using a library like DOMPurify to prevent XSS vulnerabilities.

### Use HTTPS in Production
Always serve your application over HTTPS in production. HTTPS encrypts data in transit, protecting user data and credentials. Most recommended deployment platforms (Vercel, Netlify, AWS Amplify, etc.) will configure HTTPS for you automatically with free SSL certificates.

### Dependency Vulnerability Scanning
Keep your project dependencies up-to-date and regularly check for known vulnerabilities.
- **Run `npm audit`:** Use the `npm audit` command to check for vulnerabilities in your installed packages.
  ```bash
  npm audit
  ```
- **Run `npm audit fix`:** To automatically attempt to fix identified vulnerabilities.
- **Stay Informed:** Regularly update key dependencies and stay informed about security advisories for the libraries you use.

### Secure Management of Environment Variables
As mentioned in the "Environment Variables" section:
- **Never commit `.env` files:** Your `.env` file containing sensitive credentials (like Supabase keys or Sentry DSN) should never be committed to your Git repository. Ensure it's listed in your `.gitignore` file.
- **Securely configure in production:** Use your hosting provider's interface or your CI/CD system's secrets management features to set these environment variables securely in your production environment.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d3a8b544-5dd2-45a2-897f-b7f6ea074742) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
