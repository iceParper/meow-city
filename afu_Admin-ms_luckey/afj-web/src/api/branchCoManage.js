import request from '@/utils/ajax'

export function companyList(data) {
    return request({
        url: '/company/query',
        method: 'post',
        data: data
    })
}


export function roleList(data) {
    return request({
        url: '/company/role/selection/query',
        method: 'post',
        data: data
    })
}


export function createCompany(data) {
    return request({
        url: '/company/add',
        method: 'post',
        data: data
    })
}

export function editCompany(data) {
    return request({
        url: '/company/modify',
        method: 'post',
        data: data
    })
}

export function editCompanyStatus(data) {
    return request({
        url: '/company/modify/status',
        method: 'post',
        data: data
    })
}

export function companyDtl(data) {
    return request({
        url: '/company/detail',
        method: 'post',
        data: data
    })
}

export function companyRoleList(data) {
    return request({
        url: '/company/role/query',
        method: 'post',
        data: data
    })
}

export function createRole(data) {
    return request({
        url: '/company/role/add',
        method: 'post',
        data: data
    })
}

export function editRole(data) {
    return request({
        url: '/company/role/modify',
        method: 'post',
        data: data
    })
}

export function editRoleStatus(data) {
    return request({
        url: '/company/role/modify/status',
        method: 'post',
        data: data
    })
}

export function custmagerList(data) {
    return request({
        url: '/custmager/query',
        method: 'post',
        data: data
    })
}

export function createCustmager(data) {
    return request({
        url: '/custmager/add',
        method: 'post',
        data: data
    })
}

export function editCustmager(data) {
    return request({
        url: '/custmager/modify',
        method: 'post',
        data: data
    })
}

export function editCustmagerStatus(data) {
    return request({
        url: '/custmager/modify/status',
        method: 'post',
        data: data
    })
}


export function setWorkflow(data) {
    return request({
        url: '/company/modify/workflow',
        method: 'post',
        data: data
    })
}

export function companyDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/company/query/export',
        data: data
    })
}
