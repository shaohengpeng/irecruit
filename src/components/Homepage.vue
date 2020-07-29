<template>
    <div class="main">
            <div class="searchinput">
                <el-input placeholder="请输入内容" v-model="inputform.searchcontent">
                    <el-button type="primary" slot="append" icon="el-icon-search" @click="recruitsearch()">搜索</el-button>
                </el-input>
            </div>
            <div class="hot">
                <el-carousel :interval="4000" type="card" height="250px">
                    <el-carousel-item v-for="item in list" :key="item">
                    <h3 class="large"><a v-bind:href="item.imgjumpaddress">
                    <img v-bind:src="item.img" alt="error"></a></h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="irecruitshow">
                <ul>
                    <li v-for="(irecruit,index) in recruitlist" :key="index">
                        <el-card class="box-card my-box-card" shadow="hover">
                            <div slot="header" class="clearfix my-el-card_head">
                                <span style="font-weight: 1000">{{ irecruit.positionname}}</span>
                                <el-button style="float: right; padding: 3px 14px" type="text" @click="btn(index)">投递</el-button>
                            </div>
                            <div class="text item">
                                {{'薪水：'+irecruit.positionsalary }}
                            </div>
                            <div class="text item">
                                {{'类型：'+irecruit.positiontype }}
                            </div>
                            <div class="text item">
                                {{'公司：'+irecruit.companyname }}
                            </div>
                        </el-card>
                    </li>
                </ul>
                <el-dialog :title="title" :visible.sync="dialogAddgsVisible">
                        <div class="container">
                            <div class="detailedinfo">
                                <span class="title">基本信息</span>
                                <div>
                                    <p class="recruitname clearfix">
                                        <span>{{ this.recruitform.positionname}}</span>
                                    </p>
                                    <p class="recruitsalary clearfix">
                                        <span>{{ this.recruitform.positionsalary}}</span>
                                    </p>
                                    <p class="basicinfo">
                                        <span class="basicinfo-txt" title="发布企业">{{ this.recruitform.companyname}}</span>
                                        <span class="basicinfo-txt">-</span>
                                        <span class="basicinfo-txt" title="需要招聘人数">{{ "需要招聘 "+this.recruitform.recruitingnumbers+" 人"}}</span>
                                        <span class="basicinfo-txt">-</span>
                                        <span class="basicinfo-txt" title="已经招聘人数">{{ "已经招聘 "+ this.recruitform.alreadynumbers +" 人"}}</span>
                                    </p>
                                    <p class="basicinfo">
                                        <span class="basicinfo-txt" title="发布时间">{{ "发布于"+this.recruitform.positionpublishtime}}</span>
                                        <span class="basicinfo-txt">-</span>
                                        <span class="basicinfo-txt" title="兼职开始时间">{{ this.recruitform.positionstarttime}}</span>
                                        <span class="basicinfo-txt">-</span>
                                        <span class="basicinfo-txt" title="兼职需要的时间">{{ this.recruitform.positionneedtime}}</span>
                                    </p>
                                    <p class="contact">
                                        <i class="el-icon-phone"></i>
                                        <span class="personcontact-txt">184####5864</span>
                                        <i class="el-icon-s-comment"></i>
                                        <span class="personcontact-txt">29####9386@qq.com</span>
                                    </p>
                                </div>
                            </div>
                            <div class="maininfo">
                                <el-form>
                                    <span class="title">兼职亮点</span>
                                    <el-form-item prop="positionfeature">
                                        <el-input type="textarea" v-model="recruitform.positionfeature"></el-input>
                                    </el-form-item>
                                    <span class="title">兼职描述</span>
                                    <el-form-item prop="positionrequie">
                                        <el-input type="textarea" v-model="recruitform.positionrequie"></el-input>
                                    </el-form-item>
                                    <span class="title">工作地点</span>
                                    <el-form-item prop="workplace">
                                        <el-input type="textarea" v-model="recruitform.workplace"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogAddgsVisible = false">取 消</el-button>
                            <el-button type="primary" @click="applyrecruit()">确 定</el-button>
                        </div>
                        </el-dialog>
            </div>
            <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="total,prev, pager, next,jumper"
            :current-page.sync="currentpage"
            :page-size="pagesize"
            :total="totalpage">
            </el-pagination>
        </div>
