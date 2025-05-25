
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Testimonial } from './types';
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useTestimonials() {
  const queryClient = useQueryClient();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    text: "",
    stars: 5,
    position: "",
    socialMediaLink: ""
  });
  
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
      
      setNewTestimonial({
        name: "",
        text: "",
        stars: 5,
        position: "",
        socialMediaLink: ""
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
      
      setEditingTestimonial(null);
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
  
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text || !newTestimonial.position) {
      toast.error("Error", {
        description: "Please fill all required fields",
      });
      return;
    }
    
    addTestimonialMutation.mutate(newTestimonial);
  };
  
  const handleEditTestimonial = () => {
    if (!editingTestimonial) return;
    
    updateTestimonialMutation.mutate(editingTestimonial);
  };
  
  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonialMutation.mutate(id);
  };
  
  const handleTestimonialChange = (field: string, value: any) => {
    if (editingTestimonial) {
      setEditingTestimonial({...editingTestimonial, [field]: value});
    } else {
      setNewTestimonial({...newTestimonial, [field]: value});
    }
  };

  return {
    testimonials,
    isLoading,
    error,
    editingTestimonial,
    setEditingTestimonial,
    newTestimonial,
    handleAddTestimonial,
    handleEditTestimonial,
    handleDeleteTestimonial,
    handleTestimonialChange
  };
}
