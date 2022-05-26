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
  created(){
    if(this.$cookies.isKey("idCookie")){      
      console.log("login 완료")
      this.$router.replace({name:'Home'})
    }
  },

  data() {
    return{
      // id, pw에 해당하는 쿠키 가져오기
      id: "",
      pass: "",
    };
  },
  
  methods : {
    loginResult() {
      console.log("id = " + this.id)
      console.log("passsword = " + this.pass)

      const stringLoginData = JSON.stringify(this.$loginData);
      
  //    this.fetchData();

      // DB id, pw 확인 후 페이지 이동해야 함
      if(stringLoginData.includes('{"id":"' + this.id + '","pass":"' + this.pass + '"}')) { 
        
        this.$cookies.set("idCookie", this.id);
        this.$cookies.set("passwordCookie", this.pass);     

        this.$router.replace({name:'Home'})
      }
      else{
        console.log("!!!!! 로그인 실패");
        
        this.$router.go();
        alert("아이디, 비밀번호를 확인해주세요.")
      }      
    },

    fetchData() {
      console.log("fetch Data")
      
			this.$axios.get("http://3.39.74.53:8080/api/user/1") 
      .then((response)=>{
				console.log("response data =",response.data);
			})
      
			.then((err)=>{
				console.log("err =",err);
			})
      
		}
  }
}
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/user_login.scss";
</style>
