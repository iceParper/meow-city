import request from '@/utils/ajax'

// 分类选择列表
export function classifySelList(data) {
    return request({
        url: 'classify/selection/list',
        method: 'post',
        data: data
    })
}

// 分类导航选择列表
export function classifyNavSelList(data) {
    return request({
        url: 'classify/navigation/selection/list',
        method: 'post',
        data: data
    })
}

// 二级分类选择列表
export function classifyChildSelList(data) {
    return request({
        url: 'classify/child/selection/list',
        method: 'post',
        data: data
    })
}

// 分类列表
export function classifyList(data) {
    return request({
        url: '/classify/list',
        method: 'post',
        data: data
    })
}

// 二级分类列表
export function classifyChildList(data) {
    return request({
        url: 'classify/child/list',
        method: 'post',
        data: data
    })
}

// 分类导航列表
export function classifyNavList(data) {
    return request({
        url: 'classify/navigation/list',
        method: 'post',
        data: data
    })
}

// 新增分类
export function classifyAdd(data) {
    return request({
        url: 'classify/add',
        method: 'post',
        data: data
    })
}

// 修改分类
export function classifyEdit(data) {
    return request({
        url: 'classify/modify',
        method: 'post',
        data: data
    })
}

// 分类详情
export function classifyDtl(data) {
    return request({
        url: 'classify/detail',
        method: 'post',
        data: data
    })
}

// 修改分类状态
export function classifyStatus(data) {
    return request({
        url: 'classify/modify/status',
        method: 'post',
        data: data
    })
}

// 修改分类顺序
export function classifySeq(data) {
    return request({
        url: 'classify/modify/seq',
        method: 'post',
        data: data
    })
}

// 删除分类
export function delClassify(data) {
    return request({
        url: 'classify/remove',
        method: 'post',
        data: data
    })
}

// 新增分类导航
export function addClassifyNav(data) {
    return request({
        url: '/classify/navigation/add',
        method: 'post',
        data: data
    })
}

// 修改分类导航
export function editClassifyNav(data) {
    return request({
        url: '/classify/navigation/modify',
        method: 'post',
        data: data
    })
}


// 修改分类导航状态
export function editCYNavStatus(data) {
    return request({
        url: '/classify/navigation/modify/status',
        method: 'post',
        data: data
    })
}

// 修改分类导航顺序
export function editCYNavSeq(data) {
    return request({
        url: '/classify/navigation/modify/seq',
        method: 'post',
        data: data
    })
}

// 删除分类导航
export function delClassifyNav(data) {
    return request({
        url: '/classify/navigation/remove',
        method: 'post',
        data: data
    })
}

// 添加二级分类
export function classifyChildAdd(data) {
    return request({
        url: '/classify/child/add',
        method: 'post',
        data: data
    })
}

// 修改二级分类
export function classifyChildEdit(data) {
    return request({
        url: '/classify/child/modify',
        method: 'post',
        data: data
    })
}

// 修改二级分类状态
export function classifyChildStatus(data) {
    return request({
        url: 'classify/child/modify/status',
        method: 'post',
        data: data
    })
}

// 修改二级分类顺序
export function classifyChildSeq(data) {
    return request({
        url: 'classify/child/modify/seq',
        method: 'post',
        data: data
    })
}

// 删除二级分类
export function delClassifyChild(data) {
    return request({
        url: 'classify/child/remove',
        method: 'post',
        data: data
    })
}