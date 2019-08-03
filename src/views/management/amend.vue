<template>
<div>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="旧密码" prop="age">
				<el-input v-model.number="ruleForm.age" type="text"></el-input>
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
					// console.log(formName)
					var that = this
					let token = JSON.parse(sessionStorage.getItem("token")).access_token
					token = "Bearer" + " " + token
					this.axios.defaults.headers.common['Authorization'] = token;
					let uid=JSON.parse(sessionStorage.getItem("token")).profile.userUid
	// 				console.log(uid)
	// 				console.log(that.ruleForm.age)
	// 				console.log(that.ruleForm.pass)
					this.axios.get('http://192.168.1.188:12/api/User/ModifyPassword?uid='+uid+'&oldPassword='+that.ruleForm.age+'&newPassword='+that.ruleForm.pass+'')
						.then(function(res) {
							sessionStorage.clear();
							that.$router.push({name:"login"})
							that.$message({
								message: '恭喜你，修改成功',
								type: 'success'
							});
						})
						.catch(function(error) {
							console.log(error);
						});
				},
				resetForm(formName) {
					this.$refs[formName].resetFields();
				}
			}
		}
</script>

<style>
</style>
