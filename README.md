# Analytical-link-shortener

> Authors: xlodnan, xberky, xfalesn, xturek

## Dev setup

### Stack

- yarn, typescript, eslint, prettier, turborepo, husky
- **BE:** express
- **FE:** vite + react

> **Disclaimer:** This project uses husky to enforce conventional commits, if you see an error message while committing
> in vscode, click the `Open git log` button, it will tell you what you did wrong.

### Setup

- `yarn install` - in root directory of project, this installs dependencies into all sub-projects.
- `yarn dev` - starts the frontend and backend
- `yarn lint` - manually runs eslint in all projects
- `yarn ts-check` - manually runs typescript check in all projects
- `yarn format:{write,check}` - checks/writes prettier code style

### Adding new packages

If you want to add new packages to either `frontend` or `backend`, then enter the corresponding folder (eg. `apps/frontend`) and normally run `yarn add xyz`. This will add the package to `package.json` in the project and install it and link it from the root node_modules into the project.

## Description

An app inspired by bit.ly.
A regular user can generate a shortened link on which he has the option to either enable or disable advertising.
This can then be shared.
Advertisers can also create accounts in the app and add their advertisements to the platform.
When the user clicks on the shortened link (if the ad is enabled), the ad will be displayed to the user and when the ad ends/skipped, it will redirect the user to the original link.
Both the authors of the shortened link and the advertisers can track statistics about the clicks on their links (advertisements).

## Requirements

- redirecting from shortened links
- display of advertisements
- authentication/authorization of users
- links management
- overview of relevant analytics (number of visits, number of ad impressions, ...)
- overview of analytics per time period (at least last day, week, 14 days, month, year; ideally let the user enter the period)
- authentication/authorization of admin advertisement section
- manage advertisements
- overview of relevant analytics (number of impressions, number of skips, time spent by the user on the ad, region and language of users...)
- overview of analytics per time period (at least last day, week, 14 days, month, year; ideally let the user enter the period)
