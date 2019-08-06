<template>
<div class="grade">
	<el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item><router-link to="/">首页</router-link></el-breadcrumb-item>
    <el-breadcrumb-item>班级管理</el-breadcrumb-item>
</el-breadcrumb>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>班级管理</span>
    		<el-button type="text" id="el-button" @click="dialogFormVisible  = true" style="float: right; padding: 3px 0"><span>
    		&nbsp;新&nbsp;增 &nbsp;</span></el-button>
    <el-dialog title="新 增 成 员" :visible.sync="dialogFormVisible" id="el-dialog">
    	<el-form :model="form">
    		<el-form-item label="用户名" :label-width="formLabelWidth">
    			<el-input v-model="ruleForm2.user" autocomplete="off"></el-input>
    		</el-form-item>
    		<el-form-item label="密码" :label-width="formLabelWidth">
    			<el-input v-model="ruleForm2.pass"></el-input>
    		</el-form-item>
    	</el-form>
    	<div slot="footer" class="dialog-footer">
    		<el-button @click="dialogFormVisible = false">取 消</el-button>
    		<el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
    	</div>
    </el-dialog>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="授课老师"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</div>
</template>

<script>
	 export default {
    data() {
      return { dialogFormVisible: false,
	  ruleForm2: {
	  	user: "",
	  	pass: ''
	  },
        form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
        },
		tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        formLabelWidth: '120px'
      };
    },
	methods: {
		submitForm(formName){
			
		},
		 handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
	}
	}
</script>

<style scoped="scoped">
	/deep/.box-card {
		width:620px !important;
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
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
