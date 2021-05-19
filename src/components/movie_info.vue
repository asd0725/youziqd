<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <h2>最新电影-影讯</h2>
      <!-- 正在上映 -->
      <div class="onshow">
        <h3>正在上映</h3>
        <div class="movie_body">
          <div class="on_movie" v-for="item in dreying_list" :key="item.id">
            <router-link :to="{ name: 'moviedetail' }">
              <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
              <div class="movie_name">{{item.movie_name}}</div>
              <div class="movie_rate">
                <el-rate
                  v-model=item.rate
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
              </div>
            </router-link>
            <div class="buttons">
              <a href="https://dianying.taobao.com/" target="blank"
                ><el-button size="mini" type="primary">选座购票</el-button></a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 即将上映 -->
      <div class="futershow">
        <h3>即将上映</h3>

        <div class="movie_body">
          <div class="on_movie" v-for="item in wsy_list" :key="item.id">
            <router-link :to="{ name: 'moviedetail' }">
              <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
            </router-link>
            <div class="movie_name">
              <router-link :to="{ name: 'moviedetail' }">
                {{item.movie_name}}
              </router-link>
            </div>
            <div class="movie_rate">暂无评分</div>
            <div class="buttons">
              <a href="https://dianying.taobao.com/" target="blank"
                ><el-button size="mini" type="primary">选座购票</el-button></a
              >
            </div>
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
      value: 3.7,
      dreying_list: [],
      wsy_list: [],
    };
  },
  created() {
    this.getdreyinglist();
    this.getwyslist();
  },
  methods: {
    getdreyinglist() {
      let that = this;
      this.axios({
        url: "reying/dreying",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.dreying_list = res.data.data
      });
    },
    getwyslist() {
      let that = this;
      this.axios({
        url: "reying/wsy",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.wsy_list = res.data.data
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
    h2 {
      font-weight: normal;
    }
    .onshow {
      width: 830px;
      margin-left: 8px;
      h3 {
        font-weight: normal;
        color: #007700;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f3f5;
      }
      .movie_body {
        display: flex;
        flex-wrap: wrap;
        .on_movie {
          width: 145px;
          margin-right: 20px;
          margin-top: 20px;
          .movie_name {
            text-align: center;
          }
          .movie_rate {
            text-align: center;
          }
          .buttons {
            text-align: center;
          }
        }
      }
    }
    .futershow {
      width: 830px;
      height: 800px;
      margin-left: 8px;
      margin-top: 20px;
      h3 {
        font-weight: normal;
        color: #007700;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f3f5;
      }
      .movie_body {
        display: flex;
        flex-wrap: wrap;
        .on_movie {
          width: 145px;
          margin-right: 20px;
          margin-top: 20px;
          .movie_name {
            text-align: center;
          }
          .movie_rate {
            text-align: center;
          }
          .buttons {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
