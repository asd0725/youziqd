<template>
  <div class="container">
    <home_head></home_head>
    <div v-if="showif" class="displays">
      <h1>登陆后查看我的信息！</h1>
    </div>
    <div v-else class="main">
      <div class="title">
        <h1>我的主页</h1>
      </div>
      <div class="top">
        <div class="imgs">
          <el-tooltip class="item" effect="dark" content="点击修改头像" placement="top-start">
          <el-upload
            action="http://localhost:3000/api/user/uptouserimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            :data="{user_id:userinfoList.user_id}"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-tooltip>
        </div>
        <div class="name_signature">
          <div class="name">{{ userinfoList.user_name }}</div>
          <div class="signature">gfdgsg</div>
        </div>
      </div>

      <div class="my_pinglun">
        <h2>我的评论</h2>
        <div class="main" v-for="item in userCommentList" :key="item.id">
          <div class="imgsee">
            <router-link
              :to="{ name: 'moviedetail', query: { movie_id: item.movie_id } }"
            >
              <img
                v-bind:src="
                  item.img == ''
                    ? 'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg'
                    : item.img
                "
                alt=""
              />
            </router-link>
          </div>
          <div class="comments">
            <div class="comments_int">
              <div class="img" style="width: 50px; height: 50px">
                <img
                  style="width: 100%; height: 100%"
                  v-bind:src="
                    item.user_img == ''
                      ? 'https://s3.ax1x.com/2021/02/20/y5pGZ9.png'
                      : item.user_img
                  "
                  alt=""
                />
              </div>
              <div class="name">{{ item.user_name }}</div>
              <div class="rate">
                <el-rate
                  v-model="item.rate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
              </div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="comments_content">
              <p>
                {{ item.comment }}
              </p>
            </div>
            <div class="dianzan">
              <div class="cai">
                <!-- <Icon type="ios-thumbs-down" />{{ item.cai }} -->
              </div>
              <!-- <div class="zan"><Icon type="ios-thumbs-up" />{{ item.zan }}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="修改头像"
      :visible.sync="userimgVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>点击+号上传头像</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userimgVisible = false">取 消</el-button>
        <el-button type="primary" @click="submituserimg">确 定</el-button>
      </span>
    </el-dialog>
    <home_bottom></home_bottom>
  </div>
</template>

<script>
import home_head from "../components/home_head";
import home_bottom from "../components/home_bottom";
export default {
  data() {
    return {
      value: 4.3,
      showif: true,
      tokenStr: "",
      userinfoList: [],
      user_id: "",
      userCommentList: [],
      userimgVisible: false, //修改头像框
      imageUrl: "", //修改头像路径
      newFile: "",
    };
  },
  created() {
    this.tokenStr = window.sessionStorage.getItem("token");
    this.showspd(this.tokenStr);
    this.getuser();
  },
  methods: {
    //上传图片成功后的函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$router.go(0)
    },

    //上传前的函数
    beforeAvatarUpload(file) {
      const isJpn = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJpn) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJpn && isLt1M;
    },

    //diaolog框关闭前询问
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    async getuser() {
      if (!this.tokenStr) {
      } else {
        // await this.axios({
        //   url:'http://localhost:3000/api/user/auth',
        //   method:'post',
        //   params:{
        //     token:this.tokenStr
        //   }
        // }).then((res)=>{
        //   // console.log(res);
        //   this.userinfoList = res.data.data[0];
        //   this.user_id = res.data.data[0].user_id
        // })

        const res = await this.axios({
          url: "user/auth",
          method: "post",
          params: {
            token: this.tokenStr,
          },
        });
        this.userinfoList = res.data.data[0];
        // this.user_id = res.data.data[0].user_id
        this.imageUrl =
          this.userinfoList.user_img == ""
            ? "https://s3.ax1x.com/2021/02/20/y5pGZ9.png"
            : this.userinfoList.user_img;
        this.getComment(this.userinfoList.user_id);
      }
    },
    getComment(user_id) {
      this.axios({
        url: "comment/comment",
        method: "get",
        params: {
          user_id,
        },
      }).then((res) => {
        // console.log(res);
        this.userCommentList = res.data.data;
      });
    },
    showspd(tokenStr) {
      if (!tokenStr) {
        this.showif = true;
      } else {
        this.showif = false;
      }
    },

    //打开dialog框
    uptouserimg() {
      this.userimgVisible = true;
    },

    //提交用户上传的头像
    submituserimg() {
      // this.axios({
      //   url:'/user/uptouserimg',
      //   method:'post',
      //   params:{
      //     file:this.newFile,
      //     user_id:this.userinfoList.user_id
      //   }
      // }).then((res)=>{
      //   if(res.data.code!=200){
      //     this.$message.error(res.data.msg)
      //   }else{
      //     this.$message.success(res.data.msg)
      //   }
      // })
      this.$refs.upload.submit();
    },
  },
  mounted() {},
  components: {
    home_head,
    home_bottom,
  },
};
</script>

<style scoped lang="less">
.container {
  .main {
    margin-left: 20px;
    margin-top: 20px;
    .title {
      h1 {
        font-weight: normal;
        padding-bottom: 20px;
        border-bottom: 1px dashed #f0f3f5;
      }
    }
    .top {
      display: flex;
      margin-top: 20px;
      .imgs {
        width: 50px;
        height: 50px;

        /deep/ .el-upload {
          width: 50px;
          height: 50px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }

      .name_signature {
        margin-left: 10px;
        .name {
          font-size: 15px;
          font-weight: 600;
        }
        .signature {
          font-size: 15px;
        }
      }
    }
    .my_pinglun {
      margin-top: 20px;
      width: 1100px;
      h2 {
        font-weight: normal;
        color: #007700;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f3f5;
      }
      .main {
        display: flex;
        border-bottom: 2px dashed #f0f3f5;

        .comments {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 30px;
          .comments_int {
            display: flex;
            .img {
              width: 50px;
              height: 50px;
            }
            .name {
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              margin-left: 10px;
            }
            .rate {
              height: 50px;
              display: flex;
              align-items: center;
              margin-left: 10px;
            }
            .time {
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              margin-left: 10px;
            }
          }
          .comments_content {
            font-size: 20px;
            p {
              text-indent: 2em;
            }
          }
          .dianzan {
            display: flex;
            flex-direction: row-reverse;
            .zan {
              margin-right: 10px;
            }
            .cai {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
