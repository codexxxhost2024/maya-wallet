import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fftyirkucafyxyuvzlvq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdHlpcmt1Y2FmeXh5dXZ6bHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4MjQwOTUsImV4cCI6MjA1MDQwMDA5NX0.V5BG2shY4zMIDTpgyRBt9xF-Sgidkj_P5_gAFDPJzIc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);