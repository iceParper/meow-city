(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08b6b041"],{"00db":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-form",[n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"角色名称"}},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"角色名称"},model:{value:e.listQuery.roleName,callback:function(t){e.$set(e.listQuery,"roleName",t)},expression:"listQuery.roleName"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"状态"}},[n("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"状态"},model:{value:e.listQuery.status,callback:function(t){e.$set(e.listQuery,"status",t)},expression:"listQuery.status"}},e._l(e.statusOptions,(function(e){return n("el-option",{key:e.key,attrs:{label:e.lab,value:e.value}})})),1)],1)],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",[e.handleBtnShow[0].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search",loading:e.btnLoading},on:{click:e.handleFilter}},[e._v("查询")]):e._e(),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-refresh",loading:e.btnLoading},on:{click:e.handleReset}},[e._v("重置")])],1)],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"handle-container"},[e.handleBtnShow[1].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")]):e._e()],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"角色名称",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.roleName||"--"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"描述",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.description||"--"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.createAt||"--"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(1===a.status?"启用":"停用"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"240","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e.handleBtnShow[2].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleEdit(a)}}},[e._v("修改")]):e._e(),e._v(" "),e.handleBtnShow[3].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0"},attrs:{type:"info",size:"mini",plain:""},on:{click:function(t){return e.handleDelete(a)}}},[e._v("删除")]):e._e(),e._v(" "),e.handleBtnShow[4].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0"},attrs:{type:"text",size:"mini"},on:{click:function(t){return e.toDtl(a)}}},[e._v("查看详情")]):e._e()]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pageNum,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"pageNum",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}})],1)},l=[],r=(n("6b54"),n("96cf"),n("3b8d")),i=(n("ac6a"),n("3a34")),o=n("f9ac"),u=n("6724"),s=n("333d"),c={name:"SysRoleManage",components:{Pagination:s["a"]},directives:{waves:u["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]}},data:function(){return{btnLoading:!1,formLabelWidth:"60px",statusOptions:[{key:1,lab:"启用",value:1},{key:2,lab:"停用",value:2}],handleBtnShow:[{btnName:"SysRoleQuery",isShow:!1},{btnName:"SysRoleAdd",isShow:!1},{btnName:"SysRoleModify",isShow:!1},{btnName:"SysRoleRemove",isShow:!1},{btnName:"SysRoleDetail",isShow:!1},{btnName:"SysRolePermissionTree",isShow:!1}],psdForm:{userPassword:"",userId:""},rules:{userPassword:[{required:!0,message:"必填项",trigger:"blur"}]},tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:20,roleName:void 0,status:void 0},userTypeOptions:i["n"],downloadLoading:!1,dialogFormVisible:!1,dialogForm:{businessId:""},businessLoad:!1,businessList:[],orderDate:[]}},created:function(){var e=this;this.handleBtnFuncArr=JSON.parse(localStorage.getItem("functionList")),this.handleBtnFuncArr.forEach((function(t,n){e.handleBtnShow.forEach((function(e,n){t==e.btnName&&(e.isShow=!0)}))})),this.getList()},methods:{handleSelectionChange:function(e){this.selectedData=e,console.log(this.selectedData)},getList:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.listLoading=!0,e.next=3,Object(o["r"])(this.listQuery);case 3:t=e.sent,1==t.rtn&&(this.list=t.result.roleList,this.total=t.result.total,this.listLoading=!1);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleFilter:function(){this.listQuery.pageNum=1,this.getList()},handleReset:function(){this.listQuery={pageNum:1,pageSize:20,roleName:void 0,status:void 0},this.getList()},handleAdd:function(){this.$router.push({name:"SysAddRoleManage"})},handleEdit:function(e){this.$router.push({name:"SysAddRoleManage",query:{roleId:e.roleId,beforeRouter:"SysRoleManage",canEdit:!0}})},handleDelete:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t.roleId),this.$confirm("此操作将删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["c"])({roleId:t.roleId.toString()});case 2:a=e.sent,1==a.rtn&&(n.$message({type:"success",message:"删除成功"}),n.getList());case 4:case"end":return e.stop()}}),e)})))).catch((function(){}));case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),toDtl:function(e){this.$router.push({name:"SysAddRoleManage",query:{roleId:e.roleId,beforeRouter:"SysRoleManage",isDtl:!0}})}}},d=c,f=n("2877"),p=Object(f["a"])(d,a,l,!1,null,null,null);t["default"]=p.exports},"1c64":function(e,t,n){},"1cc6":function(e,t,n){"use strict";var a=n("1c64"),l=n.n(a);l.a},"333d":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},l=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,a){return e/=a/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function i(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function u(e,t,n){var a=o(),l=e-a,u=20,s=0;t="undefined"===typeof t?500:t;var c=function e(){s+=u;var o=Math.easeInOutQuad(s,a,l,t);i(o),s<t?r(e):n&&"function"===typeof n&&n()};c()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&u(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&u(0,800)}}},c=s,d=(n("1cc6"),n("2877")),f=Object(d["a"])(c,a,l,!1,null,"f3b72548",null);t["a"]=f.exports},"3a34":function(e,t,n){"use strict";n.d(t,"l",(function(){return a})),n.d(t,"m",(function(){return l})),n.d(t,"k",(function(){return r})),n.d(t,"i",(function(){return i})),n.d(t,"j",(function(){return o})),n.d(t,"h",(function(){return u})),n.d(t,"g",(function(){return s})),n.d(t,"d",(function(){return d})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return p})),n.d(t,"n",(function(){return m})),n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return g}));var a=[{label:"全部",value:""},{label:"上架",value:1},{label:"下架",value:2}],l={update:"编辑",create:"新建"},r=[{label:"单海报",value:"POSTER"},{label:"商品组合",value:"PRODUCT_MIX"},{label:"商品列表",value:"PRODUCT_LIST"},{label:"轮播图",value:"BANNER"}],i=[{label:"待付款",value:0},{label:"已付款",value:1},{label:"待收货",value:2},{label:"已完成",value:3},{label:"退货退款中",value:4},{label:"已关闭",value:5},{label:"已取消",value:6},{label:"调货未付款",value:7},{label:"调货已付款",value:8},{label:"调货已确认",value:9},{label:"发货中",value:12},{label:"发货成功",value:13},{label:"发货失败",value:14}],o=[{label:"全部",value:""},{label:"待付款",value:0},{label:"已付款",value:1},{label:"待收货",value:2},{label:"已完成",value:3},{label:"已关闭",value:5},{label:"已取消",value:6},{label:"待签约",value:7},{label:"已签约待审核",value:8},{label:"审核未通过",value:9},{label:"赊账订单关闭",value:10},{label:"系统关单",value:20}],u=["待付款","已付款","待收货","已完成","退货退款中","已关闭","已取消","调货未付款","调货已付款","调货已确认","已调用微信退款","已收到微信退款通知"],s=["待付款","支付成功","待收货","已完成","","已关闭","已取消","待签约","已签约待审核","审核未通过","赊账订单关闭","系统关单"],c=[{label:"未申请",value:0},{label:"已申请退货",value:1},{label:"已申请调货",value:2},{label:"申请驳回",value:3},{label:"申请通过",value:4},{label:"交易关闭",value:5}],d=["未发货","发货中","发货成功","发货失败"],f=["暂无物流信息","已揽件","在途中","已签收","问题件"],p=[{label:"全部",value:""},{label:"未发货",value:0},{label:"发货中",value:1},{label:"发货成功",value:2},{label:"发货失败",value:3}],m=(c.map((function(e){return e.label})),[{key:"",display_name:"全部"},{key:"yes",display_name:"授权用户"},{key:"no",display_name:"普通用户"}]),v=[{label:"有效",value:0},{label:"培养",value:1},{label:"新增",value:2}],b=(v.map((function(e){return e.label})),[{label:"商户信息修改",value:1},{label:"用户更改商户",value:2},{label:"启用/冻结商户信息",value:3},{label:"商户创建",value:4},{label:"关联商户",value:5}]),h=(b.map((function(e){return e.label})),[{label:"第一双",value:1},{label:"前两双",value:2},{label:"首重",value:3},{label:"每公斤",value:4},{label:"每双",value:5},{label:"多少双免运费",value:6},{label:"多少金额免运费",value:7}]),g=h.map((function(e){return e.label}))},6724:function(e,t,n){"use strict";n("8d41");var a="@@wavesContext";function l(e,t){function n(n){var a=Object.assign({},t.value),l=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=l.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var i=r.getBoundingClientRect(),o=r.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(i.width,i.height)+"px",r.appendChild(o)),l.type){case"center":o.style.top=i.height/2-o.offsetHeight/2+"px",o.style.left=i.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(n.pageY-i.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(n.pageX-i.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=l.color,o.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=n:e[a]={removeHandle:n},n}var r={bind:function(e,t){e.addEventListener("click",l(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",l(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},i=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(i)),r.install=i;t["a"]=r},"8d41":function(e,t,n){},f9ac:function(e,t,n){"use strict";n.d(t,"u",(function(){return l})),n.d(t,"r",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"v",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return c})),n.d(t,"s",(function(){return d})),n.d(t,"t",(function(){return f})),n.d(t,"a",(function(){return p})),n.d(t,"e",(function(){return m})),n.d(t,"n",(function(){return v})),n.d(t,"k",(function(){return b})),n.d(t,"o",(function(){return h})),n.d(t,"m",(function(){return g})),n.d(t,"l",(function(){return y})),n.d(t,"i",(function(){return w})),n.d(t,"g",(function(){return S})),n.d(t,"j",(function(){return _})),n.d(t,"h",(function(){return O})),n.d(t,"q",(function(){return x})),n.d(t,"p",(function(){return k})),n.d(t,"y",(function(){return j})),n.d(t,"w",(function(){return N})),n.d(t,"x",(function(){return R}));var a=n("ab3e");function l(e){return Object(a["a"])({url:"/sys/user/list",method:"post",data:e})}function r(e){return Object(a["a"])({url:"/sys/role/list",method:"post",data:e})}function i(e){return Object(a["a"])({url:"/sys/user/add",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/sys/user/detail",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/sys/user/modify",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/sys/user/restPassword",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/sys/role/remove",method:"post",data:e})}function d(e){return Object(a["a"])({url:"/sys/role/detail",method:"post",data:e})}function f(e){return Object(a["a"])({url:"/sys/role/permission/tree",method:"post",data:e})}function p(e){return Object(a["a"])({url:"/sys/role/add",method:"post",data:e})}function m(e){return Object(a["a"])({url:"/sys/role/modify",method:"post",data:e})}function v(e){return Object(a["a"])({url:"member/list",method:"post",data:e})}function b(e){return Object(a["a"])({url:"member/add",method:"post",data:e})}function h(e){return Object(a["a"])({url:"member/modify/status",method:"post",data:e})}function g(e){return Object(a["a"])({url:"member/detail",method:"post",data:e})}function y(e){return Object(a["a"])({url:"member/remove",method:"post",data:e})}function w(e){return Object(a["a"])({url:"freight/list",method:"post",data:e})}function S(e){return Object(a["a"])({url:"freight/add",method:"post",data:e})}function _(e){return Object(a["a"])({url:"freight/modify/status",method:"post",data:e})}function O(e){return Object(a["a"])({url:"freight/remove",method:"post",data:e})}function x(e){return Object(a["a"])({url:"/freight/provinceList",method:"post",data:e})}function k(e){return Object(a["a"])({url:"/member/merchantList",method:"post",data:e})}function j(e){return Object(a["a"])({url:"/sys/app/version/list",method:"post",data:e})}function N(e){return Object(a["a"])({url:"/sys/app/version/add",method:"post",data:e})}function R(e){return Object(a["a"])({url:"/sys/app/version/modify",method:"post",data:e})}}}]);