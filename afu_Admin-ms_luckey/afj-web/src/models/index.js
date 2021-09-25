// 记录商品/专题/分类等状态
export const statusOptions = [
  { label: '全部', value: '' },
  { label: '上架', value: 1 },
  { label: '下架', value: 2 }
]

// 记录弹窗状态
export const textMap = {
  update: '编辑',
  create: '新建'
}

// 专题类型
export const specialTypeOptions = [
  { label: '单海报', value: 0 },
  { label: '商品组合', value: 1 },
  { label: '海报组合', value: 2 },
  { label: '商品列表', value: 3 },
  { label: '轮播图', value: 4 }
]

// 专题类型
export const specialTypeOptions_new = [
  { label: '单海报', value: 'POSTER' },
  { label: '商品组合', value: 'PRODUCT_MIX' },
  { label: '商品列表', value: 'PRODUCT_LIST' },
  { label: '轮播图', value: 'BANNER' }
]

// 订单状态
export const orderStatusOptions = [
  // { label: '待付款', value: 0 },
  // { label: '已付款', value: 1 },
  // { label: '待收货', value: 2 },
  // { label: '已完成', value: 3 },
  // { label: '退款中', value: 4 },
  // { label: '已关闭', value: 5 },
  // { label: '已取消', value: 6 }
  { label: '待付款', value: 0 },
  { label: '已付款', value: 1 },
  { label: '待收货', value: 2 },
  { label: '已完成', value: 3 },
  { label: '退货退款中', value: 4 },
  { label: '已关闭', value: 5 },
  { label: '已取消', value: 6 },
  { label: '调货未付款', value: 7 },
  { label: '调货已付款', value: 8 },
  { label: '调货已确认', value: 9 },
  { label: '发货中', value: 12 },
  { label: '发货成功', value: 13 },
  { label: '发货失败', value: 14 }

]

// 订单状态
export const orderStatusOptions_1 = [
  { label: '全部', value: '' },
  { label: '待付款', value: 0 },
  { label: '已付款', value: 1 },
  { label: '待收货', value: 2 },
  { label: '已完成', value: 3 },
  { label: '退货退款中', value: 4 },
  { label: '已关闭', value: 5 },
  { label: '已取消', value: 6 },
  { label: '调货未付款', value: 7 },
  { label: '调货已付款', value: 8 },
  { label: '调货已确认', value: 9 }
]

export const orderStatusOptions_2 = [
  { label: '全部', value: '' },
  { label: '待付款', value: 0 },
  { label: '已付款', value: 1 },
  { label: '待收货', value: 2 },
  { label: '已完成', value: 3 },
  { label: '已关闭', value: 5 },
  { label: '已取消', value: 6 },
  { label: '待签约', value: 7 },
  { label: '已签约待审核', value: 8 },
  { label: '审核未通过', value: 9 },
  { label: '赊账订单关闭', value: 10 },
  { label: '系统关单', value: 20 },
]

// 订单状态数组
export const orderStatusArray = ['待付款', '已付款', '待收货', '已完成', '退货退款中', '已关闭', '已取消', '调货未付款', '调货已付款', '调货已确认', '已调用微信退款', '已收到微信退款通知']
export const orderStatusArr = ['待付款','支付成功','待收货','已完成','','已关闭','已取消','待签约','已签约待审核','审核未通过','赊账订单关闭','系统关单']
// 售后状态
export const afterSaleStatusOptions = [
  // { label: '申请', value: 0 },
  // { label: '批准', value: 1 },
  // { label: '关闭', value: 2 },
  // { label: '完成', value: 3 },
  // { label: '寄回', value: 4 }
  { label: '未申请', value: 0 },
  { label: '已申请退货', value: 1 },
  { label: '已申请调货', value: 2 },
  { label: '申请驳回', value: 3 },
  { label: '申请通过', value: 4 },
  { label: '交易关闭', value: 5 }
]

export const ecpSyncStatusArr = ['未发货','发货中','发货成功','发货失败']

export const logisticsStatusArr = ['暂无物流信息','已揽件','在途中','已签收','问题件']

export const ecpSyncStatusOptions = [
  { label: '全部', value: ''},
  { label: '未发货', value: 0 },
  { label: '发货中', value: 1 },
  { label: '发货成功', value: 2 },
  { label: '发货失败', value: 3 }
]

export const afterSaleStatusArray = afterSaleStatusOptions.map(item => {
  return item.label
})

// 付款方式
export const payTypeOptions = [
  { label: '微信支付', value: 0 }
]

// 物流方式
export const logisticsType = [

]

// 用户类型
export const userTypeOptions = [
  { key: '', display_name: '全部' },
  { key: 'yes', display_name: '授权用户' },
  { key: 'no', display_name: '普通用户' }
]

// 商户类型
export const businessTypeOptions = [
  { label: '有效', value: 0 },
  { label: '培养', value: 1 },
  { label: '新增', value: 2 }
]

export const businessTypeArray = businessTypeOptions.map(item => {
  return item.label
})

// 账户角色类型
export const roleTypeOptions = [
  { label: '普通用户', value: '2' },
  { label: '管理员', value: '1' }
]

// 角色类型审批权限
export const approveOptions = [
  { label: '有权限', value: '1' },
  { label: '无权限', value: '2' }
]

// 角色类型目录权限
export const menuOption = [
  { label: '商品管理', value: '1' }
]

// 工作台审批事项
export const dashboardTypeOptions = [
  { label: '商户信息修改', value: 1 },
  { label: '用户更改商户', value: 2 },
  { label: '启用/冻结商户信息', value: 3 },
  { label: '商户创建', value: 4 },
  { label: '关联商户', value: 5 }
]

export const dashboardTypeArray = dashboardTypeOptions.map(item => {
  return item.label
})

// 运费规则类型
export const appletType = [
  { label: '第一双', value: 1 },
  { label: '前两双', value: 2 },
  { label: '首重', value: 3 },
  { label: '每公斤', value: 4 },
  { label: '每双', value: 5 },
  { label: '多少双免运费', value: 6 },
  { label: '多少金额免运费', value: 7 }
]


export const excleType = [
  {url:'/order/export',excleName:'订单'},
  {url:'/order/credit/export',excleName:'赊账订单'},
]

// 运费规则类型array
export const appletTypeArray = appletType.map(item => {
  return item.label
})
