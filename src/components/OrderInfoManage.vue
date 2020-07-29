<template>
    <div class="mainstyle">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="ordersearchform" :model="ordersearchform" class="demo-form-inline">
            <el-form-item label="公司名称" prop="companyname">
                <el-input v-model="ordersearchform.companyname" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="职位名称" prop="positionname">
                <el-input v-model="ordersearchform.positionname" placeholder="请输入职位名称"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" prop="orderstatus">
                <el-select v-model="ordersearchform.orderstatus" placeholder="请选择订单状态">
                    <el-option label="进行中" value="进行中"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="未开始" value="未开始"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位类型" prop="positiontype">
                <el-select v-model="ordersearchform.positiontype" placeholder="请选择职位类型">
                    <el-option label="IT类" value="IT类"></el-option>
                    <el-option label="教育类" value="教育类"></el-option>
                    <el-option label="服务类" value="服务类"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单时间" prop="orderstarttime">
                <el-date-picker
                    v-model="ordersearchform.orderstarttime"
                    align="center"
                    type="date"
                    placeholder="选择开始日期"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="orderovertime">
                <el-date-picker
                    v-model="ordersearchform.orderovertime"
                    align="right"
                    type="date"
                    placeholder="选择结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" style="margin-left:10px;">
                <el-button type="primary" @click="onSearchorderinfo">查询</el-button>
                <el-button type="warning" plain @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="applyinfoshow">
            <ul>
                <li v-for="(orderinfo,index) in orderinfos" :key="index">
                    <el-card class="box-card my-box-card" shadow="hover">
                        <div slot="header" class="clearfix my-el-card_head">
                            <span style="font-weight: 1000">{{orderinfo.positionname}}</span>
                            <!-- <el-button style="float: right; padding: 3px 14px" type="text">查看</el-button> -->
                            <el-dropdown style="float: right" trigger="click">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="finishorder(index)">结束订单</el-dropdown-item>
                                <el-dropdown-item @click.native="evaluateorder(index)">评价订单</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="text item">
                            {{orderinfo.positiontype }}
                        </div>
                        <div class="text item">
                            {{orderinfo.orderstatus }}
                        </div>
                        <div class="text item">
                            {{orderinfo.companyname }}
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
                :total="pageInfo.ordertotal">
            </el-pagination>
        </div>
        
    </div>
</template>
<style>
@import "../assets/css/applyinfomanage.css";
</style>
<script>
export default {
    data(){
        return{
            pageInfo:{
                currentpage: 1,
                pagesize: '8',
                ordertotal: 16
            },
            ordersearchform:{
                positiontype:'',
                positionname:'',
                orderstatus:'',
                orderstarttime:'',
                orderovertime:'',
                companyname:''
            },
            orderinfos: [],
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
        this.orderinfos = JSON.parse(sessionStorage.orderinfolist);
        this.pageInfo.ordertotal = parseInt(sessionStorage.ordertotal);
    },
    methods:{
        onReset:function(){
            this.$refs['ordersearchform'].resetFields();
        },
        onSearchorderinfo:function(){
            this.$http.get('http://localhost:8080/setorderinfopageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectOrderinfoAll',this.ordersearchform).then((Response)=>{
              sessionStorage.setItem('orderinfolist',JSON.stringify(Response.data.list));
              sessionStorage.setItem('ordertotal',Response.data.total);
              this.orderinfos = JSON.parse(sessionStorage.orderinfolist);
              this.pageInfo.ordertotal = parseInt(sessionStorage.ordertotal);
            })
        })
        },
         handleCurrentChange:function(currentpage){
             this.pageInfo.currentpage = currentpage;
             this.$http.get('http://localhost:8080/setorderinfopageconfig',{params:{currentpage: this.pageInfo.currentpage,pagesize: this.pageInfo.pagesize}
        }).then((Response)=>{
            this.$http.post('http://localhost:8080/selectOrderinfoAll',this.ordersearchform).then((Response)=>{
              sessionStorage.setItem('orderinfolist',JSON.stringify(Response.data.list));
              this.orderinfos = JSON.parse(sessionStorage.orderinfolist);
            })
        })
         },
        finishorder(index){
            this.ordersearchform.orderstatus = this.orderinfos[index].orderstatus;
            if (this.ordersearchform.orderstatus==='进行中') {
                this.$message({message: '恭喜你又完成了一份订单',type: 'success'});
            }else if (this.ordersearchform.orderstatus==='已完成') {
                this.$message({message: '这份订单已经完成了，不需要再结束订单了',type: 'warning'});
            }
        }
    }
}
</script>