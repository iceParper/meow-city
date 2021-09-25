<template>
  <div class="app-container">
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size: 16px">{{ title }}</span>
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
      :model="form"
      label-position="top"
      label-width="120px"
      v-loading="listLoading"
      :rules="rules"
      style="width: calc(100% - 240px); margin-left: 240px"
    >
      <div v-for="(item, index) in form.workflowList" :key="index">
        <el-form-item :label="item.lab">
          <div
            v-for="(val, idx) in item.workflowInfo"
            :key="idx"
            style="margin-bottom: 15px; display: flex; align-items: flex-start"
          >
            <span style="color: #999">[&nbsp;{{ val.type }}&nbsp;]</span
            >&nbsp;&nbsp;
            <el-button style="margin-right: 10px"
              >节点{{ val.nodeId }}</el-button
            >&nbsp;
            <div style="width: 260px; display: inline-block">
              <div v-for="(v, i) in val.roleIdArr" :key="i">
                <el-select
                  v-model="v.roleId"
                  filterable
                  placeholder="角色名称"
                  style="width: 200px; margin-bottom: 10px"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  >
                  </el-option>
                </el-select>
                <el-button
                  icon="el-icon-delete"
                  @click="del_Role(index, idx, i, '并行')"
                ></el-button>
              </div>
              <el-button
                icon="el-icon-add"
                v-if="val.type == '并行'"
                @click="add_Role(index, idx, '并行')"
                style="margin-top: 10px"
                >增加角色</el-button
              >
            </div>

            <el-button
              icon="el-icon-add"
              v-if="idx == item.workflowInfo.length - 1"
              @click="add_Node(index, idx, '串行')"
              >增加串行节点</el-button
            >
            <el-button
              icon="el-icon-add"
              v-else
              @click="add_Node(index, idx, '串行')"
              >插入串行节点</el-button
            >
            <el-button
              icon="el-icon-add"
              v-if="idx == item.workflowInfo.length - 1"
              @click="add_Node(index, idx, '并行')"
              >增加并行节点</el-button
            >
            <el-button
              icon="el-icon-add"
              v-else
              @click="add_Node(index, idx, '并行')"
              >插入并行节点</el-button
            >
            <el-button
              icon="el-icon-delete"
              @click="del_Node(index, idx)"
              v-if="item.workflowInfo.length > 1"
              >删除</el-button
            >
          </div>
        </el-form-item>
      </div>

      <el-form-item align="center" style="padding-top: 20px">
        <el-button
          type="primary"
          @click="onSubmit"
          style="margin-left: -240px; margin-right: 20px"
          >确定</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { roleListQuery } from "@/api/systemManage";
