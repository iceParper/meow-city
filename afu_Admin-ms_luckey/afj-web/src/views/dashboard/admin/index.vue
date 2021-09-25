<template>
  <div class="wrap" id="dashboard">
    <div
      class="header"
      style="justify-content:storeName ? 'space-between' : 'flex-end'"
    >
      <div class="storeName">
        {{ storeName }}
      </div>
      <div class="localInfo">
        <!-- <div class="addr">开化</div>
        <div class="weather">27°</div> -->
        <div class="date">{{ nowTime }}</div>
      </div>
    </div>
    <div class="content">
      <div class="content__item" v-if="isSwitch">
        <div class="logoWrap">
          <img :src="logo" alt="" />
        </div>
        <div class="searchBar">
          <div class="search">
            <i class="el-icon-search searchIcon"></i>
            <input
              placeholder="搜索手机号码或奖品条形码"
              type="text"
              ref="searchVal"
              class="searchVal"
              @input="_search(true)"
            />
          </div>
          <div class="searchBtn" @click="_search(false)">查看奖品</div>
        </div>
      </div>
      <div class="content__item" v-else>
        <div class="QrCodeWrap">
          <div class="QrCodeLeft">
            <img :src="qrCode_left_cat" alt="" />
          </div>
          <div class="QrCode">
            <div
              class="miniPao_left"
              style="
                z-index: 1000;
                font-size: 14px;
                text-align: center;
                padding-left: 20px;
              "
            >
              <div style="padding-bottom: 6px">请扫码兑奖</div>
              <div style="padding-bottom: 20px">喵~</div>
            </div>
            <!-- <div
            class="miniPao_right"
            style="
              z-index: 1000;
              font-size: 14px;
              text-align: center;
              padding-left: 5px;
            "
          >
            <div style="padding-bottom: 6px">回车可刷新</div>
            <div style="padding-bottom: 40px">兑奖码哟~</div>
          </div> -->
            <!-- <div
            class="pao_left"
            style="
              z-index: 1000;
              font-size: 14px;
              text-align: center;
              padding-left: 5px;
            "
          >
            <div style="padding-left: 20px">
              <div style="padding-bottom: 6px">恭喜</div>
              <div style="padding-bottom: 6px; color: #ff0000">123****8888</div>
              <div style="padding-bottom: 6px">获得</div>
              <div class="pao_left_awarInfo">
                <div class="awardLevel">一等奖</div>
                <div class="awardName">喵市红包199元</div>
              </div>
              <div style="padding-bottom: 68px">喵~</div>
            </div>
          </div> -->
            <!-- <div
            class="pao_right"
            style="
              z-index: 1000;
              font-size: 14px;
              text-align: center;
              padding-top: 50px;
              padding-right: 20px;
            "
          >
            <div style="padding-left: 20px">
              <div style="padding-bottom: 6px">喵市会员</div>
              <div
                style="
                  padding-bottom: 6px;
                  color: #ff0000;
                  font-size: 24px;
                  text-align: center;
                  font-family: SourceHanSansSC-bold;
                  line-height:30px;
                "
              >
                123****8888
              </div>
              <div style="padding-bottom: 6px">正在兑奖</div>
              <div style="padding-bottom: 6px;color: rgba(228, 164, 152, 100);font-size:18px;line-height:24px;">请~排~队~等~待</div>

              <div style="padding-bottom: 0">喵~</div>
            </div>
          </div> -->
            <!-- <img class="pao_left" :src="pao_left" alt="" /> -->
            <!-- <img class="pao_right" :src="pao_right" alt="" /> -->
            <img class="miniPao_left" :src="miniPao_left" alt="" />
            <!-- <img class="miniPao_right" :src="miniPao_right" alt="" /> -->
            <img
              class="qrCodePic"
              :src="qrCodePicUrl ? qrCodePicUrl : qrCode"
              alt=""
            />
            <!-- <div class="qrCodePic qrCodePicShade"></div> -->
          </div>
          <div class="QrCodeRight">
            <img :src="qrCode_right_cat" alt="" />
          </div>
        </div>
        <div class="giftNumBar">
          <div class="giftNumBar__left">喵市王国开化店已累计送出</div>
          <div
            class="giftNum"
            v-for="(item, index) in storeInfo.accumulativeWriteoffNum"
            :key="index"
          >
            {{ item }}
          </div>
          <div class="giftNumBar__right">份奖品</div>
        </div>
      </div>

      <div class="lists">
        <div class="activityList">
          <div v-if="actList.length > 0">
            <div class="activityList__tit">今日活动</div>
            <div class="activityList__inner">
              <div
                :class="[
                  'activityItem',
                  actList.length > 0 ? 'activityItem1' : '',
                ]"
                v-for="(item, index) in actList"
                :key="index"
              >
                <img class="activityItem__icon" :src="todayACtImg" />
                <div class="activityItem__phone">
                  {{ item.phone || "喵市新用户" }}
                </div>
                <div>于</div>
                <div class="activityItem__time">{{ item.winAt }}</div>
                <div>参与</div>
                <div class="activityItem__gift">
                  {{ item.storeName }}&nbsp;&nbsp;{{ item.lotteryName }}
                </div>
              </div>
            </div>
          </div>
          <div class="paginationBar">
            <el-pagination
              small
              layout="prev, pager, next"
              :total="actTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :hidden="actTotal == 0"
            >
            </el-pagination>
          </div>
        </div>
        <div class="activityList">
          <div v-if="giftList.length > 0">
            <div class="activityList__tit">今日兑奖</div>
            <div class="activityList__inner">
              <div
                class="activityItem"
                v-for="(item, index) in giftList"
                :key="index"
              >
                <img class="activityItem__icon" :src="todayGiftImg" />
                <div class="activityItem__phone activityItem__phone1">
                  {{ item.phone || "喵市新用户" }}
                </div>
                <div>于</div>
                <div class="activityItem__time activityItem__time1">
                  {{ item.winAt }}
                </div>
                <div>兑换</div>
                <div class="activityItem__awardLevel">
                  <span style="color: #e4a498">{{
                    awardLevelOpt[item.awardLevel].lab
                  }}</span
                  >&nbsp;&nbsp;
                </div>
                <div class="activityItem__awardName">
                  <span style="color: #f8b31c">{{ item.awardName }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="paginationBar">
            <el-pagination
              small
              layout="prev, pager, next"
              :total="giftTotal"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :hidden="giftTotal == 0"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="shopAddr">
        <div class="shopAddr__lab">{{ storeInfo.storeName }}：</div>
        <div class="shopAddr__text">{{ storeInfo.description }}</div>
      </div>
      <div class="shopTel">
        <div class="shopTel__lab">客服电话：</div>
        <div class="shopTel__text">{{ storeInfo.customerServicePhone }}</div>
      </div>
      <div class="shopVX">
        <div class="shopVX__lab">客服微信：</div>
        <div class="shopVX__text">{{ storeInfo.customerServiceVx }}</div>
      </div>
    </div>
    <div class="autoCheck" v-if="!isSwitch">
      <el-checkbox v-model="checked" @change="_autoCheck">自动刷新</el-checkbox>
    </div>
    <div class="screenFullWrap">
      <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
        style="display: inline-block"
      />
      <div class="switchBtn" @click="_switch">切换</div>
    </div>

    <el-dialog
      title="中奖记录"
      width="540px"
      center
      :visible.sync="dialogTableVisible"
    >
      <div class="awardRecord">
        <div class="awardRecord__inner">
          <div
            class="awardInfo"
            v-for="(item, index) in writeoffList"
            :key="index"
          >
            <div class="awardInfo__item">
              <div class="awardInfo__lab">喵市会员</div>
              <div class="awardInfo__text msVip">{{ item.phone }}</div>
              <div
                class="awardCheckBox"
                :data-index="index"
                @click="_sel(index)"
              >
                {{ item.isSel ? "√" : "" }}
              </div>
            </div>
            <div class="awardInfo__item">
              <div class="awardInfo__lab">奖品名称</div>
              <div class="awardInfo__text">
                {{ awardLevelOpt[item.awardLevel].lab }} {{ item.awardName }}
              </div>
            </div>
            <div class="awardInfo__item">
              <div class="awardInfo__lab">奖品条码</div>
              <div class="awardInfo__text">{{ item.awardBarNo }}</div>
            </div>
            <div class="awardInfo__item">
              <div class="awardInfo__lab">奖品描述</div>
              <div class="awardInfo__text">{{ item.awardDescription }}</div>
            </div>
          </div>
        </div>

        <div class="allSelBtn">
          <div class="allSelBtn__lab">全选</div>
          <div class="allSelBtn__selBox" @click="_selAll">
            {{ isAllSel ? "√" : "" }}
          </div>
        </div>
        <!-- <div class="paginationBar">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="100"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          >
          </el-pagination>
        </div> -->
        <div class="awardRecordFooter">
          <div class="confirmBtn" @click="_writeoff">确认核销</div>
          <div class="cancelBtn" @click="_cancel">返回</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  auditWaitList,
  actionRecord,
  chartPercent,
  loanChartData,
  inspectionChartData,
  repaymentChartData,
  todayActList,
  todayGiftList,
  writeoffAwardList,
  writeoff,
  storeInfo,
  qrCode,
} from "@/api/dashboard";
import Screenfull from "@/components/Screenfull";
import { shopSelList } from "@/api/userManage";
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import TpieChart from "./components/TpieChart";
import BarChart from "./components/BarChart";
import HbarChart from "./components/HbarChart";
import PbarChart from "./components/PbarChart";
import IbarChart from "./components/IbarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import CalendarPie from "./components/CalendarPie";
import ProfitChart from "./components/ProfitChart";
import IpieChart from "./components/IpieChart";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    HbarChart,
    CalendarPie,
    TpieChart,
    PbarChart,
    IbarChart,
    ProfitChart,
    IpieChart,
    Screenfull,
  },
  data() {
    return {
      checked: true,
      dialogTableVisible: false,
      isAllSel: false,
      isSwitch: false,
      searchVal: "",
      qrCodePicUrl: "",
      pageNum: 1,
      pageNum1: 1,
      pageNum2: 1,
      actTotal: 0,
      giftTotal: 0,
      actList: [],
      giftList: [],
      writeoffList: [],
      storeInfo: {},
      numsList: [1, 2, 3, 4],
      activityList: [1, 2, 3, 4, 5, 6],
      nowTime: undefined,
      shopListOpt: [],
      storeName: "",
      qrCode_left_cat: require("./../../../assets/qrCode_left_cat.png"),
      qrCode_right_cat: require("./../../../assets/qrCode_right_cat.png"),
      qrCode: require("./../../../assets/qrCode.png"),
      logo: require("./../../../assets/logo.png"),
      todayACtImg: require("./../../../assets/todayAct.png"),
      todayGiftImg: require("./../../../assets/todayGift.png"),
      pao_right: require("./../../../assets/pao_right.png"),
      pao_left: require("./../../../assets/pao_left.png"),
      miniPao_right: require("./../../../assets/miniPao_right.png"),
      miniPao_left: require("./../../../assets/miniPao_left.png"),
      calendarChartTitle: undefined,
      chartPercentTit: undefined,
      height: "400px",
      timeList: [
        "7天以内",
        "8-15天",
        "16-30天",
        "31-45天",
        "46天及以上",
        "逾期",
      ],
      inspectionColArr: ["#EECE62", "#95CD79"],
      loanColorArr: [
        "#4FA173",
        "#95CD79",
        "#6368C2",
        "#85BCDB",
        "#EECE62",
        "#DF6F68",
      ],
      loanPieColArr: undefined,
      workflowList: [],
      userActionRecords: [],
      inspectionTit: "",
      lineChartData: lineChartData.newVisitis,
      inspectionCalendarChart: [],
      inspectionPieChart: [],
      inspectionStackedBarChart: {},
      loanPieChart: [],
      loanStackedBarChart: [],
      plannedRepaymentHistogram: [],
      totalLoan: "",
      loanRanking: "",
      userInfo: {},
      awardLevelOpt: [
        {
          key: 0,
          lab: "谢谢惠顾",
          value: 0,
        },
        {
          key: 1,
          lab: "一等奖",
          value: 1,
        },
        {
          key: 2,
          lab: "二等奖",
          value: 2,
        },
        {
          key: 3,
          lab: "三等奖",
          value: 3,
        },
        {
          key: 4,
          lab: "四等奖",
          value: 4,
        },
        {
          key: 5,
          lab: "五等奖",
          value: 5,
        },
        {
          key: 6,
          lab: "六等奖",
          value: 6,
        },
        {
          key: 7,
          lab: "七等奖",
          value: 7,
        },
        {
          key: 8,
          lab: "八等奖",
          value: 8,
        },
        {
          key: 9,
          lab: "九等奖",
          value: 9,
        },
      ],
    };
  },
  created() {
    var that = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13) {
        if (this._qrCodeTimer) {
          clearTimeout(this._qrCodeTimer);
        }
        that.getQrCode();
      }
    };
  },

  mounted() {
    const userInfo = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userInfo);

    // const userInfo = localStorage.getItem("userInfo");
    // this.userInfo = JSON.parse(userInfo);
    // this.getChartPercent();
    // this.auditWaitList();
    // this.getLoanChartData();
    // this.getInspectionChartData();
    // this.getRepaymentChartData();
    // this.actionRecordFunc();
    // this.message = this.$refs.message;
    // this.rollText();、

    this.getTotalActList();
    this.getTotalGiftList();
    this.getQrCode();

    this.getStoreInfo();

    this.running_time();
    this.getShopSelList();
  },
  methods: {
    async getShopSelList() {
      let res = await shopSelList({});
      if (res.rtn == 1) {
        console.log(res, "-------");
        this.shopListOpt = res.SelectiveStoreList;
        this.shopListOpt.some((item, index) => {
          if (item.storeNo == this.userInfo.storeNo) {
            this.storeName = item.storeName;
          }
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTotalActList();
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.pageNum1 = val;
      this.getTotalGiftList();
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.pageNum2 = val;
      this.getWriteOffList();
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    async auditWaitList() {
      let res = await auditWaitList();
      if (res.rtn == 1) {
        console.log(res, "res");
        const {
          inspectionCalendarChart,
          inspectionPieChart,
          loanPieChart,
          total,
        } = res;

        var inspectionTotal = 0;
        var newColArr = [];
        this.inspectionCalendarChart = inspectionCalendarChart;
        this.inspectionPieChart = inspectionPieChart;
        this.loanPieChart = loanPieChart.sort((a, b) => {
          return a.value - b.value;
        });

        console.log(this.loanPieChart, "---");
        this.loanPieChart.forEach((val, idx) => {
          this.timeList.forEach((item, index) => {
            console.log(val.name.trim().split("  ")[0], item);
            if (val.name.trim().split("  ")[0] == item) {
              console.log(this.loanColorArr[index], "===");
              newColArr.push(this.loanColorArr[index]);
            }
          });
        });

        this.loanPieColArr = newColArr;
        this.totalLoan = "借款总额 " + total.total + " 万元";
        this.inspectionPieChart.forEach((item, index) => {
          inspectionTotal += item.value;
        });

        this.inspectionTit = "今日巡检 共" + inspectionTotal + "辆";

        this.calendarChartTitle = "近30天巡检 " + this.chartPercentTit;
      }
    },

    async actionRecordFunc() {
      let res = await actionRecord();
      if (res.rtn == 1) {
        this.userActionRecords = res.userActionRecords;
      }
    },
    rollText() {
      var speed = 50;
      var that = this;
      let height = this.$refs.message.offsetHeight;
      var oldTop = undefined;
      var newTop = undefined;
      function Marquee() {
        //    that.rollContainer.offsetHeight - that.rollContainer.scrollTop <=
        //   -(that.rollContainer.scrollTop / 2)
        if (!!oldTop && !!newTop && oldTop == newTop) {
          that.message.scrollTop = 0;
        } else {
          oldTop = that.message.scrollTop;
          that.message.scrollTop++;
          newTop = that.message.scrollTop;
        }
      }
      var MyMar = setInterval(Marquee, speed); //设置定时器
      //鼠标移上时清除定时器达到滚动停止的目的

      this.message.addEventListener("mouseover", function () {
        clearInterval(MyMar);
      });
      //鼠标移开时重设定时器
      this.message.addEventListener("mouseout", function () {
        MyMar = setInterval(Marquee, speed);
      });
    },
    async getChartPercent() {
      let res = await chartPercent();
      if (res.rtn == 1) {
        this.chartPercentTit = res.CalendarChartPercent;
      }
    },
    async getLoanChartData() {
      let res = await loanChartData({
        pageSize: 10000,
        pageNum: 1,
      });
      if (res.rtn == 1) {
        const { loanStackedBarChart } = res;
        this.loanStackedBarChart = loanStackedBarChart;
        this.loanRanking = "分公司借款排行";
      }
    },
    async getInspectionChartData() {
      let res = await inspectionChartData({
        pageSize: 10000,
        pageNum: 1,
      });
      if (res.rtn == 1) {
        this.inspectionStackedBarChart = res.inspectionStackedBarChart;
      }
    },
    async getRepaymentChartData() {
      let res = await repaymentChartData({
        pageSize: 10000,
        pageNum: 1,
      });
      if (res.rtn == 1) {
        this.plannedRepaymentHistogram = res.plannedRepaymentHistogram;
      }
    },
    async getTotalActList() {
      const pageNum = this.pageNum;
      let res = await todayActList({
        pageSize: 10,
        pageNum: pageNum,
      });
      if (res.rtn == 1) {
        this.actList = res.appUserAwardList;
        this.actTotal = res.total;
        this.actList.forEach((item, index) => {
          item.winAt = item.winAt.split(" ")[1];
          if (item.phone) {
            item.phone =
              item.phone.substr(0, 3) + "****" + item.phone.substr(7);
          }
        });
        setTimeout(() => {
          this.pageNum = 1;
          this.getTotalActList();
        }, 1000 * 30);
      }
    },
    async getTotalGiftList() {
      const pageNum = this.pageNum1;
      let res = await todayGiftList({
        pageSize: 10,
        pageNum: pageNum,
      });
      if (res.rtn == 1) {
        this.giftList = res.appUserAwardList;
        this.giftTotal = res.total;
        this.giftList.forEach((item, index) => {
          item.winAt = item.winAt.split(" ")[1];
          if (item.phone) {
            item.phone =
              item.phone.substr(0, 3) + "****" + item.phone.substr(7);
          }
        });
        setTimeout(() => {
          this.pageNum1 = 1;
          this.getTotalGiftList();
        }, 1000 * 30);
      }
    },
    async getStoreInfo() {
      let res = await storeInfo({});
      if (res.rtn == 1) {
        this.storeInfo = res.storeInfo;
        var accumulativeWriteoffNum =
          this.storeInfo.accumulativeWriteoffNum.toString();
        let accumulativeWriteoffNumArr = [];
        if (accumulativeWriteoffNum.length == 1) {
          accumulativeWriteoffNum = "000" + accumulativeWriteoffNum;
        } else if (accumulativeWriteoffNum.length == 2) {
          accumulativeWriteoffNum = "00" + accumulativeWriteoffNum;
        } else if (accumulativeWriteoffNum.length == 3) {
          accumulativeWriteoffNum = "0" + accumulativeWriteoffNum;
        }

        console.log(accumulativeWriteoffNum, "accumulativeWriteoffNum");
        accumulativeWriteoffNumArr = this.converStr(
          accumulativeWriteoffNum
        ).split(",");

        console.log(accumulativeWriteoffNumArr, "accumulativeWriteoffNumArr");

        this.storeInfo.accumulativeWriteoffNum = accumulativeWriteoffNumArr;
      }
    },
    async getQrCode() {
      let res = await qrCode({
        // qrCodePage:'pages/index/index'
      });
      if (res.rtn == 1) {
        this.qrCodePicUrl = res.qrCodePicUrl;
        if (this.checked) {
          this._qrCodeTimer = setTimeout(() => {
            this.getQrCode();
          }, 1000 * 60 * 5);
        }
      }
    },
    converStr(str) {
      //给数字字符串添加逗号分隔符
      if (/\./.test(str)) {
        return str
          .replace(/\d(?=(\d{1})+\.)/g, "$&,")
          .split("")
          .reverse()
          .join("")
          .replace(/\d(?=(\d{1})+\.)/g, "$&,")
          .split("")
          .reverse()
          .join("");
      } else {
        return str.replace(/\d(?=(\d{1})+$)/g, "$&,");
      }
    },
    running_time() {
      var D = new Date();
      var year = D.getFullYear(); //四位数年份
      var month = D.getMonth() + 1; //月份(0-11),0为一月份
      month = month < 10 ? "0" + month : month;

      var day = D.getDate(); //月的某一天(1-31)
      day = day < 10 ? "0" + day : day;

      var hours = D.getHours(); //小时(0-23)
      hours = hours < 10 ? "0" + hours : hours;

      var minutes = D.getMinutes(); //分钟(0-59)
      minutes = minutes < 10 ? "0" + minutes : minutes;

      var seconds = D.getSeconds(); //秒(0-59)
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var week = D.getDay(); //周几(0-6),0为周日
      var weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

      var now_time = year + "-" + month + "-" + day + " " + weekArr[week];
      this.nowTime = now_time;
      console.log(now_time);
    },
    _search(change) {
      var change = change || "";
      this.searchVal = this.$refs.searchVal.value;
      var telRule = /^1\d{10}$/;
      var barCodeRule = /^2\d{12}$/;
      if (!this.searchVal) {
        this.$message.info("请输入手机号码或奖品条形码");
        return;
      }
      console.log(!change, this.searchVal, "---");

      if (!change) {
        this.getWriteOffList();
      } else {
        if (telRule.test(this.searchVal) || barCodeRule.test(this.searchVal)) {
          this.getWriteOffList();
        }
      }
    },

    async getWriteOffList() {
      this.isAllSel = false;
      const pageNum = this.pageNum2;
      let res = await writeoffAwardList({
        pageSize: 100,
        pageNum,
        phoneOrBarCode: this.searchVal,
      });

      if (res.rtn == 1) {
        this.writeoffList = res.appUserAwardList;
        this.writeoffList.forEach((item, index) => {
          item.isSel = false;
        });
        if (this.writeoffList && this.writeoffList.length > 0) {
          this.dialogTableVisible = true;
        } else {
          this.$message.info("未检索到相关内容");
        }
      }
    },
    _sel(index) {
      console.log(index, "evt");
      this.writeoffList[index].isSel = !this.writeoffList[index].isSel;
      this.writeoffList = JSON.parse(JSON.stringify(this.writeoffList));
    },
    _selAll() {
      this.isAllSel = !this.isAllSel;
      this.writeoffList.forEach((item, index) => {
        if (this.isAllSel) {
          item.isSel = true;
        } else {
          item.isSel = false;
        }
      });
    },
    _cancel() {
      this.dialogTableVisible = false;
      this.writeoffList = [];
      this.isAllSel = false;
    },
    _switch() {
      this.$nextTick(function () {
        this.isSwitch = !this.isSwitch;
        if (this.isSitch) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.$refs.searchVal.focus(); // 等价  document.getElementById("inputValId").focus();
          }, 100);
        }
      });
    },
    _autoCheck() {
      // if (this.checked) {
      if (this._qrCodeTimer) {
        clearTimeout(this._qrCodeTimer);
      }

      this.getQrCode();
      // }
    },
    async _writeoff() {
      let userAwardList = [];
      this.writeoffList.forEach((item, index) => {
        if (item.isSel) {
          var writeoffJSON = {};
          writeoffJSON.userAwardId = item.userAwardId;
          userAwardList.push(writeoffJSON);
        }
      });

      let res = await writeoff({
        userAwardList,
      });

      if (res.rtn == 1) {
        this.$message.success("核销成功");
        this.getWriteOffList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  // position: absolute;
  // top: 50px;
  // left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-flow: column;
  padding: 16px 16px 0;
  background: #ecf6e7;
  overflow-y: scroll;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.storeName {
  color: rgba(123, 123, 123, 100);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.localInfo {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #7b7b7b;
  font-size: 14px;
  text-align: right;
  font-family: SourceHanSansSC-regular;
}
.addr {
  margin-right: 10px;
}
.weather {
  margin-right: 10px;
}
.content {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.content__item {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-top: 50px;
  margin-bottom: 20px;
}
.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #666;
  font-size: 14px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  margin-bottom: 10px;
}
.QrCodeWrap {
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: flex-end;
  height: 300px;
}
.QrCode {
  position: relative;
  width: 300px;
  height: 300px;
}
.QrCode .qrCodePic {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
}

.qrCodePicShade {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  z-index: 998;
  background: rgba(236, 246, 231, 0.8);
}

.QrCode .pao_right {
  position: absolute;
  top: -25px;
  left: 75px;
  width: 270px;
  height: 270px;
  z-index: 999;
}

.QrCode .miniPao_right {
  position: absolute;
  top: 120px;
  left: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  z-index: 999;
}

.QrCode .pao_left {
  position: absolute;
  top: -60px;
  left: -75px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  z-index: 999;
}

.pao_left_awarInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(88, 41, 26, 100);
  font-size: 18px;
  text-align: left;
  line-height: 30px;
}

.pao_left_awarInfo .awardLevel {
  color: rgba(228, 164, 152, 100);
  margin-right: 5px;
}

.pao_left_awarInfo .awardName {
  color: rgba(248, 179, 28, 100);
}

.QrCode .miniPao_left {
  position: absolute;
  top: 0;
  left: -100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  z-index: 999;
}

.QrCodeLeft img {
  width: 220px;
  margin-right: -30px;
}
.QrCodeRight img {
  width: 180px;
}
.lists {
  margin-top: 30px;
  display: flex;
  // justify-content: space-between;
  align-items: center;
}

.activityList {
  margin-bottom: 50px;
}

.activityList__inner {
  height: 360px;
}

.activityList__tit {
  color: rgba(16, 16, 16, 100);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  margin-bottom: 16px;
}

.activityItem {
  display: flex;
  align-items: center;
  color: #d3d3d3;
  padding-bottom: 10px;
}

.activityList:first-child .activityList__tit {
  padding-left: 30px;
}

.activityItem1 {
  border-right: 1px solid #bbb;
  padding-right: 50px;
}

.activityList:last-child .activityList__tit {
  padding-left: 80px;
}

.activityList:last-child .activityItem {
  padding-left: 50px;
}

.activityItem__icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  // background: #eee;
}

.activityItem__phone {
  width: 100px;
  color: #f8b31c;
  margin-right: 10px;
}

.activityItem__phone1 {
  color: #101010;
}

.activityItem__time {
  // width: 70px;
  margin: 0 10px;
  color: #e4a498;
}

.activityItem__time1 {
  color: #d3d3d3;
}

.activityItem__gift {
  width: 240px;
  margin: 0 10px;
  color: #101010;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}

.activityItem__awardLevel {
  margin-left: 10px;
}

.shopAddr,
.shopTel,
.shopVX {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.shopAddr__lab,
.shopTel__lab,
.shopVX__lab {
  color: #d3d3d3;
}
.giftNumBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  font-family: Roboto;
}
.giftNum {
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
  background: #000;
  color: #fff;
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
}
.giftNumBar__left {
  margin-right: 10px;
}

.logoWrap img {
  width: 300px;
  height: 300px;
  margin-bottom: -50px;
}

.searchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 70px;
  margin: 0 auto;
  border-radius: 50px;
  text-align: center;
  border: 2px solid rgba(139, 196, 235, 100);
  background: #fff;
}

.searchBtn {
  width: 200px;
  line-height: 66px;
  background: #8bc4eb;
  color: rgba(255, 255, 255, 100);
  font-size: 22px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  text-align: center;
  font-family: Roboto;
  // border: 2px solid rgba(139, 196, 235, 100);
  border-radius: 0 37px 37px 0;
  cursor: pointer;
}

.search {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px 20px;
}

.searchIcon {
  font-size: 24px;
  color: #d2d2d2;
  vertical-align: middle;
  margin-right: 20px;
}

.searchVal {
  width: 100%;
  background: none;
  outline: none;
  border: none;
  height: 50px;
  // line-height: 50px;
  font-size: 22px;
  vertical-align: middle;
}

.awardInfo {
  width: 490px;
  // height: 185px;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 20px;
  border-radius: 12px;
  background-color: rgba(139, 196, 235, 0.1);
  color: rgba(16, 16, 16, 100);
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
  box-sizing: border-box;
}

.awardInfo__item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.awardInfo__item:last-child {
  margin-bottom: 0;
}

.awardInfo__lab {
  color: rgba(193, 193, 193, 100);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.awardInfo__text {
  margin-left: 14px;
  color: rgba(24, 24, 24, 100);
  font-size: 18px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.awardCheckBox,
.allSelBtn__selBox {
  position: absolute;
  top: 0;
  right: -10px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border: 1px solid #b1b1b1;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #b1b1b1;
  text-align: center;
}
.allSelBtn__selBox {
  position: static;
  margin: 0 10px;
}
.msVip {
  color: #ff0000;
}

.allSelBtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.awardRecord {
}

.awardRecord__inner {
  height: 600px;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.awardRecord__inner::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.awardRecordFooter {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding: 0 30px;
  box-sizing: border-box;
}

.confirmBtn {
  width: 35%;
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  border-radius: 6px;
  background-color: rgba(139, 196, 235, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
}

.cancelBtn {
  width: 35%;
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 100);
  color: rgba(133, 136, 142, 100);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(133, 136, 142, 100);
}

.dashboard-editor-container {
  padding: 32px 32px 32px 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  min-height: 100vh;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.journal {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 400px;
  padding: 0 0 20px 0;
  background: #fff;
  box-sizing: border-box;
}
.journalTit {
  font-size: 14px;
  padding-bottom: 20px;
  color: #666;
}
.journalInner {
  flex: 1;
  overflow-y: hidden;
  margin-bottom: 20px;
}
.journalItem {
  display: flex;
  font-size: 14px;
  padding-bottom: 10px;
  padding-right: 20px;
  box-sizing: border-box;
}
.journalItem:last-child {
  padding-bottom: 0;
}
.journal__icon {
  width: 24px;
  height: 24px;
  // background: #eee;
  margin-right: 10px;
}
.journal__info {
  line-height: 1.8;
}
.paginationBar {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}
.fixed-header + .app-main[data-v-078753dd] {
  height: 100vh !important;
}
.switchBtn {
  color: rgba(123, 123, 123, 100);
  font-size: 14px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  cursor: pointer;
  margin-left: 10px;
}

.autoCheck {
  position: absolute;
  left: 20px;
  bottom: 10px;
  display: flex;
  align-items: center;
}

.screenFullWrap {
  position: absolute;
  right: 20px;
  bottom: 10px;
  display: flex;
  align-items: center;
}

.paginationBar /deep/ .el-pagination button {
  background: #ecf6e7;
}

.paginationBar /deep/ .el-pagination button:disabled {
  background: #ecf6e7;
}

.paginationBar /deep/ .el-pager li {
  background: #ecf6e7;
}

::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #fff; // 进行修改未选中背景和字体
    // color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: green; // 进行修改选中项背景和字体
    color: #fff;
  }
}
</style>
