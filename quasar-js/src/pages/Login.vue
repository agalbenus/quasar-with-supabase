<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Email" v-model="form.email" />
        <q-input label="Password" v-model="form.password" />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            :to="{ name: 'register' }"
            label="Register"
            color="primary"
            class="full-width"
            flat
          />
          <div class="full-width">
            <q-btn
              :to="{ name: 'forgot-password' }"
              label="Forgot password"
              color="primary"
              class="full-width"
              flat
            />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<style>
.show {
  border: 2px outset red;
  background-color: lightblue;
  text-align: center;
}
</style>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { login, attemptLoginFromEmail } = useAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "me" });
      } catch (error) {
        alert(error.message);
      }
    };

    onMounted(async () => {
      await attemptLoginFromEmail(router, route);
    });

    return {
      form,
      handleLogin,
    };
  },
});
</script>
