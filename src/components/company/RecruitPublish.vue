<template>
    <div class="newrecruit">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :model="newrecruitinfo" ref="newrecruitinfo">
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职名称：" prop="positionname">
                      <el-input v-model="newrecruitinfo.positionname" placeholder="请填写职位名称"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职类型：" prop="positiontype">
                    <el-select v-model="newrecruitinfo.positiontype" placeholder="请选择职位类型">
                        <el-option label="IT类" value="IT类"></el-option>
                        <el-option label="教育类" value="教育类"></el-option>
                        <el-option label="服务类" value="服务类"></el-option>
                    </el-select>
                 </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职薪水：" prop="positionsalary">
                      <el-input v-model="newrecruitinfo.positionsalary" placeholder="请填写兼职薪水"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="招聘人数：" prop="recruitingnumbers">
                      <el-input v-model="newrecruitinfo.recruitingnumbers" placeholder="请填写需要招聘的人数"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职特点：" prop="positionfeature">
                      <el-input v-model="newrecruitinfo.positionfeature" placeholder="请填写兼职特点" type="textarea" :autosize=true></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职要求：" prop="positionrequie">
                      <el-input v-model="newrecruitinfo.positionrequie" placeholder="请填写兼职要求" type="textarea" :autosize=true></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职介绍：" prop="positionintroduce">
                      <el-input v-model="newrecruitinfo.positionintroduce" placeholder="请填写兼职介绍" type="textarea" :autosize=true></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="工作地点：" prop="workplace">
                      <el-input v-model="newrecruitinfo.workplace" placeholder="请填写兼职工作地点"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="兼职开始时间：" prop="positionstarttime">
                     <el-date-picker
                        v-model="newrecruitinfo.positionstarttime"
                        type="datetime"
                        placeholder="选择兼职开始时间">
                        </el-date-picker>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item label="工作时间：" prop="positionneedtime">
                      <el-select v-model="newrecruitinfo.positionneedtime" placeholder="请选择工作时间">
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
              <el-col :span="6">
                  <el-form-item label="招聘状态：" prop="recruitstatus">
                      <el-select v-model="newrecruitinfo.recruitstatus" placeholder="请选择招聘状态">
                        <el-option label="正常招聘中" value="正常招聘中"></el-option>
                        <el-option label="已停止招聘" value="已停止招聘"></el-option>
                        <el-option label="未开始招聘" value="未开始招聘"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item>
                     <el-button type="primary" @click="savenewrecruit">保存</el-button>
                     <el-button type="warning" plain @click="onReset">重置</el-button>
                  </el-form-item>
              </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<style>
@import "../../assets/css/newrecruit.css";
</style>
<script>
export default {
    data(){
        return{
            newrecruitinfo:{
                positionpublisher: '',
                companyname: '',
                positionname: '',
                positiontype: '',
                positionsalary: '',
                positionintroduce: '',
                recruitingnumbers: '',
                positionfeature: '',
                positionrequie: '',
                workplace: '',
                positionstarttime: '',
                positionneedtime: '',
                recruitstatus: ''
            },
            labelPosition: "right",
            labelWidth: "150px",
        }
    },
    methods:{
      savenewrecruit:function(){
        this.$http.post('http://localhost:8080/insertnewrecruit',this.newrecruitinfo).then((Response)=>{
              if(Response.data.code===200){
                  this.$message(Response.data.message);
              }
          })
      },
      onReset:function(){
          this.$refs['newrecruitinfo'].resetFields();
      },
    },
    created(){
      this.newrecruitinfo.companyname = JSON.parse(sessionStorage.getItem('usercompany')).companyname;
      this.newrecruitinfo.positionpublisher = JSON.parse(sessionStorage.getItem('usercompany')).personname;
    },
}
</script>