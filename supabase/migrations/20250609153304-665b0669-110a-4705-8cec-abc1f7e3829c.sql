
-- First, let's add the admin role for the specified user
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'danilobenevides@live.com'
);

-- Create consultation_types table for different types of consultations
CREATE TABLE IF NOT EXISTS public.consultation_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 60,
  price DECIMAL(10,2),
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default consultation types
INSERT INTO public.consultation_types (name, description, duration_minutes, price, is_premium) VALUES
('Introductory Session', 'Free introduction to astrology consultation', 30, 0.00, false),
('Birth Chart Reading', 'Complete natal chart analysis', 60, 150.00, true),
('Solar Return', 'Your year ahead forecast', 45, 120.00, true),
('Relationship Synastry', 'Compatibility analysis', 90, 200.00, true),
('Career Reading', 'Professional guidance through astrology', 60, 150.00, true)
ON CONFLICT DO NOTHING;

-- Create appointment_slots table for available time slots
CREATE TABLE IF NOT EXISTS public.appointment_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(date, start_time)
);

-- Insert some default available slots (Monday to Friday, specific times)
WITH date_range AS (
  SELECT generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', INTERVAL '1 day')::DATE AS date_val
),
time_slots AS (
  SELECT unnest(ARRAY['10:00'::TIME, '11:30'::TIME, '13:00'::TIME, '14:30'::TIME, '16:00'::TIME]) AS start_time_val
)
INSERT INTO public.appointment_slots (date, start_time, end_time) 
SELECT 
  dr.date_val,
  ts.start_time_val,
  (ts.start_time_val + INTERVAL '1 hour 30 minutes')::TIME
FROM date_range dr
CROSS JOIN time_slots ts
WHERE EXTRACT(dow FROM dr.date_val) BETWEEN 1 AND 5
ON CONFLICT DO NOTHING;

-- Update consultations table to include more fields
ALTER TABLE public.consultations 
ADD COLUMN IF NOT EXISTS consultation_type_id UUID REFERENCES public.consultation_types(id),
ADD COLUMN IF NOT EXISTS appointment_slot_id UUID REFERENCES public.appointment_slots(id),
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS meeting_url TEXT,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;

-- Create learning_resources table
CREATE TABLE IF NOT EXISTS public.learning_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('article', 'video', 'pdf', 'course')),
  is_premium BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  file_url TEXT,
  thumbnail_url TEXT,
  duration_minutes INTEGER,
  difficulty_level TEXT DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert some sample learning resources
INSERT INTO public.learning_resources (title, description, resource_type, is_premium, content) VALUES
('Introduction to Astrology', 'Basic concepts and fundamentals of astrology', 'article', false, 'Learn the basics of astrology including signs, planets, and houses.'),
('Zodiac Signs Explained', 'Understanding the 12 zodiac signs', 'video', false, 'A comprehensive guide to all zodiac signs and their characteristics.'),
('Planetary Meanings', 'Deep dive into planetary influences', 'article', false, 'Understanding how planets influence our lives and personalities.'),
('Advanced Chart Reading', 'Professional techniques for chart interpretation', 'course', true, 'Master advanced chart reading techniques used by professional astrologers.'),
('Master Class Series', 'Comprehensive astrology education', 'video', true, 'In-depth video series covering all aspects of modern astrology.'),
('Professional Techniques', 'Tools and methods for professional practice', 'pdf', true, 'Advanced techniques and methodologies for professional astrologers.')
ON CONFLICT DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.consultation_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view active consultation types" ON public.consultation_types;
DROP POLICY IF EXISTS "Admins can manage consultation types" ON public.consultation_types;
DROP POLICY IF EXISTS "Anyone can view available appointment slots" ON public.appointment_slots;
DROP POLICY IF EXISTS "Admins can manage appointment slots" ON public.appointment_slots;
DROP POLICY IF EXISTS "Users can view published resources" ON public.learning_resources;
DROP POLICY IF EXISTS "Admins can manage learning resources" ON public.learning_resources;

-- RLS Policies for consultation_types (public read, admin write)
CREATE POLICY "Anyone can view active consultation types" 
  ON public.consultation_types 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage consultation types" 
  ON public.consultation_types 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for appointment_slots (public read available slots, admin write)
CREATE POLICY "Anyone can view available appointment slots" 
  ON public.appointment_slots 
  FOR SELECT 
  USING (is_available = true AND date >= CURRENT_DATE);

