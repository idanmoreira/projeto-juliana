
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabaseClient";

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  stars: number;
  position: string;
  socialMediaLink?: string;
}

export const useSupabaseTestimonials = () => {
  const queryClient = useQueryClient();
  
  // Fetch testimonials with React Query
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching testimonials:", error);
        throw new Error(error.message);
      }
      
      // Transform the data to match our Testimonial type
      return data.map(item => ({
        id: item.id,
        name: item.name,
        text: item.text,
        stars: item.stars,
        position: item.position,
        socialMediaLink: item.social_media_link
      }));
    }
  });
  
  // Add testimonial mutation
  const addTestimonialMutation = useMutation({
    mutationFn: async (testimonial: Partial<Testimonial>) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          name: testimonial.name,
          text: testimonial.text,
          stars: testimonial.stars,
          position: testimonial.position,
          social_media_link: testimonial.socialMediaLink
        }])
        .select();
      
      if (error) {
        console.error("Error adding testimonial:", error);
        throw new Error(error.message);
      }
      
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success("Success", {
        description: "Testimonial added successfully"
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Failed to add testimonial",
      });
    }
  });
  
  // Update testimonial mutation
  const updateTestimonialMutation = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update({
          name: testimonial.name,
          text: testimonial.text,
          stars: testimonial.stars,
          position: testimonial.position,
          social_media_link: testimonial.socialMediaLink,
          updated_at: new Date().toISOString()
        })
        .eq('id', testimonial.id)
        .select();
      
      if (error) {
        console.error("Error updating testimonial:", error);
        throw new Error(error.message);
      }
      
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success("Success", {
        description: "Testimonial updated successfully"
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Failed to update testimonial",
      });
    }
  });
  
  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting testimonial:", error);
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success("Success", {
        description: "Testimonial deleted successfully"
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Failed to delete testimonial",
      });
    }
  });
  
  return {
    testimonials,
    isLoading,
    error,
    addTestimonial: addTestimonialMutation.mutate,
    updateTestimonial: updateTestimonialMutation.mutate,
    deleteTestimonial: deleteTestimonialMutation.mutate,
    isAdding: addTestimonialMutation.isPending,
    isUpdating: updateTestimonialMutation.isPending,
    isDeleting: deleteTestimonialMutation.isPending
  };
};
