<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <div class="main_left">
        <h1>选电影</h1>
        <div class="movie_body">
              <div class="movie_bodys1">
                <div class="on_movie" v-for="item in movie_all" :key="item.movie_id">
                  <router-link :to="{ name: 'moviedetail' ,query:{movie_id:item.movie_id}}">
                    <div class="imgwh">
                    <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />

                    </div>
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

                  </div>
                </div>
              </div>
          </el-tabs>
        </div>
        <div class="jiazai">
          <el-button  style="width:750px" :plain="true" @click="jiazai()" type="primary"  :disabled=button_display>{{button_name}}</el-button>
        </div>
      </div>
      <div class="main_right">
        <h3>柚子推荐电影</h3>
        <div class="ytuijian" v-for="item in tuijian_list" :key="item.movie_id">
          <router-link :to="{ name: 'moviedetail' ,query:{movie_id:item.movie_id}}">
            <div class="tui">{{item.movie_name}}</div>
          </router-link>

          <div class="tuirs"></div>
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
      value: 3.6,
      all_number: "",
      r_number: 15,
      movie_all: [],
      button_display: false,
      button_name: "加载更多",
      tuijian_list: [],
    };
  },
  created() {
    this.getlistAll();
    this.gettuijianlist();
  },
  methods: {
    getlistAll() {
      let that = this;

      this.axios({
        url: "remen/number",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data.length);
        that.all_number = res.data.data.length;
      });

      this.axios({
        url: "remen/all",
        method: "get",
        params: {
          limts: this.r_number,
        },
      }).then((res) => {
        // console.log(res.data.data);
        that.movie_all = res.data.data;
      });
    },
    jiazai() {
      let that = this;
      if (this.r_number <= this.all_number) {
        this.r_number += 5;
        this.axios({
          url: "remen/all",
          method: "get",
          params: {
            limts: this.r_number,
          },
        }).then((res) => {
          // console.log(res.data.data);
          that.movie_all = res.data.data;
        });
      } else {
        this.$message("没有更多了!");
        this.button_display = true;
        this.button_name = "没有更多了！";
      }
    },
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
    margin-left: 8px;
    margin-top: 20px;
    display: flex;
    .main_left {
      width: 860px;
      h1 {
        font-weight: normal;
        color: #007700;
      }
      .movie_body {
        margin-top: 20px;
        .movie_bodys1 {
          display: flex;
          flex-wrap: wrap;
          .on_movie {
            width: 145px;
            margin-right: 20px;
            margin-top: 20px;
            .imgwh{
              width: 145px;
              height: 190px;
              img{
                width: 100%;
                height: 100%;
              }
            }
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
      .jiazai {
        width: 810px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    }
    .main_right {
      margin-left: 20px;
      h3 {
        font-weight: normal;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f3f5;
        margin-left: 20px;
        color: #007700;
      }
      .ytuijian {
        width: 380px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f3f5;
      }
    }
  }
}
</style>
