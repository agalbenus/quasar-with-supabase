<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlePasswordRecoveryEmail"
    >
      <p class="col-12 text-h5 text-center">Recover Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
        <q-input label="Email" v-model="email" />
        <div class="full-width q-pt-md">
          <q-btn
            label="Send recovery email"
            color="primary"
            class="full-width"
            outline
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width">
          <q-btn
            :to="{ name: 'login' }"
            label="Back"
            color="black"
            class="full-width"
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "ForgotPasswordPage",
  setup() {
    const email = ref("");

    const { sendPasswordResetEmail } = useAuthUser();

    const handlePasswordRecoveryEmail = async () => {
      await sendPasswordResetEmail(email.value);
      alert(`Password recovery email sent to: ${email.value}`);
    };

    return {
      handlePasswordRecoveryEmail,
      email,
    };
  },
});
</script>
