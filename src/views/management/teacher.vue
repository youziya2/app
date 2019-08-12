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
        <span>班级管理</span>
        <el-button
          type="text"
          id="el-button"
          @click="dialogFormVisible  = true,submitValue=false"
          style="float: right; padding: 3px 0"
        >
          <span>&nbsp;新&nbsp;增 &nbsp;</span>
        </el-button>
        <el-dialog   :title="submitValue?'修 改 老 师':'增 加 老 师'" :visible.sync="dialogFormVisible" id="el-dialog">
         		<el-form style="text-align: center;">
				<el-form-item label="姓名">
					<el-input v-model="add.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="add.pas" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="add.sex" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="add.tel" autocomplete="off"></el-input>
				</el-form-item>
          <!-- <div slot="footer" class="dialog-footer"> -->
            <el-button @click="dialogFormVisible = false">取 消</el-button>
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
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      submitValue: false,
      index: "",
      dialogFormVisible: false,   //弹框状态
      add:{
					name: '',
					sex: '',
					pas: '',
					tel: ''
				},
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
      ]
    };
  },
  mounted() {
    this.teaCher();
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
        })
        .catch(err => {
          console.log(err);
          that.$message.error("失败");
        });
    },
    /**
     * 新增
     */
    submitForm2(formName) {
      console.log(111)
       let that = this;
      console.log(that.add.name)
      console.log(that.add.sex)
      console.log(Number(that.add.pas))
      console.log(Number(that.add.tel))

       that.axios
        .post("/api/User/AddTeacher", {
              userName:that.add.name, //用户名，不能为空
              userMobile:Number(that.add.tel), //手机号，长度11位
              userSex:that.add.sex, //性别，男|女
              userPassword:Number(that.add.pas) //密码，长度6~18
        })
        .then(function(res) {
          console.log(res)            
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
      let that = this;
      that.submitValue = true;
      that.dialogFormVisible = true;
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      let that = this;
console.log(row);
 that.$confirm("此操作将永久删除该老师, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.axios
          .post("/api/User/RemoveTeacher", {   
                uid: row.userUid
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
      console.log(222) 
    }
  }
};
</script>

<style scoped="scoped" lang="less">
/deep/.el-dialog{
   width: 30%;
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
