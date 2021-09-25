<template>
  <div class="app-container">
    <!-- <el-card class="box-card"> -->
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size:16px;" v-if="canEdit">修改角色信息</span>
        <span style="font-size:16px;" v-else-if="isDtl">查看详情</span>
        <span style="font-size:16px;" v-else>新增角色信息</span>
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
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" :maxlength="16" :disabled="isDtl" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="form.description"
          :disabled="isDtl"
        ></el-input>
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

      <el-form-item label="权限树" prop="permissionList">
        <el-tree
          ref="tree"
          :data="permissionTree"
          show-checkbox
          node-key="permissionId"
          :props="defaultProps"
        ></el-tree>
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
  rolePermissionTree,
  addRole,
  roleManageDtl,
  editRole
} from "@/api/sysManage";
import permission from "../../directive/permission/permission";

export default {
  name: "SysAddRoleManage",
  data() {
    return {
      loading: false,
      isLoaded: false,
      roleId: "",
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "停用", value: 2 }
      ],
      defaultProps: {
        children: "children",
        label: "permissionName"
      },
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
        status: ""
      },
      rules: {
        roleName: [{ required: true, message: "必填项", trigger: "blur" }],
        permissionList: [
          { required: true, type: "array", message: "必填项", trigger: "blur" }
        ],
        description: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getPermissionTree();
  },
  mounted() {
    this.roleId = this.$route.query.roleId;
    this.beforeRouter = this.$route.query.beforeRouter;
    console.log(this.$route.query.canEdit,'==='); 
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.isDtl) {
      this.isDtl = JSON.parse(this.$route.query.isDtl);
    }
    if (this.canEdit) {
      console.log('canEdit');
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

    if (this.type === "update" || this.type === "check") {
      this.getDetail();
    }
  },
  methods: {
    async getPermissionTree() {
      const res = await rolePermissionTree({});
      console.log(res);
      if (res.rtn == 1) {
        this.permissionTree = res.permissionTree;
      }
    },
    async getDetail() {
      this.loading = true;
      const res = await roleManageDtl({
        roleId: this.roleId
      });

      if (res.rtn == 1) {
        const result = res.result;
        let permissionArr = [];

        const { roleName, description, status, permissionTree } = result;

        this.permissionTreeCount(permissionTree, permissionArr);
        this.form = {
          roleName,
          description,
          status,
          permissionList: permissionArr,
          roleId: this.roleId
        };
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

      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.form.permissionList = this.form.permissionList.map(item => ({
            permissionId: item
          }));
          this.isLoaded = true;
          if (this.type === "add") {
            const res = await addRole({
              ...this.form
            });
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.resetForm();
            }
            this.isLoaded = false;
          } else {
            const res = await editRole({
              ...this.form
            });
            if (res.rtn == 1) {
              this.$message.success("修改成功");
              this.$router.push({ name: "SysRoleManage" });
            }
          }
        }
      });
    },
    onCancel() {
      if (this.type === "add") {
        this.resetForm();
      } else {
        this.$router.push({ name: "SysRoleManage" });
      }
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.form = {
        roleName: "",
        permissionList: [],
        description: ""
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
        item.children.forEach((val, idx) => {
          val.children.forEach((v, i) => {
            if (v.selected == 1) {
              permissionArr.push(v.permissionId);
            }
          });
        });
      });
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