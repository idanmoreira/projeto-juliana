
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import TestimonialList from './testimonials/TestimonialList';
import TestimonialForm from './testimonials/TestimonialForm';
import useTestimonials from './testimonials/useTestimonials';

const TestimonialManager = () => {
  const { t } = useLanguage();
  const {
    testimonials,
    editingTestimonial,
    setEditingTestimonial,
    newTestimonial,
    handleAddTestimonial,
    handleEditTestimonial,
    handleDeleteTestimonial,
    handleTestimonialChange
  } = useTestimonials();
  
  return (
    <div className="space-y-8">
      <TestimonialList 
        testimonials={testimonials}
        onEdit={setEditingTestimonial}
        onDelete={handleDeleteTestimonial}
      />
      
      <TestimonialForm
        testimonial={editingTestimonial || newTestimonial}
        isEditing={!!editingTestimonial}
        onSubmit={editingTestimonial ? handleEditTestimonial : handleAddTestimonial}
        onCancel={() => setEditingTestimonial(null)}
        onChange={handleTestimonialChange}
      />
    </div>
  );
};

export default TestimonialManager;
