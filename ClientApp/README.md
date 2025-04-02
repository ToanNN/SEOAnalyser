# SEO Analyzer

A modern web application for analyzing and optimizing your website's SEO meta tags. Built with Angular 17 and ASP.NET Core 9.

## Features

- **SEO Meta Tag Analysis**: Analyze title, description, keywords, and robots directives
- **Social Media Preview**: Preview how your content appears on Facebook and Twitter
- **SEO Score**: Get an overall SEO score with detailed breakdown
- **Recommendations**: Receive actionable recommendations to improve your SEO
- **Real-time Analysis**: Instant feedback on your website's SEO status

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend API

The application requires the backend API to be running. The API is built with ASP.NET Core 9 and follows clean architecture principles.

To run the backend API:

```bash
cd Server
dotnet run --project SEOAnalyzer.API
```

The API will be available at `https://localhost:7001`.

## Architecture

### Frontend
- **Angular 17**: Modern component-based framework
- **TailwindCSS**: Utility-first CSS framework for styling
- **Standalone Components**: Angular's latest component architecture
- **Clean Architecture**: Separation of concerns with core, features, and shared modules

### Backend
- **ASP.NET Core 9**: High-performance web framework
- **Clean Architecture**: Domain-driven design with vertical slicing
- **RESTful API**: Standardized API endpoints for SEO analysis

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
