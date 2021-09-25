<template>
  <div class="app-container">
    <!-- <el-card class="box-card"> -->
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size: 16px" v-if="canEdit">修改用户信息</span>
        <span style="font-size: 16px" v-else-if="isDtl">查看用户信息</span>
        <span style="font-size: 16px" v-else>新增用户信息</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: 14px"
          type="text"
          @click="onBack"
          >返回</el-button
        >
      </div>
    </div>

    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="right"
      label-width="120px"
      v-loading="loading"
      style="width: calc(100% - 600px); margin-left: 240px"
    >
      <el-form-item label="上传头像" prop="headImageUrl">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          list-type="picture-card"
          :show-file-list="false"
          :headers="headers"
          :data="fileData"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
          :on-success="picUploadSuccess"
        >
          <img
            v-if="form.headImageUrl"
            :src="form.headImageUrl"
            class="el-upload-list__item-thumbnail"
            style="width: 100%; height: 100%"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="入职时间" prop="entryAt">
        <el-date-picker
          v-model="form.entryAt"
          type="date"
          placeholder="选择日期"
          :disabled="isDtl"
          style="width: 200px"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select
          v-model="form.userType"
          :disabled="isDtl"
          style="width: 200px"
          placeholder="用户类型"
        >
          <el-option
            v-for="item in userTypeOptions"
            :key="item.key"
            :label="item.lab"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属店铺" prop="storeNo" v-if="form.userType == 2">
        <el-select
          v-model="form.storeNo"
          :disabled="isDtl"
          style="width: 200px"
          placeholder="所属店铺"
        >
          <el-option
            v-for="item in shopListOpt"
            :key="item.storeId"
            :label="item.storeName"
            :value="item.storeNo"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职员姓名" prop="userName">
        <el-input
          v-model="form.userName"
          :disabled="isDtl"
          clearable
          :maxlength="16"
        />
      </el-form-item>
      <el-form-item label="电话号码/账号" prop="userPhone">
        <el-input
          v-model="form.userPhone"
          :disabled="isDtl"
          clearable
          :maxlength="11"
        />
      </el-form-item>
      <el-form-item label="密码设置" prop="userPassword" v-if="type === 'add'">
        <el-input
          v-model="form.userPassword"
          clearable
          :disabled="isDtl"
          :maxlength="16"
        />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleId">
        <el-select
          v-model="form.roleId"
          :disabled="isDtl"
          style="width: 200px"
          placeholder="角色"
        >
          <el-option
            v-for="item in roleListArr"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型" prop="status">
        <el-select
          v-model="form.status"
          :disabled="isDtl"
          style="width: 200px"
          placeholder="用户类型"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.key"
            :label="item.lab"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item align="center" v-if="!isDtl">
        <el-button
          type="primary"
          :loading="isLoaded"
          @click="onSubmit"
          style="margin-right: 20px"
          >确定</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  roleListQuery,
  addUserManage,
  userManageDtl,
  editUserManage,
} from "@/api/systemManage";
import { shopSelList } from "@/api/userManage";
import { uploadUrl } from "@/api/upload";
import user from "../../store/modules/user";
import role from "../../../mock/role";
import { formatDate } from "@/utils/index";

// import { managerSelList } from "@/api/managerManage";

export default {
  name: "SysAddUserManage",
  data() {
    return {
      loading: false,
      isLoaded: false,
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "停用", value: 2 },
      ],
      userTypeOptions: [
        { key: 1, lab: "总公司", value: 1 },
        { key: 2, lab: "分公司", value: 2 },
      ],
      uploadUrl,
      headers: {},
      fileData: {
        fileType: "head",
      },
      managerSelList: [],
      roleListArr: [],
      roleListCheckOptions: [],
      type: "",
      canEdit: "",
      isDtl: false,
      userId: "",
      shopListOpt: [],
      form: {
        headImageUrl: undefined,
        userName: undefined,
        userPost: undefined,
        userPhone: undefined,
        status: undefined,
        // roleList: [],
        roleId: undefined,
        userPassword: undefined,
        userType: 1,
        storeNo: undefined,
        entryAt: undefined,
      },
      rules: {
        headImageUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        storeNo: [{ required: true, message: "必填项", trigger: "blur" }],
        entryAt: [{ required: true, message: "必填项", trigger: "blur" }],
        userName: [{ required: true, message: "必填项", trigger: "blur" }],
        // roleList: [
        //   { required: true, type: "array", message: "必填项", trigger: "blur" }
        // ],
        roleId: [{ required: true, message: "必填项", trigger: "blur" }],
        userPost: [{ required: true, message: "必填项", trigger: "blur" }],
        userPhone: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        userPassword: [{ required: true, message: "必填项", trigger: "blur" }],
        userType: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },
  created() {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.form.managerId = userInfo.managerId;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };

    this.getRoleList(this.form.userType);
    this.getShopSelList();
    // this.getManagerSelList();
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
    // async getManagerSelList() {
    //   let res = await managerSelList({});
    //   console.log(res);
    //   if (res.rtn == 1) {
    //     this.managerSelList = res.cusManageList;
    //   }
    // },
    async getDetail() {
      this.loading = true;
      const res = await userManageDtl({
        userId: this.userId,
      });
      if (res.rtn == 1) {
        this.loading = false;
        const result = res.result;
        const {
          userName,
          userPhone,
          userPost,
          status,
          roleId,
          userType,
          entryAt,
          headImageUrl,
        } = result;

        this.getRoleList(userType);

        // roleList.forEach((item, index) => {
        //   this.roleListCheckOptions.push(item.roleId);
        // });
        // this.managerSelList.some((item, index) => {});

        // console.log(this.roleListCheckOptions);
        this.form.headImageUrl = headImageUrl;
        this.form.userName = userName;
        this.form.userPost = userPost;
        this.form.userPhone = userPhone;
        this.form.status = status;
        this.form.userId = this.userId;
        this.form.userType = userType;
        this.form.entryAt = entryAt;
        this.form.roleId = roleId;
        delete this.form.userPassword;
      }
    },
    async getRoleList(userType) {
      const res = await roleListQuery({
        roleType: userType,
      });
      if (res.rtn == 1) {
        this.roleListArr = res.roleList;
      }
    },
    async getShopSelList() {
      const res = await shopSelList({});
      if (res.rtn == 1) {
        this.shopListOpt = res.SelectiveStoreList;
      }
    },
    roleListChange(roleType) {
      this.form.roleId = undefined;
      this.getRoleList(roleType);
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.form.headImageUrl = res.url;
      }
    },
    onSubmit() {
      //   this.form.roleList = this.roleListCheckOptions;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.isLoaded = true;
          //   this.form.roleList = this.form.roleList.map(item => ({
          //     roleId: item
          //   }));
          this.form.entryAt = formatDate(this.form.entryAt);
          if (this.type === "add") {
            const res = await addUserManage({
              ...this.form,
            });
            console.log(res);
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.resetForm();
            }
            this.isLoaded = false;
          } else {
            const res = await editUserManage({
              ...this.form,
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
        headImageUrl: undefined,
        userName: undefined,
        userPost: undefined,
        userPhone: undefined,
        status: undefined,
        roleId: undefined,
        userPassword: undefined,
        userType: 1,
        entryAt: undefined,
      };
    },
    onBack() {
      this.$router.back(-1);
    },
  },
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