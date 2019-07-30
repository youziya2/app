import Vue from 'vue'
import Router from 'vue-router'
import amend from '../views/management/amend.vue'
import grade from '../views/management/grade.vue'
import student  from '../views/management/student .vue'
import teacher from '../views/management/teacher.vue'

Vue.use(Router)

export default

  [
	  { 
	path: '/amend',
      name: 'amend',
      component: amend
	  },
	  { 
	  path: '/grade',
	    name: 'grade',
	   component: grade
	    },
		{ 
		path: '/student',
		  name: 'student',
		component: student
		  },
		{ 
		  path: '/teacher',
		    name: 'teacher',
		component: teacher
		    }
  ]
