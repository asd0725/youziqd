<template>
  <div class="container">
    <div class="wel">柚子影评</div>
    <div class="main">
      <h1>欢迎注册</h1>
      <div class="rbody">
        <el-form
          :model="regForm"
          :rules="redRule"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <el-form-item label="邮箱" prop="user_email">
            <el-input v-model="regForm.user_email"></el-input>
            
          </el-form-item>
          <el-form-item label="昵称" prop="user_name">
            <el-input v-model="regForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user_ur">
            <el-input v-model="regForm.user_ur" onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password1">
            <el-input v-model="regForm.password1" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="regForm.password2" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-top:20px" @click="regsave" >立即创建</el-button>
            <el-button type="info" @click="resetForm(regForm)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog
  title="注册成功"
  :visible.sync="toLoginVisible"
  width="30%"
  >
  <span>现在去登录</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="toLoginVisible = false">取 消</el-button>
    <el-button type="primary" @click="tologin">确 定</el-button>
  </span>
</el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var regUsername=(rule,value,callback)=>{
      for(var item of this.regAgainList){
        if(value ==item.user_name){
          callback(new Error('昵称已被占用'))
        }
      }
      callback()
    };
    var regUSerur=(rule,value,callback)=>{
      for(var item of this.regAgainList){
        if(value ==item.user_ur){
          callback(new Error('用户名已被注册'))
        }
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
            if (this.regForm.password2 !== '') {
            this.$refs.ruleForm.validateField('password2');
          }
          callback();
        }
      };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      regForm: {
        user_email:"",
        user_name: "",
        user_ur: "",
        password1: "",
        password2: "",
      },
      yuser_id:'',
      redRule: {
        user_email:[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        user_name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
          {validator:regUsername,trigger:['blur','change']}
        ],
        user_ur: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
          {validator:regUSerur,trigger:['blur','change']}
        ],
        password1: [
         {validator:validatePass,trigger:['blur','change']},
         {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
        password2: [{validator:validatePass2,trigger:['blur','change']}],
      },

      regAgainList:[],  //已注册用户信息
      toLoginVisible:false

    };
  },
  created(){
      this.getregUserId();
      this.regAgain()
  },
  methods:{
      async getregUserId(){
          const res =await this.axios({
              url:'user/reguserid',
              method:'get'
          })
        this.yuser_id = res.data.data[0].user_id

      },


      //注册事件并预验证
      regsave(){
          this.$refs.ruleForm.validate((valid)=>{
              if(!valid) return;
              this.axios({
                  url:'user/reguser',
                  method:'post',
                  params:{
                      user_img:'',
                      user_email:this.regForm.user_email,
                      user_name:this.regForm.user_name,
                      user_ur:this.regForm.user_ur,
                      user_id:this.yuser_id+1,
                      password:this.regForm.password1
                  }
              }).then((res)=>{
                  // console.log(res.data.msg);
                  // this.$message.success(res.data.msg)
                  if(res.data.code==200){
                    this.$message.success(res.data.msg)
                    this.toLoginVisible = true
                  }else if(res.data.code ==400){
                    this.$message.success(res.data.msg)
                  }
              })
          })
      },


      //获取已注册用户信息
      async regAgain(){
        const res = await this.axios({
          url:'user/regagain',
          method:'get'
        })

        this.regAgainList = res.data.data
      },


    //表单重置事件
    resetForm(){
      this.$refs.ruleForm.resetFields();
    },

    //跳转道登录页面
    tologin(){
      this.$router.push({name:'login'})
      this.toLoginVisible = false
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/register.png");
  display: flex;
  .wel {
    font-size: 40px;
    color: #000;
    margin-left: 10%;
    padding-top: 10%;
  }
  .main {
    width: 450px;
    height: 500px;
    background-color: antiquewhite;
    margin-left: 20%;
    margin-top: 11%;
    h1 {
      text-align: center;
    }
    .rbody {
      margin: 10px;
      width: 385px;
      margin-left: -20px;
    }
  }
}
</style>
