# Portfolio Project Migration Guide (JS -> TS)

## Objective
This document outlines the step-by-step migration process for converting the portfolio project from JavaScript to TypeScript. It serves as a guide for any developer (or AI) picking up the codebase. 

The primary goals are:
- Convert both Backend (`server`) and Frontend (`client`) to **TypeScript**.
- Implement a robust **Standard Folder Architecture**:
  - **Backend**: Separated into `Controllers`, `Services`, `Repositories`, `Models`, `Routes`, etc.
  - **Frontend**: Organized by `Pages`, `Components`, `Context`, `Hooks`, `Services`, `Types` etc., maintaining the original UI.
- Ensure medium-level coding standards that are accessible to junior developers.
- Correct existing bugs, typing errors, and ensure crisp responsiveness (mobile, tablet, desktop).

## 1. Backend Refactoring Plan (`/server`)
We are moving away from having inline logic inside controllers or routes, towards a layered approach. This isolates database queries (Repository), business logic (Service), and endpoints (Controllers).

### New Folder Structure:
```
server/
  src/
    config/          // DB and environment connections
    controllers/     // HTTP request parsing, response sending
    services/        // Core business logic and validation
    repositories/    // Direct MongoDB interaction
    models/          // Mongoose Schemas (Typed)
    routes/          // Express routing setup
    middleware/      // Express middlewares (Auth, Multer, etc.)
    utils/           // Helpers, error handlers
    types/           // Global TypeScript interfaces (Req/Res types)
    server.ts        // Entry point
```

### Steps Executed:
1. Initialize TS: Install `typescript`, `@types/node`, `@types/express`, `ts-node-dev`.
2. Configure `tsconfig.json`.
3. Create the `/src` directory.
4. Move `Models`, create TS Interfaces for them.
5. Create `Repositories` to handle DB calls using models.
6. Create `Services` to use Repositories.
7. Create `Controllers` to format responses using Services.
8. Update `Routes`, `Middleware`, `Config` to TS.
9. Link via `server.ts`.

## 2. Frontend Refactoring Plan (`/client`)
Currently in React (Vite+Tailwind).

### New Folder Structure:
```
client/
  src/
    assets/          // Images, global CSS, static data
    components/      // Shared reusable components (Buttons, Nav, Toast)
    pages/           // Top-level views (Home, About, Projects)
    admin/           // Admin specific features (Dashboard, NewProject, etc)
    context/         // React Contexts (Global Context, Admin Context)
    hooks/           // Custom React Hooks
    services/        // API wrappers (Axios calls)
    types/           // Shared Typescript interfaces 
    utils/           // Utility functions (e.g. motion, formatting)
    App.tsx
    main.tsx
```

## Troubleshooting & Rollback
- If an API route fails during migration, check the injected `Service` vs `Repository` typing.
- All `.js` files in `/server` will be systematically renamed and moved. Do not delete original functionality until the new TS pipeline is tested.
- If frontend UI breaks, check `Tailwind` classes. Functionality stays the same, so types are the only changing variables.
- Proxy set up manually for development via `npm config`.
