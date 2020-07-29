<template>
    <div class="userpersonregist">
        <el-form ref="personregistform" :label-position="labelPosition" :rules="rules" :status-icon="true" :label-width="labelWidth" :model="personregistform">
            <el-row type="flex" justify="center">
              <el-col :span="10">
                  <el-form-item>
                    <!-- <span><font color="pink" size="6">个人用户注册</font></span> -->
                    <el-steps :active="2" finish-status="success">
                        <el-step title="个人用户开始注册"></el-step>
                        <el-step title="注册中"></el-step>
                        <el-step title="注册完成"></el-step>
                    </el-steps>
                  </el-form-item>
              </el-col>
          </el-row>
          <!-- <el-steps :active="2" finish-status="success">
              <el-step title="步骤 1"></el-step>
              <el-step title="步骤 2"></el-step>
              <el-step title="步骤 3"></el-step>
          </el-steps> -->
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="用户名：" prop="username">
                      <el-input v-model="personregistform.username" size="small" placeholder="请输入用户名"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="密码：" prop="password">
                      <el-input type="password" v-model="personregistform.password" size="small" placeholder="请输入密码"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="确认密码：" prop="checkpassword">
                      <el-input type="password" v-model="personregistform.checkpassword" size="small" placeholder="请确认密码"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="姓名：" prop="personname">
                      <el-input v-model="personregistform.personname" size="small" placeholder="请填写你的真实姓名"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="性别：" prop="sex">
                      <el-radio v-model="personregistform.sex" label="男" border>男</el-radio>
                      <el-radio v-model="personregistform.sex" label="女" border>女</el-radio>
                      <!-- <el-input v-model="form.userType" size="small"></el-input> -->
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="邮箱：" prop="email">
                      <el-input v-model="personregistform.email" size="small" placeholder="请填写你的邮箱"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="电话：" prop="phonenum">
                      <el-input v-model="personregistform.phonenum" size="small" placeholder="请填写你的邮箱"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="出生日期：" prop="birthday">
                      <el-date-picker type="date" placeholder="选择日期" v-model="personregistform.birthday" style="width: 100%;"></el-date-picker>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="用户类型：" prop="usertype">
                      <el-radio v-model="personregistform.usertype" label="个人用户" border>个人</el-radio>
                      <el-radio v-model="personregistform.usertype" label="企业用户" border>企业</el-radio>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item>
                      <el-button type="primary" @click="register('personregistform')">注册</el-button>
                      <el-button type="primary" @click="relogin">返回登录</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'UserPersonregist',
    data(){
        var validatecheckPass = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请再次输入密码'));
            }else{
                if(value !== this.personregistform.password){
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
            personregistform:{
                username:'',
                password:'',
                checkpassword:'',
                personname:'',
                sex:'男',
                email:'',
                phonenum:'',
                birthday:'',
                usertype:'个人用户'
            },
            // checkpassword:'',
            msgpassword:'666',
            labelPosition: "right",
            labelWidth: "100px",
            rules:{
                username:[
                    {required: true, message: "请输入用户名", trigger: "blur"},
                    {min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur"}
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
    methods:{
        register:function(personregistform){
            this.$refs[personregistform].validate(valid =>{
                if(valid){
                    this.$http.post('http://localhost:8080/userpersonregist',this.personregistform).then((Response)=>{
                        if(Response.data.code===200){
                            alert('注册成功，请前往登录');
                            this.$router.push({path:'/'});
                        }else{
                            alert('注册失败，用户名重复！！！');
                        }
                    })
                    
                }else{
                    alert('注册失败，相关信息填写有误！！！');
                }
            })
        },

        relogin:function(){
            this.$router.push({path:'/login'});
        }
    }
}
</script>
<style>
.userpersonregist{
    background-color:white;
}
</style>