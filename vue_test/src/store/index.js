import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { moduleUserIndex } from "@/store/modules/moduleUserIndex";

export default createStore({
    modules: { moduleUserIndex},
    plugins: [
    createPersistedState({
        // 작성한 모듈만 저장
        paths: ['moduleUserIndex'],
    })
  ]
});