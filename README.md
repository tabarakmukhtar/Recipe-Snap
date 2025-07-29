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

## Running Locally

To run this project on your local machine, follow these steps:

1.  **Install Dependencies:**
    Open your terminal, navigate to the project directory, and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a file named `.env` in the root of your project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the Development Server:**
    Once the dependencies are installed, start the Next.js development server:
    ```bas
    npm run dev
    ```

4.  **Run the Genkit Server:**
    In a separate terminal window, start the Genkit server, which powers the AI features:
    ```bash
    npm run genkit:dev
    ```

5.  **Open the App:**
    Your application should now be running at [http://localhost:9002](http://localhost:9002).
