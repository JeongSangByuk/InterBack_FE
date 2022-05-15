<template>
  <div class="c">
    <button type="button" class="btn btn-primary" @click="startRecording()">
      start
    </button>

    <button type="button" class="btn btn-primary" @click="stopRecording()">
      stop
    </button>
  </div>
</template>

<script scoped>
import Recorderx, { ENCODE_TYPE } from "recorderx";
import axios from "axios";
import Constants from "../../utils/Constants";
const rc = new Recorderx();

export default {
  name: "video-test",
  components: {},
  data() {
    return {};
  },
  methods: {
    startRecording() {
      // start recorderx
      rc.start()
        .then(() => {
          console.log("start recording");
        })
        .catch((error) => {
          console.log("Recording failed.", error);
        });
    },

    stopRecording() {
      // pause recorderx
      rc.pause();

      // get wav, but disable compression
      var wav = rc.getRecord({
        encodeTo: ENCODE_TYPE.WAV,
      });

      var frm = new FormData();
      frm.append("photo", wav);

      axios
        .get(Constants.API_URL + "/audio-test", frm, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.c {
  width: 100%;
  height: 100%;
  padding: 50px 0 0 200px;
}

button {
  width: 100px;
  height: 100px;
}
</style>
