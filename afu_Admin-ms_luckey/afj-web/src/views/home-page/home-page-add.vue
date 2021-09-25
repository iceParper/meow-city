<template>
  <div class="app-container">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="form"
      label-position="right"
      label-width="120px"
      style="width: calc(100% - 480px); margin-left:240px;"
    >
      <el-form-item label="标题" prop="name">
        <el-input v-model="form.name" :maxlength="16" />
      </el-form-item>
      <el-form-item label="品牌" prop="brandUuid">
        <el-select
          v-model="form.brandUuid"
          remote
          reserve-keyword
          filterable
          :remote-method="brandRemoteMethod"
          placeholder="输入品牌名称"
          :loading="brandLoading"
          style="width: 200px"
          class="filter-item"
          @change="brandChange"
        >
          <el-option
            v-for="item in brandList"
            :key="item.brandUuid"
            :label="item.brandName"
            :value="item.brandUuid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专题类型" prop="dataType">
        <el-select
          v-model="form.dataType"
          placeholder="专题类型"
          style="width: 200px"
          class="filter-item"
          @change="dataTypeChange"
        >
          <el-option
            v-for="item in specialTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专题选择" prop="specialUuid">
        <el-select v-model="form.specialUuid" style="width: 200px" placeholder="请选择专题">
          <el-option
            v-for="item in specialList"
            :key="item.specialUuid"
            :label="item.specialName"
            :value="item.specialUuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          :maxlength="128"
          :autosize="{ minRows: 2, maxRows: 4}"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoaded" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { specialTypeOptions } from "@/models";
import { brandList } from "@/api/brand";
import { specialList } from "@/api/special";
import { homePageAdd } from "@/api/homePage";
export default {
  name: "HomePageAdd",
  data() {
    return {
      isLoaded:false,
      form: {
        name: "",
        dataType: "",
        specialUuid: "",
        brandUuid: "",
        remark: ""
      },
      specialTypeOptions,
      brandList: [],
      specialList: [],
      brandLoading: false,
      rules: {
        name: [{ required: true, message: "必填项", trigger: "blur" }],
        brandUuid: [{ required: true, message: "必填项", trigger: "blur" }],
        dataType: [{ required: true, message: "必填项", trigger: "blur" }],
        specialUuid: [{ required: true, message: "必填项", trigger: "blur" }],
        remark: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      specialLoad: false
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.isLoaded = true
          const res = await homePageAdd(this.form);
          if (res.result === "0") {
            this.$message.success(res.description);
            this.$router.push({ name: "HomePage" });
          }
          if(res.result){
            this.isLoaded = false
          }
        }
      });
    },
    async getBrandList(brandName) {
      const res = await brandList({
        page: 1,
        pageSize: 10000,
        brandStatus: "",
        brandName: brandName
      });
      if (res.result === "0") {
        this.brandList = res.brandList;
      }
    },
    brandRemoteMethod(query) {
      if (query !== "") {
        this.brandLoading = true;
        this.getBrandList(query);
        setTimeout(() => {
          this.brandLoading = false;
        }, 200);
      }
    },
    brandChange() {
      if (this.form.dataType) {
        this.$nextTick(() => {
          this.getSpecialList();
          this.form.specialUuid = "";
        });
      }
    },
    dataTypeChange() {
      if (this.form.brandUuid) {
        this.$nextTick(() => {
          this.getSpecialList();
          this.form.specialUuid = "";
        });
      }
    },
    async getSpecialList() {
      const res = await specialList({
        brandUuid: this.form.brandUuid,
        specialAttributes: this.form.dataType,
        specialName: "",
        specialStatus: "",
        page: 1,
        pageSize: 10000
      });
      if (res.result === "0") {
        this.specialList = res.specialList;
      }
    },
    onCancel() {
      this.$router.push({ name: "HomePage" });
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.form = {
        name: "",
        dataType: "",
        specialUuid: "",
        brandUuid: "",
        remark: ""
      };
    }
  }
};
</script>