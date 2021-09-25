<template>
  <div class="navbar" id="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <!-- <el-dropdown
        class="right-menu-item hover-effect"
        v-if="countPendingWorkflow && countPendingWorkflow.countAll"
        trigger="click"
      >
        <div class="auditTitle">
          待审批事项：{{ countPendingWorkflow.countAll }}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            divided
            v-if="countPendingWorkflow.propertyOwner > 0"
          >
            <div style="display: flex" @click="toDtl('propertyOwner')">
              <div>产权人：</div>
              <div>{{ countPendingWorkflow.propertyOwner }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            v-if="countPendingWorkflow.carDealersQuota > 0"
          >
            <div style="display: flex" @click="toDtl('carDealersQuota')">
              <div>车商额度：</div>
              <div>{{ countPendingWorkflow.carDealersQuota }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.car > 0">
            <div style="display: flex" @click="toDtl('car')">
              <div>车辆：</div>
              <div>{{ countPendingWorkflow.car }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.loan > 0">
            <div style="display: flex" @click="toDtl('loan')">
              <div>借款：</div>
              <div>{{ countPendingWorkflow.loan }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.quickLoan > 0">
            <div style="display: flex" @click="toDtl('quickLoan')">
              <div>快速借款：</div>
              <div>{{ countPendingWorkflow.quickLoan }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.repayment > 0">
            <div style="display: flex" @click="toDtl('repayment')">
              <div>线下还款：</div>
              <div>{{ countPendingWorkflow.repayment }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            v-if="countPendingWorkflow.inspectionPlan > 0"
          >
            <div style="display: flex" @click="toDtl('inspectionPlan')">
              <div>巡检计划：</div>
              <div>{{ countPendingWorkflow.inspectionPlan }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            v-if="countPendingWorkflow.exceptionDescription > 0"
          >
            <div style="display: flex" @click="toDtl('exceptionDescription')">
              <div>异常说明：</div>
              <div>{{ countPendingWorkflow.exceptionDescription }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            v-if="countPendingWorkflow.inspectionException > 0"
          >
            <div style="display: flex" @click="toDtl('inspectionException')">
              <div>巡检异常：</div>
              <div>{{ countPendingWorkflow.inspectionException }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.rebate > 0">
            <div style="display: flex" @click="toDtl('rebate')">
              <div>车商返利：</div>
              <div>{{ countPendingWorkflow.rebate }}</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="countPendingWorkflow.rebateChg > 0">
            <div style="display: flex" @click="toDtl('rebateChg')">
              <div>返利变动：</div>
              <div>{{ countPendingWorkflow.rebateChg }}</div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>-->
          <!-- <router-link to="/">
            <el-dropdown-item>工作台</el-dropdown-item>
          </router-link> -->
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided>
            <span style="display: block" @click="changePassword">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div style="line-height: 50px; float: right">
      <!-- <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
        style="display: inline-block"
      /> -->
      <div
        style="
          font-size: 14px;
          color: #1890ff;
          display: inline-block;
          margin: 0 10px 0 30px;
        "
      >
        {{ userInfo.userName }}
      </div>
    </div>
  </div>
</template>

<script>
import { roleList, delRole, editRoleStatus } from "@/api/systemManage";
// import { auditWaitList } from "@/api/dashboard";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import { loginOut } from "@/api/login";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
  },
  props: {
    // countPendingWorkflow: {
    //   type: Object,
    // },
  },
  data() {
    return {
      userInfo: {},
      // countPendingWorkflow: {},
      list: [],
      listQuery: {
        pageNum: 1,
        pageSize: 1000,
      },
      workflowTypeList: [
        {
          workflowType: "propertyOwner",
          workflowTypeText: "产权人",
        },
        {
          workflowType: "car",
          workflowTypeText: "车辆",
        },
        {
          workflowType: "carDealers",
          workflowTypeText: "车商",
        },
        {
          workflowType: "carDealersQuota",
          workflowTypeText: "车商额度",
        },
        {
          workflowType: "loan",
          workflowTypeText: "借款",
        },
        {
          workflowType: "quickLoan",
          workflowTypeText: "快速借款",
        },
        {
          workflowType: "repayment",
          workflowTypeText: "还款",
        },
        {
          workflowType: "inspectionPlan",
          workflowTypeText: "巡检计划",
        },
        {
          workflowType: "exceptionDescription",
          workflowTypeText: "异常记录",
        },
        {
          workflowType: "inspectionException",
          workflowTypeText: "巡检异常",
        },
        {
          workflowType: "rebate",
          workflowTypeText: "积分",
        },
        {
          workflowType: "rebateChg",
          workflowTypeText: "积分变动",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  created() {},
  mounted() {
    const userInfo = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userInfo);
    // this.auditWaitList();
  },
  watch: {
    countPendingWorkflow: {
      deep: true,
      handler(newVal, oldVal) {
        var val = newVal ? newVal : oldVal;
        this.countPendingWorkflow = val;
      },
    },
  },
  methods: {
    async getList() {
      let res = await roleList(this.listQuery);
      if (res.rtn == 1) {
        const userInfo = localStorage.getItem("userInfo");
        this.userInfo = JSON.parse(userInfo);
        this.list = res.result.roleList;
        this.total = res.result.total;
        this.list.some((item, index) => {
          if (item.roleId == this.userInfo.roleId) {
            console.log(item.roleId, this.userInfo.roleId);
            this.userInfo.roleName = item.roleName;
          }
        });
        // Just to simulate the time of the request
      }
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    changePassword() {
      this.$router.push("/editPsd");
    },
    async logout() {
      let res = await loginOut();
      if (res.rtn == 1) {
        const h = this.$createElement;
        this.$notify({
          duration: 1000,
          message: h("i", "退出登录成功"),
          position: "bottom-right",
        });
        await this.$store.dispatch("user/logout");
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    },
    // async auditWaitList() {
    //   let res = await auditWaitList();
    //   if (res.rtn == 1) {
    //     this.countPendingWorkflow = res.countPendingWorkflow;
    //   }
    // },
    toDtl(dtlRoute) {
      var dtlRouteName;
      if (dtlRoute == "propertyOwner") {
        dtlRouteName = "WorkflowList_1_manage";
      } else if (dtlRoute == "car") {
        dtlRouteName = "WorkflowList_2_manage";
      } else if (dtlRoute == "carDealersQuota") {
        dtlRouteName = "WorkflowList_4_manage";
      } else if (dtlRoute == "loan") {
        dtlRouteName = "WorkflowList_5_manage";
      } else if (dtlRoute == "repayment") {
        dtlRouteName = "WorkflowList_6_manage";
      } else if (dtlRoute == "inspectionPlan") {
        dtlRouteName = "WorkflowList_7_manage";
      } else if (dtlRoute == "exceptionDescription") {
        dtlRouteName = "WorkflowList_8_manage";
      } else if (dtlRoute == "inspectionException") {
        dtlRouteName = "WorkflowList_9_manage";
      } else if (dtlRoute == "rebate") {
        dtlRouteName = "WorkflowList_10_manage";
      } else if (dtlRoute == "rebateChg") {
        dtlRouteName = "WorkflowList_11_manage";
      } else if (dtlRoute == "quickLoan") {
        dtlRouteName = "WorkflowList_12_manage";
      }
      this.$router.push({
        name: dtlRouteName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .auditTitle {
    font-size: 14px;
    color: rgb(24, 144, 255);
    display: inline-block;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
