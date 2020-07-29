<template>
    <div>
        <el-menu
            :default-active="routerpath"
            router
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">{{personname}}</template>
                <el-menu-item index="1-1" @click="loginout()">安全退出</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="home()">首页</el-menu-item>
            <template v-for="(item, index) in menu_item_data">
                <el-menu-item :index = "item.path" :key = "index">
                    {{item.title}}
                </el-menu-item>
            </template>
            <!-- <el-menu-item index="3" @click="personmessage()">信息设置</el-menu-item> -->
            <el-menu-item index="4" @click="resumemessage()">简历设置</el-menu-item>
            <el-menu-item index="5" @click="applyinfomanage()">申请信息管理</el-menu-item>
            <el-menu-item index="6" @click="orderinfomanage()">订单管理</el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<script>
import bus from './bus';
  export default {
    data() {
      return {
          inputform:{
              searchinput:''
          },
          pageInfo:{
                currentpage: 1,
                pagesize: '8',
                totalpage: 16
            },
            currentpage: 1,
            pagesize: '8',
            applysearchform:{
                username: '',
                positiontype:'',
                positionname:'',
                applystatus:'',
                applystarttime:'',
                applyovertime:'',
                companyname:''
            },
            ordersearchform:{
                positiontype:'',
                positionname:'',
                orderstatus:'',
                orderstarttime:'',
                orderovertime:'',
                companyname:''
            },
            activeIndex: '2',
            defaultindex:['1','2','3'],
            routerpath:'',
            menu_item_data: [{
              title: '信息设置',
              path: '/personmessage'
            }]
      };
    },
    computed:{
      personname(){
        let personname = JSON.parse(sessionStorage.getItem('userperson')).personname;
        return personname;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      home:function(){
        this.$router.push({path: '/homepage'});
      },
      // personmessage:function(){
      //   this.activeIndex = '3';
      //   this.$router.push({path: '/personmessage'});
      // },
      resumemessage:function(){
        this.activeIndex = '4';
        this.$router.push({path: '/resumemessage'});
      },
      applyinfomanage:function(){
        this.activeIndex = '5';
        this.applysearchform.username = JSON.parse(sessionStorage.getItem('userperson')).username;
        this.$http.get('http://localhost:8080/setpageconfig',{params:{currentpage: this.currentpage,pagesize: this.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectApplyinfoAll',this.applysearchform).then((Response)=>{
              sessionStorage.setItem('applyinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('totalpage',Response.data.total);
              this.$router.push({path: '/applyinfomanage'});
            })
        })
        .catch((error) =>{
          alert("登录已过期，请重新登录")
          this.$router.push({path: '/login'});
        })
      },
      orderinfomanage:function(){
        this.activeIndex = '6';
        this.applysearchform.username = JSON.parse(sessionStorage.getItem('userperson')).username;
        this.$http.get('http://localhost:8080/setorderinfopageconfig',{params:{currentpage: this.currentpage,pagesize: this.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectOrderinfoAll',this.ordersearchform).then((Response)=>{
              console.log(Response.data);
              sessionStorage.setItem('orderinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('ordertotal',Response.data.total);
              this.$router.push({path: '/orderinfomanage'});
            })
        })
        .catch((error) =>{
              if(error.response){
                //请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log("请求已发出，但服务器响应的状态码不在 2xx 范围内");
                console.log(error.response.status);
              }else if(error.request){
                //请求已经发出，但是没有收到服务端回复
                console.log("请求已经发出，但是没有收到服务端回复");
                console.log(error.request);
                console.log('Error',error.message);
              }else{
                console.log('Error',error.message);
              }
              
          })
      },
      loginout:function(){
        localStorage.removeItem('Authorization');
        this.$router.push({path: '/login'});
      },
      onRouteChanged () {
        let that = this
        that.path  = that.$route.path
      }
    },
    created () {
      this.onRouteChanged()
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'onRouteChanged'
    }
  }
</script>