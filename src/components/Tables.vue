<!--  -->
<template>
    <div>
        <q-table
            :data="rows"
            :columns="columns"
            row-key="name"
            :grid="grid"
            :loading="loading"
            :pagination.sync="pagination"
            :filter="filter"
            hide-pagination
            no-data-label="抱歉,没有任何数据"
            no-results-label="抱歉,没有找到该数据"
            selection="multiple"
            :selected-rows-label="getSelectedString"
            :selected.sync="selected"
            bordered
        >
            <template v-slot:top-right>
                <div class="q-gutter-md slot-left">
                    <q-btn padding="xs" size="sm" color="primary" @click="grid = !grid" icon="backup_table">
                        <q-tooltip>切换</q-tooltip>
                    </q-btn>
                    <q-btn padding="xs" size="sm" color="primary" @click="startComputing()" icon="sim_card_download">
                        <q-tooltip>导出数据格式</q-tooltip>
                    </q-btn>
                    <q-input dense debounce="300" v-model="filter" placeholder="搜索">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
            </template>
            <template v-slot:top-left>
                <div class="slot-left q-gutter-md">
                    <q-btn
                        padding="xs"
                        :loading="loading"
                        size="sm"
                        color="blue-grey-8"
                        @click="startComputing()"
                        icon="refresh"
                    />
                    <slot name="left-top"></slot>
                </div>
            </template>

            <template v-slot:[slotName]="props">
                <q-td class="text-center">
                    <q-btn
                        size="sm"
                        color="accent"
                        round
                        dense
                        :icon="props.expand ? 'remove' : 'add'"
                        v-if="props.row.test_body"
                    >
                        <q-popup-proxy v-model="props.expand">
                            <q-banner style="max-width: 500px">
                                {{ props.row.test_body }}
                            </q-banner>
                        </q-popup-proxy>
                    </q-btn>
                </q-td>
            </template>

            <template v-slot:body-cell-operation="props">
                <q-td class="q-gutter-x-sm text-center">
                    <slot name="operation" :props="props.row"></slot>
                </q-td>
            </template>
        </q-table>
        <div class="q-pa-lg flex flex-center">
            <q-pagination v-model="pagination.page" :max="pagesNumber" boundary-numbers />
        </div>
    </div>
</template>

<script>
// import引入的组件需要注入到对象中才能使用
export default {
    name: 'Tables',
    data() {
        // 这里存放数据
        return {
            grid: false,
            loading: false,
            selected: [],
            filter: '',
            isShow: false,
            pagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 5
            }
        }
    },
    props: {
        rows: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '13928',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        sodium: 87,
                        calcium: '14%',
                        iron: '1%'
                    },
                    {
                        name: '13929',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        test_body:
                            '按要求作答。不少于700字。“韧性”是指物体柔软坚实、不易折断的性质。中华文明历经风雨，绵延至今，体现出“韧”的精神。回顾漫长的中国历史，每逢关键时刻，这种文明的韧性体现得尤为明显。中华民族的伟大复兴，更需要激发出这种文明的韧性。请以“文明的韧性”为题，写一篇议论文。可以从中国的历史变迁、思想文化、语言文字、文学艺术、社会生活及中国人的品格等角度，谈谈你的思考。要求：观点明确，论据充分，论证合理。',
                        sodium: 129,
                        calcium: '8%',
                        iron: '1%'
                    },
                    {
                        name: '13920',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        sodium: 337,
                        calcium: '6%',
                        iron: '7%'
                    },
                    {
                        name: '13921',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        sodium: 413,
                        calcium: '3%',
                        iron: '8%'
                    },
                    {
                        name: '13922',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        sodium: 327,
                        calcium: '7%',
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        sodium: 50,
                        calcium: '0%',
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        sodium: 38,
                        calcium: '0%',
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        sodium: 562,
                        calcium: '0%',
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        sodium: 326,
                        calcium: '2%',
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        sodium: 54,
                        calcium: '12%',
                        iron: '6%'
                    }
                ]
            }
        },
        columns: {
            type: Array,
            default: () => {
                return [
                    {
                        name: 'name',
                        required: true,
                        label: 'ID',
                        align: 'left',
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    { name: 'class', align: 'center', label: '年级', field: 'calories' },
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
        getItem: {
            type: Function,
            default: () => {}
        },
        slotName: {
            type: String,
            default: ''
        }
    },
    // 监听属性 类似于data概念
    computed: {
        /** @returns {Number} */
        pagesNumber() {
            return Math.ceil(this.rows.length / this.pagination.rowsPerPage)
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getItem()
    },
    // 方法集合
    methods: {
        getSelectedString() {
            return this.selected.length === 0 ? '' : `选择了${this.selected.length}条 从${this.rows.length}记录中 `
        }
    }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.slot-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
</style>
