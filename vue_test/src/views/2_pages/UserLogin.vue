<template>
  <div class="container">
    <div class="title">로 그 인</div>
    <div class="sub-title">
      혁신적인 온라인 면접 관리의 시작<br />InterBack에 오신것을 환영합니다.
    </div>

    <div class="login-container">
      <div class="login-box">
        <!-- id -->
        <div class="login-form">
          <p class="login-form__title">아 이 디</p>
          <input
            class="login-form__input"
            placeholder="아이디를 입력해주세요."
            type="text"
            v-model="id"
          />
        </div>

        <!-- pw -->
        <div class="login-form">
          <p class="login-form__title">비밀 번호</p>
          <input
            class="login-form__input"
            placeholder="비밀 번호를 입력해주세요."
            type="password"
            v-model="pass"
          />
        </div>
        <p class="login-box__find-pwd">비밀번호를 잊으셨나요?</p>
        <button 
          class="login-box__login-bnt"
          v-on:click="loginResult">          
            로 그 인</button>
        <button class="login-box__signup-bnt">
          회원 가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return{
      // id, pw에 해당하는 쿠키 가져오기
      id: this.$cookies.get("idCookie"),
      idSave:false,
      pass: this.$cookies.get("passwordCookie"),
      passwordSave: false
    };
  },
  
  methods : {
    loginResult() {
      console.log('login Button Click')
      console.log("id = " + this.id)
      console.log("passsword = " + this.pass)

      this.$cookies.set("idCookie", this.id);
      this.$cookies.set("passwordCookie", this.pass);
      
      // DB id, pw 확인 후 페이지 이동해야 함
      this.$router.replace({name:'Home'})

      this.fetchData();
      /*
      if(this.idSave) {
        console.log("idsave true")
        
        this.$cookies.set("idCookie", this.id);
      }
      */

    },

    fetchData() {
      console.log("fetch Data")
      
			this.$axios.post("3.39.74.53/api/user") //post로 바꾸기?
      .then((response)=>{
				console.log(response.data);
			})
      
			.then((err)=>{
				console.log(err);
			})
      
		}
  }
}

</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/user_login.scss";
</style>
