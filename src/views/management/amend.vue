<template>
<div class="amend">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="旧密码" prop="age">
				<el-input v-model="ruleForm.age" type="text" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确密码" prop="checkPass">
				<el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">更改</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
			data() {
				var checkAge = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入旧密码'));
					} else {
						callback();
					}
				};
				var validatePass = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入密码'));
					} else {
						if (this.ruleForm.checkPass !== '') {
							this.$refs.ruleForm.validateField('checkPass');
						}
						callback();
					}
				};
				var validatePass2 = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请再次输入密码'));
					} else if (value !== this.ruleForm.pass) {
						callback(new Error('两次输入密码不一致!'));
					} else {
						callback();
					}
				};
				return {
					ruleForm: {
						pass: '',
						checkPass: '',
						age: ''
					},
					rules: {
						pass: [{
							validator: validatePass,
							trigger: 'blur'
						}],
						checkPass: [{
							validator: validatePass2,
							trigger: 'blur'
						}],
						age: [{
							validator: checkAge,
							trigger: 'blur'
						}]
					}
				};
			},
			methods: {
				submitForm(formName) {
					let that = this
					console.log(that.ruleForm.age)
					console.log(that.ruleForm.checkPass)
					that.axios.get('/api/User/ModifyPassword', {
						params: {
							uid: sessionStorage.getItem('uid'),
							oldPassword: that.ruleForm.age,
							newPassword: that.ruleForm.checkPass
						}
					}).then(function(res) {
						console.log(res)
						if(res.data.code==-3){
							that.$message.error('旧密码错误');
						}
						if(res.data.code==-1){
							that.$message.error('系统异常');
						}
							if(res.data.code==-2){
							that.$message.error('参数错误');
						}
						if(res.data.code==1){
					that.$message.success('修改成功');
					sessionStorage.removeItem("token");
					sessionStorage.removeItem("uid");
					that.$router.push("login")
					}
					}).catch((err) => {
						console.log(err)
						that.$message.error('修改失败');
					})
					
					
				},
				//重置方法
				resetForm(formName) {
					this.$refs[formName].resetFields();
				}
			}
		}
</script>

<style scoped="scoped">
	.amend{
		margin: 0px auto;
	}
	/deep/.el-form-item{
		text-align: center;
	}
</style>
