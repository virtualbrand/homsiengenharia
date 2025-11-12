"use client";

import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import BlogEditor from "@/components/editor/BlogEditor";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperNav,
  StepperPanel,
  StepperContent,
} from "@/components/ui/stepper";

const steps = [
  { id: "content", title: "Conteúdo" },
  { id: "settings", title: "Configurações" },
  { id: "seo", title: "SEO" },
];

interface FormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: string;
  tags: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
}

interface BlogMultistepFormProps {
  initialData?: any;
  postId?: string;
}

export default function BlogMultistepForm({ initialData, postId }: BlogMultistepFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image: "",
    category: "",
    tags: "",
    published: false,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_image: "",
  });

  // Populate form with initial data if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        content: initialData.content || "",
        excerpt: initialData.excerpt || "",
        cover_image: initialData.cover_image || "",
        category: initialData.category || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : "",
        published: initialData.published || false,
        meta_title: initialData.meta_title || "",
        meta_description: initialData.meta_description || "",
        meta_keywords: initialData.meta_keywords || "",
        og_image: initialData.og_image || "",
      });
      setSlugManuallyEdited(true); // Don't auto-generate slug in edit mode
    }
  }, [initialData]);

  // Function to convert text to slug format
  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from title
      if (field === 'title' && !slugManuallyEdited) {
        updated.slug = generateSlug(value as string);
      }
      
      // Auto-generate meta_title from title if not set
      if (field === 'title' && !updated.meta_title) {
        updated.meta_title = value as string;
      }
      
      // Auto-generate meta_description from excerpt if not set
      if (field === 'excerpt' && !updated.meta_description) {
        updated.meta_description = value as string;
      }
      
      return updated;
    });
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    updateFormData('slug', generateSlug(value));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'published') {
          submitData.set(key, value ? 'true' : 'false');
        } else {
          submitData.set(key, value as string);
        }
      });

      let response;
      
      if (postId) {
        // Edit mode - update existing post
        submitData.set('id', postId);
        response = await fetch(`/api/admin/blog/update`, {
          method: 'POST',
          body: submitData,
        });
      } else {
        // Create mode - create new post
        response = await fetch('/api/admin/blog/create', {
          method: 'POST',
          body: submitData,
        });
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(postId ? "Post atualizado com sucesso!" : "Post criado com sucesso!");
        router.push('/admin/blog');
        router.refresh();
      } else {
        toast.error(`Erro ao criar post: ${data.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(`Erro ao criar post: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if step is valid for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Conteúdo
        return formData.title.trim() !== "" && formData.slug.trim() !== "" && formData.content.trim() !== "";
      case 2: // Configurações
        return formData.excerpt.trim() !== "";
      case 3: // SEO
        return true; // SEO is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 3 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto py-8">
      <Stepper value={currentStep} onValueChange={setCurrentStep} className="mb-8">
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={step.id} step={index + 1} completed={currentStep > index + 1}>
              <StepperTrigger>
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle className="hidden sm:block">{step.title}</StepperTitle>
              </StepperTrigger>
              {index < steps.length - 1 && <StepperSeparator />}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel>
          <Card className="border shadow-lg rounded-3xl overflow-hidden">
            {/* Step 1: Conteúdo */}
            <StepperContent value={1}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Tendências em Construção Civil para 2025"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    placeholder="Ex: tendencias-construcao-civil-2025"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use apenas letras minúsculas, números e hífens
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo *</Label>
                  <BlogEditor
                    content={formData.content}
                    onChange={(value) => updateFormData("content", value)}
                  />
                </div>
              </CardContent>
            </StepperContent>

            {/* Step 2: Configurações */}
            <StepperContent value={2}>
              <CardHeader>
                <CardTitle>Configurações do Post</CardTitle>
                <CardDescription>
                  Configure as informações adicionais e visibilidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Breve descrição do post (aparece na listagem)"
                    value={formData.excerpt}
                    onChange={(e) => updateFormData("excerpt", e.target.value)}
                    rows={3}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image">URL da Imagem de Capa</Label>
                  <Input
                    id="cover_image"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.cover_image}
                    onChange={(e) => updateFormData("cover_image", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sugestão: Use Unsplash (1200x630px)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engenharia">Engenharia</SelectItem>
                      <SelectItem value="Projetos">Projetos</SelectItem>
                      <SelectItem value="Sustentabilidade">Sustentabilidade</SelectItem>
                      <SelectItem value="Construção">Construção</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Notícias">Notícias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Ex: Construção, Tecnologia, Inovação"
                    value={formData.tags}
                    onChange={(e) => updateFormData("tags", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">Separe as tags por vírgula</p>
                </div>

                <div className="space-y-3">
                  <Label>Status de Publicação</Label>
                  <RadioGroup
                    value={formData.published ? "published" : "draft"}
                    onValueChange={(value) => updateFormData("published", value === "published")}
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft" className="cursor-pointer flex-1">
                        <div className="font-medium">Rascunho</div>
                        <div className="text-xs text-muted-foreground">
                          Salvar sem publicar
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-accent transition-colors">
                      <RadioGroupItem value="published" id="published" />
                      <Label htmlFor="published" className="cursor-pointer flex-1">
                        <div className="font-medium">Publicar</div>
                        <div className="text-xs text-muted-foreground">
                          Tornar visível publicamente
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </StepperContent>

            {/* Step 3: SEO */}
            <StepperContent value={3}>
              <CardHeader>
                <CardTitle>Otimização SEO</CardTitle>
                <CardDescription>
                  Melhore a visibilidade do seu post nos mecanismos de busca
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Título</Label>
                  <Input
                    id="meta_title"
                    placeholder="Título otimizado para SEO (50-60 caracteres)"
                    value={formData.meta_title}
                    onChange={(e) => updateFormData("meta_title", e.target.value)}
                    maxLength={60}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.meta_title.length}/60 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Descrição</Label>
                  <Textarea
                    id="meta_description"
                    placeholder="Descrição otimizada para SEO (150-160 caracteres)"
                    value={formData.meta_description}
                    onChange={(e) => updateFormData("meta_description", e.target.value)}
                    maxLength={160}
                    rows={3}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.meta_description.length}/160 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Palavras-chave</Label>
                  <Input
                    id="meta_keywords"
                    placeholder="Ex: construção civil, engenharia, sustentabilidade"
                    value={formData.meta_keywords}
                    onChange={(e) => updateFormData("meta_keywords", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separe as palavras-chave por vírgula
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og_image">Imagem Open Graph (Compartilhamento)</Label>
                  <Input
                    id="og_image"
                    type="url"
                    placeholder="https://exemplo.com/og-image.jpg"
                    value={formData.og_image}
                    onChange={(e) => updateFormData("og_image", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Imagem para quando o post for compartilhado nas redes sociais (1200x630px)
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Dicas de SEO</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use títulos descritivos e concisos</li>
                    <li>• Inclua palavras-chave naturalmente no texto</li>
                    <li>• Mantenha a meta descrição entre 150-160 caracteres</li>
                    <li>• Use imagens de alta qualidade com alt text</li>
                  </ul>
                </div>
              </CardContent>
            </StepperContent>

            <CardFooter className="flex justify-between pt-6 pb-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 transition-all duration-300 rounded-xl"
              >
                Voltar
              </Button>
              <Button
                type="button"
                onClick={currentStep === 3 ? handleSubmit : nextStep}
                disabled={!isStepValid() || isSubmitting}
                className={cn(
                  "flex items-center gap-2 transition-all duration-300 rounded-xl",
                  currentStep === 3 ? "bg-green-600 hover:bg-green-700" : "",
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {postId ? 'Atualizando...' : 'Criando...'}
                  </>
                ) : (
                  <>
                    {currentStep === 3 ? (postId ? "Atualizar Post" : "Criar Post") : "Próximo"}
                    {currentStep === 3 && <Check className="h-4 w-4" />}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