</template>
<style>
@import "../assets/css/Homepage.css";
@import "../assets/css/eldialog.css";
#P{
    display: none;
}
</style>
<script>
import Login from '../views/Login'
import axios from 'axios'
  export default {
    data() {
        var _this=this;
        axios.get("json/gg.json").then(function(res){
            _this.list=res.data;
        })
      return {
          inputform:{
              searchcontent:''
          },
          recruitform:{
                positionstarttime: '',
                positionneedtime: '',
                alreadynumbers: '',
                positionname:'',
                positionsalary:'',
                companyname: '',
                positionpublishtime: '',
                recruitingnumbers: '',
                positionfeature: '',
                positionrequie: '',
                workplace: '',
          },
          applyform:{
                positionid: '',    
                username: '',
                positionname:'',
                positionsalary: '',
                companyname: '',
                positiontype: '',
                personname:'',
            },
            labelposition:'right',
            // label-width属性只能用字段进行赋值
            labelwidth:'150px',
            list:[],
            currentpage: 1,
            pagesize: 8,
            totalpage:Number,
            recruitlist:[],
            dialogAddgsVisible:false,
            title:''
      }
    },
    // computed:{
    //     recruittotal(){
    //         let total = sessionStorage.getItem('total');
    //         return total;
    //     },
    //     rescruitlist(){
    //         let rescruitlist = JSON.parse(sessionStorage.getItem('list') || "[]");
    //         return rescruitlist;
    //     }
    // },
    created(){
        this.totalpage = parseInt(sessionStorage.total);
        this.recruitlist = JSON.parse(sessionStorage.list);
    },
    // activated(){
    //     this.window.reload();
    // },
    methods:{
        btn:function(index){
            this.recruitform.positionstarttime = this.recruitlist[index].positionstarttime;
            this.recruitform.positionneedtime = this.recruitlist[index].positionneedtime;
            this.recruitform.alreadynumbers = this.recruitlist[index].alreadynumbers;
            this.recruitform.positionname = this.recruitlist[index].positionname;
            this.recruitform.positionsalary = this.recruitlist[index].positionsalary;
            this.recruitform.companyname = this.recruitlist[index].companyname;
            this.recruitform.recruitingnumbers = this.recruitlist[index].recruitingnumbers;
            this.recruitform.positionpublishtime = this.recruitlist[index].positionpublishtime;
            this.recruitform.positionfeature = this.recruitlist[index].positionfeature;
            this.recruitform.positionrequie = this.recruitlist[index].positionrequie;
            this.recruitform.workplace = this.recruitlist[index].workplace;
            this.applyform.positionid = this.recruitlist[index].positionid;
            this.applyform.username = JSON.parse(sessionStorage.getItem('userperson')).username;
            this.applyform.positionname = this.recruitlist[index].positionname;
            this.applyform.positionsalary = this.recruitlist[index].positionsalary;
            this.applyform.positiontype = this.recruitlist[index].positiontype;
            this.applyform.companyname = this.recruitlist[index].companyname;
            this.applyform.personname = JSON.parse(sessionStorage.getItem('userperson')).personname;
            this.dialogAddgsVisible = true;
        },
        handleCurrentChange:function(currentpage){
            this.currentpage = currentpage;
            this.$http.get('http://localhost:8080/recruitInfoQueryBysearchcontent',{params:{
                searchcontent: this.inputform.searchcontent,
                currentpage: this.currentpage,
                pagesize: this.pagesize}}).then((Response)=>{
                //   alert(JSON.stringify(Response.data.list));
                //   console.log(JSON.stringify(Response.data.list));
                //   console.log(Response.data.list);
                //   console.log(typeof Response.data.list);
                //   console.log(typeof JSON.stringify(Response.data.list));
                    sessionStorage.setItem('total',Response.data.total);
                    sessionStorage.setItem('list',JSON.stringify(Response.data.list));
                    this.recruitlist = JSON.parse(sessionStorage.list);
                    // var testlist = JSON.parse(sessionStorage.list);
                    // console.log(testlist);
                    // this.recruitlist = JSON.parse(sessionStorage.list);
                    // this.$router.push({path: '/homepage'});
            })
        },
        recruitsearch:function(){
            this.$http.get('http://localhost:8080/recruitInfoQueryBysearchcontent',{params:{
                searchcontent: this.inputform.searchcontent,
                currentpage: this.currentpage,
                pagesize: this.pagesize}}).then((Response)=>{
                    sessionStorage.setItem('total',Response.data.total);
                    sessionStorage.setItem('list',JSON.stringify(Response.data.list));
                    this.recruitlist = JSON.parse(sessionStorage.list);
                    this.totalpage = parseInt(sessionStorage.total);
                    // var testlist = JSON.parse(sessionStorage.list);
                    // console.log(testlist);
                    // this.recruitlist = JSON.parse(sessionStorage.list);
                    // this.$router.push({path: '/homepage'});
                }) 
        },
        applyrecruit:function(){
            this.$http.post('http://localhost:8080/updateapplyInfo',this.applyform).then((Response)=>{
                if(Response.data.code===200){
                    alert(Response.data.message);
                }else if(Response.data.code===301){
                    alert(Response.data.message);
                }else{
                    alert(Response.data.message);
                }
            })
        }
    }
  }
</script>