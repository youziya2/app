<template>
	<div class="grade">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>
				<router-link to="/">首页</router-link>
			</el-breadcrumb-item>
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
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="班级名称" prop="className">
				</el-table-column>
				<el-table-column label="老师名称" prop="userName">
				</el-table-column>
				<el-table-column label="专业名称" prop="courseName">
				</el-table-column>
				<el-table-column label="班级人数" prop="classStudents">
				</el-table-column>
				<el-table-column label="班级创建日期" prop="classCreateTime">
				</el-table-column>
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
				dialogFormVisible: false,
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
				tableData: [{		//接收信息
					"classId": '', //班级主键编号
					"className": "", //班级名称
					"classTeacherId": '', //老师编号
					"userName": "", //老师名称
					"classCourseId": '', //专业编号
					"courseName": "", //专业名称
					"classStudents": '', //班级人数
					"classCreateTime": '' //班级创建日期
				}],
				couRses:[ 
					{
					courseId:'',
					courseName:''
				}
				],
				formLabelWidth: '120px'
			};
		},
		created() {
			this.loaDing();
			this.couRse();
		},
		methods: {
			loaDing() {
				let that = this
				that.axios.get('/api/Class/GetAllClass').then(function(res) {
					// console.log(res)
					that.tableData=res.data
					console.log(that.tableData)
				}).catch((err) => {
					console.log(err)
					that.$message.error('失败');
				})
			},
			couRse(){
				let that = this
				that.axios.get('/api/Class/GetAllCourse').then(function(res) {
					// console.log(res)
					that.couRses=res.data
					console.log(that.couRses)
				}).catch((err) => {
					console.log(err)
					that.$message.error('失败');
				})
			},
			submitForm(formName) {

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
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
