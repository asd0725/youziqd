<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <h1>柚子最受欢迎的影评</h1>
      <div class="comment_body" v-for="item in reping_list" :key="item.id">
        <div class="imgs">
          <router-link
            :to="{ name: 'moviedetail', query: { movie_id: item.movie_id } }"
          >
            <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
          </router-link>
        </div>
        <div class="comments">
          <div class="comments_int">
            <div class="img">
              <img v-bind:src="item.user_img" alt="" />
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
            <p>{{ item.comment }}</p>
          </div>
          <div class="dianzan">
            <div class="cai"><Icon type="ios-thumbs-down" />{{ item.cai }}</div>
            <div class="zan"><Icon type="ios-thumbs-up" />{{ item.zan }}</div>
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
  data() {
    return {
      value: 4.5,
      reping_list: [],
    };
  },
  created() {
    this.getcommentslist();
  },
  methods: {
    getcommentslist() {
      let that = this;

      this.axios({
        url: "comment/allreping",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.reping_list = res.data.data;
      });
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
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 30px;
    h1 {
      font-weight: normal;
      color: #007700;
    }
    .comment_body {
      display: flex;
      margin-top: 30px;
      width: 990px;
      border-bottom: 2px dashed #f0f3f5;
      .imgs {
      }
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
            cursor: pointer;
          }
          .cai {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
