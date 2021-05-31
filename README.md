# Bioproject frontend

## Folder Structure

```
bioproject_frontend
├── node_modules
└── src
    ├── assets # shared assets
    ├── components # shared components
    ├── index.tsx
    ├── index.css
    └── pages
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/BioTeam-NTUT/bioproject_frontend.git (or SSH)
cd bioproject_frontend
```

Install dependencies:

```
npm i
```

Now, you can start a local web server by running:

```
npm start
```

And then open http://localhost:3000 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| npm run dev   | Runs the app in the development mode.               |
| npm run build | Builds the app for production to the `dist` folder. |
| npm run serve | Serves the production build from the `dist` folder. |

## License

This project is licensed under the terms of the [AGPLv3 license](https://github.com/BioTeam-NTUT/bioproject_frontend/blob/main/LICENSE).
