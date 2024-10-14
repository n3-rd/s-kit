# S-KIT CLI TOOL

Version: 1.0.0

## Description

S-kit is a command-line interface (CLI) tool designed to streamline the process of creating components, routes, layouts, error pages, server routes, and stores for SvelteKit projects.

## Main Features

1. Add components
2. Create routes (with optional server-side logic)
3. Generate layouts
4. Add error pages
5. Create server routes
6. Set up stores

## Detailed Usage Instructions

### 1. Adding Components

Command: `s-kit add <component-name>`
Example: `s-kit add Button`

This creates a new Svelte component file at `src/lib/components/Button.svelte` with basic content.

### 2. Creating Routes

Command: `s-kit route add <route-name> [--no-server]`
Example: `s-kit route add about`

This creates a new route at `src/routes/about/+page.svelte` and `src/routes/about/+page.server.ts`.
Use `--no-server` flag to skip creating the server file and create a client-side `+page.ts` instead.

For nested routes, use slashes:
Example: `s-kit route add blog/post`

For route groups, use parentheses:
Example: `s-kit route add (auth)/login`

### 3. Generating Layouts

Command: `s-kit layout <layout-name>`
Example: `s-kit layout /`

This creates a new layout file at `src/routes/+layout.svelte`.
For nested layouts, specify the path:
Example: `s-kit layout /blog`

### 4. Adding Error Pages

Command: `s-kit error <error-name>`
Example: `s-kit error 404`

This creates a new error page at `src/routes/404/+error.svelte`.

### 5. Creating Server Routes

Command: `s-kit server <server-route-name>`
Example: `s-kit server api/users`

This creates a new server route file at `src/routes/api/users/+server.ts` with a basic GET handler.

### 6. Setting Up Stores

Command: `s-kit store <store-name>`
Example: `s-kit store counter`

This creates a new store file at `src/lib/stores/counter.js` with a basic writable store and utility functions.
You can also add a `.ts` file extension to generate a typescript store.

## Additional Notes

- All commands create necessary directories if they don't exist.
- The tool assumes a standard SvelteKit project structure.
- Files are created with basic boilerplate content which you can then customize.

## Dependencies

- Node.js
- commander.js

## License

ISC

For more information, updates, or to report issues, please visit the project repository.

Happy coding with s-kit!
