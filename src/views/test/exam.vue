<template>
	<div><h1>安排考试</h1></div>
</template>

<script>
export default {
  data() {
 return {   

 }
  },mounted() {
	this.teaCher();},
	methods: {
		teaCher() {
		var data = [{id: '12', name: '战三'},{id: '1245', name: '战三1'}]	
var keyMap = [{id: '序列', name: '姓名'}]
var objs= Object.keys(data).reduce((newData, key) => {
	console.log(keyMap[key])
let newKey = keyMap[key] || key
newData[newKey] = data[key]
return newData
}, {})
 console.log(objs)
 console.log(data)


	}
  }
}
</script>

<style>
</style>
