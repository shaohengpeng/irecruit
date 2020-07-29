<template>
    <div>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">{{personname}}</template>
                <el-menu-item index="1-1" @click="loginout()">安全退出</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">{{title}}</template>
                <el-menu-item index="2-1" @click="personusermanage()">个人用户管理</el-menu-item>
                <el-menu-item index="2-2" @click="companyusermanage()">企业用户管理</el-menu-item>
                <el-menu-item index="2-3" @click="adminusermanage()">管理员用户管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">系统管理</template>
                <el-menu-item index="3-1" @click="resourcemanage()">资源管理</el-menu-item>
                <!-- <el-menu-item index="3-2">用户资源授权</el-menu-item> -->
            </el-submenu>
            <el-menu-item index="4" @click="zhaopinginfomanage()">招聘信息管理</el-menu-item>
            <!-- <el-menu-item index="5" @click="dingdanmanage()">订单管理</el-menu-item> -->
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
export default {
    computed:{
      personname(){
        let personname = JSON.parse(sessionStorage.getItem('usercompany')).personname;
        return personname;
      }
    },
    methods:{
        resourcemanage:function(){
            this.$router.push({path: '/resourcemanage'});
        },
        zhaopinginfomanage:function(){
            this.$http.get('http://localhost:8080/setrecruitinfopageconfig',{params:{currentpage: this.pageinfo.currentpage,pagesize: this.pageinfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectRecruitinfoAll',this.recruitsearchform).then((Response)=>{
              sessionStorage.setItem('recruitinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('recruittotalpage',Response.data.total);
            })
        })
            this.$router.push({path: '/zhaopinginfomanage'});
        },
        personusermanage:function(){
            this.title = '个人用户管理';
            this.$http.get('http://localhost:8080/setuserpersonpageconfig',{params:{currentpage: this.pageinfo.currentpage,
            pagesize: this.pageinfo.pagesize}}).then((Response)=>{
                this.$http.post('http://localhost:8080/selectUserpersonAll',this.userpersonmanage).then((Response)=>{
                    sessionStorage.setItem('personuserinfos',JSON.stringify(Response.data.list));
                    sessionStorage.setItem('totaluserperson',Response.data.total);
                })
            })
            
            this.$router.push({path: '/personusermanage'});
        },
        companyusermanage:function(){
            this.title = '企业用户管理';
            this.$http.get('http://localhost:8080/setuserpersonpageconfig',{params:{currentpage: this.pageinfo.currentpage,
            pagesize: this.pageinfo.pagesize}}).then((Response)=>{
                this.$http.post('http://localhost:8080/selectUsercompanyAll',this.usercompanymanage).then((Response)=>{
                    sessionStorage.setItem('companyuserinfos',JSON.stringify(Response.data.list));
                    sessionStorage.setItem('totalusercompany',Response.data.total);
                })
            })
            this.$router.push({path: '/companyusermanage'});
        },
        adminusermanage:function(){
            this.title = '管理员用户管理';
            this.$router.push({path: '/adminusermanage'});
        },
        loginout:function(){
            localStorage.removeItem('Authorization');
            this.$router.push({path: '/login'});
      }
    },
    data(){
        return{
            title:'用户管理',
            userpersonmanage:{
                username: ''
            },
            usercompanymanage:{
                username: ''
            },
            pageinfo:{
                currentpage:1,
                pagesize:8,
                totalpage:16
            },
            recruitsearchform:{
                positionname: '',
                positiontype: '',
                positionsalary: '',
                checkstatus: '',
                positionneedtime: '',
                companyname: ''
            },
        }
    }
}
</script>