<template>
  <div class="home">
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
}
</script>
<style>

	.lfte{width: 10%;float: left;}
	.content{width: 90%;float: right;}
</style>
