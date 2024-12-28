import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastActive, setLastActive] = useState<number>(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const checkActivity = () => {
      if (session && Date.now() - lastActive > 3600000) { // 1 hour
        navigate('/pin');
      }
      setLastActive(Date.now());
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, checkActivity));

    return () => {
      events.forEach(event => document.removeEventListener(event, checkActivity));
    };
  }, [session, lastActive, navigate]);

  return { session, loading };
}