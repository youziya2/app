<template>
  <div class="home">
		 <div id="nav">
		   <router-link to="/">主页</router-link> |
		   <router-link to="/login">登录页面</router-link>
		 </div>
		   <el-button :plain="true" @click="open2">成功</el-button>
  <el-button :plain="true" @click="open3">警告</el-button>
  <el-button :plain="true" @click="open1">消息</el-button>
  <el-button :plain="true" @click="open4">错误</el-button>
   <!-- <Amend/> -->
	 <div class="lfte">
		<router-link to="./student">学生管理</router-link></br>
		<router-link to="./teacher">教师管理</router-link></br>
		<router-link to="./grade">班级管理</router-link></br>
		<router-link to="./amend">修改密码</router-link></br>
		<router-link to="./paper">布置试卷</router-link></br>
		<router-link to="./exam">安排考试</router-link></br>
		<router-link to="./read">批阅试卷</router-link></br>
		<router-link to="./examine">查看成绩</router-link></br>
		<router-link to="./maintain">维护试卷</router-link></br>
		</div>
		<div class="content"><router-view/></div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Amend from '../views/management/amend'

export default {
  name: 'home',
//   components: {
//     Amend
//   }
  methods: {
      open1() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      }
    }
}
</script>
<style scoped="scoped">
	.lfte{width: 10%;float: left;}
	.content{width: 90%;float: right;}
</style>
