(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ecfce1f6"],{"15f7":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"handle-container"},[t.handleBtnShow[1].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:t.handleAdd}},[t._v("新增")]):t._e()],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{fixed:"",label:"序号",type:"index",width:"50",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"版本",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.version))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(r.createTime))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"版本",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("span",[t._v(t._s(1==r.status?"已通过":"审核中"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"100","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[t.handleBtnShow[2].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleEdit(r)}}},[t._v("修改")]):t._e()]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){return t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}}),t._v(" "),n("el-dialog",{attrs:{title:t.title,"before-close":t.closeModal,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{ref:"dataForm",attrs:{rules:t.rules,model:t.form}},[n("el-form-item",{attrs:{label:"版本号",prop:"version","label-width":t.formLabelWidth}},[n("el-input",{staticStyle:{width:"450px"},attrs:{disabled:t.editVersion,placeholder:"版本号"},model:{value:t.form.version,callback:function(e){t.$set(t.form,"version",e)},expression:"form.version"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"状态",prop:"status","label-width":t.formLabelWidth}},[n("el-select",{attrs:{placeholder:"状态"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},t._l(t.statusOptions,(function(t){return n("el-option",{key:t.key,attrs:{label:t.lab,value:t.value}})})),1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.closeModal}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{loading:t.isLoading,type:"primary"},on:{click:t.onSubmit}},[t._v("确 定")])],1)],1)],1)},a=[],i=n("db72"),o=(n("96cf"),n("3b8d")),s=(n("ac6a"),n("f9ac")),u=(n("53fe"),n("6724")),l=n("333d"),c=(n("ed08"),{name:"SysXcxListManage",components:{Pagination:l["a"]},directives:{waves:u["a"]},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}},data:function(){return{title:"新增版本",formLabelWidth:"100px",isLoading:!1,editVersion:!1,statusOptions:[{key:1,lab:"审核中",value:0},{key:2,lab:"已审核",value:1}],form:{version:"",status:""},rules:{version:[{required:!0,message:"必填项",trigger:"blur"}],status:[{required:!0,message:"必填项",trigger:"blur"}]},dialogFormVisible:!1,handleBtnShow:[{btnName:"AppVersionQuery",isShow:!1},{btnName:"AppVersionAdd",isShow:!1},{btnName:"AppVersionModify",isShow:!1}],tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:20}}},created:function(){var t=this;this.handleBtnFuncArr=JSON.parse(localStorage.getItem("functionList")),this.handleBtnFuncArr.forEach((function(e,n){t.handleBtnShow.forEach((function(t,n){e==t.btnName&&(t.isShow=!0)}))})),this.getList()},mounted:function(){},methods:{getList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.listLoading=!0,t.next=3,Object(s["y"])(Object(i["a"])({},this.listQuery));case 3:e=t.sent,1==e.rtn&&(console.log(e,"res"),this.list=e.result.appVersionList,this.total=e.result.total,this.listLoading=!1);case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleAdd:function(){this.dialogFormVisible=!0,this.title="新增版本",console.log(this.form)},handleEdit:function(t){this.dialogFormVisible=!0,this.editVersion=!0,this.title="修改版本",this.form={version:t.version,status:t.status},console.log(t)},closeModal:function(){this.editVersion=!1,this.dialogFormVisible=!1,this.$refs.dataForm.resetFields(),this.form={version:"",status:""}},onSubmit:function(){var t=this;this.$refs.dataForm.validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=15;break}if(t.isLoading=!0,t.editVersion){e.next=9;break}return e.next=5,Object(s["w"])(Object(i["a"])({},t.form));case 5:r=e.sent,1==r.rtn&&(t.dialogFormVisible=!1,t.$message.success("创建成功!")),e.next=13;break;case 9:return e.next=11,Object(s["x"])(Object(i["a"])({},t.form));case 11:a=e.sent,1==a.rtn&&(t.dialogFormVisible=!1,t.$message.success("修改成功!"));case 13:t.isLoading=!1,t.getList();case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),console.log(this.form)}}}),d=c,f=(n("bd21"),n("2877")),p=Object(f["a"])(d,r,a,!1,null,null,null);e["default"]=p.exports},"1c64":function(t,e,n){},"1cc6":function(t,e,n){"use strict";var r=n("1c64"),a=n.n(r);a.a},"333d":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},a=[];n("c5f6");Math.easeInOutQuad=function(t,e,n,r){return t/=r/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function u(t,e,n){var r=s(),a=t-r,u=20,l=0;e="undefined"===typeof e?500:e;var c=function t(){l+=u;var s=Math.easeInOutQuad(l,r,a,e);o(s),l<e?i(t):n&&"function"===typeof n&&n()};c()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&u(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&u(0,800)}}},c=l,d=(n("1cc6"),n("2877")),f=Object(d["a"])(c,r,a,!1,null,"f3b72548",null);e["a"]=f.exports},"573d":function(t,e,n){},6724:function(t,e,n){"use strict";n("8d41");var r="@@wavesContext";function a(t,e){function n(n){var r=Object.assign({},e.value),a=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},r),i=a.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var o=i.getBoundingClientRect(),s=i.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",i.appendChild(s)),a.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=a.color,s.className="waves-ripple z-active",!1}}return t[r]?t[r].removeHandle=n:t[r]={removeHandle:n},n}var i={bind:function(t,e){t.addEventListener("click",a(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[r].removeHandle,!1),t.addEventListener("click",a(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[r].removeHandle,!1),t[r]=null,delete t[r]}},o=function(t){t.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(o)),i.install=o;e["a"]=i},"8d41":function(t,e,n){},bd21:function(t,e,n){"use strict";var r=n("573d"),a=n.n(r);a.a},f9ac:function(t,e,n){"use strict";n.d(e,"u",(function(){return a})),n.d(e,"r",(function(){return i})),n.d(e,"b",(function(){return o})),n.d(e,"v",(function(){return s})),n.d(e,"f",(function(){return u})),n.d(e,"d",(function(){return l})),n.d(e,"c",(function(){return c})),n.d(e,"s",(function(){return d})),n.d(e,"t",(function(){return f})),n.d(e,"a",(function(){return p})),n.d(e,"e",(function(){return m})),n.d(e,"n",(function(){return h})),n.d(e,"k",(function(){return g})),n.d(e,"o",(function(){return b})),n.d(e,"m",(function(){return v})),n.d(e,"l",(function(){return y})),n.d(e,"i",(function(){return w})),n.d(e,"g",(function(){return O})),n.d(e,"j",(function(){return S})),n.d(e,"h",(function(){return j})),n.d(e,"q",(function(){return x})),n.d(e,"p",(function(){return k})),n.d(e,"y",(function(){return _})),n.d(e,"w",(function(){return L})),n.d(e,"x",(function(){return z}));var r=n("ab3e");function a(t){return Object(r["a"])({url:"/sys/user/list",method:"post",data:t})}function i(t){return Object(r["a"])({url:"/sys/role/list",method:"post",data:t})}function o(t){return Object(r["a"])({url:"/sys/user/add",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/sys/user/detail",method:"post",data:t})}function u(t){return Object(r["a"])({url:"/sys/user/modify",method:"post",data:t})}function l(t){return Object(r["a"])({url:"/sys/user/restPassword",method:"post",data:t})}function c(t){return Object(r["a"])({url:"/sys/role/remove",method:"post",data:t})}function d(t){return Object(r["a"])({url:"/sys/role/detail",method:"post",data:t})}function f(t){return Object(r["a"])({url:"/sys/role/permission/tree",method:"post",data:t})}function p(t){return Object(r["a"])({url:"/sys/role/add",method:"post",data:t})}function m(t){return Object(r["a"])({url:"/sys/role/modify",method:"post",data:t})}function h(t){return Object(r["a"])({url:"member/list",method:"post",data:t})}function g(t){return Object(r["a"])({url:"member/add",method:"post",data:t})}function b(t){return Object(r["a"])({url:"member/modify/status",method:"post",data:t})}function v(t){return Object(r["a"])({url:"member/detail",method:"post",data:t})}function y(t){return Object(r["a"])({url:"member/remove",method:"post",data:t})}function w(t){return Object(r["a"])({url:"freight/list",method:"post",data:t})}function O(t){return Object(r["a"])({url:"freight/add",method:"post",data:t})}function S(t){return Object(r["a"])({url:"freight/modify/status",method:"post",data:t})}function j(t){return Object(r["a"])({url:"freight/remove",method:"post",data:t})}function x(t){return Object(r["a"])({url:"/freight/provinceList",method:"post",data:t})}function k(t){return Object(r["a"])({url:"/member/merchantList",method:"post",data:t})}function _(t){return Object(r["a"])({url:"/sys/app/version/list",method:"post",data:t})}function L(t){return Object(r["a"])({url:"/sys/app/version/add",method:"post",data:t})}function z(t){return Object(r["a"])({url:"/sys/app/version/modify",method:"post",data:t})}}}]);