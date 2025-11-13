'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BlogMultistepForm from '@/components/admin/BlogMultistepForm'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [user, setUser] = useState<any>(null)
  const [post, setPost] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    cover_image: "",
    category: "",
    tags: "",
    status: "rascunho",
    meta_title: "",
    meta_description: "",
    og_image: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      setUser(user)

      // Fetch the post
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !post) {
        router.push('/admin/blog')
        return
      }

      setPost(post)
    }
    
    fetchData()
  }, [router, id])

  // Check for changes whenever formData updates
  useEffect(() => {
    if (!initialFormData) return
    
    const changed = Object.keys(formData).some(key => {
      const k = key as keyof FormData
      return formData[k] !== initialFormData[k]
    })
    
    setHasChanges(changed)
  }, [formData, initialFormData])

  const isStepValid = () => {
    return (
      formData.title.trim() !== "" && 
      formData.slug.trim() !== "" && 
      formData.content.trim() !== ""
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      
      // Map status to published boolean
      const published = formData.status === 'publicado';
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'status') {
          return;
        }
        submitData.set(key, value as string);
      });
      
      submitData.set('published', published.toString());
      submitData.set('id', id);

      const response = await fetch(`/api/admin/blog/update`, {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Post atualizado com sucesso!");
        router.push('/admin/blog');
        router.refresh();
      } else {
        toast.error(`Erro ao atualizar post: ${data.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(`Erro ao atualizar post: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !post) {
    return null
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image - Fixed */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/blog-admin-bg.webp)' }}
      />
      
      {/* Dark Overlay - Fixed */}
      <div className="fixed inset-0 bg-black/60" />
      
      <div className="relative">
        <AdminHeader />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2">
          <div className="flex justify-between items-center mt-10 mb-6">
            <h1 className="text-3xl font-bold text-white">Editar Artigo</h1>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="btn-secondary rounded-xl text-lg font-semibold group flex items-center justify-center gap-2 h-[47px]"
              >
                ← VOLTAR
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting || !hasChanges}
                className="btn-primary rounded-xl text-lg shadow-lg flex items-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed h-[47px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Salvando...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    SALVAR
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <main>
          <BlogMultistepForm 
            initialData={post} 
            postId={id} 
            formData={formData} 
            setFormData={setFormData}
            setInitialFormData={setInitialFormData}
          />
        </main>
      </div>
    </div>
  )
}
