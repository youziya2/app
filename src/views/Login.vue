<template>
	<div id="login">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="user" id="first">
				<el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<div>
				<el-checkbox v-model="checked">记住密码</el-checkbox>
			</div>
			<el-form-item id="last">
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import cookie from '../tool/Cookie'
	import base64 from '../tool/Base64'
	export default {
		data() {
			return {
				checked: true, //记住密码
				loading: false,  //提交时加载状态
				ruleForm: {
					user: "",//账号
					pass: ''//密码
				},
				rules: {
					user: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			this.shai()
		},
		methods: {
			// 提交方法
			submitForm(formName) {				
				let that = this
				//设置定时器控制加载的时间
				that.loading = true
				setTimeout(() => {
				that.loading = false;
				}, 2000);
				let sty = {
					"userMobile": this.ruleForm.user,
					"userPassword": this.ruleForm.pass
				}
				this.axios.get('/api/OAuth/authenticate', {
					params: {
						userMobile: sty.userMobile,
						userPassword: sty.userPassword
					}
				}).then(function(data) {
					console.log(data)
					if (data.status == 200) {
						sessionStorage.setItem('token',token);
						sessionStorage.setItem('uid',uid);
						sessionStorage.removeItem("TabName");
						sessionStorage.removeItem("editableTabs");
						that.$router.push("/")
						that.$message.success('登录成功');
						let token = data.data.token_type +' '+ data.data.access_token
						let uid = data.data.profile.userUid
						sessionStorage.setItem('token',token);
						sessionStorage.setItem('uid',uid);
						that.shai()
					}
				}).catch((err) => {
					console.log(err)
					that.$message.error('登录失败');
				})
			},

			shai() {
				//缓存密码
				var that = this
				if (that.checked) {
					if (!cookie.getCookie("name") == "" && !cookie.getCookie("pas") == "") { //判断cookie内是否有值
						that.ruleForm.user = base64.decode(cookie.getCookie("name"))
						that.ruleForm.pass = base64.decode(cookie.getCookie("pas"))
					}
					var phone = base64.encode(that.ruleForm.user)
					var pwd = base64.encode(that.ruleForm.pass)
					cookie.setCookie("name", phone, {
						maxAge: 60 * 60 * 24 * 30
					})
					cookie.setCookie("pas", pwd, {
						maxAge: 60 * 60 * 24 * 30
					})
				} else {				//checked为false时清空cookie
					cookie.removeCookie("name")
					cookie.removeCookie("pas")
				}
			},
			// 重置方法
			resetForm(formName) {
				//清空用户名和密码
				this.ruleForm.user = ""
				this.ruleForm.pass = ""
				// this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style scoped="scoped">
	.el-form {
		width: 400px;
		margin: 0px auto;
		background-color: #fff;
		border-radius: 4px;
		height: 280px;
	}

	#login {
		background-color: #3BAFDA;
		height: 100%;
		display: flex;
		align-items: center;
		text-align: center;
	}

	body,
	p {
		margin: 0px;
		padding: 0px;
	}

	.el-input {
		width: 80%;
	}

	#first {
		margin-top: 60px;
	}

	.el-form-item {
		margin-right: 20px;
	}

	#last {
		width: 300px;
		margin-left: 50px;
	}

	@media only screen and (max-width: 768px) {
		.el-form {
			width: 280px;
			margin: 50px auto;
		}

		.el-input {
			width: 150px;
		}

		#last {
			margin-left: 0px;
		}

		/* #login{height: 100%;} */
	}
</style>
