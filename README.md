# React + TypeScript + Vite Template

This template offers a minimal setup for a React project using TypeScript and Vite, with additional features like Tailwind CSS for styling, filtering options, and search functionality.
1. [Project Features](#project-features)
2. [Usage Instructions](#usage-instructions)
3. [Running with Docker](#running-with-docker)
4. [Running with NPM](#running-with-npm)


## Project Features

- Minimal setup for React + TypeScript + Vite
- Integration of Tailwind CSS for styling
- Filtering options and search functionality
- Save and load filters from local storage
- Pagination for navigating through data


## Usage Instructions

1. **Filtering:**
   - Select a source or any filter option.
   - Click the `Set Filter` button to apply the filter.

2. **Search:**
   - Enter a search keyword in the input box.
   - Click the `Search` button to display relevant results.

3. **Save Filters:**
   - Save your filters by clicking the `Save Filter` button.
   - Use the `Save Search` select-option to load saved filters.

4. **Pagination:**
   - Navigate through pages by clicking on the page number.


## Running with Docker

- Before running the project with Docker, ensure that you have Docker installed on your system. If not, you can follow the installation instructions [here](https://docs.docker.com/get-docker/).
- To set up your environment for running the project, execute the following commands to pull the required Docker images:

```bash
docker pull node:20-alpine
docker pull nginx:1.23.1-alpine
```
   - Execute `docker-compose up` in the terminal.
   - Access the project at [http://localhost](http://localhost).

## Running with NPM:
   - Install necessary packages with `npm install`.
   - Run the project with `npm run dev`.
   - Ensure [Node.js](https://nodejs.org/en/download) is installed on your device.


## GitHub Project

GitHub repository: [https://github.com/mohsen848esf/innoscripta-home-task](https://github.com/mohsen848esf/innoscripta-home-task)
