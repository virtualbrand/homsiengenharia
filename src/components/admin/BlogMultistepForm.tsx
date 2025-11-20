"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import BlogEditor from "@/components/editor/BlogEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ui/image-upload";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const steps = [
  { id: "content", title: "CONTEÚDO" },
  { id: "settings", title: "CONFIGURAÇÕES" },
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
  status: "rascunho" | "publicado";
  meta_title: string;
  meta_description: string;
  og_image: string;
}

interface BlogMultistepFormProps {
  initialData?: any;
  postId?: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setInitialFormData?: React.Dispatch<React.SetStateAction<FormData | null>>;
}

export default function BlogMultistepForm({ initialData, postId, formData, setFormData, setInitialFormData }: BlogMultistepFormProps) {
  const router = useRouter();
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  // Populate form with initial data if in edit mode
  useEffect(() => {
    if (initialData) {
      // Convert tags string to Option array
      const tags = Array.isArray(initialData.tags) ? initialData.tags : initialData.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || [];
      setSelectedTags(tags.map((tag: string) => ({ value: tag, label: tag })));
      
      // Map published boolean to status string
      let status: FormData["status"] = "rascunho";
      if (initialData.published === true) {
        status = "publicado";
      }
      
      const populatedData = {
        title: initialData.title || "",
        slug: initialData.slug || "",
        content: initialData.content || "",
        excerpt: initialData.excerpt || "",
        cover_image: initialData.cover_image || "",
        category: initialData.category || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : "",
        status: status,
        meta_title: initialData.meta_title || "",
        meta_description: initialData.meta_description || "",
        og_image: initialData.og_image || "",
      };
      
      setFormData(populatedData);
      
      // Set initial form data for comparison
      if (setInitialFormData) {
        setInitialFormData(populatedData);
      }
      
      setSlugManuallyEdited(true); // Don't auto-generate slug in edit mode
    }
  }, [initialData, setFormData, setInitialFormData]);

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
      
      // Auto-generate meta_title from title if not set (truncate to 60 chars)
      if (field === 'title' && !updated.meta_title) {
        const titleValue = value as string;
        updated.meta_title = titleValue.length > 60 ? titleValue.substring(0, 60) : titleValue;
      }
      
      // Auto-generate meta_description from excerpt if not set (truncate to 160 chars)
      if (field === 'excerpt' && !updated.meta_description) {
        const excerptValue = value as string;
        updated.meta_description = excerptValue.length > 160 ? excerptValue.substring(0, 160) : excerptValue;
      }
      
      return updated;
    });
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    updateFormData('slug', generateSlug(value));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-xl overflow-hidden">
        <Tabs defaultValue="content" className="w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <TabsList variant="default" size="md" className="justify-start">
                {steps.map((step) => (
                  <TabsTrigger 
                    key={step.id} 
                    value={step.id}
                    style={{ borderRadius: '5px' }}
                  >
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {postId && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-transparent !text-red-300 border-2 border-transparent hover:!border-red-300 hover:!bg-transparent rounded px-4 py-2 !text-xs !font-semibold flex items-center gap-2 transition-all"
                    >
                      <svg className="w-4 h-4 !text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Excluir artigo
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="!text-white text-xl font-bold">EXCLUIR ARTIGO?</AlertDialogTitle>
                      <AlertDialogDescription className="!text-white/70 text-sm">
                        Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita e todos os dados serão permanentemente removidos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="backdrop-blur-sm bg-white/10 !text-white border border-white/20 hover:!bg-white/20 !rounded-sm">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-400 !text-white hover:!bg-red-400 !rounded-sm font-semibold"
                        onClick={async () => {
                          try {
                            const response = await fetch(`/api/admin/blog/delete?id=${postId}`, {
                              method: 'DELETE',
                            });
                            if (response.ok) {
                              toast.success('Artigo excluído com sucesso!');
                              router.push('/admin/blog');
                              router.refresh();
                            } else {
                              toast.error('Erro ao excluir artigo');
                            }
                          } catch (error) {
                            toast.error('Erro ao excluir artigo');
                          }
                        }}
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardHeader>

          {/* Tab 1: Conteúdo */}
          <TabsContent value="content">
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="block !text-white font-semibold mb-2">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Tendências em Construção Civil para 2025"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className="w-full px-4 py-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="block !text-white font-semibold mb-2">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    placeholder="Ex: tendencias-construcao-civil-2025"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="w-full px-4 py-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs !text-white/60">
                    Use apenas letras minúsculas, números e hífens
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="block !text-white font-semibold mb-2">Conteúdo *</Label>
                  <BlogEditor
                    content={formData.content}
                    onChange={(value) => updateFormData("content", value)}
                  />
                </div>
              </CardContent>
            </TabsContent>

            {/* Tab 2: Configurações */}
            <TabsContent value="settings">
              <CardContent className="space-y-6">
                {/* Layout responsivo: Desktop/Tablet (1/3 + 1/3 + 1/3), Mobile (100% cada) */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Status - 1/3 */}
                  <div className="space-y-2 md:w-1/3 w-full">
                    <Label htmlFor="status" className="block !text-white font-semibold mb-2">Status de Publicação</Label>
                    <div className="relative">
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => updateFormData("status", e.target.value as FormData["status"])}
                        className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="rascunho" className="bg-gray-800 text-white">Rascunho</option>
                        <option value="publicado" className="bg-gray-800 text-white">Publicado</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 !text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Categoria - 1/3 */}
                  <div className="space-y-2 md:w-1/3 w-full">
                    <Label htmlFor="category" className="block !text-white font-semibold mb-2">Categoria</Label>
                    <div className="relative">
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => updateFormData("category", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                      >
                        <option value="" className="bg-gray-800 text-white">Selecione uma categoria</option>
                        <option value="Engenharia" className="bg-gray-800 text-white">Engenharia</option>
                        <option value="Projetos" className="bg-gray-800 text-white">Projetos</option>
                        <option value="Sustentabilidade" className="bg-gray-800 text-white">Sustentabilidade</option>
                        <option value="Construção" className="bg-gray-800 text-white">Construção</option>
                        <option value="Tecnologia" className="bg-gray-800 text-white">Tecnologia</option>
                        <option value="Notícias" className="bg-gray-800 text-white">Notícias</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 !text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tags - 1/3 */}
                  <div className="space-y-2 md:w-1/3 w-full">
                    <Label htmlFor="tags" className="block !text-white font-semibold mb-2">Tags</Label>
                    <MultipleSelector
                      value={selectedTags}
                      onChange={(options) => {
                        setSelectedTags(options);
                        updateFormData("tags", options.map(o => o.value).join(', '));
                      }}
                      placeholder="Digite e pressione Enter..."
                      creatable
                      emptyIndicator={<p className="text-center text-sm !text-white/60">Nenhuma tag encontrada</p>}
                      className="w-full rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white [&>button]:min-h-[52px] [&>button]:rounded-lg [&>button]:backdrop-blur-sm [&>button]:bg-white/10 [&>button]:border [&>button]:border-white/20 [&_input]:py-[14px] [&_input]:px-4 [&_input]:!text-white"
                      badgeClassName="bg-white/20 !text-white border-white/30"
                    />
                  </div>
                </div>

                {/* Layout responsivo: Desktop (2/3 + 1/3), Mobile (100% + 100%) */}
                <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
                  {/* Resumo - 2/3 no desktop */}
                  <div className="flex flex-col lg:w-2/3 w-full">
                    <Label htmlFor="excerpt" className="block !text-white font-semibold mb-2">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Breve descrição do post (aparece na listagem)"
                      value={formData.excerpt}
                      onChange={(e) => updateFormData("excerpt", e.target.value)}
                      className="w-full flex-1 px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Imagem de Capa - 1/3 no desktop */}
                  <div className="flex flex-col lg:w-1/3 w-full">
                    <Label className="block !text-white font-semibold mb-2">Imagem de Capa</Label>
                    <div className="flex-1 flex flex-col">
                      <ImageUpload
                        value={formData.cover_image}
                        onChange={(url) => updateFormData("cover_image", url)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Tab 3: SEO */}
            <TabsContent value="seo">
              <CardContent className="space-y-6">
                {/* Layout responsivo: Desktop (2/3 + 1/3), Mobile (100% + 100%) */}
                <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
                  {/* Campos SEO - 2/3 no desktop */}
                  <div className="flex flex-col lg:w-2/3 w-full space-y-6">
                    {/* Meta Título */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="meta_title" className="!text-white font-semibold">Meta Título</Label>
                        <span className="text-xs !text-white/60">
                          {formData.meta_title.length}/60 caracteres
                        </span>
                      </div>
                      <Input
                        id="meta_title"
                        placeholder="Título otimizado para SEO (50-60 caracteres)"
                        value={formData.meta_title}
                        onChange={(e) => updateFormData("meta_title", e.target.value)}
                        maxLength={60}
                        className="w-full px-4 py-6 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Meta Descrição */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="meta_description" className="!text-white font-semibold">Meta Descrição</Label>
                        <span className="text-xs !text-white/60">
                          {formData.meta_description.length}/160 caracteres
                        </span>
                      </div>
                      <Textarea
                        id="meta_description"
                        placeholder="Descrição otimizada para SEO (150-160 caracteres)"
                        value={formData.meta_description}
                        onChange={(e) => updateFormData("meta_description", e.target.value)}
                        maxLength={160}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 !text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Imagem Open Graph - 1/3 no desktop */}
                  <div className="flex flex-col lg:w-1/3 w-full">
                    <Label className="block !text-white font-semibold mb-2">Imagem (Compartilhamento)</Label>
                    <div className="flex-1 flex flex-col">
                      <ImageUpload
                        value={formData.og_image}
                        onChange={(url) => updateFormData("og_image", url)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}