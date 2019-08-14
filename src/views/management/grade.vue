<template>
  <div class="grade">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>班级管理</span>
        <el-button
          type="text"
          id="el-button"
          @click="dialogFormVisible  = true"
          style="float: right; padding: 3px 0"
        >
          <span>&nbsp;新&nbsp;增 &nbsp;</span>
        </el-button>
        <el-dialog title="新 增 成 员" :visible.sync="dialogFormVisible" id="el-dialog">
          <el-form  :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" class="demo-ruleForm">
            <el-form-item label="班级名称" prop="user">
              <el-input v-model="ruleForm2.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="老师">
              <div>
                <el-select v-model="teachers" slot="prepend" placeholder="请选择老师">
                  <el-option
                    v-for="item in teaCherd"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="课程">
              <div>
                <el-select v-model="value" slot="prepend" placeholder="请选择课程">
                  <el-option
                    v-for="item in couRses"
                    :key="item.userId"
                    :label="item.courseName"
                    :value="item.courseId"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="班级名称" prop="className"></el-table-column>
        <el-table-column label="老师名称" prop="userName"></el-table-column>
        <el-table-column label="班级主键" prop="classId"></el-table-column>
        <el-table-column label="专业名称" prop="courseName"></el-table-column>
        <el-table-column label="班级人数" prop="classStudents"></el-table-column>
        <el-table-column label="班级创建日期" >
          <template slot-scope="scope">
          {{scope.row.classCreateTime | formatDate}}
          </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.classStudents>0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编 辑" :visible.sync="dialogFormVisibles" id="el-dialog">
        <el-form>
          <el-form-item label="班级名称">
            <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="老师">
            <div>
              <el-select
                v-model="teacher"
                slot="prepend"
                placeholder="请选择老师"
                @change="getName(teacher)"
              >
                <el-option
                  v-for="item in teaCherd"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="课程">
            <div>
              <el-select
                v-model="values"
                slot="prepend"
                placeholder="请选择课程"
                @change="courseNames(values)"
              >
                <el-option
                  v-for="item in couRses"
                  :key="item.courseId"
                  :label="item.courseName"
                  :value="item.courseId"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibles = false">取 消</el-button>
          <el-button type="primary" @click="submitForms('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {formatDate}  from '@/tool/formatDate'
