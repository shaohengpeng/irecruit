<template>
    <div class="mainstyle">
        <el-form :label-position="labelPosition" :label-width="labelWidth" ref="companyuserinfo" :inline="true" :model="companyuserinfo" class="demo-form-inline">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="companyuserinfo.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="companyname">
                <el-input v-model="companyuserinfo.companyname" placeholder="请输入公司名"></el-input>
            </el-form-item>
            <el-form-item  style="margin-left:10px;">
                <el-button type="primary">查询</el-button>
                <el-button type="warning">新增</el-button>
            </el-form-item>
        </el-form>
        <div class="applyinfoshow">
            <ul>
                <li v-for="(companyuserinfo,index) in companyuserinfos" :key="index">
                    <el-card class="box-card my-box-card" shadow="hover">
                        <div slot="header" class="clearfix my-el-card_head">
                            <span style="font-weight: 1000">{{companyuserinfo.personname}}</span>
                            <!-- <el-button style="float: right; padding: 3px 14px" type="text">查看</el-button> -->
                            <el-dropdown style="float: right" trigger="click">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>查看用户</el-dropdown-item>
                                <el-dropdown-item>冻结用户</el-dropdown-item>
                                <el-dropdown-item>删除用户</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="text item">
                            {{companyuserinfo.username}}
                        </div>
                        <div class="text item">
                            {{companyuserinfo.phonenum}}
                        </div>
                        <div class="text item">
                            {{companyuserinfo.companyname}}
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
@import "../../assets/css/personmanage.css";
</style>
<script>
export default {
    data(){
        return{
            companyuserinfo:{
                username: '',
                companyname: '',
                personname: '',
                phonenum: ''
            },
            dialogAddgsVisible: false,
            currentpage: 1,
            pagesize: 8,
            totalpage: 16,
            labelPosition:'right',
            labelWidth:'100px',
            companyuserinfos: []
        }
    },
    methods:{

    },
    created() {
    this.totalpage = parseInt(sessionStorage.totalusercompany);
    this.companyuserinfos = JSON.parse(sessionStorage.companyuserinfos);
  }
}
</script>