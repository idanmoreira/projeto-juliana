
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from './types';

interface TestimonialFormProps {
  testimonial: Partial<Testimonial>;
  isEditing: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
  onChange: (field: string, value: string | number) => void;
}

const TestimonialForm = ({
  testimonial,
  isEditing,
  onSubmit,
  onCancel,
  onChange
}: TestimonialFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name *</label>
              <Input 
                id="name" 
                value={testimonial.name || ''}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Client name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium">Position *</label>
              <Input 
                id="position" 
                value={testimonial.position || ''}
                onChange={(e) => onChange('position', e.target.value)}
                placeholder="Client position/occupation"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="text" className="text-sm font-medium">Testimonial Text *</label>
            <Textarea 
              id="text" 
              value={testimonial.text || ''}
              onChange={(e) => onChange('text', e.target.value)}
              placeholder="Client testimonial text"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="stars" className="text-sm font-medium">Rating (1-5) *</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => onChange('stars', star)}
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        (testimonial.stars && testimonial.stars >= star) 
                          ? "text-astral-gold fill-astral-gold" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="socialMediaLink" className="text-sm font-medium">Social Media Link</label>
              <Input 
                id="socialMediaLink" 
                value={testimonial.socialMediaLink || ''}
                onChange={(e) => onChange('socialMediaLink', e.target.value)}
                placeholder="https://instagram.com/p/123456"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing && (
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button onClick={onSubmit}>
          {isEditing ? "Update Testimonial" : "Add Testimonial"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestimonialForm;
