<template>
  <div class="container">
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
              v-model="search_info"
              @keyup.enter.native="routes"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="routes"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="denglu" v-if="showif">
          <router-link :to="{ name: 'login' }">
            <el-button type="primary" plain size="mini">登录</el-button>
          </router-link>
        </div>
        <div class="userinfo" v-else>
          <div class="user_name">
            <div class="names">
              <router-link :to="{ name: 'user' }">
                {{ userinfolist.user_name }}
              </router-link>
            </div>
            <div class="logout">
              <el-button type="primary" plain size="mini" @click="logout"
                >退出</el-button
              >
            </div>
          </div>
          <div class="user_img">
            <router-link :to="{ name: 'user' }">
              <img v-bind:src="userinfolist.user_img==''?'https://s3.ax1x.com/2021/02/20/y5pGZ9.png':userinfolist.user_img" alt="" />
            </router-link>
          </div>
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
  </div>
</template>

<script>
export default {
  name: "home_head",
  props: {},
  data() {
    return {
      tabbarlist: [],
      search_info: "",
      click_number: 0,
      tokenStr: "",
      showif: true,
      userinfolist: [],
    };
  },
  created() {
    this.gettabbar();
    this.tokenStr = window.sessionStorage.getItem("token");
    this.showspd(this.tokenStr);
    this.geuser();

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

    geuser() {
      if (!this.tokenStr) {
        // this.$message.error("登录已过期，请重新登录");
      } else {
        this.axios({
          url: "user/auth",
          method: "post",
          params: {
            token: this.tokenStr,
          },
        }).then((res) => {
          // console.log(res);
          this.userinfolist = res.data.data[0];
        });
      }
    },

    routes() {
      this.$router.push({
        name: "movie_search",
        query: { search_info: this.search_info },
      });
    },

    showspd(tokenStr) {
      if (!tokenStr) {
        this.showif = true;
      } else {
        // 存在token时
        this.showif = false;
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.go(0);
    },
  },
  mounted(){
  },
  components: {},
  // watch:{
  //   $route(to,from){
  //     this.$router.go(0);
  //   }
  // }
};
</script>

<style scoped lang="less">
.container {
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
      .userinfo {
        margin-top: 20px;
        margin-right: 10px;
        display: flex;
        .user_name {
          margin-right: 10px;
          .names {
          }
          .logout {
          }
        }
        .user_img {
          width: 50px;
          height: 50px;
          img{
            width: 100%;
            height: 100%;
          }
        }
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
}
</style>
