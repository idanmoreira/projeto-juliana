
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Testimonial } from './types';

export default function useTestimonials() {
  const { toast } = useToast();
  
  // Mock testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Maria Silva",
      text: "Juliana's astrological reading was incredibly insightful. She provided guidance that helped me make important life decisions with confidence.",
      stars: 5,
      position: "Marketing Director",
      socialMediaLink: "https://instagram.com/p/1234567"
    },
    {
      id: "2",
      name: "Carlos Mendes",
      text: "I was skeptical at first, but after my session with Juliana, I understood myself better. Her therapeutic approach combines modern psychology with astrological wisdom.",
      stars: 5,
      position: "Software Engineer",
      socialMediaLink: "https://instagram.com/p/7654321"
    }
  ]);
  
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
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const testimonialToAdd = {
      ...newTestimonial,
      id: Date.now().toString(),
      stars: newTestimonial.stars || 5
    } as Testimonial;
    
    setTestimonials([...testimonials, testimonialToAdd]);
    setNewTestimonial({
      name: "",
      text: "",
      stars: 5,
      position: "",
      socialMediaLink: ""
    });
    
    toast({
      title: "Success",
      description: "Testimonial added successfully"
    });
  };
  
  const handleEditTestimonial = () => {
    if (!editingTestimonial) return;
    
    const updatedTestimonials = testimonials.map(t => 
      t.id === editingTestimonial.id ? editingTestimonial : t
    );
    
    setTestimonials(updatedTestimonials);
    setEditingTestimonial(null);
    
    toast({
      title: "Success",
      description: "Testimonial updated successfully"
    });
  };
  
  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    
    toast({
      title: "Success",
      description: "Testimonial deleted successfully"
    });
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
    editingTestimonial,
    setEditingTestimonial,
    newTestimonial,
    handleAddTestimonial,
    handleEditTestimonial,
    handleDeleteTestimonial,
    handleTestimonialChange
  };
}
