<template>
  <div class="container">
    <div class="search_body">
      <div class="main">
        <div class="main_top">
          <div class="title">
            <div class="imgs">
              <router-link :to="{ name: 'index' }">
                <img src="../assets/home/home_head.png" alt="" />
              </router-link>
            </div>
            <div class="inputs">
              <el-input
                placeholder="搜索电影"
                v-model="searchs"
                @keyup.enter.native="searchss"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchss"
                ></el-button>
              </el-input>
            </div>
          </div>
          <div class="denglu">
            <router-link :to="{ name: 'login' }">
              <el-button type="primary" plain size="mini">登录</el-button>
            </router-link>
          </div>
        </div>
        <div class="bottoms">
          <div
            class="navigation"
            v-for="(item, index) in tabbarlist"
            :key="item.id"
          >
            <router-link :to="{ name: item.url }"
              ><el-link type="primary" style="font-size: 20px">{{
                item.name
              }}</el-link></router-link
            >
            <span :class="index < 4 ? '' : 'hidden-lg-and-up'">|</span>
          </div>
        </div>
      </div>
      <div class="resort">
        <h1>搜索结果</h1>
        <div
          class="resort_info"
          v-for="item in search_list"
          :key="item.movie_id"
        >
          <el-row type="flex" :gutter=0>
            <el-col :span="4">
              <div class="imgs">
                <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
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
            </el-col>
            <el-col :span="20">
              <div class="info">
                <div class="movie_name">
                  <router-link
                    :to="{
                      name: 'moviedetail',
                      query: { movie_id: item.movie_id },
                    }"
                  >
                    {{ item.movie_name }}
                  </router-link>
                </div>
                <div class="movie_info">
                  <p>
                    {{ item.movie_info }}
                  </p>
                </div>
                <div class="movie_rate">
                  <el-rate
                    v-model="item.rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import home_bottom from "../components/home_bottom";
export default {
  data() {
    return {
      value: 3.9,
      tabbarlist: [],
      search_info: "",
      searchs: "",
      search_list: [],
    };
  },
  created() {
    this.gettabbar();
  },
  mounted() {
    this.search_info = this.$router.history.current.query.search_info;
    this.getmoviesearch(this.search_info);
  },
  methods: {
    gettabbar() {
      let that = this;
      this.axios({
        url: "tabbar/tabbar",
        method: "get",
      }).then((res) => {
        that.tabbarlist = res.data.data;
      });
    },
    getmoviesearch(search_in) {
      let that = this;
      this.axios({
        url: "remen/search",
        method: "get",
        params: { info: search_in },
      }).then((res) => {
        // console.log(res.data.data);
        this.search_list = res.data.data;
      });
    },
    searchss() {
      this.getmoviesearch(this.searchs);
    },
  },
  components: {
    home_bottom,
  },
};
</script>

<style scoped lang="less">
.container {
  .search_body {
    .main {
      height: 230px;
      background-color: #f0f3f5;
      .main_top {
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        .title {
          display: flex;
          .imgs {
          }
          .inputs {
            height: 91px;
            line-height: 91px;
            width: 700px;
          }
        }
        .denglu {
          height: 90px;
          line-height: 90px;
          margin-right: 10px;
        }
      }
      .bottoms {
        display: flex;
        margin-left: 25px;
        .navigation {
          font-size: 20px;

          span {
            margin-right: 20px;
            margin-left: 20px;
          }
        }
      }
    }
    .resort {
      width: 990px;
      margin-left: 20px;
      h1 {
        font-weight: normal;
        color: #007722;
        margin-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #f0f3f5;
      }
      .resort_info {
        margin-top: 20px;
        .imgs {
          width: 145px;
          height: 190px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
          .movie_name {
            font-size: 25px;
          }
          .movie_info {
            font-size: 20px;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              text-indent: 2em;
            }
          }
          .movie_rate {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
