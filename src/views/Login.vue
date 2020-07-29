<!--基本html代码区域-->
<template>
  <div>
    <div class="login">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rules"
        :status-icon="true"
        class="el_form_self"
      >
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label-width="70px">
                    <span><font color="pink" size="6">注册登录页面</font></span>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item class="el-form-item_self">
          <span>
            <font color="black" size="4">求职找工作</font>
          </span>
          <!-- <span><font color="yellow" size="6">快速注册，立获高薪</font></span> -->
        </el-form-item>
        <el-form-item class="el-form-item_self">
          <!-- <span><font color="black" size="4">求职找工作</font></span> -->
          <span>
            <font color="yellow" size="5">快速注册，立获高薪</font>
          </span>
        </el-form-item>
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="用户名：" prop="username">
                      <el-input v-model="form.username" size="small" placeholder="请输入用户名"></el-input>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item prop="username" class="el-form-item_self">
          <el-input v-model="form.username" size="small" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="密码：" prop="password">
                      <el-input v-model="form.password" size="small" placeholder="请输入密码"></el-input>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item prop="password" class="el-form-item_self">
          <el-input v-model="form.password" size="small" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="用户类型：" prop="usertype">
                      <el-radio v-model="usertype" size="small" label="personuser" border>个人</el-radio>
                      <el-radio v-model="usertype" size="small" label="companyuser" border>企业</el-radio>
                      <el-radio v-model="usertype" size="small" label="管理员" border>管理员</el-radio>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item prop="usertype" class="el-form-item_self">
          <el-radio
            v-model="usertype"
            size="mini"
            label="personuser"
            border
            class="el-radio_self"
          >个人</el-radio>
          <el-radio
            v-model="usertype"
            size="mini"
            label="companyuser"
            border
            class="el-radio_self"
          >企业</el-radio>
          <el-radio
            v-model="usertype"
            size="mini"
            label="adminuser"
            border
            class="el-radio_self"
          >管理员</el-radio>
        </el-form-item>
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="验证码：" prop="code">
                      <el-input v-model="code" size="small" placeholder="请输入验证码"></el-input>
                      <div @click="refreshcode">
                          <IdentifyCode :identifyCode="identifyCode"></IdentifyCode>
                      </div>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item prop="code" class="el-form-item_self">
          <el-input v-model="code" size="small" placeholder="请输入验证码"></el-input>
          <div @click="refreshcode">
            <IdentifyCode :identifyCode="identifyCode" @click="refreshcode"></IdentifyCode>
          </div>
          <!-- <IdentifyCode :identifyCode="identifyCode" @click="refreshcode"></IdentifyCode> -->
        </el-form-item>
        <!-- <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item>
                      <el-button type="primary" @click="submit">登录</el-button>
                      <el-button type="primary" @click="register">注册</el-button>
                  </el-form-item>
              </el-col>
        </el-row>-->
        <el-form-item class="el-form-item_self">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="systemintroduce">
        <p>本系统主要为当前的大学生提供一个寻求实习、兼职等工作机会的平台，同时也为企业提供一个招聘的平台。
            个人用户可以方便地在平台上搜寻自己理想的工作，
            企业也可以通过这个平台更广的扩散自己的招聘信息以及企业的信息。
            通过个人用户对具体求职职位的偏好来为个人用户推送相应的招聘信息</p>
    </div>
    </div>
  </div>
</template>
 
 <!-- 写样式的地方 -->
