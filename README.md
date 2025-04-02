# SEO Analyzer

An interactive web application for analyzing SEO meta tags and providing optimization recommendations.

## Features

- Real-time SEO meta tag analysis for any website
- Interactive visual feedback on SEO implementation
- Google SERP preview
- Social media preview cards
- Best practice recommendations
- Detailed SEO health score

## Tech Stack

- Frontend: Angular 19 with TailwindCSS
- Backend: ASP.NET Core 9 API
- Clean Architecture with vertical slice architecture

## Development Setup

### Prerequisites

- Node.js 20.x or later
- .NET 9 SDK
- Angular CLI 19.x

### Getting Started

1. Clone the repository
2. Frontend setup:
   ```bash
   cd ClientApp
   npm install
   ng serve
   ```
3. Backend setup:
   ```bash
   cd Server/SEOAnalyzer.API
   dotnet restore
   dotnet run
   ```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000

## Project Structure

- `ClientApp/`: Angular 19 frontend application
- `Server/`: ASP.NET Core backend API
  - `SEOAnalyzer.API`: API endpoints and controllers
  - `SEOAnalyzer.Core`: Domain models and interfaces
  - `SEOAnalyzer.Application`: Application services and DTOs
  - `SEOAnalyzer.Infrastructure`: External service implementations 