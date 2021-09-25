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

    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      :inline="true"
      class="demo-form-inline"
    >
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">活动信息</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div class="userDtl">
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item label="店铺名称" prop="storeNo">
                      <el-select
                        v-model="form.storeNo"
                        placeholder="店铺名称"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                      >
                        <el-option
                          v-for="item in shopListOpt"
                          :key="item.storeId"
                          :label="item.storeName"
                          :value="item.storeNo"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="活动名称" prop="lotteryName">
                      <el-input
                        placeholder="活动名称"
                        v-model="form.lotteryName"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="获次条件" prop="shareType">
                      <el-select
                        v-model="form.shareType"
                        placeholder="获次条件"
                        clearable
                        style="width: 140px"
                        class="filter-item"
                      >
                        <el-option
                          v-for="item in shareTypeOpt"
                          :key="item.key"
                          :label="item.lab"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label=""
                      prop="limitShareDays"
                      v-if="form.shareType == 'days'"
                      style="width: 100px"
                    >
                      <el-input
                        placeholder="天数"
                        v-model="form.limitShareDays"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item label="被分享者奖券数" prop="sharedTicketNum">
                      <el-input
                        placeholder="被分享者奖券数"
                        v-model="form.sharedTicketNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="邀请者奖券数" prop="inviterTicketNum">
                      <el-input
                        placeholder="邀请者奖券数"
                        v-model="form.inviterTicketNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!-- <div class="userDtl__line__item">
                    <el-form-item label="奖品总数" prop="totalAwardNum">
                      <el-input
                        placeholder="奖品总数"
                        v-model="form.totalAwardNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div> -->
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item label="初始奖券" prop="initialTicketNum">
                      <el-input
                        placeholder="初始奖券"
                        v-model="form.initialTicketNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="每日限用" prop="dayLimitNum">
                      <el-input
                        placeholder="每日限用"
                        v-model="form.dayLimitNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!-- <div class="userDtl__line__item">
                    <el-form-item label="奖品总数" prop="totalAwardNum">
                      <el-input
                        placeholder="奖品总数"
                        v-model="form.totalAwardNum"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div> -->
                </div>

                <!-- <div class="userDtl__inner" v-if="form.shareType == 'days'">
                  <div class="userDtl__line__item" style="width: 100%">
                    <el-form-item
                      label="距上次分享成功天数"
                      prop="limitShareDays"
                    >
                      <el-input
                        placeholder="距上次分享成功天数"
                        v-model="form.limitShareDays"
                        clearable
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                </div> -->
                <div class="userDtl__inner" style="width: 80%">
                  <el-form-item label="活动时间" prop="beginAt">
                    <el-date-picker
                      v-model="form.beginAt"
                      type="datetime"
                      placeholder="开始时间"
                      style="width: 200px"
                    >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="~" prop="endAt">
                    <el-date-picker
                      v-model="form.endAt"
                      type="datetime"
                      placeholder="截止时间"
                      style="width: 200px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="userDtl__inner" style="width: 80%">
                  <el-form-item label="核销时间" prop="writeoffBeginAt">
                    <el-date-picker
                      v-model="form.writeoffBeginAt"
                      type="datetime"
                      placeholder="开始时间"
                      style="width: 200px"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="~" prop="writeoffEndAt">
                    <el-date-picker
                      v-model="form.writeoffEndAt"
                      type="datetime"
                      placeholder="截止时间"
                      style="width: 200px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item" style="width: 100%">
                    <el-form-item label="活动说明" prop="lotteryDescription">
                      <!-- <el-input
                        placeholder="请输入内容"
                        type="textarea"
                        v-model="form.lotteryDescription"
                        clearable
                        maxlength="100"
                        show-word-limit
                        rows="3"
                        style="width: 300px"
                      ></el-input> -->
                      <tinymce
                        v-model="form.lotteryDescription"
                        :height="200"
                        :width="100 + '%'"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">样式信息</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div class="userDtl">
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="活动背景图"
                      prop="lotteryBackgroundPicUrl"
                    >
                      <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :headers="headers"
                        :data="fileData"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                        :on-success="picUploadSuccess"
                        :class="{ hide: hideUpload }"
                        :onChange="picUploadChange"
                        :limitCount="limitCount"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                      >
                        <img
                          v-if="form.lotteryBackgroundPicUrl"
                          :src="form.lotteryBackgroundPicUrl"
                          class="el-upload-list__item-thumbnail"
                          style="width: 100%; height: 100%"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="活动转盘图"
                      prop="lotteryTurntablePicUrl"
                    >
                      <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :headers="headers"
                        :data="fileData"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                        :on-success="picUploadSuccess1"
                        :class="{ hide: hideUpload1 }"
                        :onChange="picUploadChange1"
                        :limitCount="limitCount1"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove1"
                      >
                        <img
                          v-if="form.lotteryTurntablePicUrl"
                          :src="form.lotteryTurntablePicUrl"
                          class="el-upload-list__item-thumbnail"
                          style="width: 100%; height: 100%"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="转盘指针图"
                      prop="lotteryPointerPicUrl"
                    >
                      <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :headers="headers"
                        :data="fileData"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                        :on-success="picUploadSuccess2"
                        :class="{ hide: hideUpload2 }"
                        :onChange="picUploadChange2"
                        :limitCount="limitCount2"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove2"
                      >
                        <img
                          v-if="form.lotteryPointerPicUrl"
                          :src="form.lotteryPointerPicUrl"
                          class="el-upload-list__item-thumbnail"
                          style="width: 100%; height: 100%"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">奖品信息</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div
                class="userDtl"
                v-for="(item, index) in form.awardJSONArray"
                :key="index"
              >
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="奖品级别"
                      :prop="'awardJSONArray.' + index + '.awardLevel'"
                      :rules="rules.awardLevel"
                    >
                      <el-select
                        v-model="item.awardLevel"
                        placeholder="奖品级别"
                        clearable
                        style="width: 200px"
                        class="filter-item"
                        @change="change($event)"
                      >
                        <el-option
                          v-for="item in awardLevelOpt"
                          :key="item.key"
                          :label="item.lab"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="奖品名称"
                      :prop="'awardJSONArray.' + index + '.awardName'"
                      :rules="rules.awardName"
                    >
                      <el-input
                        placeholder="奖品名称"
                        v-model="item.awardName"
                        @input="change($event)"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="奖品数量"
                      :prop="'awardJSONArray.' + index + '.awardNum'"
                      :rules="rules.awardNum"
                    >
                      <el-input
                        placeholder="奖品数量"
                        v-model="item.awardNum"
                        @input="change($event)"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="中奖概率"
                      :prop="'awardJSONArray.' + index + '.awardProbability'"
                      :rules="rules.awardProbability"
                    >
                      <el-input
                        placeholder="中奖概率"
                        v-model="item.awardProbability"
                        @input="change($event)"
                        clearable
                        >%</el-input
                      >
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="圆角角度"
                      :prop="'awardJSONArray.' + index + '.awardSectorRange'"
                      :rules="rules.awardSectorRange"
                    >
                      <el-input
                        placeholder="例：30-50"
                        v-model="item.awardSectorRange"
                        @input="change($event)"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="奖品展示"
                      :prop="'awardJSONArray.' + index + '.awardDisplay'"
                      :rules="rules.awardDisplay"
                    >
                      <el-input
                        placeholder="奖品展示"
                        v-model="item.awardDisplay"
                        @input="change($event)"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="奖品描述"
                      :prop="'awardJSONArray.' + index + '.awardDescription'"
                      :rules="rules.awardDescription"
                    >
                      <el-input
                        placeholder="奖品描述"
                        v-model="item.awardDescription"
                        @input="change($event)"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="是否轮播">
                      <el-switch
                        v-model="item.rotationStatus"
                        active-text="否"
                        inactive-text="是"
                        active-value="2"
                        inactive-value="1"
                        active-color="#ff4949"
                        inactive-color="#F2AB0B"
                        @input="change($event)"
                      >
                      </el-switch>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="中奖提示图"
                      :prop="'awardJSONArray.' + index + '.awardReminderPicUrl'"
                      :rules="rules.awardReminderPicUrl"
                    >
                      <div @click="_getPicIndex(index)">
                        <el-upload
                          class="avatar-uploader"
                          :action="uploadUrl"
                          :headers="headers"
                          :data="fileData"
                          :class="{ hide: item.hideUpload3 }"
                          :limitCount="limitCount3"
                          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                          :show-file-list="false"
                          :on-success="picUploadSuccess3"
                          :on-change="picUploadChange3"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove3"
                        >
                          <img
                            v-if="item.awardReminderPicUrl"
                            :src="item.awardReminderPicUrl"
                            class="avatar"
                          />
                          <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                          ></i>
                        </el-upload>
                      </div>

                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                      </el-dialog>
                    </el-form-item>
                  </div>
                </div>
                <div style="width: 100%; border: 1px solid #eee"></div>
                <div class="btnsWrap">
                  <el-button class="addBtn" @click="_add">新增礼品</el-button>
                  <el-button
                    class="delBtn"
                    @click="_del(index)"
                    v-if="form.awardJSONArray.length > 1"
                    >删除当前礼品</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-form-item align="center" style="width: 100%; margin-top: 20px">
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
import { activityAdd, activityDtl, activityEdit } from "@/api/activityManage";
import { formatDate } from "@/utils/index";
import { shopSelList } from "@/api/userManage";
import { uploadUrl } from "@/api/upload";
import { auditWaitList } from "@/api/dashboard";
import Tinymce from "@/components/Tinymce";

