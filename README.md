# AB-INBEV-CodeChallenge-Backend

## Techical Stack
- .NET 8.0
- .NET WebApi
- .NET Identity
- Entity Framework 8.0
- .NET Core Native DI
- AutoMapper
- FluentValidator
- MediatR
- Swagger UI
- MSSQL
- xUnit
- Moq
- Fluent Assertions
- Polly
- Refit

## Design Patterns
- Domain Driven Design
- Domain Events
- Domain Notification
- CQRS
- Event Sourcing
- Unit Of Work
- Repository & Generic Repository
- Inversion of Control / Dependency injection
- ORM
- Mediator
- Specification Pattern
- Options Pattern

## How to run
- Visual Studio: `Just run`
- VSCode: `Just run`
- Terminal: `dotnet run --project src/DDD.Services.Api/DDD.Services.Api.csproj --launch-profile Dev`

## Testing
- Terminal: `dotnet test`

## Docker

```sh
docker build -t aspnetcore-docker-image .
docker run -it --rm -p 3000:80 --name aspnetcore-docker-container aspnetcore-docker-image
docker run -d -p 3000:80 --name aspnetcore-docker-container aspnetcore-docker-image
```

- http://localhost:3000/

## Swagger (Dev env only)
- http://localhost:5000/swagger

## Health check (Staging & Prod env only)
- http://localhost:5000/hc-ui
- http://localhost:5000/hc-json

# AB-INBEV-CodeChallenge-Frontend

## Technical Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Authentication**: JWT

## Design Patterns

- **Component-based architecture**
- **Singleton**
- **Observer**

## How to Run

### 1. Clone this repository:

```bash
git clone <repository-url>
```

### 2. Install dependencies:

- npm install

### 3. Run the application locally:

- npm run dev

### 4. Build the project for production:

- npm run build

### Using Docker Compose (optional)

- docker-compose up --build
