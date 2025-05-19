
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Star, Pencil, Trash2, LinkIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  stars: number;
  position: string;
  socialMediaLink?: string;
}

const TestimonialManager = () => {
  const { t } = useLanguage();
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
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonials</CardTitle>
          <CardDescription>
            Add, edit or remove client testimonials that appear on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List of client testimonials</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Social Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.position}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-astral-gold fill-astral-gold" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {testimonial.socialMediaLink ? (
                      <a 
                        href={testimonial.socialMediaLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-astral-purple hover:underline flex items-center"
                      >
                        <LinkIcon className="w-4 h-4 mr-1" /> Link
                      </a>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingTestimonial(testimonial)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name *</label>
                <Input 
                  id="name" 
                  value={editingTestimonial ? editingTestimonial.name : newTestimonial.name}
                  onChange={(e) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({...editingTestimonial, name: e.target.value});
                    } else {
                      setNewTestimonial({...newTestimonial, name: e.target.value});
                    }
                  }}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">Position *</label>
                <Input 
                  id="position" 
                  value={editingTestimonial ? editingTestimonial.position : newTestimonial.position}
                  onChange={(e) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({...editingTestimonial, position: e.target.value});
                    } else {
                      setNewTestimonial({...newTestimonial, position: e.target.value});
                    }
                  }}
                  placeholder="Client position/occupation"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="text" className="text-sm font-medium">Testimonial Text *</label>
              <Textarea 
                id="text" 
                value={editingTestimonial ? editingTestimonial.text : newTestimonial.text}
                onChange={(e) => {
                  if (editingTestimonial) {
                    setEditingTestimonial({...editingTestimonial, text: e.target.value});
                  } else {
                    setNewTestimonial({...newTestimonial, text: e.target.value});
                  }
                }}
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
                      onClick={() => {
                        if (editingTestimonial) {
                          setEditingTestimonial({...editingTestimonial, stars: star});
                        } else {
                          setNewTestimonial({...newTestimonial, stars: star});
                        }
                      }}
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          (editingTestimonial ? editingTestimonial.stars >= star : newTestimonial.stars && newTestimonial.stars >= star) 
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
                  value={editingTestimonial ? editingTestimonial.socialMediaLink || '' : newTestimonial.socialMediaLink || ''}
                  onChange={(e) => {
                    if (editingTestimonial) {
                      setEditingTestimonial({...editingTestimonial, socialMediaLink: e.target.value});
                    } else {
                      setNewTestimonial({...newTestimonial, socialMediaLink: e.target.value});
                    }
                  }}
                  placeholder="https://instagram.com/p/123456"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {editingTestimonial && (
            <Button 
              variant="outline" 
              onClick={() => setEditingTestimonial(null)}
            >
              Cancel
            </Button>
          )}
          <Button 
            onClick={editingTestimonial ? handleEditTestimonial : handleAddTestimonial}
          >
            {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestimonialManager;
