<template>
  <div class="home">
		 <div id="nav">
		   <router-link to="/">主页</router-link> |
		   <router-link to="/login">登录页面</router-link>
		 </div>
   <!-- <Amend/> -->
	 <div class="lfte">
		 	<el-row class="tac">
		 	<el-col :span="12">
		   <h5>自定义颜色</h5>
		   <el-menu
		     default-active="2"
		     class="el-menu-vertical-demo"
		     @open="handleOpen"
		     @close="handleClose"
		     background-color="#545c64"
		     text-color="#fff"
		     active-text-color="#ffd04b">
		     <el-submenu index="1">
		       <template slot="title">
		         <i class="el-icon-location"></i>
		         <span>导航一</span>
		       </template>
		       <el-menu-item-group>
		         <template slot="title">分组一</template>
		         <el-menu-item index="1-1">选项1</el-menu-item>
		         <el-menu-item index="1-2">选项2</el-menu-item>
		       </el-menu-item-group>
		       <el-menu-item-group title="分组2">
		         <el-menu-item index="1-3">选项3</el-menu-item>
		       </el-menu-item-group>
		       <el-submenu index="1-4">
		         <template slot="title">选项4</template>
		         <el-menu-item index="1-4-1">选项1</el-menu-item>
		       </el-submenu>
		     </el-submenu>
		     <el-menu-item index="2">
		       <i class="el-icon-menu"></i>
		       <span slot="title">导航二</span>
		     </el-menu-item>
		     <el-menu-item index="3" disabled>
		       <i class="el-icon-document"></i>
		       <span slot="title">导航三</span>
		     </el-menu-item>
		     <el-menu-item index="4">
		       <i class="el-icon-setting"></i>
		       <span slot="title">导航四</span>
		     </el-menu-item>
		   </el-menu>
		 </el-col>
		 	</el-row>
<!-- 		<ul>
			<li>
				<span class="basics" @click="basics">基础信息</span>
				<ul id="sty">
		<li><router-link to="./student">学生管理</router-link></li>
		<li><router-link to="./teacher">教师管理</router-link></li>
		<li><router-link to="./grade">班级管理</router-link></li>
		<li><router-link to="./amend">修改密码</router-link></li>
		</ul>
	</li>
	<li>
		<span class="test" @click="test">考试系统</span>
		<ul id="kty">
		<li><router-link to="./paper">布置试卷</router-link></li>
		<li><router-link to="./exam">安排考试</router-link></li>
		<li><router-link to="./read">批阅试卷</router-link></li>
		<li><router-link to="./examine">查看成绩</router-link></li>
		<li><router-link to="./maintain">维护试卷</router-link></li>
		</ul> -->
		</li>
		</ul>
		</div>
	<!-- 	<el-row class="tac">
		<el-col :span="12">
    <h5>自定义颜色</h5>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
		</el-row> -->
		<div class="content"><router-view/></div>
  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Amend from '../views/management/amend'

export default {
  name: 'home',
	 data() {
		return {
			p:true,
			b:true
		}
		},
//   components: {
//     Amend
//   }
  methods: {
		basics(){
			var that = this
			let sty = document.getElementById("sty")	
			if(that.p){
			sty.style="display:none"
				that.p=false
			}else{
				sty.style="display:block"
			that.p=true
			}
		},
		test(){
				var that = this
			let kty = document.getElementById("kty")	
			if(that.b){
			kty.style="display:none"
				that.b=false
			}else{
				kty.style="display:block"
			that.b=true
			}
		},
           handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped="scoped">
	.el-col-12{width: 100%;}
	.basics,.test{cursor: pointer;}
	ul,li{padding: 0px;margin: 0px;}
	ul li{list-style: none;}
	.lfte{width: 20%;float: left;overflow: hidden;}
	.content{width: 80%;float: right;}
</style>
