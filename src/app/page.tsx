'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { analyzePhoto } from '@/ai/flows/analyze-photo';
import { generateRecipe } from '@/ai/flows/generate-recipe';
import { Header } from '@/components/layout/Header';
import { HistorySidebar } from '@/components/recipe/HistorySidebar';
import { IngredientEditor } from '@/components/recipe/IngredientEditor';
import { PhotoUploader } from '@/components/recipe/PhotoUploader';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'analyzing' | 'editing' | 'generating' | 'ready';

export default function HomePage() {
  const [status, setStatus] = useState<Status>('idle');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [history, setHistory] = useState<GenerateRecipeOutput[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('recipe-snap-history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not load your saved recipes.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handlePhotoSelect = (dataUri: string) => {
    setPhotoPreview(dataUri);
    setStatus('idle');
  };

  const handleAnalyze = async () => {
    if (!photoPreview) return;
    setStatus('analyzing');
    setRecipe(null);
    try {
      const result = await analyzePhoto({ photoDataUri: photoPreview });
      if (result.ingredients && result.ingredients.length > 0) {
        setIngredients(result.ingredients);
        setStatus('editing');
      } else {
        toast({
          title: 'No ingredients found',
          description: 'We couldn\'t identify any ingredients in the photo. Please try another one or add them manually.',
          variant: 'destructive',
        });
        setIngredients([]);
        setStatus('editing');
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your photo. Please try again.',
        variant: 'destructive',
      });
      setStatus('idle');
    }
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast({
        title: 'No Ingredients',
        description: 'Please add some ingredients before generating a recipe.',
        variant: 'destructive',
      });
      return;
    }
    setStatus('generating');
    try {
      const result = await generateRecipe({ ingredients });
      setRecipe(result);
      setStatus('ready');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Generation Failed',
        description: 'There was an error creating your recipe. Please try again.',
        variant: 'destructive',
      });
      setStatus('editing');
    }
  };

  const handleSave = () => {
    if (!recipe) return;
    if (history.some((item) => item.recipeName === recipe.recipeName)) {
       toast({
        title: 'Recipe already saved',
        description: 'This recipe is already in your history.',
      });
      return;
    }
    const newHistory = [recipe, ...history];
    setHistory(newHistory);
    localStorage.setItem('recipe-snap-history', JSON.stringify(newHistory));
    toast({
      title: 'Recipe Saved!',
      description: `"${recipe.recipeName}" has been added to your history.`,
    });
  };
  
  const handleStartOver = () => {
    setStatus('idle');
    setPhotoPreview(null);
    setIngredients([]);
    setRecipe(null);
  };
  
  const handleSelectHistory = (selectedRecipe: GenerateRecipeOutput) => {
    setRecipe(selectedRecipe);
    setStatus('ready');
    setPhotoPreview(null);
    setIngredients(selectedRecipe.ingredients);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('recipe-snap-history');
    toast({
      title: 'History Cleared',
      description: 'Your saved recipes have been removed.',
    });
  };

  const renderContent = () => {
    switch (status) {
      case 'analyzing':
      case 'generating':
        const message = status === 'analyzing' ? 'Analyzing your ingredients...' : 'Whipping up your recipe...';
        return (
          <Card className="flex flex-col items-center justify-center p-8 md:p-12 text-center shadow-lg h-full">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <h2 className="text-2xl font-bold font-headline text-primary">{message}</h2>
            <p className="text-muted-foreground mt-2">This shouldn't take long.</p>
          </Card>
        );
      case 'editing':
        return (
          <IngredientEditor
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerate={handleGenerate}
            isLoading={status === 'generating'}
            photoPreview={photoPreview}
          />
        );
      case 'ready':
        return recipe && <RecipeCard recipe={recipe} onSave={handleSave} onStartOver={handleStartOver} />;
      case 'idle':
      default:
        return (
           <PhotoUploader 
            onPhotoSelect={handlePhotoSelect}
            onAnalyze={handleAnalyze}
            photoPreview={photoPreview}
            isLoading={status === 'analyzing'}
           />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <HistorySidebar history={history} onSelect={handleSelectHistory} onClear={handleClearHistory} />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="h-full max-w-4xl mx-auto">{renderContent()}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
