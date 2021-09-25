<template>
  <div class="app-container">
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
        <span class="headLab">基本信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">店铺名称：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.storeName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">活动名称：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.lotteryName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">活动时间：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.beginAt + "~" + lotteryInfo.endAt || "--" }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">初始奖券：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.initialTicketNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">每日限用：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.dayLimitNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">核销时间：</div>
                  <div class="userDtl__line__txt">
                    {{
                      lotteryInfo.writeoffBeginAt +
                        "~" +
                        lotteryInfo.writeoffEndAt || "--"
                    }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">获次条件：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.lab || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">进入页面人数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.openNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">参与抽奖人数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.participationNum || "--" }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">中奖未绑定电话人数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.noBindPhoneNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">中奖且绑定电话人数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.bindPhoneNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">已核销人数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.writeoffNum || "--" }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">被分享者奖券数量：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.sharedTicketNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">邀请者奖券数量：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.inviterTicketNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品总数：</div>
                  <div class="userDtl__line__txt">
                    {{ lotteryInfo.totalAwardNum || "--" }}
                  </div>
                </div>
              </div>
              <div class="userDtl__inner">
                <div class="userDtl__line__item" style="width: 100%">
                  <div class="userDtl__line__lab">活动说明：</div>
                  <div
                    class="userDtl__line__txt"
                    v-html="lotteryInfo.lotteryDescription"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">样式信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">活动背景图：</div>
                  <div class="userDtl__line__txt">
                    <el-image
                      fit="cover"
                      :src="lotteryInfo.lotteryBackgroundPicUrl"
                      alt=""
                      style="
                        width: 168px;
                        height: 168px;
                        border: 1px solid #eee;
                      "
                      :preview-src-list="[lotteryInfo.lotteryBackgroundPicUrl]"
                    ></el-image>
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">活动转盘图：</div>
                  <div class="userDtl__line__txt">
                    <el-image
                      fit="cover"
                      :src="lotteryInfo.lotteryTurntablePicUrl"
                      alt=""
                      style="
                        width: 168px;
                        height: 168px;
                        border: 1px solid #eee;
                      "
                      :preview-src-list="[lotteryInfo.lotteryTurntablePicUrl]"
                    ></el-image>
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">转盘指针图：</div>
                  <div class="userDtl__line__txt">
                    <el-image
                      fit="cover"
                      :src="lotteryInfo.lotteryPointerPicUrl"
                      alt=""
                      style="
                        width: 168px;
                        height: 168px;
                        border: 1px solid #eee;
                      "
                      :preview-src-list="[lotteryInfo.lotteryPointerPicUrl]"
                    ></el-image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">奖品信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div
              class="userDtl"
              v-for="(item, index) in awardInfoList"
              :key="index"
            >
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品级别：</div>
                  <div class="userDtl__line__txt">
                    {{ awardLevelOpt[item.awardLevel].lab || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品名称：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品数量：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardNum || "--" }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品描述：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardDescription || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">中奖概率：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardProbability || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">圆盘角度：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardSectorRange || "--" }}
                  </div>
                </div>
              </div>

              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">中奖提示图：</div>
                  <div class="userDtl__line__txt">
                    <el-image
                      fit="cover"
                      :src="item.awardReminderPicUrl"
                      alt=""
                      style="
                        width: 168px;
                        height: 168px;
                        border: 1px solid #eee;
                      "
                      :preview-src-list="[item.awardReminderPicUrl]"
                    ></el-image>
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">奖品展示：</div>
                  <div class="userDtl__line__txt">
                    {{ item.awardDisplay || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">是否轮播：</div>
                  <div class="userDtl__line__txt">
                    {{ item.rotationStatus == 1 ? "轮播" : "不轮播" || "--" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { activityDtl } from "@/api/activityManage";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "ActivityDtlMange",
  data() {
    return {
      lotteryNo: undefined,
      lotteryInfo: {},
      awardInfoList: [],
      shareTypeOpt: [
        {
          key: 1,
          lab: "平台新用户",
          value: "platform",
        },
        {
          key: 2,
          lab: "店铺新用户",
          value: "store",
        },
        {
          key: 3,
          lab: "活动新用户",
          value: "lottery",
        },
        {
          key: 4,
          lab: "距上次被邀请天数",
          value: "days",
        },
        {
          key: 5,
          lab: "不限",
          value: "unlimited",
        },
      ],
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
  components: {
    collapse,
  },
  created() {},
  mounted() {
    this.lotteryNo = this.$route.query.lotteryNo;
    this.beforeRouter = this.$route.query.beforeRouter;
    this.getDtl();
  },
  computed: {},
  methods: {
    async getDtl() {
      let res = await activityDtl({
        lotteryNo: this.lotteryNo,
      });
      if (res.rtn == 1) {
        console.log(res, "res");
        this.lotteryInfo = res.lotteryInfo;
        this.shareTypeOpt.forEach((item, index) => {
          if (item.value == this.lotteryInfo.shareType) {
            this.lotteryInfo.lab = item.lab;
          }
        });

        this.awardInfoList = res.awardInfoList;
        // Just to simulate the time of the request
      }
    },
    onBack() {
      this.$router.back(-1);
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
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.userDtl,
.userDtl,
.goodsList,
.logisticsList {
  margin-top: 20px;
  // border-right: 1px solid #eee;
}
.userDtl,
.logisticsList {
  border: 0;
}
.userDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0;
  color: #999;
  // border-bottom: 1px solid #eee;
}
.userDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 0;
  // border-bottom: 1px solid #eee;
}
.logisticsItem {
  border: 0;
  font-size: 14px;
}
.logisticsItem__time {
  display: inline-block;
  width: 180px;
  margin-right: 10px;
  color: #999;
  vertical-align: top;
  line-height: 25px;
}
.logisticsItem__txt {
  width: calc(100% - 200px);
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  line-height: 25px;
}
.userDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.userDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.userDtl__line__txt,
.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userDtl__line__txt {
  width: calc(100% - 150px);
}

.box-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 70px 20px 0 20px;
  overflow: auto;
}
.content {
  overflow: auto;
  font-size: 0;
}
.section {
  display: inline-block;
  width: 100%;
  vertical-align: top;
}
.orderStatus {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5715;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.userDtl__header__orderInfo tr {
  height: 40px;
  line-height: 40px;
}
.line {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;

  list-style: none;
  font-feature-settings: "tnum", "tnum";
  background: #f0f0f0;
}
table tr td {
  width: 33.333333%;
}
.head_pic {
  width: 100px;
  height: 100px;
}
.logisticsStatus {
  font-size: 13px;
  padding: 0 20px;
}
.logisticsStatusWrap {
  padding: 20px 0;
}
.goodsList,
.logisticsList {
  padding-top: 30px;
  margin-top: 0;
}
.goodsItem {
  margin-bottom: 30px;
  position: relative;
}
.goodsItem:last-child {
  margin-bottom: 0;
}
.goodsItem__header {
  font-size: 0;
  padding-bottom: 30px;
}
.goodsImg {
  width: 98px;
  height: 98px;
  vertical-align: bottom;
  background: #eee;
  border: 1px solid #efefef;
}
.goodsInfo {
  width: calc(100% - 190px);
  margin-left: 20px;
  font-size: 14px;
  color: rgba($color: #000, $alpha: 1);
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
.goodsInfo__arrow {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
}
.goodsInfo__item {
  padding-bottom: 5px;
}
.goodsInfo__item:last-child {
  padding: 0;
}
.goodsName {
  color: #000 !important;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.goodsItemNum,
.goodsNum {
  color: #999;
}
.goodsSkuList {
  font-size: 14px;
  color: #999;
}
.goodsSkuItem {
  padding-bottom: 12px;
}
.goodsSkuItem:last-child {
  padding: 0;
}
.goodsSkuItem__left {
  display: inline-block;
  width: 200px;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}
.goodsSkuItem__right {
  display: inline-block;
  vertical-align: top;
}
.arrowUp {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-360deg);
  transition: all 1s;
}
.arrowDown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-180deg);
  transition: all 1s;
}
.col_red {
  color: red;
}
.fontWei_700 {
  font-weight: 700;
}
.addrAll {
  cursor: pointer;
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