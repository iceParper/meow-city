(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dcae4498"],{"1c64":function(t,e,n){},"1cc6":function(t,e,n){"use strict";var a=n("1c64"),r=n.n(a);r.a},"1eba":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-form",[n("el-row",[n("el-col",{attrs:{span:7}},[n("el-form-item",{attrs:{label:"品牌名称"}},[n("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"品牌名称"},model:{value:t.listQuery.brandUuid,callback:function(e){t.$set(t.listQuery,"brandUuid",e)},expression:"listQuery.brandUuid"}},t._l(t.brandSelList,(function(t){return n("el-option",{key:t.brandUuid,attrs:{label:t.brandName,value:t.brandUuid}})})),1)],1)],1),t._v(" "),n("el-col",{attrs:{span:7}},[n("el-form-item",{attrs:{label:"二级品牌名称"}},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"二级品牌名称"},model:{value:t.listQuery.brandChildName,callback:function(e){t.$set(t.listQuery,"brandChildName",e)},expression:"listQuery.brandChildName"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:7}},[n("el-form-item",{attrs:{label:"状态"}},[n("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"状态"},model:{value:t.listQuery.brandStatus,callback:function(e){t.$set(t.listQuery,"brandStatus",e)},expression:"listQuery.brandStatus"}},t._l(t.statusOptions,(function(t){return n("el-option",{key:t.key,attrs:{label:t.lab,value:t.value}})})),1)],1)],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:6}},[n("el-form-item",[t.handleBtnShow[0].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查询")]):t._e(),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:t.handleReset}},[t._v("重置")])],1)],1)],1)],1)],1),t._v(" "),n("div",{staticClass:"handle-container"},[n("el-button-group",[t.handleBtnShow[2].isShow?n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoaded_1,expression:"isLoaded_1"}],staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-d-caret",type:"primary"},on:{click:t.handleEditBCStatus}},[t._v("修改品牌状态")]):t._e(),t._v(" "),t.handleBtnShow[4].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"loading",rawName:"v-loading",value:t.isLoaded_4,expression:"isLoaded_4"}],attrs:{icon:"el-icon-delete",type:"primary",size:"mini"},on:{click:t.handleDel}},[t._v("批量删除")]):t._e()],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,ref:"tableRef",staticStyle:{width:"100%"},attrs:{data:t.list,fit:"","highlight-current-row":"",id:"crTable","row-key":t.getRowKeys},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"品牌二级名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.brandChildName||"--"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"所属品牌",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.brandName||"--"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"所属导航",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.navigationName||"--"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"图片",align:"center",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[a.picture?n("el-image",{staticStyle:{width:"100px",height:"100px",border:"1px solid #eee"},attrs:{src:a.picture,fit:"contain"}}):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(1==a.brandStatus?"上架":"下架"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("span",[t._v(t._s(a.remark||"--"))])]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"100","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t.handleBtnShow[1].isShow?n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleEdit(a)}}},[t._v("修改")]):t._e()]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){return t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){return t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}}),t._v(" "),n("el-dialog",{attrs:{title:"选择品牌状态","before-close":t.closeModal,visible:t.dialogFormVisible1},on:{"update:visible":function(e){t.dialogFormVisible1=e}}},[n("el-form",{ref:"dataForm1",attrs:{rules:t.rules1,model:t.form1}},[n("el-form-item",{attrs:{label:"品牌状态",prop:"brandStatus","label-width":t.formLabelWidth}},[n("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:"品牌状态"},model:{value:t.form1.brandStatus,callback:function(e){t.$set(t.form1,"brandStatus",e)},expression:"form1.brandStatus"}},t._l(t.statusOptions,(function(t){return n("el-option",{key:t.key,attrs:{label:t.lab,value:t.value}})})),1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.closeModal}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleEditBCStatusSubmit}},[t._v("确 定")])],1)],1)],1)},r=[],i=n("db72"),o=(n("96cf"),n("3b8d")),s=(n("ac6a"),n("c707")),l=n("53fe"),d=n.n(l),u=n("6724"),c=n("333d"),f=(n("ed08"),{name:"BrandChildListManage",components:{Pagination:c["a"]},directives:{waves:u["a"]},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}},data:function(){return{formLabelWidth:"100px",isLoaded_1:!1,isLoaded_2:!1,isLoaded_3:!1,isLoaded_4:!1,tableData:[],brandSelList:[],statusOptions:[{key:1,lab:"上架",value:1},{key:2,lab:"下架",value:2}],statusOptions1:[{key:0,lab:"未入驻",value:0},{key:1,lab:"已入驻",value:1}],form1:{brandStatus:""},form2:{isSettled:""},seqForms:{tableData:[]},rules1:{brandStatus:[{required:!0,message:"必填项",trigger:"blur"}]},rules2:{isSettled:[{required:!0,message:"必填项",trigger:"blur"}]},rules3:{seq:[{required:!0,message:"必填项",trigger:"blur"}]},dialogFormVisible1:!1,dialogFormVisible2:!1,dialogFormVisible3:!1,handleBtnShow:[{btnName:"BrandChildQuery",isShow:!1},{btnName:"BrandChildModify",isShow:!1},{btnName:"BrandChildModifyStatus",isShow:!1},{btnName:"BrandChildModifySeq",isShow:!1},{btnName:"BrandChildRemove",isShow:!1}],selectedData:[],tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:20,brandUuid:void 0,brandChildName:void 0,brandStatus:void 0}}},created:function(){var t=this;this.handleBtnFuncArr=JSON.parse(localStorage.getItem("functionList")),this.handleBtnFuncArr.forEach((function(e,n){t.handleBtnShow.forEach((function(t,n){e==t.btnName&&(t.isShow=!0)}))})),this.getList(),this.getBrandSelList()},mounted:function(){this.rowDrop()},methods:{handleSelectionChange:function(t){this.selectedData=t},getList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.listLoading=!0,t.next=3,Object(s["f"])(Object(i["a"])({},this.listQuery));case 3:e=t.sent,1==e.rtn&&(console.log(e,"res"),this.list=e.result.brandChildList,this.total=e.result.total,this.listLoading=!1);case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getBrandSelList:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["l"])({});case 2:e=t.sent,console.log(e,"======"),1==e.rtn&&(this.brandSelList=e.brandList);case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleFilter:function(){this.listQuery.pageNum=1,this.getList()},handleReset:function(){this.listQuery={pageNum:1,pageSize:20,brandUuid:void 0,brandChildName:void 0,dataStatus:void 0},this.getList()},handleEdit:function(t){var e={brandChildName:t.brandChildName,picture:t.picture,brandStatus:t.brandStatus,seq:t.seq,remark:t.remark};this.$router.push({name:"BrandChildAddManage",query:{brandUuid:t.brandUuid,navigationId:t.navigationId,brandChildUuid:t.brandChildUuid,optionsData:JSON.stringify(e),beforeRouter:"BrandChildListManage",canEdit:!0}})},toDtl:function(t){this.$router.push({name:"BrandAddManage",query:{brandUuid:t.brandUuid,beforeRouter:"BrandListManage",isDtl:!0}})},handleEditBCStatus:function(){void 0!==this.$refs["dataForm1"]&&this.$refs.dataForm1.resetFields(),this.selectedData&&this.selectedData.length>0?this.dialogFormVisible1=!0:this.$message("请勾选要修改的品牌")},closeModal:function(){this.dialogFormVisible1=!1,this.dialogFormVisible2=!1,this.dialogFormVisible3=!1,this.selectedData=[],this.$refs.tableRef.clearSelection()},handleDel:function(){var t=this;this.selectedData&&this.selectedData.length>0?this.$confirm("此次操作将删除该二级品牌, 是否继续?","删除二级品牌",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoaded_4=!0,n=[],t.selectedData.forEach((function(t,e){var a={};a.brandChildUuid=t.brandChildUuid,n.push(a)})),e.next=5,Object(s["w"])({brandChildList:n});case 5:a=e.sent,console.log(a),1==a.rtn&&t.$message({type:"success",message:"删除成功!"}),t.getList(),t.isLoaded_4=!1;case 10:case"end":return e.stop()}}),e)})))).catch((function(){t.selectedData=[],t.$refs.tableRef.clearSelection(),t.$message({type:"info",message:"已取消"})})):this.$message("请勾选要删除的二级品牌")},handleEditBCStatusSubmit:function(){var t=this;this.$refs.dataForm1.validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(n){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n){e.next=12;break}return t.isLoaded_1=!0,a=[],t.selectedData.forEach((function(t,e){var n={};n.brandChildUuid=t.brandChildUuid,a.push(n)})),e.next=6,Object(s["e"])({brandChildList:JSON.stringify(a),brandStatus:t.form1.brandStatus});case 6:r=e.sent,console.log(r),1==r.rtn&&t.$message({type:"success",message:"修改成功!"}),t.getList(),t.isLoaded_1=!1,t.dialogFormVisible1=!1;case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},getRowKeys:function(t){return t.brandChildUuid},rowDrop:function(){var t=document.getElementById("crTable").querySelector(".el-table__body-wrapper tbody");if(!this.handleBtnShow[3].isShow)return!1;var e=this;d.a.create(t,{onEnd:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(n){var a,r,i,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=n.newIndex,r=n.oldIndex,console.log(a,r),console.log(e,"--------"),i=e.list.splice(r,1)[0],console.log(e.tableData),e.list.splice(a,0,i),o=[],e.list.forEach((function(t,e){console.log(t,"item");var n={};n.brandChildUuid=t.brandChildUuid,n.seq=100*(e+1),o.push(n)})),t.next=10,Object(s["d"])({brandChildList:o});case 10:l=t.sent,l.rtn;case 12:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()})}}}),h=f,p=(n("951e"),n("2877")),m=Object(p["a"])(h,a,r,!1,null,null,null);e["default"]=m.exports},"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},r=[];n("c5f6");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,n){var a=s(),r=t-a,l=20,d=0;e="undefined"===typeof e?500:e;var u=function t(){d+=l;var s=Math.easeInOutQuad(d,a,r,e);o(s),d<e?i(t):n&&"function"===typeof n&&n()};u()}var d={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=d,c=(n("1cc6"),n("2877")),f=Object(c["a"])(u,a,r,!1,null,"f3b72548",null);e["a"]=f.exports},6724:function(t,e,n){"use strict";n("8d41");var a="@@wavesContext";function r(t,e){function n(n){var a=Object.assign({},e.value),r=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),i=r.ele;if(i){i.style.position="relative",i.style.overflow="hidden";var o=i.getBoundingClientRect(),s=i.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",i.appendChild(s)),r.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=r.color,s.className="waves-ripple z-active",!1}}return t[a]?t[a].removeHandle=n:t[a]={removeHandle:n},n}var i={bind:function(t,e){t.addEventListener("click",r(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[a].removeHandle,!1),t.addEventListener("click",r(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[a].removeHandle,!1),t[a]=null,delete t[a]}},o=function(t){t.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(o)),i.install=o;e["a"]=i},"8d41":function(t,e,n){},"951e":function(t,e,n){"use strict";var a=n("a251"),r=n.n(a);r.a},a251:function(t,e,n){},c707:function(t,e,n){"use strict";n.d(e,"l",(function(){return r})),n.d(e,"j",(function(){return i})),n.d(e,"g",(function(){return o})),n.d(e,"f",(function(){return s})),n.d(e,"k",(function(){return l})),n.d(e,"t",(function(){return d})),n.d(e,"a",(function(){return u})),n.d(e,"i",(function(){return c})),n.d(e,"h",(function(){return f})),n.d(e,"u",(function(){return h})),n.d(e,"n",(function(){return p})),n.d(e,"m",(function(){return m})),n.d(e,"C",(function(){return b})),n.d(e,"B",(function(){return g})),n.d(e,"z",(function(){return v})),n.d(e,"A",(function(){return y})),n.d(e,"b",(function(){return w})),n.d(e,"c",(function(){return S})),n.d(e,"e",(function(){return _})),n.d(e,"d",(function(){return C})),n.d(e,"s",(function(){return O})),n.d(e,"r",(function(){return k})),n.d(e,"D",(function(){return j})),n.d(e,"E",(function(){return x})),n.d(e,"o",(function(){return L})),n.d(e,"q",(function(){return N})),n.d(e,"p",(function(){return B})),n.d(e,"v",(function(){return z})),n.d(e,"w",(function(){return E})),n.d(e,"x",(function(){return $})),n.d(e,"y",(function(){return F}));var a=n("ab3e");function r(t){return Object(a["a"])({url:"brand/selection/list",method:"post",data:t})}function i(t){return Object(a["a"])({url:"brand/list",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/brand/child/selection/list",method:"post",data:t})}function s(t){return Object(a["a"])({url:"brand/child/list",method:"post",data:t})}function l(t){return Object(a["a"])({url:"brand/navigation/list",method:"post",data:t})}function d(t){return Object(a["a"])({url:"brand/special/list",method:"post",data:t})}function u(t){return Object(a["a"])({url:"brand/add",method:"post",data:t})}function c(t){return Object(a["a"])({url:"brand/modify",method:"post",data:t})}function f(t){return Object(a["a"])({url:"brand/detail",method:"post",data:t})}function h(t){return Object(a["a"])({url:"brand/modify/status",method:"post",data:t})}function p(t){return Object(a["a"])({url:"brand/modify/settled",method:"post",data:t})}function m(t){return Object(a["a"])({url:"brand/modify/seq",method:"post",data:t})}function b(t){return Object(a["a"])({url:"brand/navigation/modify/status",method:"post",data:t})}function g(t){return Object(a["a"])({url:"brand/navigation/modify/seq",method:"post",data:t})}function v(t){return Object(a["a"])({url:"brand/navigation/add",method:"post",data:t})}function y(t){return Object(a["a"])({url:"brand/navigation/modify",method:"post",data:t})}function w(t){return Object(a["a"])({url:"brand/child/add",method:"post",data:t})}function S(t){return Object(a["a"])({url:"brand/child/modify",method:"post",data:t})}function _(t){return Object(a["a"])({url:"brand/child/modify/status",method:"post",data:t})}function C(t){return Object(a["a"])({url:"brand/child/modify/seq",method:"post",data:t})}function O(t){return Object(a["a"])({url:"brand/special/modify/status",method:"post",data:t})}function k(t){return Object(a["a"])({url:"brand/special/modify/seq",method:"post",data:t})}function j(t){return Object(a["a"])({url:"product/selection/list",method:"post",data:t})}function x(t){return Object(a["a"])({url:"brand/special/poster/selection/list",method:"post",data:t})}function L(t){return Object(a["a"])({url:"brand/special/add",method:"post",data:t})}function N(t){return Object(a["a"])({url:"brand/special/modify",method:"post",data:t})}function B(t){return Object(a["a"])({url:"brand/special/detail",method:"post",data:t})}function z(t){return Object(a["a"])({url:"/brand/remove",method:"post",data:t})}function E(t){return Object(a["a"])({url:"brand/child/remove",method:"post",data:t})}function $(t){return Object(a["a"])({url:"brand/navigation/remove",method:"post",data:t})}function F(t){return Object(a["a"])({url:"brand/special/remove",method:"post",data:t})}}}]);