<template>
  <div class="app-container">
    <!-- <el-card class="box-card"> -->
    <div class="header" style="text-align: right">
      <!-- <span class="headLab">{{ title }}</span> -->
      <el-button
        style="font-size: 14px; padding: 3px 0; line-height: 30px"
        type="text"
        @click="onBack"
        >返回</el-button
      >
    </div>
    <div class="wrap">
      <div class="header">
        <div class="clearfix headLab">
          <span style="font-size: 16px" v-if="canEdit">修改角色信息</span>
          <span style="font-size: 16px" v-else-if="isDtl">查看详情</span>
          <span style="font-size: 16px" v-else>新增角色信息</span>
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
        <el-form-item label="角色名称" v-if="isDtl">
          <div>{{ form.roleName }}</div>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName" v-else>
          <el-input
            placeholder="请输入角色名称"
            v-model="form.roleName"
            :maxlength="16"
            clearable
            :disabled="isDtl"
          />
        </el-form-item>

        <el-form-item label="描述" v-if="isDtl">
          <div>{{ form.description }}</div>
        </el-form-item>
        <el-form-item label="描述" prop="description" v-else>
          <el-input
            placeholder="请输入内容"
            v-model="form.description"
            :disabled="isDtl"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色类型" v-if="isDtl">
          <div>{{ form.roleType == 1 ? "总公司" : "分公司" }}</div>
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType" v-else>
          <el-radio
            v-model="form.roleType"
            label="1"
            :disabled="type == 'update'"
            @change="radioChange(1)"
            >总公司</el-radio
          >
          <el-radio
            v-model="form.roleType"
            label="2"
            :disabled="type == 'update'"
            @change="radioChange(2)"
            >分公司</el-radio
          >
        </el-form-item>
        <el-form-item label="权限树" v-if="isDtl">
          <el-tree
            ref="tree"
            :data="permissionTree"
            node-key="permissionId"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>

        <el-form-item label="权限树" prop="permissionList" v-else>
          <el-tree
            ref="tree"
            :data="permissionTree"
            show-checkbox
            node-key="permissionId"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" v-if="isDtl">
          <div>{{ form.status == 1 ? "启用" : "冻结" }}</div>
        </el-form-item>
        <el-form-item label="状态" prop="status" v-else>
          <el-switch
            v-model="form.status"
            active-color="#E29836"
            inactive-color="#F26161"
            active-value="1"
            inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="创建时间" v-if="isDtl">
          <div>{{ roleDtl.createAt }}</div>
        </el-form-item>
        <el-form-item label="修改时间" v-if="roleDtl.updateAt">
          <div>{{ roleDtl.updateAt }}</div>
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
    </div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  rolePermissionTree,
  addRole,
  roleManageDtl,
  editRole,
} from "@/api/systemManage";
import permission from "../../directive/permission/permission";

