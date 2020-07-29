<template>
    <div class="block">
      <el-button type="success" size="small" round class="addFirstleverResource" @click="addFirstleverResource">添加一级资源</el-button>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            circle
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="add(data)">
          </el-button>
          <el-button
            circle
            type="primary"
            size="mini"
            icon="el-icon-edit">
          </el-button>
          <el-button
            circle
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :visible.sync="dialogAddFirstleverResourcegsVisible" class="dialogaddFirstleverResource">
      <el-form>
        <el-form-item label="一级资源名称">
          <el-col span="15">
            <el-input size="small" type="text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="一级菜单名称">
          <el-col span="15">
            <el-input type="text" size="small"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="一级菜单路径">
          <el-col span="15">
            <el-input type="text" size="small"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
          <el-button type="primary">确 定</el-button>
          <el-button @click="dialogAddFirstleverResourcegsVisible = false" type="primary">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddmenugsVisible" class="dialogaddmenu">
      <el-form>
        <el-form-item label="菜单名称" prop="newMenulabel">
          <el-col span="15">
            <el-input type="text" size="small" v-model="newMenu.newMenulabel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单路径" prop="newMenupath">
          <el-col span="15">
            <el-input type="text" size="small" v-model="newMenu.newMenupath"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
          <el-button type="primary" @click="Addmenu">确 定</el-button>
          <el-button @click="dialogAddmenugsVisible = false" type="primary">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: left;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    margin-bottom: -4px;
  }
.block{
  width: 20%;
  margin: 30px 20px;
  border: 1px solid rgb(218, 209, 209);
  padding: 10px 10px;
}
.block .el-tree-node__content{
  height: 40px;
}
.addFirstleverResource{
  margin-left: -155px!important;
  margin-bottom: 18px!important;
}
.dialogaddFirstleverResource{
  width: 800px;
}
.dialogaddmenu{
  width: 800px;
}
</style>
<script>
let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '用户管理',
        children: [{
          id: 4,
          label: '个人用户管理',
        },
        {
          id: 5,
          label: '企业用户管理'
        },
        {
          id: 6,
          label: '管理员用户管理'
        }]
      }, {
        id: 2,
        label: '系统管理',
        children: [{
          id: 7,
          label: '资源管理'
        }, {
          id: 8,
          label: '角色资源分配'
        }]
      },
      {
        id: 3,
        label: '招聘信息管理'
      }];
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data)),
        dialogAddFirstleverResourcegsVisible: false,
        dialogAddmenugsVisible: false,
        newChildlabel: '',
        nowNode:[],
        newMenu:{
          newMenulabel: '',
          newMenupath: ''
        }
      }
    },

    methods: {
      append(data) {
        // this.dialogAddmenugsVisible = true;
        const newChild = { id: id++, label: this.newMenu.newMenulabel, children: [] };
        if (!data.children) {
          console.log("如果该节点没有子节点");
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      addFirstleverResource(){
        this.dialogAddFirstleverResourcegsVisible = true;
      },
      //这里传入的data是当前操作的节点的数据
      add(data){
        const _this = this;
        _this.dialogAddmenugsVisible = true;
        _this.nowNode = data;
      },
      Addmenu(){
        const _this = this;
        // _this.newChildlabel = this.newMenu.newMenulabel;
        const data = this.nowNode;
        // console.log(data);
        _this.append(data);
        _this.dialogAddmenugsVisible = false;
      }

    //   renderContent(h, { node, data, store }) {
    //     return (
    //       <span class="custom-tree-node">
    //         <span>{node.label}</span>
    //         <span>
    //           <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
    //           <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
    //         </span>
    //       </span>);
    //   }
    }
  };
</script>