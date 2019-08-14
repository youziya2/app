<template>
  <div class="grade">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>老师管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>老师管理</span>
        <el-radio-group v-model="radio"  @change="tableData = tableFilter">
          <el-radio
            v-for="item in radioData"
            :key="item.userTypeId"
            :label="item.userTypeTypeName"
            :value="item.userTypeId"
          ></el-radio>
        </el-radio-group>
        <el-button
          type="text"
          id="el-button"
          @click="dialogFormVisible  = true,submitValue=false"
          style="float: right; padding: 3px 0"
        >
          <span>&nbsp;新&nbsp;增 &nbsp;</span>
        </el-button>
        <el-dialog
          :title="submitValue?'修 改 老 师':'增 加 老 师'"
          :visible.sync="dialogFormVisible"
          id="el-dialog"
        >
          <el-form style="text-align: center;">
            <el-form-item label="姓名">
              <el-input v-model="add.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="add.pas" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="radios" label="男">男</el-radio>
              <el-radio v-model="radios" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="add.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <div>
                <el-select
                  v-model="character"
                  slot="prepend"
                  placeholder="请选择角色"
                  @change="getName"
                >
                  <el-option
                    v-for="(item,index) in role"
                    :key="index"
                    :value="item.userTypeTypeName"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <!-- <div slot="footer" class="dialog-footer"> -->
            <el-button @click="dialogFormVisible = false,radios = '男',character = '',add.tel = '',add.pas = '',add.name = ''">取 消</el-button>
            <el-button type="primary" @click="submitValue?submitForm('add'):submitForm2('add')">确 定</el-button>
            <!-- </div> -->
          </el-form>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="老师名称" prop="userName"></el-table-column>
        <el-table-column label="手机号" prop="userMobile"></el-table-column>
        <el-table-column label="性别" prop="userSex"></el-table-column>
        <el-table-column label="密码" prop="userPassword"></el-table-column>
        <el-table-column label="角色" prop="userTypeTypeName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.disableDelete">删除</el-button>
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
      radios: "男", //默认性别选中男
      character: "", //修改角色名称
      roleid: "", //修改角色id
      radio: "全部", //默认性别选中全部
      submitValue: false, //修改老师title显示隐藏
      index: "", //编辑时当前下标
      dialogFormVisible: false, //弹框状态
      add: {
        name: "", //input框中名字
        pas: "", //input框中密码
        tel: "" //input框中电话
      },
      tableDatas:[],//用于过滤时
      tableData: [
        {
          userId: "", //主键编号
          className: "", //标识符
          classTeacherId: "", //手机号
          userName: "", //老师名称
          classCourseId: "", //性别
          courseName: "", //密码
          classStudents: "", //角色编号
          classCreateTime: "" //角色
        }
      ],
      radioData:[ {       //用于过滤时默认选中全部
          disable: true,
          userTypeId: 0,
          userTypeTypeName: '全部'
        }],
      role: [] //接收角色信息
    };
  },
  mounted() {
    this.teaCher();
    this.roLe();
  },
  methods: {
    /**
     * 获取老师的信息
     */
    teaCher() {
      let that = this;
      that.axios
        .get("/api/User/GetTeachers")
        .then(function(res) {
          that.tableData = res.data;
           that.tableDatas = res.data;
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
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
          that.radioData.push(...res.data);
    //  for (let i = 0; i < that.radioData.length; i++) {
    
    //    let radioData  = that.radioData[i]
    //     // console.log(radioData); 
    //       var keyMap = {disable:"disables",userTypeId: "userTypeIds", userTypeTypeName: "userTypeTypeNames"}            
    //       var objs= Object.keys(radioData).reduce((newData, key) => {
    //           let newKey = keyMap[key] || key
    //           newData[newKey] = radioData[key]
    //           return newData
    //           },{})  
    //           // console.log(objs)                  
    //       that.radioData[i]= objs
    //       that.radioData[i].userTypeIds=that.radioData[i].userTypeIds+13
    //  }
      
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
      return this.role;
    },
    /**
     * 新增
     */
    submitForm2(formName) {
      let that = this;
      that.axios
        .post("/api/User/AddTeacher", {
          userName: that.add.name, //用户名，不能为空
          userMobile: Number(that.add.tel), //手机号，长度11位
          userSex: that.radios, //性别，男|女
          userPassword: Number(that.add.pas), //密码，长度6~18
          userUserTypeId: that.roleid //用户角色编号
        })
        .then(function(res) {
          console.log(res);
          that.dialogFormVisible = false;
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
            that.character = "";
           that.add.name = ''; //新增成功后清空新增框内的值
            that.add.pas = '';
            that.add.tel = '';
            that.teaCher(); //重新调用获取班级信息方法给tableData赋值
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
      console.log(val);
        // val = this.character;
      let array = this.role;
      for (let index = 0; index < array.length; index++) {
        const element = array[index].userTypeTypeName;
        if (element == val) {
          this.roleid = array[index].userTypeId; //角色名称赋值
        }
      }
      console.log(this.roleid);
      // return this.roleid;
    },
    /**
     * 编辑信息
     */
    handleEdit(index, row) {
      let that = this;
      that.submitValue = true;
      that.dialogFormVisible = true;
      that.index = index;
      //编辑时给弹框中的选项赋值
      that.add.name = that.tableData[index].userName;
      that.radios = that.tableData[index].userSex;
      that.add.pas = that.tableData[index].userPassword;
      that.add.tel = that.tableData[index].userMobile;
      that.roleid = that.tableData[index].userUserTypeId;
      that.character = that.tableData[index].userTypeTypeName; //未调用getName方法时赋给teachername原值
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      let that = this;
      console.log(row);
      that
        .$confirm("此操作将永久删除该老师, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .post("/api/User/RemoveTeacher?uid=" + row.userUid + "")
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
                that.tableData.splice(index, 1); //删除当前选中数据
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
    submitForm(formName) {
      let that = this;
      that.axios
        .post("/api/User/ModifyTeacher", {
          userUid: that.tableData[that.index].userUid,
          userName: that.add.name,
          userMobile: that.add.tel,
          userSex: that.radios,
          userUserTypeId: that.roleid,
          userPassword: that.add.pas
        })
        .then(function(res) {
          console.log(res);
          that.dialogFormVisible = false;
          if (res.data.code == 0) {
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
            that.tableData[that.index].userName = that.add.name;
            that.tableData[that.index].userSex = that.radios;
            that.tableData[that.index].userPassword = that.add.pas;
            that.tableData[that.index].userMobile = that.add.tel;
            that.tableData[that.index].userUserTypeId = that.roleid;
            that.tableData[that.index].userTypeTypeName = that.character;
            that.radios = "男";
            that.character = "";
            that.add.name = ''; //编辑成功后清空新增框内的值
            that.add.pas = '';
            that.add.tel = '';
          }
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    }
  },
  computed: {
    // 过滤计算
    tableFilter(){
      let that = this;
      console.log(that.radio);
      if(that.radio==that.radioData[0].userTypeTypeName){
        return that.tableDatas;
      }
      return that.tableDatas.filter(value => value.userTypeTypeName == that.radio)    //过滤
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
