
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Pencil, Trash2, LinkIcon } from "lucide-react";
import { Testimonial } from './types';

interface TestimonialListProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

const TestimonialList = ({ testimonials, onEdit, onDelete }: TestimonialListProps) => {
  return (
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
                      onClick={() => onEdit(testimonial)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(testimonial.id)}
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
  );
};

export default TestimonialList;
