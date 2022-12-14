import { createClient } from "@supabase/supabase-js";
import { event } from "quasar";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://vkekubgjeijlowgjyhig.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZWt1YmdqZWlqbG93Z2p5aGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY2NDAwOTYsImV4cCI6MTk4MjIxNjA5Nn0.USpoug0mYgA0VwMIBTGHOsYn5wnkHqHqzJVlEENyS9A";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return {
    supabase,
  };
}
