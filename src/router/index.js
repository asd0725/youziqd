import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login' 
import Index from '../components/index'          
import Home_head from '../components/home_head'   //头部组件
import moviedetail from '../components/moviedetail'   //电影详情
import home_bottom from '../components/home_bottom'    //底部组件
import movie_info from '../components/movie_info'     //电影影讯
import select_movie from '../components/select_movie'   //选电影
import rank from '../components/rank'                   //排行榜
import classify from '../components/classify'           //电影分类
import comment from '../components/comment'             //电影评论
import user from '../components/user'                    //用户页面
import movie_search from '../components/movie_search'     //搜索页面
import register from '../components/register'            //注册页面

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'login',
      component: Login
    },
    {
      path:'/index',
      name:'index',
      component: Index
    },
    {
      path:'/home_head',
      component: Home_head
    },
    {
      path:'/moviedetail',
      name:'moviedetail',
      component: moviedetail
    },
    {
      path:'/home_bottom',
      component: home_bottom
    },
    {
      path:'/movie_info',
      name:'movie_info',
      component: movie_info
    },
    {
      path:'/select_movie',
      name:'select_movie',
      component: select_movie
    },
    {
      path:'/rank',
      name:'rank',
      component: rank
    },
    {
      path:'/classify',
      name:'classify',
      component: classify
    },
    {
      path:'/comment',
      name:'comment',
      component: comment
    },
    {
      path:'/user',
      name:'user',
      component: user
    },
    {
      path:'/movie_search',
      name:'movie_search',
      component: movie_search,
    },
    {
      path:'/register',
      name:'register',
      component:register
    }
  ]
})
