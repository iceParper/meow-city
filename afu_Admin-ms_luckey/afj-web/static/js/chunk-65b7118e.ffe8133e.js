(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65b7118e"],{"1c64":function(e,t,a){},"1cc6":function(e,t,a){"use strict";var i=a("1c64"),n=a.n(i);n.a},"333d":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},n=[];a("c5f6");Math.easeInOutQuad=function(e,t,a,i){return e/=i/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var s=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,a){var i=o(),n=e-i,l=20,c=0;t="undefined"===typeof t?500:t;var u=function e(){c+=l;var o=Math.easeInOutQuad(c,i,n,t);r(o),c<t?s(e):a&&"function"===typeof a&&a()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},u=c,d=(a("1cc6"),a("2877")),f=Object(d["a"])(u,i,n,!1,null,"f3b72548",null);t["a"]=f.exports},3632:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",[a("el-row",[a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"分类名称"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"分类名称"},model:{value:e.listQuery.classifyName,callback:function(t){e.$set(e.listQuery,"classifyName",t)},expression:"listQuery.classifyName"}},e._l(e.classifySelList,(function(e){return a("el-option",{key:e.classifyUuid,attrs:{label:e.classifyName,value:e.classifyName}})})),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"状态"},model:{value:e.listQuery.classifyStatus,callback:function(t){e.$set(e.listQuery,"classifyStatus",t)},expression:"listQuery.classifyStatus"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.key,attrs:{label:e.lab,value:e.value}})})),1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",[e.handleBtnShow[0].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查询")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:e.handleReset}},[e._v("重置")])],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"handle-container"},[a("el-button-group",[e.handleBtnShow[3].isShow?a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoaded_1,expression:"isLoaded_1"}],staticClass:"filter-item",attrs:{size:"mini",icon:"el-icon-d-caret",type:"primary"},on:{click:e.handleEditClassifyStatus}},[e._v("修改分类状态")]):e._e(),e._v(" "),e.handleBtnShow[7].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"},{name:"loading",rawName:"v-loading",value:e.isLoaded_4,expression:"isLoaded_4"}],attrs:{icon:"el-icon-delete",type:"primary",size:"mini"},on:{click:e.handleDel}},[e._v("批量删除")]):e._e()],1),e._v(" "),e.handleBtnShow[5].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")]):e._e()],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"tableRef",staticStyle:{width:"100%"},attrs:{data:e.list,fit:"","highlight-current-row":"",id:"crTable","row-key":e.getRowKeys},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"分类名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.classifyName||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"图片",align:"center",width:"140"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[t.picture?a("el-image",{staticStyle:{width:"100px",height:"100px",border:"1px solid #eee"},attrs:{src:t.picture,fit:"contain"}}):a("div",{staticClass:"brandLogo",staticStyle:{border:"1px solid #eee",margin:"0 auto"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(1==i.classifyStatus?"上架":"下架"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"商品数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.productNumber||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"销售数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.productSaleNumber||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"累计浏览",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.productBrowseNumber||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"子分类数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.classifyChildNumber||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"描述"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.represent||"--"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"100","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[e.handleBtnShow[2].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0","margin-bottom":"10px"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleEdit(i)}}},[e._v("修改")]):e._e(),e._v(" "),e.handleBtnShow[1].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0","margin-left":"0","margin-bottom":"10px"},attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.toDtl(i)}}},[e._v("查看详情")]):e._e(),e._v(" "),e.handleBtnShow[6].isShow?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{width:"60px","box-sizing":"border-box",padding:"7px 0","margin-left":"0"},attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){return e.handleAddNav(i)}}},[e._v("新增导航")]):e._e()]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.pageNum,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"pageNum",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:"选择分类状态","before-close":e.closeModal,visible:e.dialogFormVisible1},on:{"update:visible":function(t){e.dialogFormVisible1=t}}},[a("el-form",{ref:"dataForm1",attrs:{rules:e.rules1,model:e.form1}},[a("el-form-item",{attrs:{label:"分类状态",prop:"classifyStatus","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"90%"},attrs:{placeholder:"分类状态"},model:{value:e.form1.classifyStatus,callback:function(t){e.$set(e.form1,"classifyStatus",t)},expression:"form1.classifyStatus"}},e._l(e.statusOptions,(function(e){return a("el-option",{key:e.key,attrs:{label:e.lab,value:e.value}})})),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeModal}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleEditCYStatusSubmit}},[e._v("确 定")])],1)],1)],1)},n=[],s=a("db72"),r=(a("96cf"),a("3b8d")),o=(a("ac6a"),a("ed8e")),l=a("53fe"),c=a.n(l),u=a("6724"),d=a("333d"),f=(a("ed08"),{name:"ClassifyListManage",components:{Pagination:d["a"]},directives:{waves:u["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]}},data:function(){return{formLabelWidth:"100px",isLoaded_1:!1,isLoaded_2:!1,isLoaded_3:!1,isLoaded_4:!1,tableData:[],statusOptions:[{key:1,lab:"上架",value:1},{key:2,lab:"下架",value:2}],statusOptions1:[{key:0,lab:"未入驻",value:0},{key:1,lab:"已入驻",value:1}],form1:{classifyStatus:""},seqForms:{tableData:[]},rules1:{classifyStatus:[{required:!0,message:"必填项",trigger:"blur"}]},rules3:{seq:[{required:!0,message:"必填项",trigger:"blur"}]},dialogFormVisible1:!1,dialogFormVisible2:!1,dialogFormVisible3:!1,handleBtnShow:[{btnName:"ClassifyQuery",isShow:!1},{btnName:"ClassifyDetail",isShow:!1},{btnName:"ClassifyModify",isShow:!1},{btnName:"ClassifyModifyStatus",isShow:!1},{btnName:"ClassifyModifySeq",isShow:!1},{btnName:"ClassifyAdd",isShow:!1},{btnName:"ClassifyNavigationAdd",isShow:!1},{btnName:"ClassifyRemove",isShow:!1}],selectedData:[],classifySelList:[],tableKey:0,list:null,total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:20,classifyName:void 0,classifyStatus:void 0}}},created:function(){var e=this;this.handleBtnFuncArr=JSON.parse(localStorage.getItem("functionList")),this.handleBtnFuncArr.forEach((function(t,a){e.handleBtnShow.forEach((function(e,a){t==e.btnName&&(e.isShow=!0)}))})),this.getClassifySelList(),this.getList()},mounted:function(){this.rowDrop()},methods:{handleSelectionChange:function(e){this.selectedData=e},getList:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.listLoading=!0,e.next=3,Object(o["k"])(Object(s["a"])({},this.listQuery));case 3:t=e.sent,1==t.rtn&&(console.log(t,"res"),this.list=t.result.classifyList,this.total=t.result.total,this.listLoading=!1);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getClassifySelList:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["m"])({});case 2:t=e.sent,console.log(t,"======"),1==t.rtn&&(this.classifySelList=t.classifyList);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleFilter:function(){this.listQuery.pageNum=1,this.getList()},handleReset:function(){this.listQuery={pageNum:1,pageSize:20,classifyName:void 0,classifyStatus:void 0},this.getList()},handleAdd:function(){console.log(this.$router.options.routes,"router"),this.$router.push({name:"ClassifyAddManage",query:{beforeRouter:"ClassifyListManage"}})},handleAddNav:function(e){this.$router.push({name:"ClassifyNavAddManage",query:{classifyUuid:e.classifyUuid,beforeRouter:"ClassifyListManage"}})},handleEdit:function(e){console.log(e,"row"),this.$router.push({name:"ClassifyAddManage",query:{classifyUuid:e.classifyUuid,beforeRouter:"ClassifyListManage",canEdit:!0}})},toDtl:function(e){this.$router.push({name:"ClassifyAddManage",query:{classifyUuid:e.classifyUuid,beforeRouter:"ClassifyListManage",isDtl:!0}})},toBrandNav:function(e){this.$router.push({name:"BrandNavListManage",query:{brandUuid:e.brandUuid,beforeRouter:"BrandListManage"}})},handleEditClassifyStatus:function(){void 0!==this.$refs["dataForm1"]&&this.$refs.dataForm1.resetFields(),this.selectedData&&this.selectedData.length>0?this.dialogFormVisible1=!0:this.$message("请勾选要修改的分类")},closeModal:function(){this.dialogFormVisible1=!1,this.dialogFormVisible2=!1,this.dialogFormVisible3=!1,this.selectedData=[],this.$refs.tableRef.clearSelection()},handleDel:function(){var e=this;this.selectedData&&this.selectedData.length>0?this.$confirm("此次操作将删除该分类, 是否继续?","删除分类",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(r["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isLoaded_4=!0,a=[],e.selectedData.forEach((function(e,t){var i={};i.classifyUuid=e.classifyUuid,a.push(i)})),console.log(a,"======"),t.next=6,Object(o["p"])({classifyList:a});case 6:i=t.sent,console.log(i),1==i.rtn&&e.$message({type:"success",message:"删除成功!"}),e.getList(),e.isLoaded_4=!1;case 11:case"end":return t.stop()}}),t)})))).catch((function(){e.selectedData=[],e.$refs.tableRef.clearSelection(),e.$message({type:"info",messageyh:"已取消"})})):this.$message("请勾选要删除的分类")},handleEditCYStatusSubmit:function(){var e=this;this.$refs.dataForm1.validate(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(a){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=12;break}return e.isLoaded_1=!0,i=[],e.selectedData.forEach((function(e,t){var a={};a.classifyUuid=e.classifyUuid,i.push(a)})),t.next=6,Object(o["o"])({classifyList:JSON.stringify(i),classifyStatus:e.form1.classifyStatus});case 6:n=t.sent,console.log(n),1==n.rtn&&e.$message({type:"success",message:"修改成功!"}),e.getList(),e.isLoaded_1=!1,e.dialogFormVisible1=!1;case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},getRowKeys:function(e){return e.id},rowDrop:function(){var e=document.getElementById("crTable").querySelector(".el-table__body-wrapper tbody");if(!this.handleBtnShow[4].isShow)return!1;var t=this;c.a.create(e,{onEnd:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(a){var i,n,s,r,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=a.newIndex,n=a.oldIndex,console.log(i,n,"--------"),s=t.list.splice(n,1)[0],console.log(s,t.list,"======"),t.list.splice(i,0,s),console.log(t.list),r=[],t.list.forEach((function(e,t){var a={};a.classifyUuid=e.classifyUuid,a.seq=100*(t+1),r.push(a)})),e.next=10,Object(o["n"])({classifyList:r});case 10:l=e.sent,l.rtn;case 12:case"end":return e.stop()}}),e)})));function a(t){return e.apply(this,arguments)}return a}()})}}}),m=f,p=(a("e593"),a("2877")),h=Object(p["a"])(m,i,n,!1,null,null,null);t["default"]=h.exports},6724:function(e,t,a){"use strict";a("8d41");var i="@@wavesContext";function n(e,t){function a(a){var i=Object.assign({},t.value),n=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),s=n.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var r=s.getBoundingClientRect(),o=s.querySelector(".waves-ripple");switch(o?o.className="waves-ripple":(o=document.createElement("span"),o.className="waves-ripple",o.style.height=o.style.width=Math.max(r.width,r.height)+"px",s.appendChild(o)),n.type){case"center":o.style.top=r.height/2-o.offsetHeight/2+"px",o.style.left=r.width/2-o.offsetWidth/2+"px";break;default:o.style.top=(a.pageY-r.top-o.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",o.style.left=(a.pageX-r.left-o.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return o.style.backgroundColor=n.color,o.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=a:e[i]={removeHandle:a},a}var s={bind:function(e,t){e.addEventListener("click",n(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",n(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},r=function(e){e.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(r)),s.install=r;t["a"]=s},"8d41":function(e,t,a){},b581:function(e,t,a){},e593:function(e,t,a){"use strict";var i=a("b581"),n=a.n(i);n.a},ed8e:function(e,t,a){"use strict";a.d(t,"m",(function(){return n})),a.d(t,"f",(function(){return s})),a.d(t,"k",(function(){return r})),a.d(t,"e",(function(){return o})),a.d(t,"l",(function(){return l})),a.d(t,"b",(function(){return c})),a.d(t,"j",(function(){return u})),a.d(t,"i",(function(){return d})),a.d(t,"o",(function(){return f})),a.d(t,"n",(function(){return m})),a.d(t,"p",(function(){return p})),a.d(t,"a",(function(){return h})),a.d(t,"u",(function(){return y})),a.d(t,"t",(function(){return g})),a.d(t,"s",(function(){return v})),a.d(t,"r",(function(){return b})),a.d(t,"c",(function(){return w})),a.d(t,"d",(function(){return S})),a.d(t,"h",(function(){return _})),a.d(t,"g",(function(){return x})),a.d(t,"q",(function(){return k}));var i=a("ab3e");function n(e){return Object(i["a"])({url:"classify/selection/list",method:"post",data:e})}function s(e){return Object(i["a"])({url:"classify/child/selection/list",method:"post",data:e})}function r(e){return Object(i["a"])({url:"/classify/list",method:"post",data:e})}function o(e){return Object(i["a"])({url:"classify/child/list",method:"post",data:e})}function l(e){return Object(i["a"])({url:"classify/navigation/list",method:"post",data:e})}function c(e){return Object(i["a"])({url:"classify/add",method:"post",data:e})}function u(e){return Object(i["a"])({url:"classify/modify",method:"post",data:e})}function d(e){return Object(i["a"])({url:"classify/detail",method:"post",data:e})}function f(e){return Object(i["a"])({url:"classify/modify/status",method:"post",data:e})}function m(e){return Object(i["a"])({url:"classify/modify/seq",method:"post",data:e})}function p(e){return Object(i["a"])({url:"classify/remove",method:"post",data:e})}function h(e){return Object(i["a"])({url:"/classify/navigation/add",method:"post",data:e})}function y(e){return Object(i["a"])({url:"/classify/navigation/modify",method:"post",data:e})}function g(e){return Object(i["a"])({url:"/classify/navigation/modify/status",method:"post",data:e})}function v(e){return Object(i["a"])({url:"/classify/navigation/modify/seq",method:"post",data:e})}function b(e){return Object(i["a"])({url:"/classify/navigation/remove",method:"post",data:e})}function w(e){return Object(i["a"])({url:"/classify/child/add",method:"post",data:e})}function S(e){return Object(i["a"])({url:"/classify/child/modify",method:"post",data:e})}function _(e){return Object(i["a"])({url:"classify/child/modify/status",method:"post",data:e})}function x(e){return Object(i["a"])({url:"classify/child/modify/seq",method:"post",data:e})}function k(e){return Object(i["a"])({url:"classify/child/remove",method:"post",data:e})}}}]);