CREATE POLICY "Admins can manage appointment slots" 
  ON public.appointment_slots 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for learning_resources
CREATE POLICY "Users can view published resources" 
  ON public.learning_resources 
  FOR SELECT 
  USING (
    is_published = true AND (
      is_premium = false OR 
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND (role = 'paid' OR role = 'admin')
      )
    )
  );

CREATE POLICY "Admins can manage learning resources" 
  ON public.learning_resources 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Update consultations RLS policies (drop existing ones first)
DROP POLICY IF EXISTS "Users can view their own consultations" ON public.consultations;
DROP POLICY IF EXISTS "Users can create their own consultations" ON public.consultations;
DROP POLICY IF EXISTS "Users can update their own consultations" ON public.consultations;
DROP POLICY IF EXISTS "Users can delete their own consultations" ON public.consultations;
DROP POLICY IF EXISTS "Admins can view all consultations" ON public.consultations;
DROP POLICY IF EXISTS "Admins can manage all consultations" ON public.consultations;

CREATE POLICY "Users can view their own consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own consultations" 
  ON public.consultations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consultations" 
  ON public.consultations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can manage all consultations" 
  ON public.consultations 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create function to book consultation
CREATE OR REPLACE FUNCTION public.book_consultation(
  consultation_type_id UUID,
  appointment_slot_id UUID,
  consultation_title TEXT DEFAULT NULL,
  consultation_description TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  consultation_id UUID;
  slot_datetime TIMESTAMP WITH TIME ZONE;
  consultation_price DECIMAL(10,2);
  is_consultation_premium BOOLEAN;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Get consultation type details
  SELECT price, is_premium INTO consultation_price, is_consultation_premium
  FROM public.consultation_types
  WHERE id = consultation_type_id AND is_active = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid consultation type';
  END IF;

  -- Check if user has access to premium consultations
  IF is_consultation_premium THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND (role = 'paid' OR role = 'admin')
    ) THEN
      RAISE EXCEPTION 'Premium access required for this consultation type';
    END IF;
  END IF;

  -- Check if appointment slot is available
  SELECT (date + start_time) INTO slot_datetime
  FROM public.appointment_slots
  WHERE id = appointment_slot_id AND is_available = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Appointment slot not available';
  END IF;

  -- Create consultation
  INSERT INTO public.consultations (
    user_id, 
    consultation_type_id,
    appointment_slot_id,
    title, 
    description, 
    date, 
    price,
    is_premium,
    status
  ) VALUES (
    auth.uid(),
    consultation_type_id,
    appointment_slot_id,
    COALESCE(consultation_title, (SELECT name FROM public.consultation_types WHERE id = consultation_type_id)),
    consultation_description,
    slot_datetime,
    consultation_price,
    is_consultation_premium,
    'scheduled'
  ) RETURNING id INTO consultation_id;

  -- Mark appointment slot as unavailable
  UPDATE public.appointment_slots
  SET is_available = false
  WHERE id = appointment_slot_id;

  RETURN consultation_id;
END;
$$;

-- Create function to get available appointment slots
CREATE OR REPLACE FUNCTION public.get_available_slots(
  consultation_date DATE DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  date DATE,
  start_time TIME,
  end_time TIME,
  datetime_display TEXT
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    s.id,
    s.date,
    s.start_time,
    s.end_time,
    TO_CHAR(s.date + s.start_time, 'YYYY-MM-DD HH24:MI') as datetime_display
  FROM public.appointment_slots s
  WHERE s.is_available = true 
    AND s.date >= CURRENT_DATE
    AND (consultation_date IS NULL OR s.date = consultation_date)
  ORDER BY s.date, s.start_time;
$$;

-- Add updated_at trigger to new tables (drop if exists first)
DROP TRIGGER IF EXISTS update_consultation_types_updated_at ON public.consultation_types;
DROP TRIGGER IF EXISTS update_appointment_slots_updated_at ON public.appointment_slots;
DROP TRIGGER IF EXISTS update_learning_resources_updated_at ON public.learning_resources;

CREATE TRIGGER update_consultation_types_updated_at
  BEFORE UPDATE ON public.consultation_types
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_appointment_slots_updated_at
  BEFORE UPDATE ON public.appointment_slots
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_learning_resources_updated_at
  BEFORE UPDATE ON public.learning_resources
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
