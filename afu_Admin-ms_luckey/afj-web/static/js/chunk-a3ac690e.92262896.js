(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3ac690e"],{"617c":function(t,e,r){"use strict";r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return u})),r.d(e,"w",(function(){return i})),r.d(e,"t",(function(){return o})),r.d(e,"u",(function(){return s})),r.d(e,"v",(function(){return c})),r.d(e,"r",(function(){return d})),r.d(e,"x",(function(){return l})),r.d(e,"a",(function(){return m})),r.d(e,"y",(function(){return f})),r.d(e,"z",(function(){return h})),r.d(e,"d",(function(){return p})),r.d(e,"s",(function(){return b})),r.d(e,"o",(function(){return v})),r.d(e,"i",(function(){return g})),r.d(e,"f",(function(){return y})),r.d(e,"k",(function(){return O})),r.d(e,"j",(function(){return j})),r.d(e,"e",(function(){return x})),r.d(e,"m",(function(){return k})),r.d(e,"n",(function(){return w})),r.d(e,"l",(function(){return $})),r.d(e,"g",(function(){return _})),r.d(e,"h",(function(){return L})),r.d(e,"q",(function(){return D})),r.d(e,"p",(function(){return q}));var n=r("ab3e");function a(t){return Object(n["a"])({url:"/merchant/apply/list",method:"post",data:t})}function u(t){return Object(n["a"])({url:"/merchant/apply/audit",method:"post",data:t})}function i(t){return Object(n["a"])({url:"/merchant/list",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/merchant/detail",method:"post",data:t})}function s(t){return Object(n["a"])({url:"/merchant/modify",method:"post",data:t})}function c(t){return Object(n["a"])({url:"/merchant/modify/status",method:"post",data:t})}function d(t){return Object(n["a"])({method:"post",url:"/merchant/modify/member",data:t})}function l(t){return Object(n["a"])({method:"post",url:"merchant/modify/expiry",data:t})}function m(t){return Object(n["a"])({method:"post",url:"merchant/user/add",data:t})}function f(t){return Object(n["a"])({url:"merchant/user/remove",method:"post",data:t})}function h(t){return Object(n["a"])({method:"post",url:"merchant/user/modify",data:t})}function p(t){return Object(n["a"])({method:"post",url:"brand/selection/list",data:t})}function b(t){return Object(n["a"])({method:"post",url:"member/selection/list",data:t})}function v(t){return Object(n["a"])({method:"post",url:"cusmanager/selection/list",data:t})}function g(t){return Object(n["a"])({method:"post",url:"merchant/credit/apply/list",data:t})}function y(t){return Object(n["a"])({method:"post",url:"merchant/credit/apply/audit",data:t})}function O(t){return Object(n["a"])({url:"/order/credit/list",method:"post",data:t})}function j(t){return Object(n["a"])({url:"/order/credit/detail",method:"post",data:t})}function x(t){return Object(n["a"])({url:"/order/credit/contract/"+t,method:"get",data:{}})}function k(t){return Object(n["a"])({url:"/order/credit/audit",method:"post",data:t})}function w(t){return Object(n["a"])({url:"/order/modify/creditOrder",method:"post",data:t})}function $(t){return Object(n["a"])({url:"merchant/credit/merchant/list",method:"post",data:t})}function _(t){return Object(n["a"])({url:"/merchant/credit/detail",method:"post",data:t})}function L(t){return Object(n["a"])({url:"/merchant/credit/modify",method:"post",data:t})}function D(t){return Object(n["a"])({url:"/merchant/modify/brand",method:"post",data:t})}function q(t){return Object(n["a"])({method:"post",header:{"Content-Type":"application/xls"},responseType:"blob",url:"/order/credit/export",data:t})}},"8b97d":function(t,e,r){},b4c7:function(t,e,r){"use strict";var n=r("8b97d"),a=r.n(n);a.a},e799:function(t,e,r){"use strict";r("6762"),r("2fdb"),r("4360")},fd03:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"header"},[r("div",{staticClass:"clearfix headLab"},[r("span",{staticStyle:{"font-size":"16px"}},[t._v(t._s("add"==t.type?"新增用户":"修改用户信息"))]),t._v(" "),r("el-button",{staticStyle:{float:"right",padding:"3px 0","font-size":"14px"},attrs:{type:"text"},on:{click:t.onBack}},[t._v("返回")])],1)]),t._v(" "),r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"dataForm",staticStyle:{width:"calc(100% - 600px)","margin-left":"240px"},attrs:{rules:t.rules,model:t.form,"label-position":"right","label-width":"120px"}},[r("el-form-item",{attrs:{label:"用户姓名",prop:"userName"}},[r("el-input",{attrs:{maxlength:16},model:{value:t.form.userName,callback:function(e){t.$set(t.form,"userName",e)},expression:"form.userName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"手机号码",prop:"userPhone"}},[r("el-input",{attrs:{maxlength:16},model:{value:t.form.userPhone,callback:function(e){t.$set(t.form,"userPhone",e)},expression:"form.userPhone"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"微信号",prop:"mainBusiness"}},[r("el-input",{attrs:{maxlength:16},model:{value:t.form.wechat,callback:function(e){t.$set(t.form,"wechat",e)},expression:"form.wechat"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"状态",prop:"status"}},[r("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"状态"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},t._l(t.statusOptions,(function(t){return r("el-option",{key:t.key,attrs:{label:t.lab,value:t.value}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"描述",prop:"userDescription"}},[r("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容"},model:{value:t.form.userDescription,callback:function(e){t.$set(t.form,"userDescription",e)},expression:"form.userDescription"}})],1),t._v(" "),r("el-form-item",{attrs:{align:"center"}},[r("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",loading:t.isLoaded},on:{click:t.onSubmit}},[t._v("确定")]),t._v(" "),r("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)},a=[],u=r("db72"),i=(r("96cf"),r("3b8d")),o=r("617c"),s=(r("e799"),r("ed08"),{name:"AddUser_MerManage",data:function(){return{type:"",canEdit:"",userId:"",loading:!1,isLoaded:!1,isSure:!0,applyId:"",switchVal:!0,businessLicense:"",brandList:[],cusManagerList:[],memberList:[],statusOptions:[{key:1,lab:"启用",value:1},{key:2,lab:"冻结",value:2}],form:{merchantUuid:void 0,userName:void 0,userPhone:void 0,wechat:void 0,userDescription:void 0,status:void 0},rules:{merchantUuid:[{required:!0,message:"必填项",trigger:"blur"}],userName:[{required:!0,message:"必填项",trigger:"blur"}],userPhone:[{required:!0,message:"必填项",trigger:"blur"}],status:[{required:!0,message:"必填项",trigger:"blur"}],userDescription:[{required:!0,message:"必填项",trigger:"blur"}]}}},created:function(){},mounted:function(){this.beforeRouter=this.$route.query.beforeRouter,this.form.merchantUuid=this.$route.query.merchantUuid,this.canEdit=this.$route.query.canEdit,this.canEdit?(this.type="update",document.title="修改用户信息",this.$route.meta.title="修改用户信息",this.userId=this.$route.query.userId):(this.type="add",document.title="新增用户",this.$route.meta.title="新增用户"),"update"===this.type&&this.getDtl()},methods:{getDtl:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,r,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,Object(o["t"])({merchantUuid:this.form.merchantUuid});case 3:e=t.sent,1==e.rtn&&(r=e.result.userList,this.userList=r,this.loading=!1,this.userList.some((function(t,e){if(t.userId==n.userId){var r=n.form.merchantUuid;n.form={merchantUuid:r,userName:t.userName,userPhone:t.userPhone,userId:t.userId,userDescription:t.userDescription,wechat:t.wechat,status:t.status}}})));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onSubmit:function(){var t=this;this.$refs.dataForm.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=14;break}if(t.isLoaded=!0,"add"!=t.type){e.next=9;break}return e.next=5,Object(o["a"])(Object(u["a"])({},t.form));case 5:n=e.sent,1==n.rtn&&(t.$message.success("新建成功"),t.onBack()),e.next=13;break;case 9:return e.next=11,Object(o["z"])(Object(u["a"])({},t.form));case 11:a=e.sent,1==a.rtn&&(t.$message.success("修改成功"),t.onBack());case 13:t.isLoaded=!1;case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},onCancel:function(){"add"===this.type?this.resetForm():this.$router.back(-1)},resetForm:function(){this.$refs.dataForm.resetFields(),this.form={merchantUuid:void 0,userName:void 0,userPhone:void 0,wechat:void 0,userDescription:void 0,status:void 0}},onBack:function(){this.$router.back(-1)}}}),c=s,d=(r("b4c7"),r("2877")),l=Object(d["a"])(c,n,a,!1,null,"184a7e47",null);e["default"]=l.exports}}]);