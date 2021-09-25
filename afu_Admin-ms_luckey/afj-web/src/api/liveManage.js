import request from '@/utils/ajax'

// 直播列表
export function liveList(data) {
    return request({
        url: 'live/list',
        method: 'post',
        data: data
    })
}

// 直播间上下架
export function liveStatus(data) {
    return request({
        url: 'live/modify/isShow',
        method: 'post',
        data: data
    })
}

// 是否推荐直播间
export function recommendLiveRoom(data) {
    return request({
        url: 'live/recommend/room',
        method: 'post',
        data: data
    })
}