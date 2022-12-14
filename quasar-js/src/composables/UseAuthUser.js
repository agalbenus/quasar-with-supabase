import { ref } from "vue";

import useSupabase from "src/boot/supabase";
import { useQuasar } from "quasar";

const user = ref(null);

const generateUUID = () => {
  const urlBlob = URL.createObjectURL(new Blob([]));
  return urlBlob.substring(urlBlob.length - 36);
};

export default function useAuthUser() {
  const { supabase } = useSupabase();
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const loginWithSocialProvider = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth(provider);
    if (error) throw error;
    return data;
  };

  const attemptLoginFromEmail = async (router, route) => {
    const $q = useQuasar();
    if (Object.keys(route.query).includes("attemptLoginAndRedirectTo")) {
      let timerCount = 0;
      let wait = !isLoggedIn();
      $q.loading.show({
        message: "Logging in attempt ...",
      });
      while (wait) {
        await new Promise((resolve) =>
          setTimeout(() => {
            if (timerCount < 6) {
              timerCount++;
              wait = !isLoggedIn();
            } else {
              wait = false;
            }
            resolve();
          }, 500)
        );
      }
      $q.loading.hide();
      if (isLoggedIn()) {
        //if login from email redirection succeded go to authenticated main page
        router.replace({ name: route.query["attemptLoginAndRedirectTo"] });
      } else {
        //fallack to login page
        router.replace({ name: "login" });
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: meta,
        emailRedirectTo: `${window.location.origin}/login?attemptLoginAndRedirectTo=me`,
      },
    });
    if (error) throw error;
    return data;
  };

  const update = async (dataToUpdate) => {
    const { data, error } = await supabase.auth.updateUser(dataToUpdate);
    if (error) throw error;
    return data;
  };

  const sendPasswordResetEmail = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return data;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    attemptLoginFromEmail,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
  };
}
