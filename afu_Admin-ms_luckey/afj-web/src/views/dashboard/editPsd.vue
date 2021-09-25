<template>
  <div class="app-container">
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size:16px;">密码修改</span>
        <el-button
          style="float: right; padding: 3px 0;font-size:14px;"
          type="text"
          @click="onBack"
        >返回</el-button>
      </div>
    </div>
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="right"
      label-width="120px"
      style="width: calc(100% - 600px); margin-left:240px;"
    >
      <el-form-item label="旧密码" prop="oldUserPassword">
        <el-input placeholder="请输入旧密码" v-model="form.oldUserPassword" :maxlength="16" />
      </el-form-item>
      <el-form-item label="新密码" prop="newUserPassword">
        <el-input placeholder="请输入新密码" v-model="form.newUserPassword" :maxlength="16" />
      </el-form-item>

      <el-form-item align="center">
        <el-button
          type="primary"
          :loading="isLoaded"
          @click="onSubmit"
          style="margin-right:20px;"
        >确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editPsd } from "@/api/login";
export default {
  name:'EditPsd',
  data() {
    return {
      isLoaded: false,
      form: {
        oldUserPassword: undefined,
        newUserPassword: undefined
      },
      rules: {
        oldUserPassword: [{ required: true, message: "必填项", trigger: "blur" }],
        newUserPassword: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  methods: {
        onSubmit() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.isLoaded = true;
          let res = await editPsd({
            ...this.form
          });
          if (res.rtn == 1) {
            this.$message.success("修改成功");
            this.resetForm();
          }
          this.isLoaded = false;
        }
      });
    },
    onCancel() {
        this.resetForm();
    },
    onBack() {
        this.$router.back(-1);
    },
    resetForm() {
        this.$nextTick(()=>{
            this.$refs.dataForm.resetFields();
        }) 
      this.form = {
       oldUserPassword:"",
       newUserPassword:""
      };   
    }
  }
};
</script>

<style>
.app-container {
  margin: 0 40px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
</style>