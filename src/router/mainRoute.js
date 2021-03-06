const mainRoute = [
    {
        path: '/',
        root: true,
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/', redirect: 'Dashboard', hidden: true },
            {
                path: 'Dashboard',
                name: 'Dashboard',
                meta: { name: '仪表盘', icon: 'dashboard' },
                component: () => import('pages/Dashboard.vue')
            },
            {
                path: '/classList',
                meta: { name: '年级学科', icon: 'class' },
                component: () => import('layouts/View.vue'),
                children: [
                    { path: '/', redirect: 'classItem' },
                    {
                        path: 'classItem',
                        name: 'classItem',
                        meta: {
                            name: '年级',
                            icon: 'eco',
                            breadCrumb: [{ path: '/testing', title: '题库管理' }]
                        },
                        component: () => import('pages/classList/ClassItem.vue')
                    },
                    {
                        path: 'subject',
                        name: 'subject',
                        meta: { name: '学科', icon: 'eco', breadCrumb: [{ path: '/testing', title: '题库管理' }] },
                        component: () => import('pages/classList/Subject.vue')
                    },
                    {
                        path: 'versions',
                        name: 'versions',
                        meta: { name: '版本', icon: 'eco', breadCrumb: [{ path: '/testing', title: '题库管理' }] },
                        component: () => import('pages/classList/Versions.vue')
                    }
                ]
            },
            {
                path: '/testing',
                meta: { name: '题库管理', icon: 'add_box' },
                component: () => import('layouts/View.vue'),
                children: [
                    { path: '/', redirect: 'basics' },
                    {
                        path: 'basics',
                        name: 'basics',
                        meta: {
                            name: '基础知识点',
                            icon: 'eco',
                            breadCrumb: [{ path: '/testing', title: '题库管理' }]
                        },
                        component: () => import('pages/testing/Basics.vue')
                    },
                    {
                        path: 'basicsLevel',
                        name: 'basicsLevel',
                        meta: {
                            name: '知识点等级',
                            icon: 'eco',
                            breadCrumb: [{ path: '/testing', title: '题库管理' }]
                        },
                        component: () => import('pages/testing/BasicsLevel.vue')
                    },
                    {
                        path: 'sections',
                        name: 'sections',
                        meta: { name: '章节管理', icon: 'eco', breadCrumb: [{ path: '/testing', title: '题库管理' }] },
                        component: () => import('pages/testing/Sections.vue')
                    },
                    {
                        path: 'testSys',
                        name: 'testSys',
                        meta: { name: '试题管理', icon: 'eco', breadCrumb: [{ path: '/testing', title: '题库管理' }] },
                        component: () => import('pages/testing/TestSys.vue')
                    },
                    {
                        path: 'testSys/addTest',
                        name: 'AddTest',
                        hidden: true,
                        meta: {
                            name: '新增试题',
                            icon: 'eco',
                            breadCrumb: [
                                { path: '/testing', title: '题库管理' },
                                { path: '/testing/testSys', title: '试题管理' }
                            ]
                        },
                        component: () => import('pages/testing/AddTest.vue')
                    }
                ]
            }
        ]
    }
]
export default mainRoute
