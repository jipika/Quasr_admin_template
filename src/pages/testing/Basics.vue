<!--  -->
<template>
    <div>
        <Tables :getItem="getItem" :columns="columns" />
    </div>
</template>

<script>
import Tables from 'src/components/Tables.vue'
// import引入的组件需要注入到对象中才能使用

export default {
    name: 'basics',
    data() {
        // 这里存放数据
        return {
            columns: [
                {
                    name: 'ID',
                    required: true,
                    label: 'ID',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'name', align: 'center', label: '知识点名称', field: 'calories' },
                { name: 'basics', align: 'center', label: '学科', field: 'calories' },
                { name: 'level', align: 'center', label: '学历', field: 'calories' },

                {
                    name: 'calcium',
                    label: 'Calcium (%)',
                    field: 'calcium',
                    align: 'center',
                    sortable: true,
                    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                },
                {
                    align: 'center',
                    name: 'operation',
                    label: '操作'
                    // field: 'calcium'
                }
            ]
        }
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
