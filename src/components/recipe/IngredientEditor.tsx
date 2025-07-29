'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type IngredientEditorProps = {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
  photoPreview: string | null;
};

export function IngredientEditor({
  ingredients,
  setIngredients,
  onGenerate,
  isLoading,
  photoPreview,
}: IngredientEditorProps) {
  const [newIngredient, setNewIngredient] = useState('');

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '' && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredientToRemove));
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Your Ingredients</CardTitle>
        <CardDescription>
          Add or remove ingredients, then we'll generate a recipe for you!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {photoPreview && (
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            <Image src={photoPreview} alt="Ingredients" layout="fill" objectFit="cover" />
          </div>
        )}
        <div>
          <h3 className="font-semibold mb-3">Identified Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="text-base py-1 pl-3 pr-1">
                  {ingredient}
                  <button
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-2 rounded-full p-0.5 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No ingredients yet. Add some below!</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="e.g., Cherry Tomatoes"
            onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
          />
          <Button onClick={handleAddIngredient} size="icon" variant="outline">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Ingredient</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onGenerate} disabled={isLoading || ingredients.length === 0} size="lg" className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
