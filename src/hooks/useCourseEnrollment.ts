
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';

export const useCourseEnrollment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to enroll in courses",
        variant: "destructive"
      });
      return false;
    }

    try {
      setIsEnrolling(true);
      
      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
        
      if (existingEnrollment) {
        toast({
          title: "Already enrolled",
          description: "You are already enrolled in this course"
        });
        return true;
      }
      
      // Enroll in course
      const { error } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0,
          completed: false
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully enrolled in course"
      });
      
      return true;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Error",
        description: "Failed to enroll in course. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsEnrolling(false);
    }
  };

  const updateProgress = async (userCourseId: string, progress: number, completed = false) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('user_courses')
        .update({
          progress,
          completed: completed || progress >= 100,
          updated_at: new Date().toISOString()
        })
        .eq('id', userCourseId)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error updating course progress:', error);
      toast({
        title: "Error",
        description: "Failed to update course progress",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    enrollInCourse,
    updateProgress,
    isEnrolling
  };
};
