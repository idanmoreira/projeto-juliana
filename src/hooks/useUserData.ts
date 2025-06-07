
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

interface CourseData {
  id: string;
  title: string;
  description: string;
}

interface UserCourseItem {
  id: string;
  progress: number;
  completed: boolean;
  courses: CourseData;
}

export const useUserData = () => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [files, setFiles] = useState<UserFile[]>([]);
  const [consultations, setConsultations] = useState<UserConsultation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch profile
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (profileError) {
            console.warn('Error fetching profile:', profileError);
            // Create fallback profile data from auth user
            const fallbackProfile: UserProfile = {
              id: user.id,
              display_name: user.name || null,
              avatar_url: null,
              role: user.role,
              is_paid: user.role === 'paid' || user.role === 'admin'
            };
            setProfile(fallbackProfile);
          } else {
            setProfile(profileData);
          }
        } catch (profileErr) {
          console.warn('Failed to fetch profile:', profileErr);
          const fallbackProfile: UserProfile = {
            id: user.id,
            display_name: user.name || null,
            avatar_url: null,
            role: user.role,
            is_paid: user.role === 'paid' || user.role === 'admin'
          };
          setProfile(fallbackProfile);
        }
        
        // Fetch courses
        try {
          const { data: userCoursesData, error: coursesError } = await supabase
            .from('user_courses')
            .select(`
              id, progress, completed,
              courses:course_id (id, title, description)
            `)
            .eq('user_id', user.id);
            
          if (coursesError) {
            console.warn('Error fetching courses:', coursesError);
            setCourses([]);
          } else {
            // Transform the data structure to match our component needs
            const formattedCourses = userCoursesData?.map((item: UserCourseItem) => ({
              id: item.id,
              course_id: item.courses.id,
              title: item.courses.title,
              description: item.courses.description,
              progress: item.progress,
              completed: item.completed
            })) || [];
            
            setCourses(formattedCourses);
          }
        } catch (coursesErr) {
          console.warn('Failed to fetch courses:', coursesErr);
          setCourses([]);
        }
        
        // Fetch files
        try {
          const { data: filesData, error: filesError } = await supabase
            .from('files')
            .select('*')
            .eq('user_id', user.id);
            
          if (filesError) {
            console.warn('Error fetching files:', filesError);
            setFiles([]);
          } else {
            const formattedFiles = filesData?.map(file => ({
              ...file,
              size: file.size.toString() // Convert to string to match interface
            })) || [];
            setFiles(formattedFiles);
          }
        } catch (filesErr) {
          console.warn('Failed to fetch files:', filesErr);
          setFiles([]);
        }
        
        // Fetch consultations
        try {
          const { data: consultationsData, error: consultationsError } = await supabase
            .from('consultations')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: true });
            
          if (consultationsError) {
            console.warn('Error fetching consultations:', consultationsError);
            setConsultations([]);
          } else {
            setConsultations(consultationsData || []);
          }
        } catch (consultErr) {
          console.warn('Failed to fetch consultations:', consultErr);
          setConsultations([]);
        }

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, isAuthenticated]);

  return {
    profile,
    courses,
    files,
    consultations,
    isLoading,
    error
  };
};