export default {
  data() {
     var checkUser = (rule, value, callback) => {
        if (value==='') {
          return callback(new Error('班级名称不能为空!'));
        }else {
						callback();
					}
        };
    return {
      disabled:"", //删除按钮禁用状态
      value: "", //新增课程当前选中项
      teachers: "", //新增老师当前选中项
      values: "", //修改课程当id
      valuesname: "", //修改课程名称
      teacher: "", //修改老师id
      teachername: "", //修改老师名称
      index: "",
      dialogFormVisible: false,   //新增弹框状态
      dialogFormVisibles: false,   //编辑弹框状态
      ruleForm2: {         //新增弹框内班级名字
        user:""
      },
       rules: {
          user: [
            {required: true, validator: checkUser, trigger: 'blur' }
          ]
       },
      ruleForm: {       //编辑弹框内班级名字
        user: ""
      },
      tableData: [
        {
          //接收信息
          classId: "", //班级主键编号
          className: "", //班级名称
          classTeacherId: "", //老师编号
          userName: "", //老师名称
          classCourseId: "", //专业编号
          courseName: "", //专业名称
          classStudents: "", //班级人数
          classCreateTime: "" //班级创建日期
        }
      ],
      couRses: [],    //课程信息
      teaCherd: []    //老师信息
    };
  },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    },
  mounted() {
    this.loaDing();
    this.couRse();
    this.teaCher();
  },
  methods: {
    /**
     * 获取班级的信息
     */
    loaDing() {
      let that = this;
      that.axios
        .get("/api/Class/GetAllClass")
        .then(function(res) {
          that.tableData = res.data;  
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 获取编辑中老师下拉框点击后老师的名称
     */
    getName(val) {
      val = this.teacher;
      let array = this.teaCher();
      for (let index = 0; index < array.length; index++) {
        const element = array[index].userId;
        if (element == val) {
          this.teachername = array[index].userName;   //老师名称赋值
        }
      }
      console.log(this.teachername);
      return this.teachername;
    },
    /**
     * 获取编辑中课程下拉框点击后课程的名称
     */
    courseNames(val) {
      val = this.values;
      let course = this.couRse();
      for (let i = 0; i < course.length; i++) {
        const element = course[i].courseId;
        if (element == val) {
          this.valuesname = course[i].courseName;   //课程名称赋值
        }
	  }
	   console.log(this.valuesname);
      return this.valuesname;
    },
    /**
     * 获取课程的信息
     */
    couRse() {
      let that = this;
      that.axios
        .get("/api/Class/GetAllCourse")
        .then(function(res) {
          that.couRses = res.data;
          console.log(that.couRses);
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
      return this.couRses;
    },
    /**
     * 获取老师的信息
     */
    teaCher() {
      let that = this;
      that.axios
        .get("/api/User/GetTeachers")
        .then(res => {
          that.teaCherd = res.data;
          console.log(that.teaCherd);
        })
        .catch(function(error) {
          console.log(error);
        });
      return this.teaCherd;
    },
    /**
     * 新增
     */
    submitForm(formName) {
      let that = this;
       that.$refs[formName].validate((valid) => {
 if (valid) {
      console.log(that.value);
      console.log(that.teachers);
      that.axios
        .post("/api/Class/AddClass", {
          className: that.ruleForm2.user,   //新增班级请求时必要的参数
          classCourseId: that.value,
          classTeacherId: that.teachers
        })
        .then(function(res) {
          console.log(res);
		  that.dialogFormVisible = false;   //弹框隐藏
          if (res.data.code == 0) {     //根据返回code值来判断添加的情况
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
                  that.ruleForm2.user=''    //新增成功后清空新增框内的值
                  that.value=''
                  that.teachers=''
                    that.tableData=[]   //班级信息清空后重新赋值
                   that.loaDing();     //重新调用获取班级信息方法给tableData赋值
          }       
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
 }else {
            console.log('error submit!!');
            return false;
          }
         });
       
    },
    /**
     * 编辑信息
     */
    handleEdit(index, row) {
      let that = this;
      that.dialogFormVisibles = true;
      that.ruleForm.user = row.className;    //编辑时弹框中班级名字一开始选中的值
      console.log(that.values);
      that.values = that.tableData[index].classCourseId;  //编辑时弹框中课程一开始选中的值
	    that.teacher = that.tableData[index].classTeacherId;  //编辑时弹框中老师一开始选中的值
	    that.teachername = that.tableData[index].userName  //未调用getName方法时赋给teachername原值
	    that.valuesname =that.tableData[index].courseName	//未调用courseNames方法时赋给valuesname原值
      that.index = index;
      console.log(index, row);
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      let that = this;
      that.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
            .get("/api/Class/RemoveClass", {
              params: {
                classId: that.tableData[index].classId
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
    submitForms(formName) {		
	  let that = this;
      that.tableData[that.index].classCourseId = that.values;
      that.tableData[that.index].classTeacherId = that.teacher;
      that.axios
        .post("/api/Class/ModifyClass", {
          classId: that.tableData[that.index].classId,
          className: that.ruleForm.user,
          classCourseId: that.tableData[that.index].classCourseId,
          classTeacherId: that.tableData[that.index].classTeacherId
        })
        .then(function(res) {
          console.log(res);
          that.dialogFormVisibles = false;
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
			  that.tableData[that.index].className = that.ruleForm.user;
			  that.tableData[that.index].userName = that.teachername;
			  that.tableData[that.index].courseName = that.valuesname
            that.$message.success("修改成功");
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
  width: 480px;
}
/deep/.el-input{
  width: 170px;
}
/deep/.el-input__inner{
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
