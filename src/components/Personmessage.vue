<template>
    <div>
        <div class="userpersonregist5">
        <el-form ref="form" :label-position="labelPosition" :rules="rules" :label-width="labelWidth" :model="form">
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="用户名：" prop="username">
                      <el-input v-model="form.username" size="small" placeholder="请输入用户名"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="密码：" prop="password">
                      <el-input type="password" v-model="form.password" size="small" placeholder="请输入密码"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="确认密码：" prop="checkpassword">
                      <el-input type="password" v-model="form.checkpassword" size="small" placeholder="请确认密码"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="姓名：" prop="personname">
                      <el-input v-model="form.personname" size="small" placeholder="请填写你的真实姓名"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="性别：" prop="sex">
                      <el-radio v-model="form.sex" label="男" border>男</el-radio>
                      <el-radio v-model="form.sex" label="女" border>女</el-radio>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="邮箱：" prop="email">
                      <el-input v-model="form.email" size="small" placeholder="请填写你的邮箱"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="电话：" prop="phonenum">
                      <el-input v-model="form.phonenum" size="small" placeholder="请填写你的电话"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="出生日期：" prop="birthday">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="户口所在地：">
                     <el-cascader
                        placeholder="试试搜索：北京市/市辖区/朝阳区"
                        :options="options"
                        @change="homeplaceChange"
                        filterable></el-cascader>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="现居住地：" prop="liveplace">
                     <el-cascader
                        placeholder="试试搜索：北京市/市辖区/朝阳区"
                        :options="options"
                        @change="liveplaceChange"
                        filterable></el-cascader>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                 <el-form-item label="婚姻状况：">
                    <el-select v-model="form.maritalstutas">
                        <el-option label="已婚" value="已婚"></el-option>
                        <el-option label="未婚" value="未婚"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                 <el-form-item label="政治面貌：">
                    <el-select v-model="form.politicsstatus">
                        <el-option label="中共党员(含预备党员)" value="中共党员(含预备党员)"></el-option>
                        <el-option label="共青团员" value="共青团员"></el-option>
                        <el-option label="民众" value="民众"></el-option>
                        <el-option label="民主党派" value="民主党派"></el-option>
                        <el-option label="无党派人士" value="无党派人士 "></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                 <el-form-item label="海外经历：">
                    <el-select v-model="form.overseasexperience">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="6">
                  <el-form-item>
                      <el-button type="primary" @click="updatepersonmessage('form')">确认更新</el-button>
                      <el-button type="primary" @click="cancel()">取消</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
        </el-form>
    </div>
     <div class="userpersonphoto">
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/uploadfile"
        name="file"
        :show-file-list="false"
        :on-success="handlePictureSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="this.form.headphoto" :src="this.form.headphoto" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p v-if="this.form.headphoto">{{this.fileNmae}}</p>
        <p v-else>请选择头像</p>
        <!-- <h3><a v-if="this.imageUrl" v-bind:href="this.imageUrl" download=""  title="下载">{{this.imgName}}</a></h3> -->
    </div>
    </div>
