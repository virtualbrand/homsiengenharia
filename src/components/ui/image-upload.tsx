"use client";

import { useCallback, useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      await uploadImage(imageFile);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await uploadImage(file);
    }
  }, []);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onChange(result);
      };
      reader.readAsDataURL(file);

      // TODO: Implement actual upload to server/storage
      // For now, we're using base64 encoding
      // In production, you'd upload to Supabase Storage or similar
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange('');
  };

  return (
    <div className={cn("relative", className)}>
      {previewUrl ? (
        <div className="relative group rounded-lg overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover aspect-video"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full h-full aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-all",
            isDragging 
              ? "border-primary-500 bg-primary-500/10 backdrop-blur-sm" 
              : "border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-3"></div>
                <p className="text-sm text-white/70">Carregando...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-white/50 mb-3" />
                <p className="mb-2 text-sm text-white/90 font-medium text-center">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                </p>
                <p className="text-xs text-white/60 text-center">
                  PNG, JPG, GIF até 10MB (1200x630px)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
