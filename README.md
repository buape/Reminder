# Buape Template

This is the official monorepo template for Buape Studios.


## How to Run the Project

1. Install the packages using `pnpm install`
2. Setup your .env file based on the .env.example file.
    - You can use a free tier database from Planetscale. Use `pnpm run db:push` to setup your database schema.
3. Start the development server using `pnpm dev`
    - If you only want to start one app, you can use the `--filter` option.
    - For example, `pnpm run dev --filter bot...` will only run the bot.
        - Adding the `...` at the end is crucial, because it ensures that all subpackages required by that app will also be run
4. Changes will be automatically hot-reloaded as you save them.

## Scripts

There are several scripts available for you to use in this template. These are all used by running `pnpm run <name>`.

-   `build` - This will generate a production build of your apps..
-   `changeset` - This will generate a Changeset for publishing packages.
-   `clean` - This will clean all generated files and builds from your apps.
-   `db:generate` - This will generate a Prisma client based on the database schema.
-   `db:push` - This will push the database schema to your development database.
-   `db:studio` - This will open an instance of Prisma Studio for your development database.
-   `dev` - This will start all your apps in development mode.
    -   To run only one app, use the `--filter` option. See [How to Run the Project](#how-to-run-the-project).
-   `publish` - This will publish all changesets that have been created since the last release.
-   `pretty` - This will run Prettier and ESLint together on all files in Kiai.
-   `start` - This will start Kiai in production mode.

## Monorepo Structure

### Apps

Apps are listed in the apps directory and are the main applications you are developing, such as a website, CF worker, or bot.

### Packages

Packages are shared pieces of code that are used by multiple apps. They are listed in the packages directory.