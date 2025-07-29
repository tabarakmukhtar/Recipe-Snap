'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Save, Share2, Soup } from 'lucide-react';

type RecipeCardProps = {
  recipe: GenerateRecipeOutput;
  onSave: () => void;
  onStartOver: () => void;
};

export function RecipeCard({ recipe, onSave, onStartOver }: RecipeCardProps) {
  return (
    <Card className="w-full shadow-lg animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="font-headline text-3xl md:text-4xl text-primary">{recipe.recipeName}</CardTitle>
        <CardDescription>Estimated time: {recipe.estimatedTime}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <div>
          <h3 className="font-bold font-headline text-xl mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h3 className="font-bold font-headline text-xl mb-3">Instructions</h3>
          <ol className="space-y-4 list-decimal list-inside">
            {recipe.steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={onSave} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Recipe
        </Button>
        <Button onClick={onStartOver} variant="outline" className="w-full sm:w-auto">
          <Soup className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}
