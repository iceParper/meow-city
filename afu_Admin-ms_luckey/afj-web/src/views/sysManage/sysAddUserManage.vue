<template>
  <div class="app-container">
    <!-- <el-card class="box-card"> -->
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size:16px;" v-if="canEdit">修改用户信息</span>
        <span style="font-size:16px;" v-else-if="isDtl">查看用户信息</span>
        <span style="font-size:16px;" v-else>新增用户信息</span>
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
      v-loading="loading"
      style="width: calc(100% - 600px); margin-left:240px;"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="form.department" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="职务" prop="userPost">
        <el-input v-model="form.userPost" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="手机号码" prop="userPhone">
        <el-input v-model="form.userPhone" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="用户账号" prop="userAccount">
        <el-input v-model="form.userAccount" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" v-if="type === 'add'">
        <el-input v-model="form.userPassword" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" :disabled="isDtl" :maxlength="16" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" :disabled="isDtl" style="width: 200px" placeholder="状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.key"
            :label="item.lab"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户经理">
        <el-select
          v-model="form.managerId"
          :disabled="isDtl"
          style="width: 200px"
          placeholder="绑定客户经理"
        >
          <el-option
            v-for="item in managerSelList"
            :key="item.customerServiceUuid"
            :label="item.name"
            :value="item.customerServiceUuid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roleList">
        <el-checkbox-group :disabled="isDtl" v-model="roleListCheckOptions">
          <el-checkbox
            v-for="item in roleListArr"
            :label="item.roleId"
            :key="item.roleId"
          >{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item align="center" v-if="!isDtl">
        <el-button
          type="primary"
          :loading="isLoaded"
          @click="onSubmit"
          style="margin-right:20px;"
        >确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  roleList,
  addUserManage,
  userManageDtl,
  editUserManage
} from "@/api/sysManage";

import { managerSelList } from "@/api/managerManage";

export default {
  name: "SysAddUserManage",
  data() {
    return {
      loading: false,
      isLoaded: false,
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "停用", value: 2 }
      ],
      managerSelList: [],
      roleListArr: [],
      roleListCheckOptions: [],
      type: "",
      canEdit: "",
      isDtl: false,
      userId: "",
      form: {
        userName: undefined,
        department: undefined,
        userPost: undefined,
        userPhone: undefined,
        userAccount: undefined,
        status: undefined,
        userEmail: undefined,
        roleList: [],
        userPassword: undefined,
        managerId: undefined
      },
      rules: {
        userName: [{ required: true, message: "必填项", trigger: "blur" }],
        roleList: [
          { required: true, type: "array", message: "必填项", trigger: "blur" }
        ],
        department: [{ required: true, message: "必填项", trigger: "blur" }],
        userPost: [{ required: true, message: "必填项", trigger: "blur" }],
        userPhone: [{ required: true, message: "必填项", trigger: "blur" }],
        userAccount: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        userEmail: [{ required: true, message: "必填项", trigger: "blur" }],
        userPassword: [{ required: true, message: "必填项", trigger: "blur" }],
        managerId: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  created() {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.form.managerId = userInfo.managerId;
    this.getRoleList();
    this.getManagerSelList();
  },
  mounted() {
    this.userId = this.$route.query.userId;
    this.beforeRouter = this.$route.query.beforeRouter;
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.isDtl) {
      this.isDtl = JSON.parse(this.$route.query.isDtl);
    }
    if (this.canEdit) {
      this.type = "update";
      document.title = "修改系统用户";
      this.$route.meta.title = "修改系统用户";
    } else if (this.isDtl) {
      this.type = "check";
      document.title = "查看系统用户";
      this.$route.meta.title = "查看系统用户";
    } else {
      this.type = "add";
      document.title = "新增系统用户";
      this.$route.meta.title = "新增系统用户";
    }

    if (this.type === "update" || this.type === "check") {
      this.getDetail();
    }
  },
  methods: {
    async getManagerSelList() {
      let res = await managerSelList({});
      console.log(res);
      if (res.rtn == 1) {
        this.managerSelList = res.cusManageList;
      }
    },
    async getDetail() {
      this.loading = true;
      const res = await userManageDtl({
        userId: this.userId
      });
      if (res.rtn == 1) {
        this.loading = false;
        const result = res.result;
        const {
          userName,
          userPhone,
          userPost,
          userAccount,
          userEmail,
          status,
          department,
          roleList,
          managerId
        } = result;

        roleList.forEach((item, index) => {
          this.roleListCheckOptions.push(item.roleId);
        });
        this.managerSelList.some((item, index) => {});

        console.log(this.roleListCheckOptions);

        this.form.userName = userName;
        this.form.department = department;
        this.form.userPost = userPost;
        this.form.userPhone = userPhone;
        this.form.userAccount = userAccount;
        this.form.status = status;
        this.form.userEmail = userEmail;
        this.form.userId = this.userId;
        this.form.managerId = managerId;
        delete this.form.userPassword;
      }
    },
    async getRoleList() {
      const res = await roleList({
        pageNum: 1,
        pageSize: 100
      });
      if (res.rtn == 1) {
        this.roleListArr = res.result.roleList;
      }
    },
    onSubmit() {
      this.form.roleList = this.roleListCheckOptions;
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.isLoaded = true;
          this.form.roleList = this.form.roleList.map(item => ({
            roleId: item
          }));
          if (this.type === "add") {
            const res = await addUserManage({
              ...this.form
            });
            console.log(res);
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.resetForm();
            }
            this.isLoaded = false;
          } else {
            const res = await editUserManage({
              ...this.form
            });
            if (res.rtn == 1) {
              this.$message.success("修改成功");
              this.$router.push({ name: "SysUserManage" });
            }
            this.isLoaded = false;
          }
        }
      });
    },
    onCancel() {
      if (this.type === "add") {
        this.resetForm();
      } else {
        this.$router.push({ name: "SysUserManage" });
      }
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.roleListCheckOptions = [];
      this.form = {
        userName: undefined,
        department: undefined,
        userPost: undefined,
        userPhone: undefined,
        userAccount: undefined,
        status: undefined,
        userEmail: undefined,
        roleList: [],
        managerId: undefined,
        userPassword: undefined
      };
    },
    onBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  position: relative;
  .navigation-item {
    width: calc(100% + 120px);
    .el-input {
      width: calc(100% - 120px);
    }
    .el-button {
      width: 48px;
      margin-left: 8px;
    }
  }
  .addClassify-button {
    position: absolute;
    top: 32px;
    left: -56px;
  }
  .classify-item {
    padding-left: 82px;
    margin-top: 18px;
    position: relative;
    .classify-item-title {
      position: absolute;
      top: 0px;
      left: 0px;
      line-height: 32px;
      text-align: right;
      width: 74px;
      font-weight: 700;
      color: #666;
    }
    .avatar-uploader {
      margin-top: 8px;
    }
    .avatar-uploader >>> .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
    }
  }
}
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