<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <h1>选电影-分类</h1>

      <!-- 修改sql后使用 -->
      <!-- <div class="movie_options" v-for="o in 3" :key="o">
        <div class="leixing">        
          <el-button
            v-for="(o, index) in 6"
            :key="o"
            :autofocus="index > 0 ? 'fasle' : 'true'"
            size="mini"
            >全部类型</el-button
          >
        </div>
      </div> -->
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="最新">
          <div class="classify_info">
            <div
              class="classify_tpxx"
              v-for="item in movieClassify_list"
              :key="item.movie_id"
            >
              <div class="imgs">
                <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                  <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
                </router-link>
              </div>
              <div class="im_name">
                <div>
                  <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                  {{ item.movie_name }}
                  </router-link>
                  </div>
                <div class="number">{{ item.rate }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="喜剧">
          <div class="classify_info">
            <div
              class="classify_tpxx"
              v-for="item in movieClassify_list"
              :key="item.movie_id"
            >
              <div class="imgs">
                <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
                </router-link>
              </div>
              <div class="im_name">
                <div>
                  <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                  {{ item.movie_name }}
                  </router-link>
                  </div>
                <div class="number">{{ item.rate }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动作">
          <div class="classify_info">
            <div
              class="classify_tpxx"
              v-for="item in movieClassify_list"
              :key="item.movie_id"
            >
              <div class="imgs">
                <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
                </router-link>
              </div>
              <div class="im_name">
                <div>
                  <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                  {{ item.movie_name }}
                  </router-link>
                  </div>
                <div class="number">{{ item.rate }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="科幻">
          <div class="classify_info">
            <div
              class="classify_tpxx"
              v-for="item in movieClassify_list"
              :key="item.movi_id"
            >
              <div class="imgs">
                <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
                </router-link>
              </div>
              <div class="im_name">
                <div>
                  <router-link
                  :to="{
                    name: 'moviedetail',
                    query: { movie_id: item.movie_id },
                  }"
                >
                  {{ item.movie_name }}
                  </router-link>
                  </div>
                <div class="number">{{ item.rate }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      msg: "全部类型",
      tags: "",
      movieClassify_list: [],
    };
  },
  components: {
    home_head,
    home_bottom,
  },
  created() {
    // this.hus();
    this.getmovielist("最新");
  },
  methods: {
    getmovielist(tags) {
      // console.log("123");
      let that = this;
      this.axios({
        url: "remen/zuixin",
        method: "get",
        params: {
          tags: tags,
        },
      }).then((res) => {
        that.movieClassify_list = res.data.data;
      });
    },
    handleClick(tab) {
      if (tab.index == 0) {
        this.tags = "最新";
        this.getmovielist(this.tags);
      } else if (tab.index == 1) {
        this.tags = "喜剧";
        this.getmovielist(this.tags);
      } else if (tab.index == 2) {
        this.tags = "动作";
        this.getmovielist(this.tags);
      } else if (tab.index == 3) {
        this.tags = "科幻";
        this.getmovielist(this.tags);
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  .main {
    width: 900px;
    h1 {
      margin-bottom: 30px;
      color: #007700;
      font-weight: normal;
    }
    margin-left: 20px;
    .movie_options {
      margin-bottom: 30px;
    }
    .classify_info {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .classify_tpxx {
        margin-right: 20px;
        width: 145px;
        margin-top: 10px;
        .im_name {
          display: flex;
          justify-content: center;
          .number {
            color: #ffac2d;
            margin-left: 9px;
          }
        }
      }
    }
  }
}
</style>
