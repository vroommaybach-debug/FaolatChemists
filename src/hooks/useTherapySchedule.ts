import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Fallback logic for environments without Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export function useTherapySchedule(patientId: string) {
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    // Initial fetch of active medications linked to approved profiles
    const fetchActiveTherapies = async () => {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        // Return mock data if no real DB
        setSchedule([
          { id: 1, name: 'Lisinopril', dosage: '10mg', time: '08:00 AM', status: 'taken', type: 'pill' },
          { id: 2, name: 'Atorvastatin', dosage: '20mg', time: '08:00 PM', status: 'upcoming', type: 'pill' },
          { id: 3, name: 'Metformin', dosage: '500mg', time: '08:00 PM', status: 'upcoming', type: 'pill' }
        ]);
        return;
      }

      const { data } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('patient_id', patientId)
        .eq('status', 'approved');
      if (data) setSchedule(data);
    };

    fetchActiveTherapies();

    if (!import.meta.env.VITE_SUPABASE_URL) return;

    // Establish live listener to immediately adjust timeline display when pharmacist reviews changes
    const channel = supabase
      .channel('live-therapy-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'prescriptions', filter: `patient_id=eq.${patientId}` },
        () => fetchActiveTherapies()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [patientId]);

  return schedule;
}
