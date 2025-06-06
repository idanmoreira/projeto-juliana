
import { useLanguage } from "@/context/LanguageContext";
import TestimonialList from './testimonials/TestimonialList';
import TestimonialForm from './testimonials/TestimonialForm';
import useTestimonials from './testimonials/useTestimonials';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const TestimonialManager = () => {
  const {
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
  } = useTestimonials();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-astral-purple" />
        <span className="ml-2">Loading testimonials...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>
          Error loading testimonials: {error.toString()}
        </AlertDescription>
      </Alert>
    );
  }
  
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
