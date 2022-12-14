<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="resetPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="new password" v-model="password" />
        <div class="full-width q-pt-md">
          <q-btn
            label="Reset password"
            color="primary"
            class="full-width"
            outline
            size="lg"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ResetPasswordPage",
  setup() {
    const password = ref("");

    const { update } = useAuthUser();
    const router = useRouter();

    const resetPassword = async () => {
      await update({ password: password.value });
      router.replace({
        name: "login",
        query: { attemptLoginAndRedirectTo: "me" },
      });
    };

    return {
      resetPassword,
      password,
    };
  },
});
</script>
