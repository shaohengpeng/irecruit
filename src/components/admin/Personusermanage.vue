<template>
  <div class="mainstyle">
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidth"
      ref="personusersearchinfo"
      :inline="true"
      :model="personusersearchinfo"
      class="demo-form-inline"
    >
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="personusersearchinfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="searchpersonuser">查询</el-button>
        <el-button type="warning" @click="addnewpersonuser">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="applyinfoshow">
      <ul>
        <li v-for="(personuserinfo,index) in personuserinfos" :key="index">
          <el-card class="box-card my-box-card" shadow="hover">
            <div slot="header" class="clearfix my-el-card_head">
              <span style="font-weight: 1000">{{personuserinfo.personname}}</span>
              <!-- <el-button style="float: right; padding: 3px 14px" type="text">查看</el-button> -->
              <el-dropdown style="float: right" trigger="click">
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="viewpersonuser(index)">查看用户</el-dropdown-item>
                  <el-dropdown-item @click.native="frozenpersonuser(index)">冻结用户</el-dropdown-item>
                  <el-dropdown-item @click.native="deletepersonuser(index)">删除用户</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="text item">{{personuserinfo.username}}</div>
            <div class="text item">{{personuserinfo.phonenum}}</div>
            <div class="text item">{{personuserinfo.email}}</div>
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
        :total="totalpage"
      ></el-pagination>
    </div>
    <!-- 查看用户信息时弹出的模态框 -->
    <el-dialog :visible.sync="dialogViewgsVisible">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        ref="personuserinfo"
        :inline="true"
        :model="personuserinfo"
        class="demo-form-inline"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="personuserinfo.username" size="small" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="personuserinfo.password" size="small" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="personname">
          <el-input v-model="personuserinfo.personname" size="small" placeholder="请填写你的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio v-model="personuserinfo.sex" label="男" border>男</el-radio>
          <el-radio v-model="personuserinfo.sex" label="女" border>女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="personuserinfo.email" size="small" placeholder="请填写你的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phonenum">
          <el-input v-model="personuserinfo.phonenum" size="small" placeholder="请填写你的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户类型：" prop="usertype">
          <el-radio v-model="personuserinfo.usertype" size="small" label="个人用户" border>个人</el-radio>
          <el-radio v-model="personuserinfo.usertype" size="small" label="企业用户" border>企业</el-radio>
          <el-radio v-model="personuserinfo.usertype" size="small" label="管理员用户" border>管理员</el-radio>
        </el-form-item>
        <el-form-item label="出生日期：" prop="birthday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="personuserinfo.birthday"
            size="small"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left:10px;">
          <el-button type="primary" @click="updatepersonuserformSubmit">确认</el-button>
          <el-button @click="dialogViewgsVisible = false" type="warning">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增用户时弹出的模态框 -->
    <el-dialog :visible.sync="dialogAddgsVisible">
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        ref="personuseraddinfo"
        :inline="true"
        :model="personuseraddinfo"
        class="demo-form-inline"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="personuseraddinfo.username" size="small" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="personuseraddinfo.password" size="small" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="personname">
          <el-input v-model="personuseraddinfo.personname" size="small" placeholder="请填写你的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户类型：" prop="usertype">
          <el-radio v-model="personuseraddinfo.usertype" size="small" label="个人用户" border>个人</el-radio>
          <el-radio v-model="personuseraddinfo.usertype" size="small" label="企业用户" border>企业</el-radio>
          <el-radio v-model="personuseraddinfo.usertype" size="small" label="管理员用户" border>管理员</el-radio>
        </el-form-item>
        <el-form-item style="margin-left:10px;">
          <el-button type="primary" @click="addpersonuserformSubmit">确认</el-button>
          <el-button @click="dialogAddgsVisible = false" type="warning">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
@import "../../assets/css/personmanage.css";
</style>
<script>
export default {
  data() {
    return {
      personusersearchinfo: {
        username: ""
      },
      personuseraddinfo: {
        username: "",
        password: "",
        personname: "",
        usertype: ""
      },
      personuserinfo: {
        username: "",
        password: "",
        personname: "",
        sex: "",
        email: "",
        phonenum: "",
        birthday: "",
        usertype: "",
        accountstatus: ""
      },
      pageinfo: {
        currentpage: 1,
        pagesize: 8,
        totalpage: 16
      },
      dialogAddgsVisible: false,
      dialogViewgsVisible: false,
      labelPosition: "right",
      labelWidth: "100px",
      personuserinfos: []
    };
  },
  methods: {
    searchpersonuser: function() {
      this.$http
        .get("http://localhost:8080/setuserpersonpageconfig", {
          params: {
            currentpage: this.pageinfo.currentpage,
            pagesize: this.pageinfo.pagesize
          }
        })
        .then(Response => {
          this.$http
            .post(
              "http://localhost:8080/selectUserpersonAll",
              this.personusersearchinfo
            )
            .then(Response => {
              sessionStorage.setItem(
                "personuserinfos",
                JSON.stringify(Response.data.list)
              );
              sessionStorage.setItem("totaluserperson", Response.data.total);
              this.totalpage = parseInt(sessionStorage.totaluserperson);
              this.personuserinfos = JSON.parse(sessionStorage.personuserinfos);
            });
        });
    },
    viewpersonuser: function(index) {
      this.personuserinfo.username = this.personuserinfos[index].username;
      this.personuserinfo.personname = this.personuserinfos[index].personname;
      this.personuserinfo.sex = this.personuserinfos[index].sex;
      this.personuserinfo.password = this.personuserinfos[index].password;
      this.personuserinfo.usertype = this.personuserinfos[index].usertype;
      this.personuserinfo.email = this.personuserinfos[index].email;
      this.personuserinfo.phonenum = this.personuserinfos[index].phonenum;
      this.personuserinfo.birthday = this.personuserinfos[index].birthday;
      this.dialogViewgsVisible = true;
    },
    updatepersonuserformSubmit: function() {},
    deletepersonuser: function(index) {
      this.personuserinfo.username = this.personuserinfos[index].username;
      this.$http
        .get("http://localhost:8080/deleteByusername", {
          params: { username: this.personuserinfo.username }
        })
        .then(Response => {
          if (Response.data.code === 200) {
            this.$message(Response.data.message);
          }
        });
      this.searchpersonuser();
    },
    frozenpersonuser: function(index) {
      this.personuserinfo.username = this.personuserinfos[index].username;
      this.personuserinfo.accountstatus = this.personuserinfos[index].accountstatus;
      if (this.personuserinfo.accountstatus === "账号异常") {
        this.$message("账户冻结操作失败，该账号已被冻结");
      } else {
        this.personuserinfo.accountstatus = "账号异常";
        this.$http
          .get("http://localhost:8080/frezonuserperson", {
            params: {
              accountstatus: this.personuserinfo.accountstatus,
              username: this.personuserinfo.username
            }
          })
          .then(Response => {
            if (Response.data.code === 200) {
              this.$message(Response.data.message);
            }
          });
      }
    },
    addpersonuserformSubmit: function() {
      this.$http
        .post("http://localhost:8080/adduserperson", this.personuseraddinfo)
        .then(Response => {
          if (Response.data.code === 200) {
            this.$message(Response.data.message);
          }
        });
      this.searchpersonuser();
    },
    addnewpersonuser: function() {
      this.dialogAddgsVisible = true;
    }
  },
  created() {
    this.totalpage = parseInt(sessionStorage.totaluserperson);
    this.personuserinfos = JSON.parse(sessionStorage.personuserinfos);
  }
};
</script>