(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ef39a7e"],{1816:function(t,e,r){"use strict";var a=r("c10a"),n=r.n(a);n.a},"91b6":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("db72"),r("b775");var a=r("2b0e");var n="".concat(a["default"].prototype.BASE_URL,"upload/file")},"92dd":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"header"},[r("div",{staticClass:"clearfix headLab"},[r("span",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.title))]),t._v(" "),r("el-button",{staticStyle:{float:"right",padding:"3px 0","font-size":"14px"},attrs:{type:"text"},on:{click:t.onBack}},[t._v("返回")])],1)]),t._v(" "),r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"dataForm",staticStyle:{width:"calc(100% - 600px)","margin-left":"240px"},attrs:{rules:t.rules,model:t.form,"label-position":"right","label-width":"120px"}},[r("el-form-item",{attrs:{label:"二级品牌名称",prop:"brandChildName"}},[r("el-input",{attrs:{disabled:t.isDtl,maxlength:16},model:{value:t.form.brandChildName,callback:function(e){t.$set(t.form,"brandChildName",e)},expression:"form.brandChildName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"图片",prop:"picture"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadUrl,"list-type":"picture-card","show-file-list":!1,headers:t.headers,data:t.fileData,"on-success":t.picUploadSuccess}},[t.form.picture?r("img",{staticClass:"el-upload-list__item-thumbnail",staticStyle:{width:"100%",height:"100%"},attrs:{src:t.form.picture}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form-item",{attrs:{label:"状态",prop:"brandStatus"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{disabled:t.isDtl,placeholder:"状态"},model:{value:t.form.brandStatus,callback:function(e){t.$set(t.form,"brandStatus",e)},expression:"form.brandStatus"}},t._l(t.statusOptions,(function(t){return r("el-option",{key:t.key,attrs:{label:t.lab,value:t.value}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:4,disabled:t.isDtl},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),t._v(" "),t.isDtl?t._e():r("el-form-item",{attrs:{align:"center"}},[r("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",loading:t.isLoaded},on:{click:t.onSubmit}},[t._v("确定")]),t._v(" "),r("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)},n=[],i=r("db72"),o=(r("96cf"),r("3b8d")),d=r("c707"),u=r("91b6"),s=(r("e799"),r("ed08"),r("0f9a"),{name:"BrandChildAddManage",props:["image","clearList"],data:function(){return{title:"",canEdit:!1,isDtl:!1,type:"",headers:{},fileData:{fileType:1},brandUuid:"",navigationId:"",brandChildUuid:"",optionsData:{},file:this.image?this.image:"",logoImgList:[],dialogImageUrl:"",dialogVisible:!1,loading:!1,isLoaded:!1,uploadUrl:u["a"],statusOptions:[{key:1,lab:"上架",value:1},{key:2,lab:"下架",value:2}],form:{brandChildName:void 0,picture:"",brandStatus:void 0,seq:1,remark:void 0},rules:{brandChildName:[{required:!0,message:"必填项",trigger:"blur"}],picture:[{required:!0,message:"必填项",trigger:"blur"}],brandStatus:[{required:!0,message:"必填项",trigger:"blur"}]}}},created:function(){},mounted:function(){var t=localStorage.getItem("token"),e=localStorage.getItem("userId");this.headers={_t:t,_u:e},this.beforeRouter=this.$route.query.beforeRouter,this.$route.query.canEdit&&(this.canEdit=JSON.parse(this.$route.query.canEdit)),this.$route.query.isDtl&&(this.isDtl=JSON.parse(this.$route.query.isDtl)),this.$route.query.brandUuid&&(this.brandUuid=this.$route.query.brandUuid),this.$route.query.navigationId&&(this.navigationId=this.$route.query.navigationId),this.$route.query.brandChildUuid&&(this.brandChildUuid=this.$route.query.brandChildUuid),this.$route.query.optionsData&&(this.optionsData=this.$route.query.optionsData),this.canEdit?(console.log("canEdit"),this.type="update",this.title="修改二级品牌",document.title="修改二级品牌",this.$route.meta.title="修改二级品牌"):this.isDtl?(this.type="check",this.title="二级品牌详情",document.title="二级品牌详情",this.$route.meta.title="二级品牌详情"):(this.type="add",this.title="新增二级品牌",document.title="新增二级品牌",this.$route.meta.title="新增二级品牌"),"update"===this.type&&(this.form=JSON.parse(this.optionsData))},computed:{hideShow:function(){return""!==this.file}},methods:{onSubmit:function(){var t=this;this.$refs.dataForm.validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=18;break}if(t.isLoaded=!0,t.form.brandUuid=t.brandUuid,t.form.navigationId=t.navigationId,"add"!=t.type){e.next=12;break}return e.next=7,Object(d["b"])(Object(i["a"])({},t.form));case 7:a=e.sent,console.log(a,"res"),1==a.rtn&&(t.$message.success("创建成功"),t.resetForm()),e.next=17;break;case 12:return t.form.brandChildUuid=t.brandChildUuid,e.next=15,Object(d["c"])(Object(i["a"])({},t.form));case 15:n=e.sent,1==n.rtn&&(t.$message.success("修改成功"),t.onBack());case 17:t.isLoaded=!1;case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},onCancel:function(){"add"===this.type?this.resetForm():this.$router.push({name:"BrandChildListManage"})},resetForm:function(){this.$refs.dataForm.resetFields(),this.form={brandName:void 0,brandLogo:void 0,picture:void 0,brandStatus:void 0,isSettled:void 0,seq:1,remark:void 0}},onBack:function(){this.$router.back(-1)},logoUploadSuccess:function(t){1==t.rtn&&(this.form.brandLogo=t.url)},picUploadSuccess:function(t){1==t.rtn&&(this.form.picture=t.url)},getDetail:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,r,a,n,i,o,d,u,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,brandDtl({brandUuid:this.brandUuid});case 3:e=t.sent,1==e.rtn&&(this.loading=!1,r=e.result,a=r.brandName,n=r.brandLogo,i=r.picture,o=r.brandStatus,d=r.isSettled,u=r.remark,s=r.seq,r.createAt,r.updateAt,this.form={brandName:a,brandLogo:n,picture:i,brandStatus:o,isSettled:d,seq:s,remark:u});case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}}),c=s,l=(r("1816"),r("2877")),f=Object(l["a"])(c,a,n,!1,null,"bb472fa8",null);e["default"]=f.exports},c10a:function(t,e,r){},c707:function(t,e,r){"use strict";r.d(e,"l",(function(){return n})),r.d(e,"j",(function(){return i})),r.d(e,"g",(function(){return o})),r.d(e,"f",(function(){return d})),r.d(e,"k",(function(){return u})),r.d(e,"t",(function(){return s})),r.d(e,"a",(function(){return c})),r.d(e,"i",(function(){return l})),r.d(e,"h",(function(){return f})),r.d(e,"u",(function(){return b})),r.d(e,"n",(function(){return m})),r.d(e,"m",(function(){return p})),r.d(e,"C",(function(){return h})),r.d(e,"B",(function(){return g})),r.d(e,"z",(function(){return v})),r.d(e,"A",(function(){return y})),r.d(e,"b",(function(){return O})),r.d(e,"c",(function(){return j})),r.d(e,"e",(function(){return k})),r.d(e,"d",(function(){return S})),r.d(e,"s",(function(){return $})),r.d(e,"r",(function(){return q})),r.d(e,"D",(function(){return x})),r.d(e,"E",(function(){return C})),r.d(e,"o",(function(){return w})),r.d(e,"q",(function(){return U})),r.d(e,"p",(function(){return _})),r.d(e,"v",(function(){return D})),r.d(e,"w",(function(){return L})),r.d(e,"x",(function(){return N})),r.d(e,"y",(function(){return I}));var a=r("ab3e");function n(t){return Object(a["a"])({url:"brand/selection/list",method:"post",data:t})}function i(t){return Object(a["a"])({url:"brand/list",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/brand/child/selection/list",method:"post",data:t})}function d(t){return Object(a["a"])({url:"brand/child/list",method:"post",data:t})}function u(t){return Object(a["a"])({url:"brand/navigation/list",method:"post",data:t})}function s(t){return Object(a["a"])({url:"brand/special/list",method:"post",data:t})}function c(t){return Object(a["a"])({url:"brand/add",method:"post",data:t})}function l(t){return Object(a["a"])({url:"brand/modify",method:"post",data:t})}function f(t){return Object(a["a"])({url:"brand/detail",method:"post",data:t})}function b(t){return Object(a["a"])({url:"brand/modify/status",method:"post",data:t})}function m(t){return Object(a["a"])({url:"brand/modify/settled",method:"post",data:t})}function p(t){return Object(a["a"])({url:"brand/modify/seq",method:"post",data:t})}function h(t){return Object(a["a"])({url:"brand/navigation/modify/status",method:"post",data:t})}function g(t){return Object(a["a"])({url:"brand/navigation/modify/seq",method:"post",data:t})}function v(t){return Object(a["a"])({url:"brand/navigation/add",method:"post",data:t})}function y(t){return Object(a["a"])({url:"brand/navigation/modify",method:"post",data:t})}function O(t){return Object(a["a"])({url:"brand/child/add",method:"post",data:t})}function j(t){return Object(a["a"])({url:"brand/child/modify",method:"post",data:t})}function k(t){return Object(a["a"])({url:"brand/child/modify/status",method:"post",data:t})}function S(t){return Object(a["a"])({url:"brand/child/modify/seq",method:"post",data:t})}function $(t){return Object(a["a"])({url:"brand/special/modify/status",method:"post",data:t})}function q(t){return Object(a["a"])({url:"brand/special/modify/seq",method:"post",data:t})}function x(t){return Object(a["a"])({url:"product/selection/list",method:"post",data:t})}function C(t){return Object(a["a"])({url:"brand/special/poster/selection/list",method:"post",data:t})}function w(t){return Object(a["a"])({url:"brand/special/add",method:"post",data:t})}function U(t){return Object(a["a"])({url:"brand/special/modify",method:"post",data:t})}function _(t){return Object(a["a"])({url:"brand/special/detail",method:"post",data:t})}function D(t){return Object(a["a"])({url:"/brand/remove",method:"post",data:t})}function L(t){return Object(a["a"])({url:"brand/child/remove",method:"post",data:t})}function N(t){return Object(a["a"])({url:"brand/navigation/remove",method:"post",data:t})}function I(t){return Object(a["a"])({url:"brand/special/remove",method:"post",data:t})}},e799:function(t,e,r){"use strict";r("6762"),r("2fdb"),r("4360")}}]);