<style>
.login {
  /* background-color: rgb(157, 238, 238); */
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../../public/img/background/loginbackground.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.systemintroduce{
    color: rgb(248, 231, 231);
    font-size: 19px;
    line-height: 32px;
    margin-top: -360px;
    margin-left: 610px;
    width: 550px;
}
.el_form_self {
  /* box-shadow: 7px 5px 12px 2px rgba(202, 182, 182, 0.5); */
  /* border: red solid 1px; */
  background-color: white;
  margin-top: 100px;
  margin-left: 80px;
  /* padding-right: 20px; */
  padding-bottom: 20px;
  width: 300px;
}
.el-form-item_self {
  margin-bottom: 15px !important;
}
.el-form-item_self .el-form-item__content {
  margin-left: 20px !important;
  margin-right: 20px;
}
.el-radio_self {
  margin-right: 2px !important;
}
</style>
 
<!--数据存贮交互，事件控制地区-->
<script>
import axios from "axios";
import IdentifyCode from "@/components/IdentifyCode.vue";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      page: {
        currentpage: 1,
        pagesize: 8,
        total: Number
      },
      searchcontent: "",
      list: [],
      usertype: "personuser",
      code: "",
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  components: {
    IdentifyCode
  },
  methods: {
    /*提交进行判断的函数 */
    submit: function() {
      var obj = this;
      if (this.code.toLowerCase() != this.identifyCode.toLowerCase()) {
        this.$message.error("请正确填写验证码");
        this.refreshcode();
        return;
      }
      if (this.usertype === "personuser") {
        this.$http
          .post("http://localhost:8080/userpersonlogin", this.form)
          .then(Response => {
            if (Response.data.code === 200) {
              localStorage.setItem("Authorization", Response.data.token);
              //   this.$http.get('http://localhost:8080/recruitInfoQuery',{params:{
              //       currentpage: this.page.currentpage,
              //       pagesize: this.page.pagesize}}).then((Response)=>{
              //         //   alert(JSON.stringify(Response.data.list));
              //         //   console.log(JSON.stringify(Response.data.list));
              //         //   console.log(Response.data.list);
              //         //   console.log(typeof Response.data.list);
              //         //   console.log(typeof JSON.stringify(Response.data.list));
              //           sessionStorage.setItem('total',Response.data.total);
              //           sessionStorage.setItem('list',JSON.stringify(Response.data.list));
              //         //   var testlist = JSON.parse(sessionStorage.list);
              //         //   console.log(testlist);
              //   })
              //   sessionStorage.setItem('userperson',JSON.stringify(Response.data.obj));
              this.$http
                .get("http://localhost:8080/recruitInfoQueryBysearchcontent", {
                  params: {
                    searchcontent: this.searchcontent,
                    currentpage: this.page.currentpage,
                    pagesize: this.page.pagesize
                  }
                })
                .then(Response => {
                  sessionStorage.setItem("total", Response.data.total);
                  sessionStorage.setItem(
                    "list",
                    JSON.stringify(Response.data.list)
                  );
                  var testlist = JSON.parse(sessionStorage.list);
                });
              sessionStorage.setItem(
                "userperson",
                JSON.stringify(Response.data.obj)
              );
              this.$router.push({ path: "/homepage" });
              //   window.open("/homepage");
            } else if (Response.data.code === 201) {
              alert(Response.data.message);
            }
          });
      } else if (this.usertype === "companyuser") {
        this.$http
          .post("http://localhost:8080/usercompanylogin", this.form)
          .then(Response => {
            if (Response.data.code === 200) {
              localStorage.setItem("Authorization", Response.data.token);
              sessionStorage.setItem(
                "usercompany",
                JSON.stringify(Response.data.obj)
              );
              this.$router.push({ path: "/applyinfomanagecompany" });
            } else if (Response.data.code === 201) {
              alert(Response.data.message);
            }
          });
      } else if (this.usertype === "adminuser") {
        this.$http
          .post("http://localhost:8080/useradminlogin", this.form)
          .then(Response => {
            if (Response.data.code === 200) {
              localStorage.setItem("Authorization", Response.data.token);
              sessionStorage.setItem(
                "useradmin",
                JSON.stringify(Response.data.obj)
              );
              this.$router.push({ path: "/adminusermanage" });
            } else {
              alert(Response.data.message);
            }
          });
      }
    },
    register: function() {
      if (this.usertype === "companyuser") {
        this.$router.push({ path: "/usercompanyregist" });
      } else {
        this.$router.push({ path: "/userpersonregist" });
      }
    },
    refreshcode: function() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  mounted: function() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>
 

