<template>
    <div class="mainstyle">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="applysearchform" :model="applysearchform" class="demo-form-inline">
            <el-form-item label="申请人名称" prop="personname">
                <el-input v-model="applysearchform.personname" placeholder="请输入申请人名称"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" prop="positionname">
                <el-input v-model="applysearchform.positionname" placeholder="请输入职位名称"></el-input>
            </el-form-item>
            <el-form-item label="申请状态" prop="applystatus">
                <el-select v-model="applysearchform.applystatus" placeholder="请选择申请状态">
                    <el-option label="审核通过" value="审核通过"></el-option>
                    <el-option label="审核未通过" value="审核未通过"></el-option>
                    <el-option label="审核中" value="审核中"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位类型" prop="positiontype">
                <el-select v-model="applysearchform.positiontype" placeholder="请选择职位类型">
                    <el-option label="IT类" value="IT类"></el-option>
                    <el-option label="教育类" value="教育类"></el-option>
                    <el-option label="服务类" value="服务类"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间" prop="applystarttime">
                <el-date-picker
                    v-model="applysearchform.applystarttime"
                    align="center"
                    type="date"
                    placeholder="选择开始日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="applyovertime">
                <el-date-picker
                    v-model="applysearchform.applyovertime"
                    align="right"
                    type="date"
                    placeholder="选择结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" style="margin-left:10px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="applyinfoshow">
            <ul>
                <li v-for="(applyinfo,index) in applyinfos" :key="index">
                    <el-card class="box-card my-box-card" shadow="hover">
                        <div slot="header" class="clearfix my-el-card_head">
                            <span style="font-weight: 1000">{{applyinfo.positionname}}</span>
                            <el-button style="float: right; padding: 3px 14px" type="text" @click="check(index)">审核</el-button>
                        </div>
                        <div class="text item">
                            {{applyinfo.positiontype+" "+" "+ applyinfo.positionsalary+"元" }}
                        </div>
                        <div class="text item">
                            {{applyinfo.applystatus }}
                        </div>
                        <div class="text item">
                            {{applyinfo.applytime }}
                        </div>
                        <div class="text item">
                            {{applyinfo.personname}}
                        </div>
                    </el-card>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="dialogAddgsVisible">
            <div class="container">
                <div class="detailedinfo">
                    <span class="title">兼职基本信息</span>
                    <div>
                        <p class="recruitname clearfix">
                            <span>{{ '职位名称'+this.recruitform.positionname}}</span>
                        </p>
                        <p class="recruitsalary clearfix">
                            <span>{{ '职位薪水'+this.recruitform.positionsalary}}</span>
                        </p>
                        <p class="basicinfo">
                            <span class="basicinfo-txt" title="发布企业">{{ this.recruitform.companyname}}</span>
                            <span class="basicinfo-txt">-</span>
                            <span class="basicinfo-txt" title="需要招聘人数">{{ "需要招聘 "+this.recruitform.recruitingnumbers+" 人"}}</span>
                            <span class="basicinfo-txt">-</span>
                            <span class="basicinfo-txt" title="已经招聘人数">{{ "已经招聘 "+ this.recruitform.alreadynumbers +" 人"}}</span>
                        </p>
                    </div>
                </div>
                <div class="personmessage">
                <span class="title">个人信息</span>
                <div class="body">
                    <img :src="this.personmessage.headphoto" :alt="this.personmessage.personname" :title="this.personmessage.personname" class="personimg">
                    <p class="personname clearfix">
                        <span class="f">{{personmessage.personname}}</span>
                    </p>
                    <p class="personinfo">
                        <span class="personinfo-txt">{{personmessage.sex}}</span>
                        <span class="personinfo-txt">-</span>
                        <span class="personinfo-txt">{{personmessage.birthday}}</span>
                        <span class="personinfo-txt">-</span>
                        <span class="personinfo-txt">{{personmessage.homeplace}}</span>
                    </p>
                    <p class="personcontact">
                        <i class="el-icon-phone"></i>
                        <span class="personcontact-txt">{{personmessage.phonenum}}</span>
                        <i class="el-icon-s-comment"></i>
                        <span class="personcontact-txt">{{personmessage.email}}</span>
                    </p>
                </div>
                <div class="personexperience">
                    <el-form>
                        <span class="title">工作经验</span>
                        <el-form-item prop="jobexperience">
                            <el-input type="textarea" v-model="resumeform.jobexperience" :autosize=true></el-input>
                        </el-form-item>
                        <span class="title">教育经历</span>
                        <el-form-item prop="educationexperience">
                            <el-input type="textarea" v-model="resumeform.educationexperience" :autosize=true></el-input>
                        </el-form-item>
                        <span class="title">语言能力</span>
                        <el-form-item prop="languageability">
                            <el-input type="textarea" v-model="resumeform.languageability" :autosize=true></el-input>
                        </el-form-item>
                        <span class="title">专业技能</span>
                        <el-form-item prop="professionalskill">
                            <el-input type="textarea" v-model="resumeform.professionalskill" :autosize=true></el-input>
                        </el-form-item>
                        <span class="title">相关证书</span>
                        <el-form-item prop="certificate">
                            <el-input type="textarea" v-model="resumeform.certificate" :autosize=true></el-input>
                        </el-form-item>
                        <span class="title">自我介绍</span>
                        <el-form-item prop="selfintroduction">
                            <el-input type="textarea" v-model="resumeform.selfintroduction" :autosize=true></el-input>
                        </el-form-item>
                    </el-form>
                    <a v-bind:href="this.resumeform.resumeattachment" download="">{{this.resumeform.resumeattachment}}</a>
                </div>
            </div>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="applyagree()">恭 喜</el-button>
                <el-button type="primary" @click="applyreject()">抱 歉</el-button>
                <el-button @click="dialogAddgsVisible = false" type="primary">取 消</el-button>
            </div>
        </el-dialog>
        <div class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="total,prev, pager, next,jumper"
                :current-page.sync="currentpage"
                :page-size="pagesize"
                :total="totalpage">
            </el-pagination>
        </div>
        
    </div>
