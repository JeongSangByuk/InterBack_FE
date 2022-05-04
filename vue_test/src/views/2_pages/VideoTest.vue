<template>
  <div class="c">
    <button @click="$refs.first.goToSlide(1)">다음</button>

    <button @click="$refs.first.goToSlide(0)">다음</button>
    <VueperSlides
      :touchable="false"
      :infinite="false"
      :bullets="false"
      :arrows="false"
      ref="first"
      fixed-width="100%"
      fixed-height="100%"
    >
      <vueper-slide :key="1" :title="1">
        <template v-slot:content>
          <div class="te">
            <p>qweeqw</p>
          </div>
        </template>
      </vueper-slide>

      <vueper-slide :key="2" :title="2">
        <template v-slot:content>
          <div class="te1">
            <p>qweeqw</p>
          </div>
        </template>
      </vueper-slide>
    </VueperSlides>
  </div>
</template>

<script scoped>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "video-test",
  components: { VueperSlides, VueperSlide },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.c {
  width: 100%;
  height: 100%;
  padding: 50px 0 0 200px;
}

.te {
  width: 500px;
  height: 500px;
  background-color: antiquewhite;
}

.te1 {
  width: 500px;
  height: 500px;
  background-color: blue;
}
</style>
