'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { BookOpen, Trash2 } from 'lucide-react';

type HistorySidebarProps = {
  history: GenerateRecipeOutput[];
  onSelect: (recipe: GenerateRecipeOutput) => void;
  onClear: () => void;
};

export function HistorySidebar({ history, onSelect, onClear }: HistorySidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold font-headline">Recipe History</h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {history.length > 0 ? (
          <SidebarMenu>
            {history.map((recipe, index) => (
              <SidebarMenuItem key={`${recipe.recipeName}-${index}`}>
                <SidebarMenuButton
                  onClick={() => onSelect(recipe)}
                  className="w-full justify-start"
                  variant="ghost"
                  size="sm"
                >
                  <BookOpen />
                  <span className="truncate">{recipe.recipeName}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <p>You haven't saved any recipes yet.</p>
          </div>
        )}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={onClear}
          disabled={history.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