export default {
  name: "SysRoleAddManage",
  data() {
    return {
      loading: false,
      isLoaded: false,
      roleId: "",
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "停用", value: 2 },
      ],
      defaultProps: {
        children: "children",
        label: "permissionName",
      },
      roleDtl: {},
      roleListArr: [],
      roleListCheckOptions: [],
      permissionTree: [],
      type: "",
      canEdit: "",
      isDtl: false,
      userId: "",
      form: {
        roleName: "",
        permissionList: [],
        description: "",
        status: "1",
        roleType: "1",
      },
      rules: {
        roleName: [{ required: true, message: "必填项", trigger: "blur" }],
        permissionList: [
          { required: true, type: "array", message: "必填项", trigger: "blur" },
        ],
        description: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        roleType: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.roleId = this.$route.query.roleId;
    this.beforeRouter = this.$route.query.beforeRouter;
    console.log(this.$route.query.canEdit, "===");
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.isDtl) {
      this.isDtl = JSON.parse(this.$route.query.isDtl);
    }

    if (this.canEdit) {
      console.log("canEdit");
      this.type = "update";
      document.title = "修改角色";
      this.$route.meta.title = "修改角色";
    } else if (this.isDtl) {
      this.type = "check";
      document.title = "查看详情";
      this.$route.meta.title = "查看详情";
    } else {
      this.type = "add";
      document.title = "新增角色";
      this.$route.meta.title = "新增角色";
    }
    if (this.type === "add") {
      this.getPermissionTree(this.form.roleType);
    }
    if (this.type === "update" || this.type === "check") {
      this.getDtl();
    }
  },
  methods: {
    async getPermissionTree(roleType) {
      const res = await rolePermissionTree({
        roleType,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.permissionTree = res.permissionSelectionQuery;
      }
    },
    async getDtl() {
      this.loading = true;
      const res = await roleManageDtl({
        roleId: this.roleId,
      });

      if (res.rtn == 1) {
        const result = res.result;
        let permissionArr = [];

        const {
          roleName,
          description,
          status,
          permissionTree,
          roleType,
          createAt,
          updateAt,
        } = result;
        this.getPermissionTree(roleType);
        this.permissionTreeCount(permissionTree, permissionArr);
        this.roleDtl = {
          createAt,
          updateAt,
        };
        this.form = {
          roleName,
          description,
          status,
          permissionList: permissionArr,
          roleId: this.roleId,
          roleType,
        };

        this.form.roleType = this.form.roleType.toString();
        this.form.status = this.form.status.toString();
        this.setDefaultChecked(permissionArr);
      }
      this.loading = false;
    },

    onSubmit() {
      this.form.permissionList = this.$refs.tree.getCheckedKeys();
      if (
        this.$refs.tree.getHalfCheckedKeys() &&
        this.$refs.tree.getHalfCheckedKeys().length > 0
      ) {
        this.form.permissionList = this.form.permissionList.concat(
          this.$refs.tree.getHalfCheckedKeys()
        );
      }

      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.form.permissionList = this.form.permissionList.map((item) => ({
            permissionId: item,
          }));
          if (this.type == "update") {
            delete this.form.roleType;
          }
          this.isLoaded = true;
          if (this.type === "add") {
            const res = await addRole({
              ...this.form,
            });
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.onBack();
            }
            this.isLoaded = false;
          } else {
            const res = await editRole({
              ...this.form,
            });
            if (res.rtn == 1) {
              this.$message.success("修改成功");
              this.onBack();
            } else {
              this.getDtl();
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
        this.onBack();
      }
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.form = {
        roleName: "",
        permissionList: [],
        description: "",
        roleType: "1",
        status: "1",
      };
      this.setDefaultChecked([]);
    },
    setDefaultChecked(checkedArr) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(checkedArr); // CheckedArr 一个选中的数组element Ui的东西，关键是看$nextTick的用法
      });
    },
    permissionTreeCount(permissionItem, permissionArr) {
      permissionItem.forEach((item, index) => {
        if (item.children && item.children.length > 0) {
          item.children.forEach((val, idx) => {
            if (val.children && val.children.length > 0) {
              val.children.forEach((v, i) => {
                if (v.selected == 1) {
                  permissionArr.push(v.permissionId);
                }
              });
            } else {
              if (val.selected == 1) {
                permissionArr.push(val.permissionId);
              }
            }
          });
        } else {
          if (item.selected == 1) {
            permissionArr.push(item.permissionId);
          }
        }
      });
    },
    radioChange(roleType) {
      this.permissionList = [];
      this.getPermissionTree(this.form.roleType);
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
.wrap {
  position: relative;
  border: 1px solid rgba(242, 171, 11, 100);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 50px;
}
.wrap .header {
  top: -20px;
  left: 20px;
  padding: 0 20px;
  color: #fff;
  position: absolute;
  border-radius: 8px;
  background-color: rgba(242, 171, 11, 100);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 100);
}
// .wrap .header::after {
//   position: absolute;
//   top: 0;
//   left: 100%;
//   content: "";
//   width: 0;
//   height: 0;
//   background: transparent;
//   border-top: 18px solid transparent;
//   border-left: 50px solid #3f7efc;
//   border-bottom: 18px solid transparent;
// }
.wrap .header span {
  font-size: 16px;
  color: #fff;
  line-height: 36px;
}
</style>