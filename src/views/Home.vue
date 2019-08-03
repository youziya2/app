<template>
	<div id="home">
		<!-- 导航栏 -->
		<div class="title">
			<!-- 折叠栏 -->
			<div class="title-left">		
				 <div class="menu-item-wrapper">
				<i @click="unfold" class="el-icon-s-unfold" id="pic1"></i>
				<i @click="unfold" class="el-icon-s-fold" id="pic2" style="display: none;"></i>
				</div>
			</div>
			<!-- 头部导航栏 -->
			<div class="title-rigth">
				<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClickTab">
					<el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.title" :name="item.name">
						{{item.content}}
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<!-- 左边侧边栏 -->
		<div class="lfte">
			<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				<!-- <p>智学无忧教育管理系统</p> -->
				<!-- 双重for循环 -->
				<!-- 此方法中index如果不加''+符号会报got number的错误 -->
				<el-submenu v-for="(itme,index) in content" :key="index" :index="''+index">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span slot="title">{{itme.name}}</span>
					</template>
					<el-menu-item index="1-1" v-for="(itmeson,index) in itme.basics" :key="index"   @click="clickMenu(itmeson.manage)">
							<span>{{itmeson.manage}}</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
		<div class="content">
			<router-view />
		</div>
	</div>

</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				isCollapse: false,
				editableTabsValue: '/',
				editableTabs: [{
					title: '首页',
					name: '/',
					content: '111'
				}],
				tabIndex: 1,
				openedTab: ["首页","学生管理","教师管理","班级管理","修改密码","布置试卷","安排考试","批阅试卷","查看成绩","维护试卷"],
				routers:["/","student","teacher","grade","amend","paper","exam","read","examine","maintain"],
				// 双重v-for循环格式
				content: [{
						name: '基础信息',
						basics: [
							{
								manage: '首页'
								},{
								manage: '学生管理'
							},
							{
								manage: '教师管理'
							},
							{
								manage: '班级管理'
							},
							{
								manage: '修改密码'
							}
						],
					},
					{
						name: '考试系统',
						basics: [{
								manage: '布置试卷'
							},
							{
								manage: '安排考试'
							},
							{
								manage: '批阅试卷'
							},
							{
								manage: '查看成绩'
							},
							{
								manage: '维护试卷'
							}
						],
					}
				],
			}
		},
		methods: {
			unfold(){
				let pic1 = document.getElementById("pic1")
				let pic2 = document.getElementById("pic2")
				this.isCollapse=!this.isCollapse
				if(this.isCollapse){
					pic1.style.display="none"
					pic2.style.display="block"
				}else{
					pic1.style.display="block"
					pic2.style.display="none"
				}
			}
			,
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			 clickMenu (componentName) {
				 var that = this
				 console.log(componentName)		//点击当前名称
				let indexa=that.openedTab.indexOf(componentName) 
				//点击当前下标
				console.log(indexa)				
				that.$router.push(that.routers[indexa])		//跳路由
				that.editableTabsValue=that.routers[indexa]	
						//点击左边栏同步导航栏
					console.log(that.routers[indexa])		
					console.log(that.editableTabs)
					//如果没有导航信息则向editableTabs中加入	
				// if(indexa==-1){
					
					for (var i = 0; i < that.editableTabs.length; i++) {
						console.log(that.editableTabs[i].title)
					}
					
					that.editableTabs.push(
					{title:componentName,
					name:that.routers[indexa],
					content:''},
					)
					// }
			 },
			handleClickTab(targetName) {
				console.log(targetName.label)		//查看页面名称
				var that=this
				let indexa=that.openedTab.indexOf(targetName.label)  //查看页面下标
				console.log(indexa)	
				 this.$router.push(that.routers[indexa])		//跳路由
				 
			},
			removeTab(targetName) {
				let tabs = this.editableTabs
				let activeName = this.editableTabsValue
				let activetitle = ""
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1]
							console.log(nextTab)		//查看页面名称
							if (nextTab) {
								activeName = nextTab.name
								activetitle = nextTab.title
							}
						}
					})
				}
				let deductIndex = this.openedTab.indexOf(activetitle)
				// this.openedTab.splice(deductIndex, 1)
				this.$router.push(activeName)
				this.editableTabsValue = activeName
				this.editableTabs = tabs.filter(tab => tab.name !== targetName)
				if (this.openedTab.length === 0) {
					this.$router.push('/')
				}
			}
		}
	}
</script>
<style scoped="scoped">
	.el-icon-s-unfold,
	.el-icon-s-fold{width:50px;height:50px;font-size:50px}
	
		.title-left{
		width: 5%;
		float: left;
	}
	.title-rigth {
		width: 95%;
		float: right;
	}

	.title {
		width: 80%;
		float: right;
	}

	/* .el-tabs{float: right;} */
	.el-col-12 {
		width: 100%;
	}

	.basics,
	.test {
		cursor: pointer;
	}

	ul,
	li {
		padding: 0px;
		margin: 0px;
	}

	ul li {
		list-style: none;
	}

	.lfte {
		width: 20%;
		float: left;
		overflow: hidden;
	}

	.content {
		width: 80%;
		float: right;
	}

	h5 {
		text-align: center;
	}

	/* 	  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
	/deep/.el-radio-group {
		text-align: left;
	}
</style>
