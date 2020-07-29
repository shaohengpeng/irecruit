<template>
    <div class="mainstyle">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="applysearchform" :model="applysearchform" class="demo-form-inline">
            <el-form-item label="公司名称" prop="companyname">
                <el-input v-model="applysearchform.companyname" placeholder="请输入公司名称"></el-input>
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
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="applyinfoshow">
            <ul>
                <li v-for="(applyinfo,index) in applyinfos" :key="index">
                    <el-card class="box-card my-box-card" shadow="hover">
                        <div slot="header" class="clearfix my-el-card_head">
                            <span style="font-weight: 1000">{{applyinfo.positionname}}</span>
                            <!-- <el-button style="float: right; padding: 3px 14px" type="text">查看</el-button> -->
                            <el-dropdown style="float: right" trigger="click">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="cancelapply(index)">取消申请</el-dropdown-item>
                                <el-dropdown-item @click.native="beginpart_time_job(index)">开始兼职</el-dropdown-item>
                                <el-dropdown-item @click.native="cancelpart_time_job(index)">取消兼职</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
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
                            {{applyinfo.companyname}}
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
                :current-page.sync="currentpage"
                :page-size="pagesize"
                :total="totalpage">
            </el-pagination>
        </div>
        
    </div>
</template>
<style>
@import "../assets/css/applyinfomanage.css";
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
            currentpage: 1,
            pagesize: 8,
            totalpage: 8,
            applystatus:'审核中',
            applysearchform:{
                username: '',
                positiontype:'',
                positionname:'',
                applystatus:'',
                applystarttime:'',
                applyovertime:'',
                companyname:'',
                token: ''
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
            applyinfos: [],
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
        this.applysearchform.username = JSON.parse(sessionStorage.getItem('userperson')).username;
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
        cancelapply(index) {
            this.applysearchform.applystatus = this.applyinfos[index].applystatus;
            this.applysearchform.applyinfoid = this.applyinfos[index].applyinfoid;
            console.log(this.applyinfos[index].applyinfoid);
            if(this.applysearchform.applystatus==='审核中'){
                this.$http.get('http://localhost:8080/deleteByapplyinfoid',{params:{applyinfoid: this.applysearchform.applyinfoid}}).then((Response)=>{
                    this.$message(Response.data.message);
                })
            }else if(this.applysearchform.applystatus==='审核通过'){
              this.$message('此次申请已通过审核，不能取消申请，您可以取消兼职或开始兼职');
            }else if(this.applysearchform.applystatus==='审核未通过'){
                this.$message('此次申请未通过审核，不能取消申请，您可以删除此条记录');
            }
        },
        beginpart_time_job(index){
            console.log(this.applyinfos[index].positionid);
            this.orderinfoform.applystatus = this.applyinfos[index].applystatus;
            this.orderinfoform.positiontype = this.applyinfos[index].positiontype;
            this.orderinfoform.positionname = this.applyinfos[index].positionname;
            this.orderinfoform.companyname = this.applyinfos[index].companyname;
            this.orderinfoform.personname = this.applyinfos[index].personname;
            this.orderinfoform.applyinfoid = this.applyinfos[index].applyinfoid;
            this.orderinfoform.positionid = this.applyinfos[index].positionid;
            if(this.orderinfoform.applystatus==='审核中'){
                this.$message('你的兼职还未通过审核，还不能开始兼职哦');
            }else if(this.orderinfoform.applystatus==='审核通过'){
              this.$http.post('http://localhost:8080/updateorderinfo',this.orderinfoform).then((Response)=>{
                  if (Response.data.code===200) {
                      this.$message(Response.data.message);
                  }else if (Response.data.code===201) {
                      this.$message(Response.data.message);
                  }else if (Response.data.code===401) {
                      this.$message(Response.data.message);
                  }
              })
            //   this.$message('看一下需不需要加一个时间判断，在真正兼职开始的时间的前两个小时能够开始兼职操作，还是直接开始在订单中增加一条记录，开始兼职');
            }else if(this.orderinfoform.applystatus==='审核未通过'){
                this.$message('此次申请未通过审核，无法参与此次兼职，您可以删除此条记录');
            }
        },
        cancelpart_time_job(index){
            this.applysearchform.applystatus = this.applyinfos[index].applystatus;
            if(this.applysearchform.applystatus==='审核中'){
                this.$message('你的兼职还未通过审核，还不能取消兼职哦');
            }else if(this.applysearchform.applystatus==='审核通过'){
              this.$message('用户需要填写一个取消说明，用模态框来写');
            }else if(this.applysearchform.applystatus==='审核未通过'){
                this.$message('此次申请未通过审核，无法参与此次兼职，您可以删除此条记录');
            }
        }
    }
}
</script>