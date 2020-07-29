<template>
    <div>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">{{personname}}</template>
                <el-menu-item index="2-1" @click="loginout()">安全退出</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="applyinfomanagecompany()">申请信息管理</el-menu-item>
            <el-menu-item index="3" @click="recruitpublish()">招聘信息发布</el-menu-item>
            <el-menu-item index="4" @click="recruitinfomanagecompany()">招聘信息管理</el-menu-item>
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
          applysearchform:{
                positiontype:'',
                positionname:'',
                applystatus:'',
                applystarttime:'',
                applyovertime:'',
                companyname:''
            },
            recruitsearchform:{
                positionname: '',
                positiontype: '',
                positionsalary: '',
                checkstatus: '',
                positionneedtime: '',
                companyname: ''
            },
      };
    },
    computed:{
      personname(){
        let personname = JSON.parse(sessionStorage.getItem('usercompany')).personname;
        return personname;
      }
    },
    created(){
      this.recruitsearchform.companyname = JSON.parse(sessionStorage.getItem('usercompany')).companyname;
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    //   home:function(){
    //     this.$router.push({path: '/homepage'});
    //   },
    //   personmessage:function(){
    //     this.$router.push({path: '/personmessage'});
    //   },
    //   resumemessage:function(){
    //     this.$router.push({path: '/resumemessage'});
    //   },
      applyinfomanagecompany:function(){
        this.$http.get('http://localhost:8080/setpageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectApplyinfoAll',this.applysearchform).then((Response)=>{
              sessionStorage.setItem('applyinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('totalpage',Response.data.total);
            })
        })
        this.$router.push({path: '/applyinfomanagecompany'});
      },
      recruitinfomanagecompany:function(){
        this.$http.get('http://localhost:8080/setrecruitinfopageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectRecruitinfoAll',this.recruitsearchform).then((Response)=>{
              sessionStorage.setItem('recruitinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('recruittotalpage',Response.data.total);
            })
        })
        this.$router.push({path: '/recruitinfomanage'});
      },
      recruitpublish:function(){
       this.$router.push({path: '/recruitpublish'});
      },
      loginout:function(){
        localStorage.removeItem('Authorization');
        this.$router.push({path: '/login'});
      }
    }
  }
</script>