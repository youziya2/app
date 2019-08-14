<template>
  <div class="grade">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
        <el-button
          type="text"
          id="el-button"
          @click="dialogFormVisible  = true,submitValue=false,rolename=''"
          style="float: right; padding: 3px 0"
        >
          <span>&nbsp;新&nbsp;增 &nbsp;</span>
        </el-button>
        <!-- 新增编辑弹框 -->
        <el-dialog
          :title="submitValue?'修 改 角 色':'增 加 角 色'"
          :visible.sync="dialogFormVisible"
          id="el-dialog"
        >
          <el-form style="text-align: center;">      
              <div>
           <el-form-item label="角色名称">
              <el-input v-model="rolename" autocomplete="off"></el-input>
            </el-form-item>
              </div>  
            <!-- <div slot="footer" class="dialog-footer"> -->
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitValue?submitForm2('add'):submitForm('add')">确 定</el-button>
            <!-- </div> -->
          </el-form>
        </el-dialog>
      </div>
      <el-table :data="role" style="width: 100%">
        <el-table-column label="角色名称" prop="userTypeTypeName"></el-table-column>
        <el-table-column label="编号" prop="userTypeId"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"  :disabled="scope.row.disable">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index:"",//当前选中项下标
      rolename:"",//编辑新增框内input值
      dialogFormVisible: false, //新增弹框状态    
      submitValue: false, //编辑弹框状态
      role: [] //接收角色信息
    };
  },
  mounted() {
    this.roLe();
  },
  methods: {
    /**
     * 获取角色的信息
     */
    roLe() {
      let that = this;
      that.axios
        .get("/api/UserType/GetUserRoles")
        .then(function(res) {
          console.log(res);
          that.role = res.data;
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 新增
     */
    submitForm(formName) {
       let that = this;
       console.log(that.rolename);
      that.axios
        .post("/api/UserType/AddUserRole?userRoleName="+that.rolename+"")
        .then(function(res) {
          that.dialogFormVisible=false
          console.log(res);
           if (res.data.code == 0) {
            //根据返回code值来判断添加的情况
            that.$message("数据没有改变");
          }
          if (res.data.code == -1) {
            that.$message.error("系统异常");
          }
          if (res.data.code == -2) {
            that.$message.error("参数错误");
          }
          if (res.data.code == 1) {
            that.$message.success("新增成功");
            that.rolename = ''; //新增成功后清空新增框内的值
            that.roLe(); //重新调用获取班级信息方法给role赋值
          }
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 获取编辑中角色下拉框点击后角色的名称
     */
    getName(val) {
     
    },
    /**
     * 编辑信息
     */
    handleEdit(index, row) {   
       let that = this;
       that.index = index
         that.dialogFormVisible=true
        that.submitValue=true
        that.rolename=that.role[index].userTypeTypeName
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
     let that = this;
      console.log(row);
      that
        .$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .post("/api/UserType/RemoveUserRole?userRoleId=" + row.userTypeId + "")
            .then(res => {
              if (res.data.code == 0) {
                that.$message("数据没有改变");
              }
              if (res.data.code == -1) {
                that.$message.error("系统异常");
              }
              if (res.data.code == -2) {
                console.log(res);
                that.$message.error("参数错误");
              }
              if (res.data.code == 1) {
                that.role.splice(index, 1); //删除当前选中数据
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
       /**
     * 编辑
     */
    submitForm2(formName) {
        let that = this;
           console.log(that.rolename);
           console.log(that.role[that.index].userTypeId);
      that.axios
        // .post("/api/UserType/ModifyUserRole", {
        //   id:that.role[that.index].userTypeId, //要修改的角色编号
        //   userRoleName:that.rolename //角色名称
        // })
       .post("/api/UserType/ModifyUserRole?id=" + that.role[that.index].userTypeId + "&userRoleName="+ that.rolename +'')
        .then(function(res) {
          that.dialogFormVisible=false
          console.log(res);
           if (res.data.code == 0) {
            //根据返回code值来判断添加的情况
            that.$message("数据没有改变");
          }
          if (res.data.code == -1) {
            that.$message.error("系统异常");
          }
          if (res.data.code == -2) {
            that.$message.error("参数错误");
          }
          if (res.data.code == 1) {
            that.$message.success("修改成功");
            that.role[that.index].userTypeTypeName=that.rolename 
          }
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
/deep/.el-dialog {
  width: 30%;
}
/deep/.el-input {
  width: 170px;
}
/deep/.el-input__inner {
  width: 170px;
}
/deep/.el-form-item__label {
  width: 80px !important;
}

.el-card {
  width: 95% !important;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
