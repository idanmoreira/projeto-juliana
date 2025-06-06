
import { useState } from 'react';
import { useSupabaseTestimonials, Testimonial } from '@/hooks/useSupabaseTestimonials';

export default function useTestimonials() {
  const {
    testimonials,
    isLoading,
    error,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial
  } = useSupabaseTestimonials();
  
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    text: "",
    stars: 5,
    position: "",
    socialMediaLink: ""
  });
  
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text || !newTestimonial.position) {
      return;
    }
    
    addTestimonial(newTestimonial);
    setNewTestimonial({
      name: "",
      text: "",
      stars: 5,
      position: "",
      socialMediaLink: ""
    });
  };
  
  const handleEditTestimonial = () => {
    if (!editingTestimonial) return;
    
    updateTestimonial(editingTestimonial);
    setEditingTestimonial(null);
  };
  
  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial(id);
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
