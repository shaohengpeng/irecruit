<template>
    <div class="recruitmainstyle">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="recruitsearchform" :model="recruitsearchform" class="demo-form-inline">
            <el-form-item label="兼职名称" prop="positionname">
                <el-input v-model="recruitsearchform.positionname" placeholder="请输入兼职名称"></el-input>
            </el-form-item>
            <el-form-item label="兼职薪水" prop="positionsalary">
                <el-input v-model="recruitsearchform.positionsalary" placeholder="请输入兼职薪水"></el-input>
            </el-form-item>
            <el-form-item label="兼职类型" prop="positiontype">
                <el-select v-model="recruitsearchform.positiontype" placeholder="请选择兼职类型">
                    <el-option label="IT类" value="IT类"></el-option>
                    <el-option label="教育类" value="教育类"></el-option>
                    <el-option label="服务类" value="服务类"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态" prop="checkstatus">
                <el-select v-model="recruitsearchform.checkstatus" placeholder="请选择兼职的审核状态">
                    <el-option label="审核通过" value="审核通过"></el-option>
                    <el-option label="审核未通过" value="审核未通过"></el-option>
                    <el-option label="未送审" value="未送审"></el-option>
                    <el-option label="审核中" value="审核中"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作时间：" prop="positionneedtime">
                <el-select v-model="recruitsearchform.positionneedtime" placeholder="请选择工作时间">
                    <el-option label="一个小时内" value="一个小时内"></el-option>
                    <el-option label="一小时到三个小时之间" value="一小时到三个小时之间"></el-option>
                    <el-option label="半天" value="半天"></el-option>
                    <el-option label="一天" value="一天"></el-option>
                    <el-option label="大于一天" value="大于一天"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" style="margin-left:10px;">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="recruitinfoshow">
            <ul>
                <li v-for="(recruitinfo,index) in recruitinfos" :key="index">
                    <el-card class="box-card my-box-card" shadow="hover">
                        <div slot="header" class="clearfix my-el-card_head">
                            <span style="font-weight: 1000">{{recruitinfo.positionname}}</span>
                            <!-- <el-button style="float: right; padding: 3px 14px" type="text">投递</el-button> -->
                            <el-dropdown style="float: right" trigger="click">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="submitrecruit(index)">兼职送审</el-dropdown-item>
                                <el-dropdown-item @click.native="recruitpublish(index)">发布兼职</el-dropdown-item>
                                <el-dropdown-item @click.native="cancelsubmit(index)">取消送审</el-dropdown-item>
                                <el-dropdown-item @click.native="updaterecruit(index)">更新兼职</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="text item">
                            {{recruitinfo.positiontype+recruitinfo.positionsalary}}
                        </div>
                        <div class="text item">
                            {{recruitinfo.checkstatus}}
                        </div>
                        <div class="text item">
                            {{recruitinfo.positionneedtime}}
                        </div>
                    </el-card>
                </li>
            </ul>
        </div>
        <div class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="total,prev, pager, next,jumper"
                :current-page.sync="pageInfo.currentpage"
                :page-size="pageInfo.pagesize"
                :total="pageInfo.recruittotalpage">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="dialogAddgsVisible">
            <div class="newrecruit">
                <el-form :label-position="labelPosition" :label-width="labelWidth" :model="updaterecruitinfo">
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职名称：" prop="positionname">
                            <el-input v-model="updaterecruitinfo.positionname" placeholder="请填写职位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                   <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职类型：" prop="positiontype">
                            <el-select v-model="updaterecruitinfo.positiontype" placeholder="请选择职位类型">
                                <el-option label="IT类" value="IT类"></el-option>
                                <el-option label="教育类" value="教育类"></el-option>
                                <el-option label="服务类" value="服务类"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职薪水：" prop="positionsalary">
                            <el-input v-model="updaterecruitinfo.positionsalary" placeholder="请填写兼职薪水"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="招聘人数：" prop="recruitingnumbers">
                            <el-input v-model="updaterecruitinfo.recruitingnumbers" placeholder="请填写需要招聘的人数"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职特点：" prop="positionfeature">
                            <el-input v-model="updaterecruitinfo.positionfeature" placeholder="请填写兼职特点" type="textarea" :autosize=true></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职要求：" prop="positionrequie">
                            <el-input v-model="updaterecruitinfo.positionrequie" placeholder="请填写兼职要求" type="textarea" :autosize=true></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="工作地点：" prop="workplace">
                            <el-input v-model="updaterecruitinfo.workplace" placeholder="请填写兼职工作地点"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="兼职时间：" prop="positionstarttime">
                            <el-date-picker
                                v-model="updaterecruitinfo.positionstarttime"
                                type="datetime"
                                placeholder="选择兼职开始时间">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="工作时间：" prop="positionneedtime">
                            <el-select v-model="updaterecruitinfo.positionneedtime" placeholder="请选择工作时间">
                                <el-option label="一个小时内" value="一个小时内"></el-option>
                                <el-option label="一小时到三个小时之间" value="一小时到三个小时之间"></el-option>
                                <el-option label="半天" value="半天"></el-option>
                                <el-option label="一天" value="一天"></el-option>
                                <el-option label="大于一天" value="大于一天"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                    <el-col :span="10">
                        <el-form-item label="招聘状态：" prop="recruitstatus">
                            <el-select v-model="updaterecruitinfo.recruitstatus" placeholder="请选择招聘状态">
                                <el-option label="正常招聘中" value="正常招聘中"></el-option>
                                <el-option label="已停止招聘" value="已停止招聘"></el-option>
                                <el-option label="未开始招聘" value="未开始招聘"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button type="primary" @click="savechange()">保 存</el-button>
                <el-button @click="dialogAddgsVisible = false" type="primary">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
