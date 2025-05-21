
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: string;
  is_paid: boolean | null;
}

export interface UserCourse {
  id: string;
  course_id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
}

export interface UserFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  created_at: string;
  consultation_id: string | null;
}

export interface UserConsultation {
  id: string;
  title: string;
  description: string | null;
  date: string;
  status: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [files, setFiles] = useState<UserFile[]>([]);
  const [consultations, setConsultations] = useState<UserConsultation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw new Error(`Error fetching profile: ${profileError.message}`);
        setProfile(profileData);
        
        // Fetch user courses with course details
        const { data: userCoursesData, error: coursesError } = await supabase
          .from('user_courses')
          .select(`
            id, progress, completed,
            courses:course_id (id, title, description)
          `)
          .eq('user_id', user.id);
          
        if (coursesError) throw new Error(`Error fetching courses: ${coursesError.message}`);
        
        // Transform the data structure to match our component needs
        const formattedCourses = userCoursesData.map(item => ({
          id: item.id,
          course_id: item.courses.id,
          title: item.courses.title,
          description: item.courses.description,
          progress: item.progress,
          completed: item.completed
        }));
        
        setCourses(formattedCourses);
        
        // Fetch files
        const { data: filesData, error: filesError } = await supabase
          .from('files')
          .select('*')
          .eq('user_id', user.id);
          
        if (filesError) throw new Error(`Error fetching files: ${filesError.message}`);
        setFiles(filesData);
        
        // Fetch consultations
        const { data: consultationsData, error: consultationsError } = await supabase
          .from('consultations')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: true });
          
        if (consultationsError) throw new Error(`Error fetching consultations: ${consultationsError.message}`);
        setConsultations(consultationsData);

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return {
    profile,
    courses,
    files,
    consultations,
    isLoading,
    error
  };
};
