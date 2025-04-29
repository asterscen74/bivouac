-- Evolution du modèle conceptuel de données
ALTER TABLE IF EXISTS public.reservations DROP COLUMN IF EXISTS itinerance;
ALTER TABLE IF EXISTS public.reservations ADD COLUMN IF NOT EXISTS tmb bool;

-- Pour le système d'annulation des réservations
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS uuid UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS annule BOOLEAN DEFAULT FALSE;