@import "../../assets/css/recruitinfomanage.css";
@import "../../assets/css/newrecruit.css";
</style>
<script>
export default {
    data(){
        return{
            recruitsearchform:{
                positionname: '',
                positiontype: '',
                positionsalary: '',
                checkstatus: '',
                positionneedtime: '',
                companyname: ''
            },
            pageInfo:{
                currentpage: 1,
                pagesize: 8,
                recruittotalpage: 8
            },
            updaterecruitinfo:{
                positionid: '',
                positionname: '',
                positiontype: '',
                positionsalary: '',
                recruitingnumbers: '',
                positionfeature: '',
                positionrequie: '',
                workplace: '',
                positionstarttime: '',
                positionneedtime: '',
                recruitstatus: ''
            },
            dialogAddgsVisible: false,
            currentpage: 1,
            pagesize: 8,
            recruittotalpage: 8,
            labelPosition:'right',
            labelWidth:'100px',
            recruitinfos:[]
        }
    },
    created(){
        this.recruitsearchform.companyname = JSON.parse(sessionStorage.getItem('usercompany')).companyname;
        this.recruitinfos =  JSON.parse(sessionStorage.recruitinfolist);
        this.pageInfo.recruittotalpage = parseInt(sessionStorage.recruittotalpage);
    },
    methods:{
        onSearch:function(){
            this.$http.get('http://localhost:8080/setrecruitinfopageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectRecruitinfoAll',this.recruitsearchform).then((Response)=>{
              sessionStorage.setItem('recruitinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('recruittotalpage',Response.data.total);
              this.recruitinfos =  JSON.parse(sessionStorage.recruitinfolist);
              this.pageInfo.recruittotalpage = parseInt(sessionStorage.recruittotalpage);
            })
        })
        },
        savechange:function(){
            this.$http.post('http://localhost:8080/updaterecruitinfoBypositionid',this.updaterecruitinfo).then((Response)=>{
                if(Response.data.code===200){
                    this.$message(Response.data.message);
                }
            })
        },
        onReset:function(){
            this.$refs['recruitsearchform'].resetFields();
        },
        recruitpublish:function(index){
            this.updaterecruitinfo.positionid = this.recruitinfos[index].positionid;
            this.updaterecruitinfo.recruitstatus = '正常招聘中';
            this.$http.post('http://localhost:8080/updaterecruitinfoBypositionid',this.updaterecruitinfo).then((Response)=>{
                if(Response.data.code===200){
                    this.$message('兼职发布成功');
                }
            })

        },
        submitrecruit:function(index){
            this.updaterecruitinfo.positionid = this.recruitinfos[index].positionid;
            this.updaterecruitinfo.checkstatus = '审核中';
            this.$http.post('http://localhost:8080/updaterecruitinfoBypositionid',this.updaterecruitinfo).then((Response)=>{
                if(Response.data.code===200){
                    this.$message('兼职送审成功');
                }
            })
        },
        cancelsubmit:function(index){
            this.updaterecruitinfo.positionid = this.recruitinfos[index].positionid;
            this.updaterecruitinfo.checkstatus = '未送审';
            this.$http.post('http://localhost:8080/updaterecruitinfoBypositionid',this.updaterecruitinfo).then((Response)=>{
                if(Response.data.code===200){
                    this.$message('取消送审成功');
                }
            })
        },
        updaterecruit:function(index){
            // console.log(this.recruitinfos[index]);
            this.updaterecruitinfo.positionid = this.recruitinfos[index].positionid;
            this.updaterecruitinfo.positionname = this.recruitinfos[index].positionname;
            this.updaterecruitinfo.positiontype = this.recruitinfos[index].positiontype;
            this.updaterecruitinfo.positionsalary = this.recruitinfos[index].positionsalary;
            this.updaterecruitinfo.recruitingnumbers = this.recruitinfos[index].recruitingnumbers;
            this.updaterecruitinfo.positionfeature = this.recruitinfos[index].positionfeature;
            this.updaterecruitinfo.positionrequie = this.recruitinfos[index].positionrequie;
            this.updaterecruitinfo.workplace = this.recruitinfos[index].workplace;
            this.updaterecruitinfo.positionstarttime = this.recruitinfos[index].positionstarttime;
            this.updaterecruitinfo.positionneedtime = this.recruitinfos[index].positionneedtime;
            this.updaterecruitinfo.recruitstatus = this.recruitinfos[index].recruitstatus;
            this.dialogAddgsVisible = true;
        },
        handleCurrentChange:function(currentpage){
            this.currentpage = currentpage;
             this.$http.get('http://localhost:8080/setrecruitinfopageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectRecruitinfoAll',this.recruitsearchform).then((Response)=>{
              sessionStorage.setItem('recruitinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('recruittotalpage',Response.data.total);
              this.recruitinfos =  JSON.parse(sessionStorage.recruitinfolist);
              this.pageInfo.recruittotalpage = parseInt(sessionStorage.recruittotalpage);
            })
        })
        },
    }
}
</script>