import { setWorkflow, companyDtl } from "@/api/branchCoManage";
export default {
  name: "BranchCoWorkflowEditManage",
  data() {
    return {
      listLoading: false,
      title: "修改分公司审批流程",
      roleOptions: [],
      roleList: [],
      workflowList: [],
      companyId: undefined,
      form: {
        workflowList: [
          {
            workflowType: "propertyOwner",
            lab: "产权人",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "car",
            lab: "车辆",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          // {
          //   workflowType: "carDealers",
          //   lab: "车商",
          //   workflowInfo: [
          //     {
          //       roleIdArr: [
          //         {
          //           roleId: undefined,
          //         },
          //       ],
          //       nodeId: 1,
          //       type: "串行",
          //     },
          //   ],
          // },
          {
            workflowType: "carDealersQuota",
            lab: "车商额度",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "loan",
            lab: "借款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "quickLoan",
            lab: "快速借款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "repayment",
            lab: "线下还款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "inspectionPlan",
            lab: "巡检计划",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "exceptionDescription",
            lab: "异常说明",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "inspectionException",
            lab: "巡检异常",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "rebate",
            lab: "车商积分",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "rebateChg",
            lab: "车商积分调整",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
        ],
      },
      rules: {
        workflowList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getRoleList();
  },
  mounted() {
    this.companyId = this.$route.query.companyId;
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getCompanyDtl();
  },

  methods: {
    onCancel() {
      this.onBack();
    },
    onBack() {
      this.$router.back(-1);
    },
    async getRoleList() {
      let res = await roleListQuery({});
      if (res.rtn == 1) {
        this.roleList = res.roleList;
      }
    },
    async _getCompanyDtl() {
      let res = await companyDtl({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.workflowList = res.result.workflowList;
        this.workflowList.forEach((item, index) => {
          item.workflowInfo = [];
          item.nodeList.forEach((val, idx) => {
            let workflowInfoChild = {};
            workflowInfoChild.nodeId = val.node;
            workflowInfoChild.roleIdArr = val.roleList;
            item.workflowInfo.push(workflowInfoChild);
          });
        });

        var workflowListCopy = JSON.parse(JSON.stringify(this.workflowList));
        workflowListCopy.forEach((item, index) => {
          delete item.nodeList;
        });
        this.workflowList = workflowListCopy;
        this.workflowList.forEach((item, index) => {
          this.form.workflowList.forEach((val, idx) => {
            if (item.workflowType == val.workflowType) {
              val.hasItem = true;
            }
          });

          if (item.workflowType == "propertyOwner") {
            item.lab = "产权人";
          } else if (item.workflowType == "car") {
            item.lab = "车辆";
          } else if (item.workflowType == "carDealers") {
            item.lab = "车商";
          } else if (item.workflowType == "carDealersQuota") {
            item.lab = "车商额度";
          } else if (item.workflowType == "loan") {
            item.lab = "借款";
          } else if (item.workflowType == "quickLoan") {
            item.lab = "快速借款";
          } else if (item.workflowType == "repayment") {
            item.lab = "线下还款";
          } else if (item.workflowType == "inspectionPlan") {
            item.lab = "巡检计划";
          } else if (item.workflowType == "exceptionDescription") {
            item.lab = "异常说明";
          } else if (item.workflowType == "inspectionException") {
            item.lab = "巡检异常";
          } else if (item.workflowType == "rebate") {
            item.lab = "车商积分";
          } else if (item.workflowType == "rebateChg") {
            item.lab = "车商积分调整";
          }
          item.workflowInfo.forEach((val, idx) => {
            if (val.roleIdArr.length == 1) {
              val.type = "串行";
            } else {
              val.type = "并行";
            }
            val.roleIdArr.forEach((v, i) => {
              delete v.roleName;
            });
          });
        });
      }

      var newWorkflowList = [];
      this.form.workflowList.forEach((item, index) => {
        if (!item.hasItem) {
          newWorkflowList.push(item);
        }
      });
      this.form.workflowList = newWorkflowList.concat(this.workflowList);
    },
    async onSubmit() {
      var _this = this;
      const form = { ...this.form };
      const submitForm = JSON.parse(JSON.stringify(form));
      var workflowList = [];
      form.workflowList.forEach((item, index) => {
        item.workflowInfo.forEach((val, idx) => {
          val.roleIdArr.some((v, i) => {
            if (!v.roleId) {
              _this.isTips = true;
            }
          });
        });
      });

      form.workflowList.forEach((item, index) => {
        item.workflowInfo.forEach((val, idx) => {
          for (var i = 0; i < val.roleIdArr.length; i++) {
            for (var j = i + 1; j < val.roleIdArr.length; j++) {
              if (val.roleIdArr[i].roleId == val.roleIdArr[j].roleId) {
                _this.isTips1 = true;
                _this.lab = item.lab;
              }
            }
          }
        });
      });

      form.workflowList.forEach((item, index) => {
        item.workflowInfo.some((val, idx) => {
          if (val.type == "并行" && val.roleIdArr.length <= 1) {
            _this.isTips2 = true;
            _this.lab = item.lab;
          }
        });
      });

      if (_this.isTips) {
        this.$message.warning("请检查表单信息，确保信息完整录入");
        _this.isTips = false;
        return false;
      }

      if (_this.isTips1) {
        const tips1Text =
          "请检查表单信息，" + _this.lab + "审批类型下并行节点包含相同角色";
        this.$message.warning(tips1Text);
        _this.isTips1 = false;
        return false;
      }

      if (_this.isTips2) {
        const tips2Text =
          "请检查表单信息，" + _this.lab + "审批类型下并行节点只含单一角色";
        this.$message.warning(tips2Text);
        _this.isTips2 = false;
        return false;
      }

      submitForm.workflowList.forEach((item, index) => {
        item.workflowInfo.forEach((val, idx) => {
          val.roleIdArr.forEach((v, i) => {
            var workflowJson = {};
            workflowJson.nodeNo = val.nodeId;
            workflowJson.workflowType = item.workflowType;
            workflowJson.roleId = v.roleId;
            workflowList.push(workflowJson);
          });
        });
      });

      this.listLoading = true;

      let res = await setWorkflow({
        companyId: this.companyId,
        workflowList,
      });

      if (res.rtn == 1) {
        this.$message.success("修改成功");
        this.onBack();
      }

      this.listLoading = false;
    },
    resetForm() {
      this.form = {
        workflowList: [
          {
            workflowType: "propertyOwner",
            lab: "产权人",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "car",
            lab: "车辆",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          // {
          //   workflowType: "carDealers",
          //   lab: "车商",
          //   workflowInfo: [
          //     {
          //       roleIdArr: [
          //         {
          //           roleId: undefined,
          //         },
          //       ],
          //       nodeId: 1,
          //       type: "串行",
          //     },
          //   ],
          // },
          {
            workflowType: "carDealersQuota",
            lab: "车商额度",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "loan",
            lab: "借款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "quickLoan",
            lab: "快速借款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "quickLoan",
            lab: "快速借款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "repayment",
            lab: "线下还款",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "inspectionPlan",
            lab: "巡检计划",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "exceptionDescription",
            lab: "异常说明",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "inspectionException",
            lab: "巡检异常",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "rebate",
            lab: "车商积分",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
          {
            workflowType: "rebateChg",
            lab: "车商积分调整",
            workflowInfo: [
              {
                roleIdArr: [
                  {
                    roleId: undefined,
                  },
                ],
                nodeId: 1,
                type: "串行",
              },
            ],
          },
        ],
      };
    },
    add_Node(index, idx, type) {
      var currentWorkflowInfo = this.form.workflowList[index].workflowInfo;
      var nextWorkflowInfo = JSON.parse(
        JSON.stringify(currentWorkflowInfo[currentWorkflowInfo.length - 1])
      );

      nextWorkflowInfo.roleIdArr = [
        {
          roleId: undefined,
        },
      ];
      nextWorkflowInfo.nodeId = 1;
      nextWorkflowInfo.type = type;
      nextWorkflowInfo.isAddRole = false;
      this.form.workflowList[index].workflowInfo.splice(
        idx + 1,
        0,
        nextWorkflowInfo
      );
      this.form.workflowList[index].workflowInfo.forEach((v, i) => {
        v.nodeId = i + 1;
      });
    },
    del_Node(index, idx) {
      this.form.workflowList[index].workflowInfo.splice(idx, 1);
      this.form.workflowList[index].workflowInfo.forEach((v, i) => {
        v.nodeId = i + 1;
      });
    },
    add_Role(index, idx, type) {
      var currentWorkflowInfo = this.form.workflowList[index].workflowInfo;
      currentWorkflowInfo[idx].roleIdArr.push({
        roleId: undefined,
      });
    },
    del_Role(index, idx, i, type) {
      var currentWorkflowInfo = this.form.workflowList[index].workflowInfo;
      if (currentWorkflowInfo[idx].roleIdArr.length > 1) {
        currentWorkflowInfo[idx].roleIdArr.splice(i, 1);
      } else {
        this.$message.warning("至少需要一个角色");
      }
    },
    attrOnly(array, attr) {
      var first;
      if (array.length > 0) {
        //获取第一个元素的对应的属性
        first = array[0][attr];
        //都跟第一个元素做比对，只要有一个不对应，那说明不是唯一属性值了
        return array.every(function (item) {
          return item[attr] == first;
        });
      }
      //如果数组没数据时该返回啥，这个你自己定
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
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
.sku-block {
  margin-bottom: 8px;
  .sku-block-formEle {
    margin-right: 8px;
  }
  .sku-block-inputs {
    display: flex;
    flex-wrap: wrap;
    .sku-block-formEle {
      margin-top: 8px;
    }
  }
  .avatar-uploader {
    margin-top: 8px;
    .avatar {
      width: 120px;
      height: 120px;
    }
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
.addPriceStyle.el-input-group--append /deep/ .el-input__inner {
  color: crimson;
}
</style>

<style>
