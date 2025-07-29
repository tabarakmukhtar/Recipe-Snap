'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Loader2, Upload, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

type PhotoUploaderProps = {
  onPhotoSelect: (dataUri: string) => void;
  onAnalyze: () => void;
  photoPreview: string | null;
  isLoading: boolean;
};

export function PhotoUploader({ onPhotoSelect, onAnalyze, photoPreview, isLoading }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Let's Get Cooking!</CardTitle>
        <CardDescription>Upload a photo of your ingredients to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="relative aspect-video w-full border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-primary transition-colors bg-muted/20"
          onClick={triggerFileSelect}
        >
          {photoPreview ? (
            <Image src={photoPreview} alt="Ingredients preview" layout="fill" objectFit="contain" className="rounded-md" />
          ) : (
            <>
              <Camera className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, or WEBP</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={triggerFileSelect} variant="outline" className="w-full sm:w-auto">
          <Upload className="mr-2 h-4 w-4" />
          {photoPreview ? 'Change Photo' : 'Choose Photo'}
        </Button>
        <Button onClick={onAnalyze} disabled={!photoPreview || isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Analyze Ingredients
        </Button>
      </CardFooter>
    </Card>
  );
}