export default {
  name: "SysRoleAddManage",
  components: { Tinymce },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      uploadUrl: undefined,
      loading: false,
      isLoaded: false,
      roleId: "",
      shopListOpt: [],
      hideUpload: false,
      hideUpload1: false,
      hideUpload2: false,
      limitCount: 1,
      limitCount1: 1,
      limitCount2: 1,
      limitCount3: 1,
      picIndex: 0,
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
        storeNo: undefined,
        lotteryName: undefined,
        shareType: undefined,
        endAt: undefined,
        beginAt: undefined,
        writeoffBeginAt: undefined,
        writeoffEndAt: undefined,
        initialTicketNum: undefined,
        dayLimitNum: undefined,
        shareType: undefined,
        limitShareDays: undefined,
        sharedTicketNum: undefined,
        inviterTicketNum: undefined,
        // totalAwardNum: undefined,
        lotteryDescription: undefined,
        lotteryBackgroundPicUrl: undefined,
        lotteryTurntablePicUrl: undefined,
        lotteryPointerPicUrl: undefined,
        awardJSONArray: [
          {
            awardLevel: undefined,
            awardName: undefined,
            awardNum: undefined,
            awardDescription: undefined,
            awardProbability: undefined,
            awardSectorRange: undefined,
            awardReminderPicUrl: undefined,
            awardDisplay: undefined,
            rotationStatus: 1,
            hideUpload3: false,
          },
        ],
      },
      headers: {},
      uploadUrl,
      fileData: {
        fileType: "head",
      },
      rules: {
        storeNo: [{ required: true, message: "必填项", trigger: "change" }],
        lotteryName: [{ required: true, message: "必填项", trigger: "blur" }],
        shareType: [{ required: true, message: "必填项", trigger: "change" }],
        endAt: [{ required: true, message: "必填项", trigger: "blur" }],
        beginAt: [{ required: true, message: "必填项", trigger: "blur" }],
        writeoffBeginAt: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        writeoffEndAt: [{ required: true, message: "必填项", trigger: "blur" }],
        initialTicketNum: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        limitShareDays: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        dayLimitNum: [{ required: true, message: "必填项", trigger: "blur" }],
        // totalAwardNum: [{ required: true, message: "必填项", trigger: "blur" }],
        lotteryDescription: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        lotteryBackgroundPicUrl: [
          { required: true, message: "必填项", trigger: "change" },
        ],
        lotteryTurntablePicUrl: [
          { required: true, message: "必填项", trigger: "change" },
        ],
        lotteryPointerPicUrl: [
          { required: true, message: "必填项", trigger: "change" },
        ],
        awardLevel: [{ required: true, message: "必填项", trigger: "change" }],
        awardName: [{ required: true, message: "必填项", trigger: "blur" }],
        awardNum: [{ required: true, message: "必填项", trigger: "change" }],
        awardDescription: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        awardProbability: [
          { required: true, message: "必填项", trigger: "blur" },
        ],

        awardSectorRange: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        awardDisplay: [{ required: true, message: "必填项", trigger: "blur" }],
        awardReminderPicUrl: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        sharedTicketNum: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        inviterTicketNum: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };
  },
  mounted() {
    this.lotteryNo = this.$route.query.lotteryNo;
    this.beforeRouter = this.$route.query.beforeRouter;
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.isDtl) {
      this.isDtl = JSON.parse(this.$route.query.isDtl);
    }
    if (this.canEdit) {
      console.log("canEdit");
      this.type = "update";
      document.title = "修改活动";
      this.$route.meta.title = "修改活动";
    } else {
      this.type = "add";
      document.title = "新增活动";
      this.$route.meta.title = "新增活动";
    }

    if (this.type === "update" || this.type === "check") {
      this.getDtl();
    }
    this.getShopSelList();
  },
  methods: {
    async getShopSelList() {
      let res = await shopSelList({});
      if (res.rtn == 1) {
        this.shopListOpt = res.SelectiveStoreList;
      }
    },
    async getDtl() {
      let res = await activityDtl({
        lotteryNo: this.lotteryNo,
      });
      if (res.rtn == 1) {
        console.log(res, "res");

        const {
          storeNo,
          lotteryName,
          shareType,
          endAt,
          beginAt,
          writeoffBeginAt,
          writeoffEndAt,
          initialTicketNum,
          dayLimitNum,

          limitShareDays,
          // totalAwardNum,
          lotteryDescription,
          lotteryBackgroundPicUrl,
          lotteryTurntablePicUrl,
          lotteryPointerPicUrl,
          sharedTicketNum,
          inviterTicketNum,
        } = res.lotteryInfo;

        var { awardInfoList } = res;

        this.form = {
          storeNo,
          lotteryName,

          endAt,
          beginAt,
          writeoffBeginAt,
          writeoffEndAt,
          initialTicketNum,
          dayLimitNum,
          shareType,
          limitShareDays,
          inviterTicketNum,
          sharedTicketNum,
          // totalAwardNum,
          lotteryDescription,
          lotteryBackgroundPicUrl,
          lotteryTurntablePicUrl,
          lotteryPointerPicUrl,
        };

        this.form.awardJSONArray = awardInfoList;
        this.form.awardJSONArray.forEach((item, index) => {
          this.$set(item, "hideUpload3", false);
        });
      }
    },

    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form, "----");
          console.log(this.form.beginAt, this.form.endAt, "time");
          this.form.beginAt = formatDate(new Date(this.form.beginAt));
          this.form.endAt = formatDate(new Date(this.form.endAt));
          this.form.writeoffBeginAt = formatDate(
            new Date(this.form.writeoffBeginAt)
          );
          this.form.writeoffEndAt = formatDate(
            new Date(this.form.writeoffEndAt)
          );

          this.isLoaded = true;
          if (this.type === "add") {
            const res = await activityAdd({
              ...this.form,
            });
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.onBack();
            }
            this.isLoaded = false;
          } else {
            this.form.lotteryNo = this.lotteryNo;
            const res = await activityEdit({
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
      this.$refs.form.resetFields();
      this.form = {
        storeNo: undefined,
        lotteryName: undefined,
        shareType: undefined,
        endAt: undefined,
        beginAt: undefined,
        writeoffBeginAt: undefined,
        writeoffEndAt: undefined,
        initialTicketNum: undefined,
        dayLimitNum: undefined,
        shareType: undefined,
        limitShareDays: undefined,
        inviterTicketNum: undefined,
        sharedTicketNum: undefined,
        // totalAwardNum: undefined,
        lotteryBackgroundPicUrl: undefined,
        lotteryTurntablePicUrl: undefined,
        lotteryPointerPicUrl: undefined,
        awardJSONArray: [
          {
            awardLevel: undefined,
            awardName: undefined,
            awardNum: undefined,
            awardDescription: undefined,
            awardProbability: undefined,
            awardSectorRange: undefined,
            awardReminderPicUrl: undefined,
            awardDisplay: undefined,
            rotationStatus: 1,
          },
        ],
      };
    },
    onBack() {
      this.$router.back(-1);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    _add() {
      // var addItem = JSON.parse(
      //   JSON.stringify(
      //     this.form.awardJSONArray[this.form.awardJSONArray.length - 1]
      //   )
      // );
      var addItem = {
        awardLevel: undefined,
        awardName: undefined,
        awardNum: undefined,
        awardDescription: undefined,
        awardProbability: undefined,
        awardSectorRange: undefined,
        awardReminderPicUrl: undefined,
        awardDisplay: undefined,
        rotationStatus: 1,
      };

      this.form.awardJSONArray.push(addItem);
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    _del(index) {
      if (this.form.awardJSONArray.length > 1) {
        this.form.awardJSONArray.splice(index, 1);
        this.form = JSON.parse(JSON.stringify(this.form));
      }
    },
    _getPicIndex(index) {
      console.log(index, "index");
      this.picIndex = index;
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.form.lotteryBackgroundPicUrl = res.url;
      }
    },
    picUploadSuccess1(res) {
      if (res.rtn == 1) {
        this.form.lotteryTurntablePicUrl = res.url;
      }
    },
    picUploadSuccess2(res) {
      if (res.rtn == 1) {
        this.form.lotteryPointerPicUrl = res.url;
      }
    },
    picUploadSuccess3(res) {
      if (res.rtn == 1) {
        this.form.awardJSONArray[this.picIndex].awardReminderPicUrl = res.url;
        console.log(this.form.awardJSONArray);
      }
    },
    picUploadChange(file, fileList) {
      this.$refs.form.clearValidate("lotteryBackgroundPicUrl");
      this.hideUpload = fileList.length >= this.limitCount;
    },
    picUploadChange1(file, fileList) {
      this.$refs.form.clearValidate("lotteryTurntablePicUrl");
      this.hideUpload1 = fileList.length >= this.limitCount1;
    },
    picUploadChange2(file, fileList) {
      this.$refs.form.clearValidate("lotteryPointerPicUrl");
      this.hideUpload2 = fileList.length >= this.limitCount2;
    },
    picUploadChange3(file, fileList) {
      this.$refs.form.clearValidate(
        "awardJSONArray." + this.picIndex + ".awardReminderPicUrl"
      );

      this.$set(
        this.form.awardJSONArray[this.picIndex],
        "hideUpload3",
        fileList.length >= this.limitCount3
      );

      this.form = JSON.parse(JSON.stringify(this.form));
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.form.lotteryBackgroundPicUrl = undefined;
      this.rules.lotteryBackgroundPicUrl = [
        { required: true, message: "必填项", trigger: "change" },
      ];
    },
    handleRemove1(file, fileList) {
      this.hideUpload1 = fileList.length >= this.limitCount1;
      this.form.lotteryTurntablePicUrl = undefined;
      this.rules.lotteryTurntablePicUrl = [
        { required: true, message: "必填项", trigger: "change" },
      ];
    },
    handleRemove2(file, fileList) {
      this.hideUpload2 = fileList.length >= this.limitCount2;
      this.form.lotteryTurntablePicUrl = undefined;
      this.rules.lotteryPointerPicUrl = [
        { required: true, message: "必填项", trigger: "change" },
      ];
    },
    handleRemove3(file, fileList) {
      this.$set(
        this.form.awardJSONArray[this.picIndex],
        "hideUpload3",
        fileList.length >= this.limitCount3
      );
      this.form.awardJSONArray[this.picIndex].awardReminderPicUrl = undefined;
      this.rules.awardReminderPicUrl = [
        { required: true, message: "必填项", trigger: "change" },
      ];
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    change(evt) {
      console.log(evt, "===evt===");
      this.$forceUpdate();
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
  // padding-bottom: 20px;
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
.btnsWrap {
  zoom: 1;
  padding: 10px 0;
}
.btnsWrap:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.delBtn {
  float: right;
  width: 110px;
  height: 32px;
  margin-right: 20px;
  border-radius: 3px;
  background-color: rgba(254, 238, 238, 100);
  color: rgba(242, 97, 97, 100);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(242, 97, 97, 100);
}
.addBtn {
  float: right;
  width: 100px;
  height: 32px;
  border-radius: 3px;
  background-color: rgba(226, 152, 54, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(226, 152, 54, 100);
}
.avatar-uploader {
  margin-top: 8px;
  .avatar {
    width: 120px;
    height: 120px;
    vertical-align: middle;
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
</style>

<style>
.hide .el-upload--picture-card {
  display: none;
}
</style>