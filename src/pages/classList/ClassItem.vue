<!--  -->
<template>
    <div>
        <Tables :getItem="getItem" />
    </div>
</template>

<script>
import Tables from 'src/components/Tables.vue'
// import引入的组件需要注入到对象中才能使用

export default {
    name: 'classItem',
    data() {
        // 这里存放数据
        return {}
    },
    components: {
        Tables
    },
    // 监听属性 类似于data概念
    computed: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(321)
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {
        getItem(e) {
            console.log(321, e)
        }
    }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
