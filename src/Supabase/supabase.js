import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zztdmxtwnkykekxoupjl.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dGRteHR3bmt5a2VreG91cGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MjIzMzksImV4cCI6MjAyODA5ODMzOX0.FhMSrqvQWwLseWLZhwEla2fXYoJfb85RONOoLcK_j1U";
export const supabase = createClient(supabaseUrl, supabaseKey);
