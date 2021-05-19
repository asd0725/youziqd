
<template>
  <div class="model">
    <el-card  shadow="always" class="box">
      <h1 style="margin-left: 150px">安家登录系统</h1>

      <el-form label-width="80px" style="margin: 60px 40px">
        <el-form-item label="用户名"  >
          <el-row>
            <el-col :span="20"> <el-input v-model="username"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-row>
            <el-col :span="20"> <el-input v-model="password" show-password></el-input></el-col>
          </el-row>

        </el-form-item>
        <el-button  @click="btnClick" type="success" style="margin-left: 180px">登录</el-button>
      </el-form>
    </el-card>
</div>
</template>

<script>
    export default {
        name: "login",
        data:function () {
           return{
             username:'',
             password:'',
             user:[]
           }
        },
      methods: {
        btnClick: function () {
          //alert(this.username);
          // console.log("asdh")
          let _this=this;
          this.axios({
            url:'user/login',
            method:'get',
            params:{
              username:this.username,
              password:this.password
            }
          }).then(function (res) {
            console.log(res.data)
              let user=res.data.data[0];

            console.log('res：')
            console.log(res);

              if (user){
                _this.$router.push('/');
              }else{
                alert('用户名或密码错误')
              }
          })
        }
        }
    }


</script>

<style scoped>
.box{

  border: 1px solid;
  width: 500px;
  height: 400px;
  margin-left: 320px;
  border-radius: 30px;
  margin-top: 50px;
  background-color: rgba(194, 217, 208, 0.3);

}
  .model{
    position: absolute;
    top: 0;
    background-image:url("../assets/home.jpg") ;
    background-size:100% 100%;
    width: 1270px;
    height: 562px;


  }
</style>
