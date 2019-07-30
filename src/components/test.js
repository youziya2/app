import Vue from 'vue'
import Router from 'vue-router'
import exam from '../views/test/exam.vue'
import examine from '../views/test/examine.vue'
import maintain from '../views/test/maintain.vue'
import paper from '../views/test/paper.vue'
import read from '../views/test/read.vue'

Vue.use(Router)

export default

  [
	  { 
	path: '/exam',
      name: 'exam',
      component: exam
	  },
	  { 
	  path: '/examine',
	    name: 'examine',
	   component: examine
	    },
		{ 
		path: '/maintain',
		  name: 'maintain',
		component: maintain
		  },
		{ 
		  path: '/paper',
		    name: 'paper',
		component: paper
		    },
			{ 
			  path: '/read',
			    name: 'read',
			component: read
			    }			
  ]
