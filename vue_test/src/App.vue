<template>
  
  <div id="app">
    <router-view/>

  </div>
</template>

<script>

import AppHeader from '@/views/1_layouts/AppHeader.vue'

export default {
  name: 'App',

  data(){
    return {

    }
  },

  methods : {

  },

  components: {
    AppHeader
  },
}
</script>

<style>
#app {
}
</style>
