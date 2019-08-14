<template>
  <div class="grade">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生管理</span>
        <el-select
          v-model="character"
          slot="prepend"
          placeholder="请选择班级"
          @change="getName(character)"
        >
          <el-option
            v-for="item in tableDatas"
            :key="item.className"
            :label="item.className"
            :value="item.className"
          ></el-option>
        </el-select>
        <el-button
          type="text"
          id="el-button"
          @click="dialogFormVisible  = true,submitValue=false"
          style="float: right; padding: 3px 0"
        >
          <span>&nbsp;新&nbsp;增 &nbsp;</span>
        </el-button>
        <el-dialog
          :title="submitValue?'修 改 学 生':'增 加 学 生'"
          :visible.sync="dialogFormVisible"
          id="el-dialog"
        >
          <el-form style="text-align: center;">
            <el-form-item label="学生名称">
              <el-input v-model="student.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属班级">
              <div>
                <el-select v-model="characters" slot="prepend" placeholder="请选择班级" @change="getNames">
                  <el-option
                    v-for="item in tableDatas"
                    :key="item.className"
                    :label="item.className"
                    :value="item.className"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="student.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                type="date"
                v-model="student.birthDay"
                placeholder="选择日期"
                autocomplete="off"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-model="student.pas" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="radios" label="男">男</el-radio>
              <el-radio v-model="radios" label="女">女</el-radio>
            </el-form-item>
            <!-- <div slot="footer" class="dialog-footer"> -->
            <el-button @click="dialogFormVisible = false,radios='男'
            characters = '',
            student.name = '',
            student.tel = '',
            student.birthDay = '',
            student.pas = ''">取 消</el-button>
            <el-button type="primary" @click="submitValue?submitForm('add'):submitForm2('add')">确 定</el-button>
            <!-- </div> -->
          </el-form>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="班级名称" prop="className"></el-table-column>
        <el-table-column label="学生名称" prop="stuName"></el-table-column>
        <el-table-column label="性别" prop="stuSex"></el-table-column>
        <!-- <el-table-column label="生日" prop="stuBirthDay"></el-table-column> -->
        <el-table-column label="生日">
          <template slot-scope="scope">{{scope.row.stuBirthDay | formatDate}}</template>
        </el-table-column>
        <el-table-column label="手机号码" prop="stuMobile"></el-table-column>
        <el-table-column label="密码" prop="stuPassword"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/tool/formatDate";
export default {
  data() {
    return {
      radios: "男",   //默认单选框为
      characters: "", //新增编辑框内所选班级
      character: "",  //新增编辑框外所选班级
      gradename: "",  //新增编辑框外所选班级名字
      roleid: "",   //编辑班级id
      student: {
        name: "", //input框中名字
        pas: "", //input框中密码
        tel: "", //input框中电话
        birthDay: "" //input框中生日
      },
      submitValue: false, //修改老师title显示隐藏
      index: "", //编辑时当前下标
      dialogFormVisible: false, //弹框状态
      tableData: [], //获取获取班级所有信息
      tableDatas: [], //获取所有的班级信息
      selectForm: {
        //作为用户初始的查询
        className: "", //班级名称
        classId: "" //班级编号
      }
    };
  },

  mounted() {
    this.stuDents();
    this.stuDent();
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      //  console.log(date);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    /**
     * 获取所有的班级信息
     */
    stuDents() {
      let that = this;
      that.axios
        .get("/api/Class/GetAllClass")
        .then(function(res) {
          that.tableDatas = res.data;
          let className1 = that.tableDatas[0].className; //默认数据为查询到的班级位置1
          that.selectForm.className = className1;
          that.selectForm.classId = that.tableDatas[0].classId;
          that.character = that.tableDatas[0].className;
          console.log(that.selectForm.classId);
          that.getName(className1);
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 获取班级所有信息
     */
    stuDent() {
      let that = this;
      let classIds = that.selectForm.classId;
      console.log(classIds);
      that.axios
        .get("/api/Student/GetClassStudent", {
          params: {
            classId: classIds
          }
        })
        .then(function(res) {
          that.tableData = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          // that.$message.error("失败");
        });
    },
    /**
     * 获取选择班级下拉框点击后班级的id
     */
    getName(val) {
      let that = this;
      let index = that.tableDatas.findIndex(item => item.className == val);
      // console.log(index);
      // console.log(that.selectForm.className);
      that.selectForm.classId = that.tableDatas[index].classId;
      that.selectForm.className = that.tableDatas[index].className
      console.log(that.tableDatas[index].className);
      that.stuDent();
    },
    /**
     * 获取新增编辑选择班级下拉框点击后班级的id
     */
    getNames(val) {
      let that = this;   
        that.gradename =val
     let array = this.tableDatas;
     
      for (let index = 0; index < array.length; index++) {
        const element = array[index].className;
        if (element == val) {
          that.roleid = array[index].classId; //角色id赋值          
        }
      }
        console.log(that.roleid);
    },
    /**
     * 新增
     */
    submitForm2(formName) {
      let that = this;
      that.axios
        .post("/api/Student/AddStudent", {
          stuName: that.student.name, //用户名
          stuMobile: that.student.tel, //手机号
          stuSex: that.radios, //性别，男|女
          stuPassword: that.student.pas, //密码
          stuClassId: that.roleid, //班级编号
          stuBirthDay: that.student.birthDay
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
            that.radios='男'
            that.characters = "";
            that.student.name = ''; //新增成功后清空新增框内的值
            that.student.tel = '';
            that.student.birthDay = '';
            that.student.pas = '';
            that.tableData.unshift(res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 编辑信息
     */
    handleEdit(index, row) {
      console.log(row);
      let that = this;
      that.submitValue = true;
      that.dialogFormVisible = true;
      that.index = index;
      //编辑时给弹框中的选项赋值
      that.student.name = that.tableData[index].stuName;
      that.radios = that.tableData[index].stuSex;
      that.student.pas = that.tableData[index].stuPassword;
      that.student.tel = that.tableData[index].stuMobile;
      that.student.birthDay = that.tableData[index].stuBirthDay;
      that.characters = that.tableData[index].className;
      that.rolename = that.tableData[index].userTypeTypeName; //未调用getName方法时赋给teachername原值
      that.roleid = that.tableData[index].classId;//未调用getNames方法时赋给roleid原值
      that.gradename = that.tableData[index].className
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      let that = this;
      console.log(row);
      that
        .$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .get("/api/Student/RemoveStudent", {
              params: {
                uid: row.stuUid
              }
            })
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
      console.log(that.tableData[that.index]);
      that.axios
        .post("/api/Student/ModifyStudent", {
          stuUid: that.tableData[that.index].stuUid,
          stuName: that.student.name,
          stuBirthDay: that.student.birthDay,
          stuClassId: that.roleid,
          stuMobile: that.student.tel,
          stuPassword: that.student.pas,
          stuSex: that.radios
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
            that.tableData[that.index].stuName=that.student.name
            that.tableData[that.index].stuSex=that.radios             //页面内容改变
            that.tableData[that.index].stuPassword=that.student.pas
            that.tableData[that.index].stuMobile=that.student.tel
            that.tableData[that.index].stuBirthDay=that.student.birthDay
            that.tableData[that.index].className= that.gradename
             console.log(that.roleid);
            that.tableData[that.index].classId= that.roleid
            that.radios='男'
            that.characters = "";
            that.student.name = ''; //编辑成功后清空新增框内的值
            that.student.tel = '';
            that.student.birthDay = '';
            that.student.pas = '';  
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
