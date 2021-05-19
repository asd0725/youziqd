<template>
  <div class="container">
    <home_head></home_head>
    <div class="main">
      <div class="left">
        <h1>柚子电影排行榜</h1>
        <div class="movie_rank" v-for="item in rank_list" :key="item.id">
          <div class="imgs">
            <router-link :to="{ name: 'moviedetail', query:{movie_id:item.movie_id}}">
              <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
            </router-link>
          </div>
          <div class="rank_info">
            <h2>
              <router-link :to="{ name: 'moviedetail',query:{movie_id:item.movie_id} }">
                {{item.movie_name}}
              </router-link>
            </h2>
            <p>
              {{item.movie_info}}
            <div class="rank_rate">
              <div class="rate_left">
                <el-rate
                  v-model=item.rate
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                >
                </el-rate>
              </div>
              <div class="rate_rs">({{item.people_number}}人评价)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">

         <!-- 周排行榜  -->
        <!-- <div class="mranks">
          <div class="maranks_title">
            <h3 style="color: #007700">每周排行榜</h3>
            <h3>2.5号更新</h3>
          </div>
          <div class="rank_info" v-for="(o, index) in 10" :key="o">
            <span>{{ index + 1 }}</span>
            <router-link :to="{ name: 'moviedetail' }">
              <span style="margin-left: 10px">无依之地</span>
            </router-link>
          </div>
        </div> -->


          <!-- 票房排行榜  -->
        <!-- <div class="films_sale">
          <div class="films_title">
            <h3 style="color: #007700">票房排行榜</h3>
            <h3>2.5号更新</h3>
          </div>
          <div class="films_info" v-for="(o, index) in 10" :key="o">
            <div class="number_name">
              <div class="number">{{ index + 1 }}</div>
              <router-link :to="{ name: 'moviedetail' }">
                <div class="name">疯狂的石头人</div>
              </router-link>
            </div>
            <div class="sales">499万</div>
          </div>
        </div> -->
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
      value: 3.9,
      rank_list:[]
    };
  },
  
  created(){
    this.getranklist()
  },
  methods:{
    getranklist(){
      let that = this;
      this.axios({
        url:'remen/rank',
        method:'get'
      }).then((res)=>{
        // console.log(res.data.data);
        that.rank_list = res.data.data
      })
    }
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
    margin-left: 20px;
    .left {
      width: 900px;
      h1 {
        font-weight: normal;
        color: #007700;
      }
      .movie_rank {
        display: flex;
        padding-top: 20px;
        border-top: 1px dashed #f0f3f5;
        margin-bottom: 20px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .imgs {
        }
        .rank_info {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h2 {
            font-weight: normal;
          }
          p {
            font-size: 16px;
          }
          .rank_rate {
            display: flex;
            .rate_left {
            }
            .rate_rs {
            }
          }
        }
      }
    }

    .right {
      margin-left: 20px;
      width: 380px;
      padding: 20px;
      .mranks {
        .maranks_title {
          h3 {
            font-weight: normal;
          }
          display: flex;
          justify-content: space-between;
        }

        .rank_info {
          padding-top: 10px;
          padding-bottom: 5px;
          border-bottom: 1px dashed #f0f3f5;
        }
      }
      .films_sale {
        margin-top: 30px;
        .films_title {
          display: flex;
          justify-content: space-between;
          h3 {
            font-weight: normal;
          }
        }
        .films_info {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
          border-bottom: 1px dashed #f0f3f5;
          padding-bottom: 5px;
          .number_name {
            display: flex;
            .number {
              margin-right: 10px;
            }
            .name {
            }
          }
          .sales {
          }
        }
      }
    }
  }
}
</style>
