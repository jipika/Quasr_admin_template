<!--  -->
<template>
    <div>
        <q-form @submit="onSubmit" @reset="onReset" class="form q-mb-md">
            <div class="form q-gutter-md" style="justify-content: flex-start">
                <q-input outlined dense v-model="name" label="题目ID" />
                <q-select style="min-width: 100px" outlined dense v-model="name" label="学科" :options="options" />
                <q-select style="min-width: 100px" outlined dense v-model="name" label="年级" :options="options" />
                <q-input outlined dense v-model="name" label="试题题型" />
                <q-input outlined dense v-model="name" label="题干" />
                <q-input outlined dense v-model="name" label="知识点" />
                <q-input outlined dense v-model="level" label="试题难度" mask="#-#" />
            </div>
            <div class="q-mt-md btn">
                <q-btn size="sm" label="提交" type="submit" color="primary" />
                <q-btn size="sm" label="重置" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
        <Tables :getItem="getItem" :columns="columns" slotName="body-cell-test_body" slotKey="test_body">
            <template v-slot:left-top>
                <q-btn color="secondary" label="添加" :to="{ name: 'AddTest' }" size="sm" icon="add" />
                <q-btn color="secondary" label="编辑" size="sm" icon="edit" />
                <q-btn color="negative" label="删除" size="sm" icon="delete" />
                <q-btn color="red" label="下载导入模板" size="sm" icon="download" />
                <q-btn color="red" label="导出" size="sm" icon="upload" />
            </template>
            <template v-slot:operation="">
                <q-btn color="secondary" size="sm" icon="edit" :to="{ name: 'AddTest' }" dense />
                <q-btn color="negative" size="sm" icon="delete" dense />
            </template>
        </Tables>
    </div>
</template>

<script>
import Tables from 'src/components/Tables.vue'
// import引入的组件需要注入到对象中才能使用

export default {
    name: 'testSys',
    data() {
        // 这里存放数据
        return {
            name: null,
            age: 312312,
            level: null,
            columns: [
                {
                    name: 'name',
                    required: true,
                    label: '题目ID',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'subject', align: 'center', label: '学科', field: 'calories' },
                { name: 'calss', align: 'center', label: '年级', field: 'calories' },
                { name: 'test_type', align: 'center', label: '试题类型', field: 'calories' },
                { name: 'test_body', align: 'center', label: '题干', field: 'test_body' },
                { name: 'tips', align: 'center', label: '知识点', field: 'calories' },
                { name: 'level', align: 'center', label: '试题难度', field: 'calories' },

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
                }
            ],
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
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
    mounted() {
        console.log(this.$router)
    },
    // 方法集合
    methods: {
        getItem(e) {
            console.log(321, e)
        },
        onSubmit() {
            if (this.accept !== true) {
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'You need to accept the license and terms first'
                })
            } else {
                this.$q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Submitted'
                })
            }
        },

        onReset() {
            this.name = null
            this.age = null
            this.accept = false
        },
        addTest() {
            this.$router.push({ name: 'addTest' })
        }
    }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
::v-deep .on-left {
    margin-right: 5px;
}
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
