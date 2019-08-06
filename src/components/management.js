import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/management/index.vue'
import amend from '../views/management/amend.vue'
import grade from '../views/management/grade.vue'
import student  from '../views/management/student .vue'
import teacher from '../views/management/teacher.vue'

Vue.use(Router)

export default

  [
	  { 
			path: '/',
			    name: 'index',
			    component: index,
					meta:{requireAuth:true}
			  },
				{
	path: '/amend',
      name: 'amend',
      component: amend,
			meta:{requireAuth:true}
	  },
	  { 
	  path: '/grade',
	    name: 'grade',
	   component: grade,
		 meta:{requireAuth:true}
	    },
		{ 
		path: '/student',
		  name: 'student',
		component: student,
		meta:{requireAuth:true}
		  },
		{ 
		  path: '/teacher',
		    name: 'teacher',
		component: teacher,
		meta:{requireAuth:true}
		    }
  ]
