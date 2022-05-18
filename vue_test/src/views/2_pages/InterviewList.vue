<template>
  <div class="container">
    <div class="title">전체 면접 목록</div>

    <div class="interview-list-container">
        <div id="app">
            <table>
                <thead>
                    <th v-for="(item,index) in header" :key="index">{{item}}</th>
                </thead>
                <tbody>
                    <tr v-for="(line,index) in ranking" :key="index">
                        <td v-for="(item,index) in line" :key="index">{{item}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>    
  </div>
</template>

<script>
export default {
    data() {
        return {
            header: ["이름","날짜","길이"],
            ranking: [
                ['AB전자 1차 면접', '2.8. 오후 4:00', '1:00:03'],
                ['AB전자 1차 면접', '2.8. 오후 4:00', '1:00:03'],
                ['AB전자 1차 면접', '2.8. 오후 4:00', '1:00:03'],
                ['AB전자 1차 면접', '2.8. 오후 4:00', '1:00:03']
            ]
        }        
    }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-list.scss";
</style>
