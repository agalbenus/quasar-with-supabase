<template>
  <q-page class="flex flex-center">
    <div class="text-body1" v-if="user">
      Hello {{ user.user_metadata.name }}
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "MePage",
  setup() {
    const { user } = useAuthUser();

    return {
      user,
    };
  },
});
</script>
