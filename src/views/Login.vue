<template>
  <div id="login">  
    	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    		<el-form-item label="账号" prop="user" id="first">
    			<el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
    		</el-form-item>
    		<el-form-item label="密码" prop="pass">
    			<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    		</el-form-item>
				
					<div><el-checkbox v-model="checked">记住密码</el-checkbox></div>
			
    		<el-form-item id="last">
    			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
			 checked: true,
  		ruleForm: {
  			user: "",
  			pass: ''
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
					let that =this
				let sty = {"userMobile":this.ruleForm.user,"userPassword":this.ruleForm.pass}
					this.axios.get('/api/OAuth/authenticate',{
						params:{
							userMobile: sty.userMobile,
							userPassword: sty.userPassword
						}
					}).then(function(data){
					console.log(data)
// 					cookie.setCookie("name",sty.userMobile,{maxAge:60*60*24*30})
// 					cookie.setCookie("pas",sty.userPassword,{maxAge:60*60*24*30})				
					if(data.status==200){
						that.$router.push("/")
						that.$message.success('登录成功');					
						that.shai()
					}
						}).catch((err) => {
					console.log(err)
					that.$message.error('登录失败');
				})
    			},

				shai(){
// 					//缓存密码
// 					if(!cookie.getCookie("name")==""&&!cookie.getCookie("pas")==""){
// 						this.ruleForm.user=cookie.getCookie("name")
// 						this.ruleForm.pass=cookie.getCookie("pas")
// 						this.checked=true
// 					}
					// var vm = this;
				if(this.checked){		
				if(!cookie.getCookie("name")==""&&!cookie.getCookie("pas")==""){
					this.ruleForm.user=base64.decode(cookie.getCookie("name"))
					this.ruleForm.pass=base64.decode(cookie.getCookie("pas"))
				}
					var phone = base64.encode(this.ruleForm.user)
					var pwd = base64.encode(this.ruleForm.pass)
					cookie.setCookie("name",phone,{maxAge:60*60*24*30})
					cookie.setCookie("pas",pwd,{maxAge:60*60*24*30})
				}else{
					cookie.removeCookie("name")
					cookie.removeCookie("pas")
				}
				},
	  // 重置方法
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped="scoped">
	.el-form{width:400px;margin:0px auto;background-color:#fff;border-radius: 4px;height: 280px;}
	#login{background-color:#3BAFDA;height: 650px ;display: flex;align-items: center; }
	body,p{margin: 0px;padding: 0px;}
	.el-input{width: 80%;}
#first{margin-top: 60px;}
.el-form-item{margin-right: 40px;}
#last{width: 300px;}
</style>