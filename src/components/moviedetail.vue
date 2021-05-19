<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <div class="main_body">
        <!-- 电影信息，导演演员..... -->
        <div class="message">
          <h1>{{ movieDetailList.movie_name }}</h1>
          <div class="form">
            <div class="imgs">
              <img v-bind:src="movieDetailList.movie_img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':movieDetailList.movie_img" alt="" />
            </div>
            <div class="actor">
              <p>导演：{{ movieDetailList.director }}</p>
              <p>编剧: {{ movieDetailList.Screenwriter }}</p>
              <p>
                演员:
                {{ movieDetailList.actor }}
              </p>
              <p>类型: {{ movieDetailList.type }}</p>
              <p>制片国家/地区: {{ movieDetailList.area }}</p>
              <p>语言: {{ movieDetailList.language }}</p>
              <p>上映日期: {{ movieDetailList.showtime }}</p>
              <p>片长: {{ movieDetailList.movietime }}</p>
            </div>
            <div class="fenshu">
              <h3>柚子评分</h3>
              <div class="pingfen">
                <div class="math">3.7</div>
                <!-- 评分和数字在一行 -->
                <div class="xing">
                  <!--  -->
                  <div class="xings">
                    <el-rate
                      v-model="value"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}"
                    >
                      >
                    </el-rate>
                  </div>
                  <div class="renshu">1590人评价</div>
                </div>
              </div>
              <div class="score">
                <!-- 待2添加 echarts -->
              </div>
            </div>
          </div>
        </div>

        <!-- 给电影评价 -->
        <div class="pingjia">
          <!-- 发表评论按钮 -->
          <el-button size="mini" type="primary" @click="getuserif()"
            >写评论</el-button
          >
          <!-- 评价分数位置 -->
          <div class="gfs">
            <div class="numbers">评价：</div>
            <div class="rate1">
              <!-- 给电影评价分数 -->
              <el-rate v-model="rate" show-text :colors="colors"> </el-rate>
            </div>
          </div>

          <!-- dialog框体 -->
          <el-dialog
            title="写影评"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <!-- before-close为关闭前调用函数 -->
            <span>给个评价吧?(可选):</span>
            <el-rate v-model="rate" show-text :colors="colors"> </el-rate>
            <span>简短评论</span>
            <el-input
              v-model="comments"
              placeholder="请输入内容"
              maxlength="140"
              show-word-limit
              type="textarea"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="saveComment()">保 存</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="还未登录"
            :visible.sync="dialogLogin"
            width="30%"
            :before-close="handeleCLoseLogin"
          >
            <!-- before-close为关闭前调用函数 -->
            <span>登录后评价！</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="logins()">去登录</el-button>
            </span>
          </el-dialog>
        </div>

        <!-- 电影简介 -->
        <div class="brief">
          <h2>{{ movieDetailList.movie_name }}的剧情简介 · · · · · ·</h2>
          <p>
            {{ movieDetailList.brief }}
          </p>
        </div>

        <!-- 电影演员信息 -->
        <div class="actors">
          <h2>{{ movieDetailList.movie_name }}的演职员 · · · · · ·</h2>
          <div class="paichu">
            <!--图片姓名导演演员居中 -->
            <div
              class="detail"
              v-for="item in movieDetailActorList"
              :key="item.id"
            >
              <div class="imagess">
                <img v-bind:src="item.actor_img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.actor_img" alt="" />
              </div>
              <p>{{ item.actor_name }}</p>
              <p>{{ item.actor_role }}</p>
            </div>
          </div>
        </div>

        <!-- 电影影评 -->
        <div class="comments">
          <h2>{{ movieDetailList.movie_name }}的影评 · · · · · ·</h2>
          <div class="pinglung" v-for="item in moviecomment" :key="item.id">
            <div class="pinglung_b">
              <div class="yz_name">{{item.user_name}}</div>
              <!-- 评论者网名-->
              <div class="yz_rate">
                <!-- 评论分数-->
                <el-rate
                  v-model=item.rate
                  disabled
                  text-color="#ff9900"
                  score-template="{value}"
                  style="margin-top: 5px"
                >
                </el-rate>
              </div>
              <div class="yz_time">{{item.time}}</div>
              <!-- 评论日期-->
            </div>
            <!-- 评论内容-->

            <div class="commenttext">
              <p style="font-size: 20px">
                　{{item.comment}}
              </p>
            </div>

            <div class="dianzan">
              <!-- 123
              <button @click="zanadd"><Icon type="ios-thumbs-up" /></button> 234
              <button><Icon type="ios-thumbs-up" /></button> -->
              <!-- 点赞按钮-->
            </div>
          </div>
        </div>
      </div>
      <div class="tuijian">
        <h2>柚子推荐</h2>
        <div
          class="tuijian_info"
          v-for="(item, index) in tuijian_list"
          :key="item.id"
        >
          <div class="number">{{ index + 1 }}</div>
          <div class="name">
            <router-link
              :to="{
                name: 'moviedetail',
                query: { movie_id: item.movie_id },
              }"
            >
              {{ item.movie_name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <home_bottom></home_bottom>
  </div>
</template>

<script>
import home_head from "../components/home_head";
import home_bottom from "../components/home_bottom";
export default {
  name: "moviedetail",
  data() {
    return {
      value: 3.7,
      dialogVisible: false,
      dialogLogin: false,
      value1: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      msg: "",
      movieDetailList: [],
      movie_id: "",
      movieDetailActorList: [],
      tuijian_list: [],
      showif: true,
      tokenStr: "",
      commentTime: "",
      userInfoList: [],
      rate: 0,
      comments: "",
      comnumber: "", //评论人数
      comrate: "", //评论平均分
      movie_name: "",
      moviecomment:[],    //电影评论数组
    };
  },
  created() {
    this.movie_id = this.$route.query.movie_id;
    this.getMovieDetail();
    this.getcomnumber();
    this.getMovieDetailActor();
    this.gettuijianlist();
    this.tokenStr = window.sessionStorage.getItem("token");
    this.commentTime = this.getdate();
    this.getUser();
    this.getmoviecomm();
  },
  methods: {
    handleClose(done) {
      this.$confirm("还未保存，是否关闭！")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handeleCLoseLogin(done) {
      this.$confirm("还未登录，是否关闭！")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //获取电影详情信息
    async getMovieDetail() {
      // this.axios({
      //   url: "movie/movieDetail",
      //   mehod: "get",
      //   params: {
      //     movie_id: this.movie_id,
      //   },
      // }).then((res) => {
      //   // console.log(res.data.data[0]);
      //   this.movieDetailList = res.data.data[0];
      // });

      const res = await this.axios({
        url: "movie/movieDetail",
        method: "get",
        params: {
          movie_id: this.movie_id,
        },
      });
      // console.log(res);

      this.movieDetailList = res.data.data[0];
      this.movie_name = res.data.data[0].movie_name;
    },

    //获取用户登录过的信息
    async getUser() {
      const res = await this.axios({
        url: "user/auth",
        method: "post",
        params: {
          token: this.tokenStr,
        },
      });
      this.userInfoList = res.data.data[0];
    },

    //获取演员信息
    getMovieDetailActor() {
      this.axios({
        url: "movie/movieDetailActor",
        method: "get",
        params: {
          movie_id: this.movie_id,
        },
      }).then((res) => {
        // console.log(res.data.data);
        this.movieDetailActorList = res.data.data;
      });
    },

    //获取推荐表
    gettuijianlist() {
      let that = this;
      this.axios({
        url: "tuijian/tuijian",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.tuijian_list = res.data.data;
      });
    },
    //获取电影评论
    getmoviecomm(){
      this.axios({
        url:'comment/getmoviecomm',
        method:'post',
        params:{
          movie_id:this.movie_id
        }
      }).then((res)=>{
        this.moviecomment= res.data.data
      })
    },

    getuserif() {
      if (!this.tokenStr) {
        this.dialogLogin = true;
      } else {
        this.dialogVisible = true;
      }
    },
    logins() {
      this.$router.push({ name: "login" });
      this.dialogLogin = false;
    },

    //获取评论人数及平均分
    async getcomnumber() {
      let res = await this.axios({
        url: "comment/commentnumber",
        method: "post",
        params: {
          movie_id: this.movie_id,
        },
      });
      //  console.log(res);
      this.comnumber = res.data.data[0].people_number;
      this.comrate = res.data.data[0].rate;
    },

    //保存评论
    async saveComment() {
      const movie_id = this.movieDetailList.movie_id;
      const img = this.movieDetailList.movie_img;
      const user_img = this.userInfoList.user_img;
      const user_name = this.userInfoList.user_name;
      const user_id = this.userInfoList.user_id;
      const movie_name = this.movieDetailList.movie_name;
      // console.log(movie_name);
      if (this.rate == "") {
        this.$message.error("请给个评分");
      } else if (this.comments == "") {
        this.$message.error("请填写评论");
      } else {
        await this.axios({
          url: "comment/insert",
          method: "post",
          params: {
            img: img,
            user_img: user_img,
            user_name: user_name,
            rate: this.rate,
            time: this.commentTime,
            comment: this.comments,
            movie_id: movie_id,
            user_id: user_id,
            movie_name: this.movie_name,
          },
        }).then((res) => {
          console.log("保存成功");
        });

        //关闭评论框
        this.dialogVisible = false;
        this.rate = 0;
        this.comments = "";
        this.$message.success("评论成功！");

        let newrate =
          (this.comrate * this.comnumber + this.rate) /
          (this.comnumber + 1).toFixed(1);
        Number(newrate);
        this.axios({
          url: "comment/uptocomment",
          method: "post",
          params: {
            people_number: this.comnumber + 1,
            rate: newrate,
            movie_id: this.movie_id,
          },
        });

        this.axios({
          url: "comment/uptocommentry",
          method: "post",
          params: {
            people_number: this.comnumber + 1,
            rate: newrate,
            movie_id: this.movie_id,
          },
        }).then((res) => {
          // console.log("asd");
        });
      }
    },

    getdate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
    zanadd() {
      console.log("asd");
    },
  },
  mounted() {
    // console.log(this.$route.query.movie_id);
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
  components: {
    home_head,
    home_bottom,
  },
};
</script>

<style scoped lang="less">
.container {
  .main {
    display: flex;
    padding-left: 5px;
    .main_body {
      width: 995px;
      height: auto;
      .message {
        height: 350px;
        .form {
          margin-top: 20px;
          display: flex;
          .imgs {
            width: 145px;
            height: 190px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .actor {
            width: 400px;
            height: 280px;
            margin-left: 15px;
            padding-right: 20px;
          }
          .fenshu {
            width: 200px;
            height: 190px;
            border-left: 1px solid #f0f3f5;
            padding-left: 15px;
            h3 {
              font-weight: normal;
              font-size: 12px;
            }
            .pingfen {
              display: flex;
              .math {
                height: 50px;
                font-size: 35px;
                line-height: 50px;
              }
              .xing {
                height: 50px;
                padding-top: 5px;
                .xings {
                }
                .renshu {
                }
              }
            }
          }
        }
      }
      .pingjia {
        display: flex;
        height: 30px;
        line-height: 30px;
        .gfs {
          margin-left: 15px;
          display: flex;
          .numbers {
          }
          .rate1 {
            margin-top: 5px;
          }
        }
      }
      .brief {
        margin-top: 15px;
        h2 {
          font-weight: normal;
          color: #007722;
          margin-bottom: 10px;
        }
        p {
          text-indent: 2em;
          font-size: 20px;
        }
      }
      .actors {
        margin-top: 20px;
        h2 {
          font-weight: normal;
          color: #007722;
        }
        .paichu {
          display: flex;
          .detail {
            width: 150px;
            height: 250px;
            margin-top: 15px;
            text-align: center;
            margin-right: 20px;
            .imagess{
              width: 145px;
              height: 190px;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .comments {
        margin-top: 20px;
        h2 {
          font-weight: normal;
          color: #007722;
        }
        .pinglung {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #f0f4f5;
          .pinglung_b {
            display: flex;
            margin-bottom: 8px;
            .yz_name {
              margin-right: 5px;
              font-size: 20px;
            }

            .yz_time {
              font-size: 20px;
            }
          }
          .dianzan {
            margin-left: 15px;
            float: right;
            button {
              outline: none;
              margin: 0;
              padding: 0;
              background-color: transparent;
              border: 0px solid transparent;
              font-size: 20px;
            }
          }
        }
      }
    }
    .tuijian {
      margin-top: 30px;
      h2 {
        font-weight: normal;
        color: #007722;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f3f5;
      }
      .tuijian_info {
        margin-top: 10px;
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f3f5;
        .number {
          width: 40px;
          font-size: 20px;
        }
        .name {
          width: 400px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
