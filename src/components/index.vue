<template>
  <div class="container">
    <home_head ></home_head>
    <div class="main">
      <div class="left">
        <div class="reying">
          <h2>正在热映</h2>
          <div class="dabody">
            <div class="body" v-for="item in reying_list" :key="item.id">
              <router-link
                :to="{ name: 'moviedetail', query: { movie_id: item.movie_id } }"
              >
                <div class="imgs">
                  <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
                </div>
              </router-link>
              <div class="body_info">
                <div class="name">
                  <router-link
                    :to="{ name: 'moviedetail', query: item.movie_id }"
                  >
                    {{ item.movie_name }}
                  </router-link>
                </div>
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
              </div>
            </div>
          </div>
        </div>
        <div class="remen">
          <h2>最近热门电影</h2>
          <div class="body">
            <div class="body_info" v-for="item1 in remen_list" :key="item1.id">
              <router-link
                :to="{
                  name: 'moviedetail',
                  query: { movie_id: item1.movie_id },
                }"
              >
                <div class="imgs">
                  <img v-bind:src="item1.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item1.img" alt="" />
                </div>
              </router-link>

              <div class="name_rate">
                <div class="name">
                  <router-link
                    :to="{
                      name: 'moviedetail',
                      query: { movie_id: item1.movie_id },
                    }"
                  >
                    {{ item1.movie_name }}
                  </router-link>
                </div>
                <div class="rates">
                  <el-rate
                    v-model="item1.rate"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reping">
          <h2>最受欢迎的影评</h2>
          <div class="yingping_body" v-for="item in reping_list" :key="item.id">
            <router-link :to="{ name: 'moviedetail',query:{movie_id:item.movie_id} }">
              <div class="imgs">
                <img v-bind:src="item.img==''?'https://s3.ax1x.com/2021/02/27/6pmYNV.jpg':item.img" alt="" />
              </div>
            </router-link>

            <div class="yingping_info">
              <div class="inrt">
                <!--img  name  rate time -->
                
                  <div class="imgs">
                    <img v-bind:src="item.user_img" alt="" />
                  </div>
                  <div class="name">{{item.user_name}}</div>
                

                <div class="rates">
                  <el-rate
                    v-model=item.rate
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
                <div class="times">{{item.time}}</div>
              </div>
              <div class="comments">
                <p>
                {{item.comment}}
                </p>
              </div>
              <div class="dianzan">
                <div class="zan"><Icon type="ios-thumbs-up" />{{item.zan}}</div>
                <div class="cai"><Icon type="ios-thumbs-down" />{{item.cai}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="koubei">
          <h2>一周口碑榜</h2>
          <div
            class="paihang"
            v-for="(item, index) in koubei_list"
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
        <div class="hezuo">
          <h2>合作联系</h2>
          <div class="email">电影合作邮箱：movie@youzi.com</div>
          <div class="advertise">广告合作邮箱：advertise@youzi.com</div>
        </div>
        <div class="erwm">
          <!--二维码 -->
          <h2>关注我们</h2>
          <div class="weibo_xin">
            <div class="weibo">
              <el-popover
                placement="bottom"
                title="微博"
                width="200"
                trigger="hover"
              >
                <div class="popover-content" v-html="html"></div>
                <img slot="reference" src="../assets/home_weibo.png" alt="" />
              </el-popover>
            </div>
            <div class="weixin">
              <el-popover
                placement="bottom"
                title="微信"
                width="200"
                trigger="hover"
              >
                <div class="popover-content" v-html="html1"></div>
                <img slot="reference" src="../assets/home_weixin.png" alt="" />
              </el-popover>
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
      html: '<img src="https://s3.ax1x.com/2021/02/02/ynxLFg.png" alt="">',
      html1: '<img src="https://s3.ax1x.com/2021/02/02/ynz0AS.png" alt="">',
      reying_list: [],
      remen_list: [],
      koubei_list: [],
      tuijian_list: [],
      reping_list: [],
    };
  },
  components: {
    home_head,
    home_bottom,
  },
  created() {
    this.getreyinglist();
    this.getremenlist();
    this.getkoubeilist();
    this.gettuijianlist();
    this.getrepinglist();
  },
  methods: {
    getreyinglist() {
      let that = this;
      this.axios({
        url: "reying/reying",
        method: "get",
      }).then((res) => {
        // console.log(res.data);
        that.reying_list = res.data.data;
      });
    },
    getremenlist() {
      let that = this;
      this.axios({
        url: "remen/remen",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.remen_list = res.data.data;
      });
    },
    getkoubeilist() {
      let that = this;
      this.axios({
        url: "koubei/koubei",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.koubei_list = res.data.data;
      });
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
    getrepinglist() {
      let that = this;
      this.axios({
        url: "comment/reping",
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        that.reping_list = res.data.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  .main {
    margin-left: 20px;
    display: flex;
    .left {
      margin-top: 20px;

      width: 900px;
      .reying {
        h2 {
          width: 805px;
          font-weight: normal;
          color: #007722;
          padding-bottom: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid #f0f3f5;
        }
        margin-top: 20px;
        .dabody {
          display: flex;
          .body {
            width: 145px;
            margin-right: 20px;
            .body_info {
              text-align: center;
              .name {
                font-size: 15px;
              }
            }
            .imgs{
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
      .remen {
        h2 {
          margin-top: 30px;
          width: 805px;
          font-weight: normal;
          color: #007722;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #f0f3f5;
        }
        .body {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          .body_info {
            margin-top: 20px;
            width: 145px;
            margin-right: 20px;
            .imgs{
              width: 145px;
              height: 190px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .name_rate {
              text-align: center;
              .name {
                font-size: 15px;
              }
            }
          }
        }
      }
      .reping {
        margin-top: 30px;
        h2 {
          width: 805px;
          font-weight: normal;
          color: #007722;
          padding-bottom: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid #f0f3f5;
        }
        .yingping_body {
          display: flex;
          border-bottom: 1px dashed #f0f3f5;
          margin-top: 20px;
          .imgs{
            width: 145px;
            height: 190px;
            margin-bottom: 5px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .yingping_info {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .inrt {
              display: flex;
              .imgs {
                width: 50px;
                height: 50px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .name {
                margin-left: 10px;
                height: 50px;
                line-height: 50px;
                font-size: 20px;
                color: black;
              }
              .rates {
                font-size: 30px;
                margin-left: 10px;
                margin-top: 9px;
              }
              .times {
                margin-left: 10px;
                font-size: 20px;
                height: 50px;
                line-height: 50px;
              }
            }
            .comments {
              font-size: 20px;
              p{
                text-indent: 2em;
              }
            }
            .dianzan {
              display: flex;
              justify-content: flex-end;
              .zan {
                margin-right: 10px;
                font-size: 20px;
                cursor: pointer;
              }
              .cai {
                margin-left: 10px;
                font-size: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .right {
      width: 470px;
      margin-left: 50px;
      margin-top: 40px;
      .koubei {
        h2 {
          font-weight: normal;
          color: #007722;
          border-bottom: 1px solid #f0f3f5;
          padding-bottom: 10px;
        }
        .paihang {
          margin-top: 10px;
          border-bottom: 1px solid #f0f3f5;
          padding-bottom: 5px;
          display: flex;
          width: 400px;
          .number {
            width: 30px;
            font-size: 20px;
            padding-right: 10px;
          }
          .name {
            margin-left: 5px;
            font-size: 20px;
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
      .hezuo {
        margin-top: 30px;
        border-bottom: 1px solid #f0f3f5;
        h2 {
          font-weight: normal;
          color: #007722;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f3f5;
        }
        .email {
          margin-top: 10px;
          font-size: 20px;
        }
        .advertise {
          margin-top: 10px;
          font-size: 20px;
          padding-bottom: 10px;
        }
      }
      .erwm {
        margin-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f3f5;
        h2 {
          font-weight: normal;
          color: #007722;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f3f5;
        }
        .weibo_xin {
          margin-top: 20px;
          display: flex;
          .weibo {
          }
          .weixin {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
