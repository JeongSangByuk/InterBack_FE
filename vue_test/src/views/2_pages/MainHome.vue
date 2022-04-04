<template>
  <div>
    <AppHeader></AppHeader>
    mainHome
    <button>
      <router-link to="/login">login</router-link>
    </button>
  </div>
</template>

<script>
import AppHeader from "@/views/1_layouts/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss"></style>