</template>
<script>
import { regionDataPlus,CodeToText} from 'element-china-area-data'
export default {
    name:'Personmessage',
    data(){
        var validatecheckPass = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else{
                if(value !== this.form.password){
                    callback(new Error('两次输入的密码不一致'));
                }else{
                    callback();
                }
            }
        };
        var validatepersonname = (rule,value,callback) =>{
            var name = value.replace(/(^\s+)|(\s+$)/g, "");
            if(!name.match(/^[\u4e00-\u9fa5]{2,4}$/)){
                callback(new Error('请输入2-4个汉字'));
            }else{
                callback();
            }
        }
        var validatephonenum = (rule,value,callback) =>{
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(value.length!==11){
                callback(new Error('请输入格式正确的电话号码'));
            }else{
                if(!myreg.test(value)){
                    callback(new Error('请输入格式正确的电话号码'));
                }else{
                    callback();
                }
            }
        }
        return{
            form:{
                headphoto: '',
                username:'',
                password:'',
                checkpassword:'',
                personname:'',
                sex:'男',
                email:'',
                phonenum:'',
                birthday:'',
                homeplace:'',
                liveplace:'',
                maritalstutas:'',
                politicsstatus:'',
                overseasexperience:'',
                usertype:'个人用户'
            },
            fileNmae:'',
            dialogVisible: false,
            options: regionDataPlus,
            labelPosition: "left",
            labelWidth: "100px",
            rules:{
                username:[
                    {required: true, message: "请输入用户名", trigger: "blur"},
                    {min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"}
                ],
                password:[
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {min: 6 , message: "密码不能小于6位", trigger: "blur"}
                    // { validator: validatePass, trigger: 'blur' }
                ],
                checkpassword:[
                    {validator: validatecheckPass,trigger: 'blur'}
                ],
                personname:[
                    {required: true, message: "请输入用户姓名",trigger: "blur"},
                    {validator: validatepersonname, trigger: 'blur'}
                ],
                sex:[
                    {required: true, trigger: "blur"}
                ],
                email:[
                    {required: true, message: "请输入邮箱",trigger: "blur"},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                phonenum:[
                    {required: true, message: "请输入联系电话",trigger: "blur"},
                    {validator: validatephonenum, trigger: 'blur'}
                ]
            }
        }

    },
    created(){
        this.form.headphoto = JSON.parse(sessionStorage.getItem('userperson')).headphoto;
        this.form.username = JSON.parse(sessionStorage.getItem('userperson')).username;
        this.form.password = JSON.parse(sessionStorage.getItem('userperson')).password;
        this.form.checkpassword = JSON.parse(sessionStorage.getItem('userperson')).password;
        this.form.personname = JSON.parse(sessionStorage.getItem('userperson')).personname;
        this.form.sex = JSON.parse(sessionStorage.getItem('userperson')).sex;
        this.form.email = JSON.parse(sessionStorage.getItem('userperson')).email;
        this.form.phonenum = JSON.parse(sessionStorage.getItem('userperson')).phonenum;
        this.form.birthday = JSON.parse(sessionStorage.getItem('userperson')).birthday;
        //this.form.homeplace = JSON.parse(sessionStorage.getItem('userperson')).homeplace;
        // this.form.liveplace = JSON.parse(sessionStorage.getItem('userperson')).liveplace;
        this.form.maritalstutas = JSON.parse(sessionStorage.getItem('userperson')).maritalstutas;
        this.form.politicsstatus = JSON.parse(sessionStorage.getItem('userperson')).politicsstatus;
        this.form.overseasexperience = JSON.parse(sessionStorage.getItem('userperson')).overseasexperience;
    },
    methods:{

        homeplaceChange:function(arr){
            this.form.homeplace = CodeToText[arr[0]]+CodeToText[arr[1]]+CodeToText[arr[2]];
        },

         liveplaceChange:function(arr){
            this.form.liveplace = CodeToText[arr[0]]+CodeToText[arr[1]]+CodeToText[arr[2]];
        },
        updatepersonmessage:function(form){
            this.$refs[form].validate(valid =>{
                if(valid){
                    this.form.username = sessionStorage.getItem('username');
                    this.$http.post('http://localhost:8080/updatepersonmessage',this.form).then((Response)=>{
                        if(Response.data.code===200){
                            alert('信息跟新成功');
                        }
                    })
                    
                }else{
                    alert('信息更新失败，相关内容有误');
                }
            })
        },

        cancel:function(){
            this.$router.push({path:'/homepage'});
        },
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handlePictureSuccess(res,file){
          if(file.response.code===200){
              this.form.headphoto = file.response.filepath;
              this.fileNmae = file.response.originalfilename;
              JSON.parse(sessionStorage.getItem('userperson')).headphoto = file.response.filepath;
              sessionStorage.setItem('touxiang',file.response.filepath);
          }
      }
    }
}
</script>
<style>
@import "../assets/css/elupload.css";
.userpersonregist5{
    /* background-color: rgb(239, 247, 247); */
    margin-top: 20px;
}
.userpersonphoto{
    width: 200px;
    margin-left:1000px;
    margin-top: -850px;
}
a{
    text-decoration: none;
    color: black;
}
a:hover{
    color: blue;
}
</style>