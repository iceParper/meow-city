(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bbbeb9b6"],{"0d7d":function(t,e,l){"use strict";l.r(e);var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"header"},[l("span",{staticClass:"headLab"},[t._v("订单详情")]),t._v(" "),l("el-button",{staticStyle:{"font-size":"14px",float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.onBack}},[t._v("返回")])],1),t._v(" "),l("div",{staticClass:"content"},[l("div",{staticClass:"orderHeader"},[l("div",{staticClass:"section"},[l("div",{staticClass:"orderDtl"},[l("div",{staticClass:"orderDtl__inner"},[l("div",{staticClass:"orderDtl__line"},[l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("订单编号：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt"},[t._v(t._s(t.orderDtl.orderNumber))])]),t._v(" "),l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("商品数量：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt"},[t._v(t._s(t.orderDtl.itemNumber)+"双")])])]),t._v(" "),l("div",{staticClass:"orderDtl__line"},[l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("创建时间：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt"},[t._v(t._s(t.orderDtl.createAt))])]),t._v(" "),l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("商品金额：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt col_red fontWei_700"},[t._v(t._s(t.goodsPrice))])])]),t._v(" "),l("div",{staticClass:"orderDtl__line"},[l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("付款时间：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt"},[t._v(t._s(t.orderDtl.dealTime||"－"))])]),t._v(" "),l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("运费金额：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt col_red fontWei_700"},[t._v(t._s(t.orderDtl.freight))])])]),t._v(" "),l("div",{staticClass:"orderDtl__line"},[l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("订单状态：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt"},[l("span",[t._v(t._s(t.orderStatus))]),t._v(" "),l("span",{staticStyle:{color:"red"}},[t._v(t._s(1==t.orderDtl.isManualOrder?"(手工单)":""))])])]),t._v(" "),l("div",{staticClass:"orderDtl__line__item"},[l("div",{staticClass:"orderDtl__line__lab"},[t._v("实付金额：")]),t._v(" "),l("div",{staticClass:"orderDtl__line__txt col_red fontWei_700"},[t._v(t._s(t.orderDtl.transactionPrice))])])])])])]),t._v(" "),l("div",{staticClass:"section"},[l("div",{staticClass:"userDtl"},[l("div",{staticClass:"userDtl__inner"},[l("div",{staticClass:"userDtl__line"},[l("div",{staticClass:"userDtl__line__lab"},[t._v("用户信息：")]),t._v(" "),t.orderDtl.orderAddress?l("div",{staticClass:"userDtl__line__txt"},[t._v(t._s(t.orderDtl.orderAddress.name)+"   "+t._s(t.orderDtl.orderAddress.phone))]):t._e()]),t._v(" "),l("div",{staticClass:"userDtl__line"},[l("div",{staticClass:"userDtl__line__lab"},[t._v("收货地址：")]),t._v(" "),l("el-tooltip",{attrs:{content:t.addrAll,placement:"top",effect:"light"}},[l("div",{staticClass:"userDtl__line__txt addrAll"},[t._v(t._s(t.addrAll))])])],1),t._v(" "),l("div",{staticClass:"userDtl__line"},[l("div",{staticClass:"userDtl__line__lab"},[t._v("备注信息：")]),t._v(" "),l("div",{staticClass:"userDtl__line__txt"},[t._v(t._s(t.orderDtl.cusRemarks||"－"))])]),t._v(" "),t.orderDtl.logistics?l("div",{staticClass:"userDtl__line"},[l("div",{staticClass:"userDtl__line__lab"},[t._v("物流单号：")]),t._v(" "),l("div",{staticClass:"userDtl__line__txt"},[t._v(t._s(t.orderDtl.logistics.logisticsNumber))])]):l("div",{staticClass:"userDtl__line"},[l("div",{staticClass:"userDtl__line__lab"},[t._v("物流单号：")]),t._v(" "),l("div",{staticClass:"userDtl__line__txt"},[t._v(t._s("--"))])])])])])]),t._v(" "),l("div",{staticClass:"orderFooter"},[l("div",{staticClass:"section"},[l("div",{staticClass:"goodsList"},t._l(t.orderDtl.productList,(function(e,s){return l("div",{key:s,staticClass:"goodsItem"},[l("div",{staticClass:"goodsItem__header"},[l("img",{staticClass:"goodsImg",attrs:{src:e.productPicture,alt:""}}),t._v(" "),l("div",{staticClass:"goodsInfo"},[l("i",{staticClass:"el-icon-arrow-up",class:[e.isActive?"arrowUp":"arrowDown"],on:{click:function(t){e.isActive=!e.isActive}}}),t._v(" "),l("el-tooltip",{attrs:{content:e.productName,placement:"top",effect:"light"}},[l("div",{staticClass:"goodsName goodsInfo__item"},[t._v(t._s(e.productName))])]),t._v(" "),l("div",{staticClass:"goodsItemNum goodsInfo__item"},[t._v(t._s(e.productItemNumber))]),t._v(" "),l("div",{staticClass:"goodsNum goodsInfo__item"},[t._v(t._s(e.buyNumber)+"双")]),t._v(" "),l("div",{staticClass:"goodsPrice goodsInfo__item col_red fontWei_700"},[t._v(t._s(e.salePrice))])],1)]),t._v(" "),l("collapse",[l("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"item.isActive"}],staticClass:"goodsSkuList"},t._l(e.skuList,(function(e,s){return l("div",{key:s,staticClass:"goodsSkuItem"},[l("div",{staticClass:"goodsSkuItem__left"},[t._v(t._s(e.skuColor)+" "+t._s(e.skuName))]),t._v(" "),l("div",{staticClass:"goodsSkuItem__right"},[t._v("¥"+t._s(e.skuSalePrice)+"  ×  "+t._s(e.number)+"  =  "+t._s(e.transactionPrice))])])})),0)])],1)})),0)]),t._v(" "),l("div",{staticClass:"section"},[t.orderDtl.logistics?l("div",{staticClass:"logisticsList"},t._l(t.orderDtl.logistics.traceList,(function(e,s){return l("div",{key:s,staticClass:"logisticsItem"},[l("div",{staticClass:"logisticsItem__time"},[t._v(t._s(e.AcceptTime))]),t._v(" "),l("div",{staticClass:"logisticsItem__txt"},[t._v(t._s(e.AcceptStation))])])})),0):t._e()])])])])},a=[],i=(l("ac6a"),l("7f7f"),l("96cf"),l("3b8d")),r=l("3a34"),o=l("80ed"),d=(l("6724"),l("ed08"),l("5841")),n={name:"OrderDetail",data:function(){return{orderUuid:"",orderDtl:{},orderStatusArray:r["h"],orderStatus:"",addrAll:"",goodsPrice:0}},components:{collapse:d["a"]},created:function(){},mounted:function(){this.orderUuid=this.$route.query.orderUuid,console.log(this.orderUuid,"orderUuid======="),this.beforeRouter=this.$route.query.beforeRouter,this._getOrderDtl()},computed:{},methods:{_getOrderDtl:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,l,s,a,i,r,d=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["e"])({orderNumber:this.orderUuid});case 2:e=t.sent,console.log(e,"orderDtl========="),1==e.rtn&&(this.orderDtl=e.result,e.result.orderAddress&&(l=e.result.orderAddress,l.name,l.phone,s=l.province,a=l.city,i=l.area,r=l.detail,this.addrAll=s+a+i+r),this.goodsPrice=parseFloat(this.orderDtl.transactionPrice-this.orderDtl.freight).toFixed(2),this.orderStatus=this.orderStatusArray[this.orderDtl.orderStatus],this.orderDtl.logistics&&(this.orderDtl.logistics.traceList=JSON.parse(this.orderDtl.logistics.traceList)),this.orderDtl.productList.forEach((function(t,e){d.$set(t,"isActive",!0),d.$set(t,"subGoodsNum",0),t.skuList.forEach((function(e,l){e.subTotalPrice=e.salePrice*e.number,t.subGoodsNum+=e.number}))})));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onBack:function(){this.$router.push({name:this.beforeRouter})}}},c=n,u=(l("a63c"),l("2877")),_=Object(u["a"])(c,s,a,!1,null,"b60b99ec",null);e["default"]=_.exports},"3a34":function(t,e,l){"use strict";l.d(e,"l",(function(){return s})),l.d(e,"m",(function(){return a})),l.d(e,"k",(function(){return i})),l.d(e,"i",(function(){return r})),l.d(e,"j",(function(){return o})),l.d(e,"h",(function(){return d})),l.d(e,"g",(function(){return n})),l.d(e,"d",(function(){return u})),l.d(e,"f",(function(){return _})),l.d(e,"e",(function(){return v})),l.d(e,"n",(function(){return b})),l.d(e,"a",(function(){return m})),l.d(e,"b",(function(){return g}));var s=[{label:"全部",value:""},{label:"上架",value:1},{label:"下架",value:2}],a={update:"编辑",create:"新建"},i=[{label:"单海报",value:"POSTER"},{label:"商品组合",value:"PRODUCT_MIX"},{label:"商品列表",value:"PRODUCT_LIST"},{label:"轮播图",value:"BANNER"}],r=[{label:"待付款",value:0},{label:"已付款",value:1},{label:"待收货",value:2},{label:"已完成",value:3},{label:"退货退款中",value:4},{label:"已关闭",value:5},{label:"已取消",value:6},{label:"调货未付款",value:7},{label:"调货已付款",value:8},{label:"调货已确认",value:9},{label:"发货中",value:12},{label:"发货成功",value:13},{label:"发货失败",value:14}],o=[{label:"全部",value:""},{label:"待付款",value:0},{label:"已付款",value:1},{label:"待收货",value:2},{label:"已完成",value:3},{label:"已关闭",value:5},{label:"已取消",value:6},{label:"待签约",value:7},{label:"已签约待审核",value:8},{label:"审核未通过",value:9},{label:"赊账订单关闭",value:10},{label:"系统关单",value:20}],d=["待付款","已付款","待收货","已完成","退货退款中","已关闭","已取消","调货未付款","调货已付款","调货已确认","已调用微信退款","已收到微信退款通知"],n=["待付款","支付成功","待收货","已完成","","已关闭","已取消","待签约","已签约待审核","审核未通过","赊账订单关闭","系统关单"],c=[{label:"未申请",value:0},{label:"已申请退货",value:1},{label:"已申请调货",value:2},{label:"申请驳回",value:3},{label:"申请通过",value:4},{label:"交易关闭",value:5}],u=["未发货","发货中","发货成功","发货失败"],_=["暂无物流信息","已揽件","在途中","已签收","问题件"],v=[{label:"全部",value:""},{label:"未发货",value:0},{label:"发货中",value:1},{label:"发货成功",value:2},{label:"发货失败",value:3}],b=(c.map((function(t){return t.label})),[{key:"",display_name:"全部"},{key:"yes",display_name:"授权用户"},{key:"no",display_name:"普通用户"}]),f=[{label:"有效",value:0},{label:"培养",value:1},{label:"新增",value:2}],p=(f.map((function(t){return t.label})),[{label:"商户信息修改",value:1},{label:"用户更改商户",value:2},{label:"启用/冻结商户信息",value:3},{label:"商户创建",value:4},{label:"关联商户",value:5}]),m=(p.map((function(t){return t.label})),[{label:"第一双",value:1},{label:"前两双",value:2},{label:"首重",value:3},{label:"每公斤",value:4},{label:"每双",value:5},{label:"多少双免运费",value:6},{label:"多少金额免运费",value:7}]),g=m.map((function(t){return t.label}))},5841:function(t,e,l){"use strict";var s="0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out",a={"before-enter":function(t){t.style.transition=s,t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},"after-enter":function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow},"before-leave":function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&(t.style.transition=s,t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0)},"after-leave":function(t){t.style.transition="",t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};e["a"]={name:"collapseTransition",functional:!0,render:function(t,e){var l=e.children,s={on:a};return t("transition",s,l)}}},6724:function(t,e,l){"use strict";l("8d41");var s="@@wavesContext";function a(t,e){function l(l){var s=Object.assign({},e.value),a=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),i=a.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var r=i.getBoundingClientRect(),o=i.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",i.appendChild(o)),a.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(l.pageY-r.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(l.pageX-r.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=a.color,o.className="waves-ripple z-active",!1}}return t[s]?t[s].removeHandle=l:t[s]={removeHandle:l},l}var i={bind:function(t,e){t.addEventListener("click",a(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[s].removeHandle,!1),t.addEventListener("click",a(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[s].removeHandle,!1),t[s]=null,delete t[s]}},r=function(t){t.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(r)),i.install=r;e["a"]=i},"80ed":function(t,e,l){"use strict";l.d(e,"f",(function(){return a})),l.d(e,"e",(function(){return i})),l.d(e,"g",(function(){return r})),l.d(e,"h",(function(){return o})),l.d(e,"i",(function(){return d})),l.d(e,"d",(function(){return n})),l.d(e,"a",(function(){return c})),l.d(e,"c",(function(){return u})),l.d(e,"b",(function(){return _}));var s=l("ab3e");function a(t){return Object(s["a"])({url:"/order/list",method:"post",data:t})}function i(t){return Object(s["a"])({url:"/order/detail",method:"post",data:t})}function r(t){return Object(s["a"])({url:"/order/remark",method:"post",data:t})}function o(t){return Object(s["a"])({url:"/order/manual/send",method:"post",data:t})}function d(t){return Object(s["a"])({url:"/order/again/send",method:"post",data:t})}function n(t){return Object(s["a"])({url:"/order/logistics",method:"post",data:t})}function c(t){return Object(s["a"])({method:"post",header:{"Content-Type":"application/xls"},responseType:"blob",url:"/order/export",data:t})}function u(t){return Object(s["a"])({method:"post",url:"/order/logistics/companyList",data:t})}function _(t){return Object(s["a"])({url:"order/modify/manualOrder",method:"post",data:t})}},"8d41":function(t,e,l){},a63c:function(t,e,l){"use strict";var s=l("ab2e"),a=l.n(s);a.a},ab2e:function(t,e,l){}}]);