</template>
<style>
@import "../../assets/css/applyinfomanage.css";
@import "../../assets/css/resumemessage.css";
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<script>
export default {
    data(){
        return{
            pageInfo:{
                currentpage: 1,
                pagesize: 8,
                totalpage: 16
            },
            recruitform:{
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
            personmessage:{
                personname:'',
                email: '',
                birthday: '',
                sex: '',
                phonenum: '',
                homeplace: '',
                headphoto: '',
            },
            resumeform:{
                username: '',
                resumeattachment:'',
                jobexperience:'',
                educationexperience:'',
                languageability:'',           
                professionalskill:'',
                selfintroduction:'',
                certificate:''
            },
            currentpage: 1,
            pagesize: 8,
            totalpage: 8,
            applystatus:'审核中',
            applysearchform:{
                pisitionid: '',
                username: '',
                personname: '',
                positiontype:'',
                positionname:'',
                applystatus:'',
                applystarttime:'',
                applyovertime:'',
                companyname:''
            },
            orderinfoform:{
                applyinfoid: '',
                pisitionid: '',
                positiontype:'',
                positionname:'',
                applystatus:'',
                applystarttime:'',
                applyovertime:'',
                companyname:'',
                personname: ''
            },
            dialogAddgsVisible: false,
            applyinfos: [],
            // personinfo: [],
            // recruitinfo: [],
            labelPosition:'right',
            labelWidth:'100px',
            pickerOptions1:{
                disabledDate(time){
                    return time.getTime() > Date.now();
                },
                shortcuts:[
                {
                    text: '今天',
                    onClick(picker){
                        picker.$emit('pick', new Date());
                    }
                },
                {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                },
                {
                    text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }
            ]
            },
            pickerOptions2:{
                disabledDate(time){
                    return time.getTime() > Date.now();
                },
                shortcuts:[
                {
                    text: '今天',
                    onClick(picker){
                        picker.$emit('pick', new Date());
                    }
                },
                {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                },
                {
                    text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }
            ]
            }
        }
    },
    created(){
        this.applyinfos = JSON.parse(sessionStorage.applyinfolist);
        this.totalpage = parseInt(sessionStorage.totalpage);
    },
    methods:{
        onSearch:function(){
            this.$http.get('http://localhost:8080/setpageconfig',{params:{currentpage: this.currentpage,pagesize: this.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectApplyinfoAll',this.applysearchform).then((Response)=>{
              sessionStorage.setItem('applyinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('totalpage',Response.data.total);
              this.applyinfos = JSON.parse(sessionStorage.applyinfolist);
              this.totalpage = parseInt(sessionStorage.totalpage);
            })
        })
        },
        onReset:function(){
            this.$refs['applysearchform'].resetFields();
        },
        handleCurrentChange:function(currentpage){
            this.currentpage = currentpage;
            this.$http.get('http://localhost:8080/setpageconfig',{params:{currentpage: this.currentpage,pagesize: this.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectApplyinfoAll',this.applysearchform).then((Response)=>{
              sessionStorage.setItem('applyinfolist',JSON.stringify(Response.data.list));
              this.applyinfos = JSON.parse(sessionStorage.applyinfolist);
            })
        })
        },
        check:function(index){
            this.applysearchform.applyinfoid = this.applyinfos[index].applyinfoid;
            this.applysearchform.applystatus = this.applyinfos[index].applystatus;
            this.applysearchform.positionid = this.applyinfos[index].positionid;
            this.applysearchform.username = this.applyinfos[index].username;
            this.$http.get('http://localhost:8080/selectBypositionid',{params:{positionid: this.applysearchform.positionid}})
            .then((Response)=>{
                sessionStorage.setItem('recruitinfo',JSON.stringify(Response.data.obj));
                this.recruitform.positionname = JSON.parse(sessionStorage.getItem('recruitinfo')).positionname;
                this.recruitform.positionsalary = JSON.parse(sessionStorage.getItem('recruitinfo')).positionsalary;
                this.recruitform.companyname = JSON.parse(sessionStorage.getItem('recruitinfo')).companyname;
                this.recruitform.recruitingnumbers = JSON.parse(sessionStorage.getItem('recruitinfo')).recruitingnumbers;
                this.recruitform.alreadynumbers = JSON.parse(sessionStorage.getItem('recruitinfo')).alreadynumbers;
            });
            this.$http.get('http://localhost:8080/selectByusername',{params:{username: this.applysearchform.username}})
            .then((Response)=>{
                sessionStorage.setItem('userpersoninfo',JSON.stringify(Response.data.obj));
                this.personmessage.personname = JSON.parse(sessionStorage.getItem('userpersoninfo')).personname;
                this.personmessage.sex = JSON.parse(sessionStorage.getItem('userpersoninfo')).sex;
                this.personmessage.headphoto = JSON.parse(sessionStorage.getItem('userpersoninfo')).headphoto;
                this.personmessage.birthday = JSON.parse(sessionStorage.getItem('userpersoninfo')).birthday;
                this.personmessage.homeplace = JSON.parse(sessionStorage.getItem('userpersoninfo')).homeplace;
                this.personmessage.phonenum = JSON.parse(sessionStorage.getItem('userpersoninfo')).phonenum;
                this.personmessage.email = JSON.parse(sessionStorage.getItem('userpersoninfo')).email;
            });
            this.$http.get('http://localhost:8080/selectResumeByusername',{params:{username: this.applysearchform.username}})
            .then((Response)=>{
                sessionStorage.setItem('resumeinfo',JSON.stringify(Response.data.obj));
                this.resumeform.jobexperience = JSON.parse(sessionStorage.getItem('resumeinfo')).jobexperience;
                this.resumeform.educationexperience = JSON.parse(sessionStorage.getItem('resumeinfo')).educationexperience;
                this.resumeform.languageability = JSON.parse(sessionStorage.getItem('resumeinfo')).languageability;
                this.resumeform.professionalskill = JSON.parse(sessionStorage.getItem('resumeinfo')).professionalskill;
                this.resumeform.certificate = JSON.parse(sessionStorage.getItem('resumeinfo')).certificate;
                this.resumeform.selfintroduction = JSON.parse(sessionStorage.getItem('resumeinfo')).selfintroduction;
                this.resumeform.resumeattachment = JSON.parse(sessionStorage.getItem('resumeinfo')).resumeattachment;
            })
            this.dialogAddgsVisible = true;
        },
        applyagree:function(){
            // console.log(this.applysearchform.applyinfoid);
            if(this.applysearchform.applystatus==='审核中'){

            }else{
                this.$message("该申请已经审核了");
            }
        },
        applyreject:function(){
            if(this.applysearchform.applystatus==='审核中'){

            }else{
                this.$message("该申请已经审核了");
            }
        }
    }
}
</script>