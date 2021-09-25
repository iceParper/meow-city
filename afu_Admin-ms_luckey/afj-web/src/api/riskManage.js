import request from '@/utils/ajax'

export function vehicleList(data) {
    return request({
        url: '/risk/car/query',
        method: 'post',
        data: data
    })
}

export function propertyOwnerList(data) {
    return request({
        url: '/risk/property/owner/query',
        method: 'post',
        data: data
    })
}

export function addPropertyOwner(data) {
    return request({
        url: '/risk/property/owner/add',
        method: 'post',
        data: data
    })
}

export function editPropertyOwner(data) {
    return request({
        url: '/risk/property/owner/modify',
        method: 'post',
        data: data
    })
}

export function editPropertyOwnerStatus(data) {
    return request({
        url: '/risk/property/owner/modify/status',
        method: 'post',
        data: data
    })
}


export function propertyOwnerDtl(data) {
    return request({
        url: '/risk/property/owner/detail',
        method: 'post',
        data: data
    })
}

export function addVehicle(data) {
    return request({
        url: '/risk/car/add',
        method: 'post',
        data: data
    })
}

export function editVehicle(data) {
    return request({
        url: '/risk/car/modify',
        method: 'post',
        data: data
    })
}

export function vehicleDtl(data) {
    return request({
        url: '/risk/car/detail',
        method: 'post',
        data: data
    })
}

export function editVehicleStatus(data) {
    return request({
        url: 'risk/car/modify/status',
        method: 'post',
        data: data
    })
}

export function dealersSelList(data) {
    return request({
        url: '/loan/car/dealers/selection/query',
        method: 'post',
        data: data
    })
}

export function propertyOwnerSelList(data) {
    return request({
        url: '/risk/property/owner/selection/query',
        method: 'post',
        data: data
    })
}

export function inspectionPlanList(data) {
    return request({
        url: '/risk/inspection/plan/query',
        method: 'post',
        data: data
    })
}


export function noInspectionList(data) {
    return request({
        url: '/risk/inspection/query/noInspection',
        method: 'post',
        data: data
    })
}

export function addInspectionPlan(data) {
    return request({
        url: '/risk/inspection/plan/add',
        method: 'post',
        data: data
    })
}

export function editInspectionPlan(data) {
    return request({
        url: '/risk/inspection/plan/modify',
        method: 'post',
        data: data
    })
}


export function inspectionPlanStatus(data) {
    return request({
        url: '/risk/inspection/plan/modify/status',
        method: 'post',
        data: data
    })
}

export function inspectionPlanDtl(data) {
    return request({
        url: '/risk/inspection/plan/detail',
        method: 'post',
        data: data
    })
}


export function todayInspectionPlan(data) {
    return request({
        url: '/risk/inspection/today/query',
        method: 'post',
        data: data
    })
}

export function todayInspectionDtl(data) {
    return request({
        url: '/risk/inspection/today/detail',
        method: 'post',
        data: data
    })
}


export function todayInspectionReject(data) {
    return request({
        url: '/risk/inspection/today/reject',
        method: 'post',
        data: data
    })
}


export function inspectionRecord(data) {
    return request({
        url: '/risk/inspection/query',
        method: 'post',
        data: data
    })
}


export function inspectionRecordDtl(data) {
    return request({
        url: '/risk/inspection/nothing/detail',
        method: 'post',
        data: data
    })
}


export function exceptionExplainDtl(data) {
    return request({
        url: '/risk/inspection/exception/explain/apply',
        method: 'post',
        data: data
    })
}


export function inspectionRecordReject(data) {
    return request({
        url: '/risk/inspection/nothing/reject',
        method: 'post',
        data: data
    })
}


export function inspectionPlanSelList(data) {
    return request({
        url: '/risk/inspection/plan/selection/query',
        method: 'post',
        data: data
    })
}



export function vehicleDownloadExcle(data) {
    return request({
        method: 'post',
        header: { 'Content-Type': 'application/xls' },
        responseType: 'blob',
        url: '/risk/car/query/export',
        data: data
    })
}


export function explainApplyDtl(data) {
    return request({
        url: '/risk/inspection/apply/detail',
        method: 'post',
        data: data
    })
}

export function editExplainApply(data) {
    return request({
        url: '/risk/inspection/exception/explain/apply/modify',
        method: 'post',
        data: data
    })
}

export function noInspectionDtl(data) {
    return request({
        url: '/risk/inspection/query/noInspection/detail',
        method: 'post',
        data: data
    })
}