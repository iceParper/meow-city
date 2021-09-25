import request from '@/utils/ajax'

// 品牌选择列表
export function brandSelList(data) {
    return request({
        url: 'brand/selection/list',
        method: 'post',
        data: data
    })
}

// 品牌列表
export function brandList(data) {
    return request({
        url: 'brand/list',
        method: 'post',
        data: data
    })
}

// 二级品牌选择列表
export function brandChildSelList(data) {
    return request({
        url: '/brand/child/selection/list',
        method: 'post',
        data: data
    })
}

// 二级品牌列表
export function brandChildList(data) {
    return request({
        url: 'brand/child/list',
        method: 'post',
        data: data
    })
}

// 品牌导航列表
export function brandNavList(data) {
    return request({
        url: 'brand/navigation/list',
        method: 'post',
        data: data
    })
}

// 品牌专题列表
export function brandSpeList(data) {
    return request({
        url: 'brand/special/list',
        method: 'post',
        data: data
    })
}

// 新增品牌
export function brandAdd(data) {
    return request({
        url: 'brand/add',
        method: 'post',
        data: data
    })
}

// 修改品牌
export function brandEdit(data) {
    return request({
        url: 'brand/modify',
        method: 'post',
        data: data
    })
}

// 品牌详情
export function brandDtl(data) {
    return request({
        url: 'brand/detail',
        method: 'post',
        data: data
    })
}

// 修改品牌状态
export function brandStatus(data) {
    return request({
        url: 'brand/modify/status',
        method: 'post',
        data: data
    })
}


// 修改是否入驻
export function brandSettled(data) {
    return request({
        url: 'brand/modify/settled',
        method: 'post',
        data: data
    })
}

// 修改品牌顺序
export function brandSeq(data) {
    return request({
        url: 'brand/modify/seq',
        method: 'post',
        data: data
    })
}


// 修改导航状态
export function navStatus(data) {
    return request({
        url: 'brand/navigation/modify/status',
        method: 'post',
        data: data
    })
}

// 修改导航顺序
export function navSeq(data) {
    return request({
        url: 'brand/navigation/modify/seq',
        method: 'post',
        data: data
    })
}

// 新增导航
export function navAdd(data) {
    return request({
        url: 'brand/navigation/add',
        method: 'post',
        data: data
    })
}

// 修改导航
export function navEdit(data) {
    return request({
        url: 'brand/navigation/modify',
        method: 'post',
        data: data
    })
}

// 新增二级品牌
export function brandChildAdd(data) {
    return request({
        url: 'brand/child/add',
        method: 'post',
        data: data
    })
}

// 修改二级品牌
export function brandChildEdit(data) {
    return request({
        url: 'brand/child/modify',
        method: 'post',
        data: data
    })
}

// 修改二级品牌状态
export function brandChildEditStatus(data) {
    return request({
        url: 'brand/child/modify/status',
        method: 'post',
        data: data
    })
}

// 修改二级品牌顺序
export function brandChildEditSeq(data) {
    return request({
        url: 'brand/child/modify/seq',
        method: 'post',
        data: data
    })
}

// 修改首页专题状态
export function brandSpeEditStatus(data) {
    return request({
        url: 'brand/special/modify/status',
        method: 'post',
        data: data
    })
}

// 修改首页专题顺序
export function brandSpeEditSeq(data) {
    return request({
        url: 'brand/special/modify/seq',
        method: 'post',
        data: data
    })
}

// 商品选择列表
export function productSelList(data) {
    return request({
        url: 'product/selection/list',
        method: 'post',
        data: data
    })
}

// 商品选择列表
export function speSelList(data) {
    return request({
        url: 'brand/special/poster/selection/list',
        method: 'post',
        data: data
    })
}

// 添加专题
export function brandSpeAdd(data) {
    return request({
        url: 'brand/special/add',
        method: 'post',
        data: data
    })
}

// 添加专题
export function brandSpeEdit(data) {
    return request({
        url: 'brand/special/modify',
        method: 'post',
        data: data
    })
}

// 专题详情
export function brandSpeDtl(data) {
    return request({
        url: 'brand/special/detail',
        method: 'post',
        data: data
    })
}

// 删除品牌
export function delBrand(data) {
    return request({
        url: '/brand/remove',
        method: 'post',
        data: data
    })
}

// 删除品牌
export function delBrandChild(data) {
    return request({
        url: 'brand/child/remove',
        method: 'post',
        data: data
    })
}

// 删除品牌导航
export function delBrandNav(data) {
    return request({
        url: 'brand/navigation/remove',
        method: 'post',
        data: data
    })
}

// 删除首页专题
export function delBrandSpe(data) {
    return request({
        url: 'brand/special/remove',
        method: 'post',
        data: data
    })
}