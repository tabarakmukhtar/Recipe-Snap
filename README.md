# Recipe Snap

Recipe Snap is a web application that helps you discover new recipes based on the ingredients you have on hand. Simply snap a photo of your ingredients, and our AI-powered assistant will identify them and suggest delicious recipes you can make.

## Features

- **Photo-to-Ingredients:** Upload a photo, and the app will use generative AI to identify the ingredients.
- **Ingredient Editing:** Easily add or remove ingredients from the identified list before generating a recipe.
- **AI Recipe Generation:** Get a complete recipe, including name, ingredients, step-by-step instructions, and estimated cooking time.
- **Recipe History:** Save your favorite generated recipes to your browser's local storage for easy access later.

## Tech Stack

This project is built with a modern, full-stack TypeScript setup:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

The main application logic is in `src/app/page.tsx`. The AI flows that power the ingredient analysis and recipe generation can be found in `src/ai/flows/`.
