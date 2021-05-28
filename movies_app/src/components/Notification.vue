<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters(['messagePool']),
  },
  watch: {
    messagePool: 'showNotification',
  },
  methods: {
    showNotification({ variant, msg, title }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
        autoHideDelay: 2000,
      });
    },
  },
};
</script>

<style scoped></style>
