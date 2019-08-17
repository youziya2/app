<template>
  <div class="paper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>布置试卷</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div class="concent">
      <el-steps :space="200" :active="num" finish-status="success" align-center>
        <el-step title="试卷信息"></el-step>
        <el-step title="添加题目"></el-step>
        <el-step title="完成制作"></el-step>
      </el-steps>
      <el-row v-if="num==0">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm2"
        style="text-align:center"
      >
        <el-form-item prop="value" label="试卷名称">
          <el-input
            v-model="ruleForm2.value"
            placeholder="请输入试卷名称"
            style="width:25%"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="class">
          <div>
            <el-select
              style="width:25%"
              v-model="ruleForm2.class"
              autocomplete="off"
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
        <el-form-item>
          <el-button type="primary" @click="next,submitForm('ruleForm2')">下一步</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
       </el-row>
      <div>
        <span>题目类型</span>
        <el-radio-group v-model="radios">
          <el-radio
            v-for="item in topic"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-radio>
        </el-radio-group>
          <options></options>
      </div>
    </div> -->
    <options></options>
  </div>
</template>

<script>
import options from '@/components/options'
export default {
   components: {
     options
   },
  // data() {
  //   var checkName = (rule, value, callback) => {
  //     if (value === "") {
  //       callback(new Error("请输入试卷名称"));
  //     } else {
  //       callback();
  //     }
  //   };
  //   var checkClass = (rule, value, callback) => {
  //     if (value === "") {
  //       callback(new Error("请选择课程"));
  //     } else {
  //       callback();
  //     }
  //   };

  //   return {
  //     radios: "",
  //     values: "",
  //     num: 0,
  //     couRses: [], //课程信息
  //     topic: [], //题目类型
  //     ruleForm2: {
  //       value: "",    //表单验证
  //       class: ""
  //     },
  //     rules: {
  //       value: [
  //         {
  //           required: true,
  //           validator: checkName,
  //           trigger: "blur"
  //         }
  //       ],
  //       class: [
  //         {
  //           required: true,
  //           validator: checkClass,
  //           trigger: "blur"
  //         }
  //       ]
  //     }
  //   };
  // },
  // mounted() {
  //   this.couRse();
  //   this.toPic();
  // },
  // methods: {
//     /**
//      * 获取课程的信息
//      */
//     couRse() {
//       let that = this;
//       that.axios
//         .get("/api/Class/GetAllCourse")
//         .then(function(res) {
//           that.couRses = res.data;
//           // console.log(that.couRses);
//         })
//         .catch(err => {
//           console.log(err);
//           that.$message.error("失败");
//         });
//       return this.couRses;
//     },
//     /**
//      * 获取题目的信息
//      */
//     toPic() {
//       let that = this;
//       that.axios
//         .get("/api/TestPaper/GetQuestionType")
//         .then(function(res) {
//           that.topic = res.data;
//           that.radios = that.topic[0].typeName;
//           console.log(that.radios);
//         })
//         .catch(err => {
//           console.log(err);
//           that.$message.error("失败");
//         });
//     },
//     courseNames(val) {},
//     next() {
//       let that = this;
//       that.num += 1;
//       if (that.num == 3) {
//         that.num = 0;
//       }
//     },
//     submitForm(formName) {
//       this.$refs[formName].validate(valid => {
//         if (valid) {
//           this.next();
//         } else {
//           console.log("error submit!!");
//           return false;
//         }
//       });
//     },
//     resetForm(formName) {
//       this.$refs[formName].resetFields();
//     },
//     handleDelete(index, row) {
//       console.log(index, row);
//     }
//   }
};
</script>

<style scoped="scoped" lang="less">
// .el-form-item__content {
//   margin: 0px !important;
// }
// /deep/.el-form-item__label {
//   width: 100px;
//   float: none;
//   margin-right: 15%;
//   // clear:both !important;
// }
// /deep/.el-form-item__error {
//   position: static;
// }
// .el-steps {
//   margin-left: 25%;
// }
</style>
