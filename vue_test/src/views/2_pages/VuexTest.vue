<template>

  <div class="container">
    <div>
        <h1>vuex test page</h1>
      
        user index = {{ index }}
        user index getter = {{userIndex}}                
        <button @click="increase">increase button</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";

export default {
    setup() {       
        const store = useStore();

        const index = computed(() => store.state.moduleUserIndex.index);
        const userIndex = computed(() => store.getters["moduleUserIndex/getUserIndex"]);
        const increase = () => store.commit("moduleUserIndex/setUserIndex", index.value + 1);

        return { index, userIndex, increase };    

    }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/vuex-test.scss";
</style>
