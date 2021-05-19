<template>
  <div class="container">
    <div class="top">
      <div class="logo">
        <img src="../assets/login/longin_logo2.png" alt="" />
      </div>
      <div class="title">欢迎登录</div>
    </div>
    <div class="body">
      <div class="logo">
        <img src="../assets/login/login.jpg" alt="" />
      </div>
      <div class="login_box">
        <div class="login_top">账号登录</div>
        <!-- <div class="input1">
          <el-input placeholder="请输入内容">
            <template slot="prepend">账号</template>
          </el-input>
        </div>
        <div class="input1">
          <el-input placeholder="请输入内容">
            <template slot="prepend">密码</template>
          </el-input>
        </div> -->

        <div class="input1">
          <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input type="text" v-model="loginForm.name" onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="wjmm">
          <!-- 忘记密码 -->
          <el-link type="danger">忘记密码</el-link>
        </div>
        <div class="denglu">
          <el-button style="width: 350px" type="primary" plain @click="getLogin">登录</el-button>
        </div>
        <div class="zhuce">
          <!-- <Icon type="md-person-add" />
          <el-link type="success">立即注册</el-link> -->
          <div class="icons">
            <Icon type="md-person-add" />
          </div>
          <div class="zhuce2">
            <el-link type="success">
              <router-link  :to="{name:'register'}">
              立即注册
              </router-link>
              </el-link>
          </div>
        </div>
      </div>
    </div>
    <home_bottom></home_bottom>
  </div>
</template>

<script>
import home_bottom from "../components/home_bottom";
export default {
  name: "Login",
  data() {
    return {
      loginForm:{
        name:'asd0123',
        password:'asd0123'
      },
      loginRules:{
        name:[
          { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
  },
  methods:{
    getLogin(){
      let that = this;



      let name_length = this.loginForm.name.length;
      let password_length = this.loginForm.password.length;
      if((name_length>=5&&name_length<=12)&&(password_length>=5&&password_length<=12)){
      this.axios({
        url:'user/user',
        method:'post',
        params:{
          user_ur:this.loginForm.name,
          password:this.loginForm.password
        }
      }).then((res)=>{
        // let user = res.data.data
        // if(user){
        //   that.$router.push({name:'index',query:{user_id:user.user_id}})
        // }else{
        //   this.$message.error('账号或者密码错误！')
        if(res.data.code =='400'){
          this.$message.error('账号或者密码错误！')
        }else if(res.data.code == '200'){
          window.sessionStorage.setItem("token",res.data.token)
          this.$router.push({name:'index'})

        }
        // }
      })
      }

    },


  },
  components: {
    home_bottom,
  },
};
</script>

<style scoped lang="less">
.container {
  .top {
    display: flex;
    margin-left: 400px;
    .title {
      font-size: 40px;
      height: 200px;
      line-height: 200px;
    }
  }
  .body {
    background-color: #afbf90;
    display: flex;
    .logo {
      margin-left: 400px;
    }
    .login_box {
      width: 400px;
      height: 350px;
      background-color: white;
      margin-left: 50px;
      margin-top: 20px;
      .login_top {
        text-align: center;
        font-size: 25px;
        border-bottom: 1px solid #f0f3f5;
      }
      .input1 {
        width: 380px;
        margin-top: 20px;
        margin-left: -20px;
      }
      .wjmm {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-right: 5px;
      }
      .denglu {
        margin-left: 25px;
        padding-bottom: 20px;
        margin-top: 20px;
      }
      .zhuce {
        width: 400px;
        height: 72px;
        background-color: #f0f3f5;
        display: flex;
        justify-content: flex-end;
        .icons {
          margin-top: 25px;
        }
        .zhuce2 {
          margin-top: 25px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
