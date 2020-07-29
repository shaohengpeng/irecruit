<template>
    <div class="container resumeform">
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
                <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/uploadfile"
                name="file"
                :show-file-list="false"
                :on-success="handlePictureSuccess"
                :before-upload="beforeAvatarUpload">
                 <el-button size="small" type="primary">点击上传附件</el-button>
                <div slot="tip" class="el-upload__tip">
                    <p v-if="this.resumeform.resumeattachment"><a v-if="this.resumeform.resumeattachment" v-bind:href="this.resumeform.resumeattachment" download=""  title="下载简历">
                        {{this.fileNmae}}</a></p>
                    <p v-else>请上传您的简历附件，支持Word，PDF上传，大小不要超过5M</p>
                </div>
                </el-upload>
                <el-form-item class="buttonstyle">
                      <el-button type="primary" @click="updateresume()">确认更新</el-button>
                      <el-button type="primary" @click="cancel()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style>
@import "../assets/css/resumemessage.css";
</style>
<script>
export default {
    data(){
        return{
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
            labelposition:'right',
            // label-width属性只能用字段进行赋值
            labelwidth:'150px',
            fileNmae:'',
            dialogVisible: false
        }
    },
    created(){
        this.resumeform.username = JSON.parse(sessionStorage.getItem('userperson')).username;
        this.personmessage.headphoto = sessionStorage.getItem('touxiang');
        this.personmessage.personname = JSON.parse(sessionStorage.getItem('userperson')).personname;
        this.personmessage.sex = JSON.parse(sessionStorage.getItem('userperson')).sex;
        this.personmessage.email = JSON.parse(sessionStorage.getItem('userperson')).email;
        this.personmessage.phonenum = JSON.parse(sessionStorage.getItem('userperson')).phonenum;
        this.personmessage.birthday = JSON.parse(sessionStorage.getItem('userperson')).birthday;
        this.personmessage.homeplace = JSON.parse(sessionStorage.getItem('userperson')).homeplace;
    },
    methods:{
        beforeAvatarUpload(file) {
        const isDOC = file.type === 'application/msword';
        const isPDF = file.type === 'application/pdf'
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isDOC && !isPDF) {
          this.$message.error('上传附件只能是 Word和PDF 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传附件大小不能超过 5MB!');
        }
        return isDOC || isPDF && isLt5M;
      },
      handlePictureSuccess(res,file){
          if(file.response.code===200){
              this.resumeform.resumeattachment = file.response.filepath;
              this.fileNmae = file.response.originalfilename;
          }
      },
      updateresume:function(){
          this.$http.post('http://localhost:8080/updateresumemessage',this.resumeform).then((Response)=>{
              if(Response.data.code===200){
                  alert("简历信息更新成功");
              }else if(Response.data.code===300){
                  alert("简历信息创建成功");
              }else if(Response.data.code===201){
                  alert("简历信息更新失败");
              }else{
                  alert("简历信息创建失败");
              }
          })
      }
    }
}
</script>