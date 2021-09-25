<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="专题名称">
              <el-input v-model="listQuery.specialName" placeholder="专题名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专题类型">
              <el-select v-model="listQuery.dataType" placeholder="专题类型" style="width: 200px" class="filter-item">
                <el-option v-for="item in specialTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌">
              <el-select v-model="listQuery.brandUuidList" multiple placeholder="选择品牌" style="width: 200px" class="filter-item">
                <el-option v-for="item in brandList" :key="item.brandUuid" :label="item.brandName" :value="item.brandUuid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="listQuery.dataStatus" placeholder="状态" clearable style="width: 200px" class="filter-item">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                查询
              </el-button>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="handleReset">
                重置
              </el-button>
              <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
                导出
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="handle-container">
        <el-button class="filter-item" size="mini" icon="el-icon-upload2" type="primary" @click="handleAllStand('up')">
          批量上架
        </el-button>
        <el-button class="filter-item" size="mini" icon="el-icon-download" type="primary" @click="handleAllStand('down')">
          批量下架
        </el-button>
        <el-button v-waves size="mini" class="filter-item" type="danger" icon="el-icon-delete" @click="handleAllDelete">
          批量删除
        </el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" style="float: right;" @click="handleAdd">
          新增
        </el-button>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column label="专题名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.specialName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专题类型" align="center">
        <template slot-scope="{row}">
          <span>{{ filterType(row.dataType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属品牌" align="center">
        <template slot-scope="{row}">
          <span>{{ row.brandName || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dataStatus === 1 ? '上架' : '下架' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <div style="margin-bottom: 8px">
            <el-button size="mini" type="primary" @click="handleUp(row)">
              上移
            </el-button>
          </div>
          <div style="margin-bottom: 8px">
            <el-button size="mini" type="primary" @click="handleDown(row)">
              下移
            </el-button>
          </div>
          <div style="margin-bottom: 8px" v-if="row.dataStatus === 2">
            <el-button size="mini" type="primary" @click="handleStand('up',row)">
              上架
            </el-button>
          </div>
          <div style="margin-bottom: 8px" v-else>
            <el-button size="mini" type="primary" @click="handleStand('down',row)">
              下架
            </el-button>
          </div>
          <div>
            <el-button size="mini" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { statusOptions, textMap, specialTypeOptions } from '@/models'
import notify from 'mixins/notify'
import { homePageList, homePageMoveUpOrDown, homePageUpdatestatus, homePageDelete, homePageBatchUpOrDown, homePageBatchDel } from '@/api/homePage'
import { brandList } from '@/api/brand'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HomePage',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      selectList: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        dataType: '',
        specialName: '',
        brandUuidList: [],
        dataStatus: ''
      },
      statusOptions,
      specialTypeOptions,
      textMap,
      brandList: [],
      downloadLoading: false
    }
  },
  created() {
    this.getBrandList()
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const res = await homePageList(this.listQuery)
      if (res.result === '0') {
        this.list = res.homePageList
        this.total = res.total
      }
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    async getBrandList() {
      const res = await brandList({
        brandStatus: '',
        brandName: '',
        page: 1,
        pageSize: 10000
      })
      if (res.result === '0') {
        this.brandList = res.brandList
      }
    },
    // 筛选专题类型
    filterType(val) {
      const type = this.specialTypeOptions.filter(item => {
        return item.value === val
      })
      if (type.length > 0) {
        return type[0].label || '--'
      } else {
        return '--'
      }
    },
    // 新增首页
    handleAdd() {
      this.$router.push({ name: 'HomePageAdd' })
    },
    handleSelectionChange(val) {
      this.selectList = val
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        pageSize: 20,
        dataType: '',
        specialName: '',
        brandUuidList: [],
        dataStatus: ''
      }
      this.getList()
    },
    // 上移
    async handleUp(row) {
      const res = await homePageMoveUpOrDown({
        handleType: '1',
        homeDataUuid: row.homeDataUuid
      })
      if (res.result === '0') {
        this.$message.success(res.description)
        this.getList()
      }
    },
    // 下移
    async handleDown(row) {
      const res = await homePageMoveUpOrDown({
        handleType: '2',
        homeDataUuid: row.homeDataUuid
      })
      if (res.result === '0') {
        this.$message.success(res.description)
        this.getList()
      }
    },
    // 批量上传删除
    handleAllDelete(row) {
      if (!(this.selectList && this.selectList.length)) {
        return this.$message('请选择专题')
      }
      const homeDataUuidList = this.selectList.map(item => {
        return item.homeDataUuid
      })
      this.$confirm('此操作将删除该专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await homePageBatchDel({
          homeDataUuidList: homeDataUuidList
        })
        if (res.result === '0') {
          this.$message.success(res.description)
          this.getList()
        }
      }).catch(() => {
     
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await homePageDelete({
          homeDataUuid: row.homeDataUuid
        })
        if (res.result === '0') {
          this.$message.success(res.description)
          this.getList()
        }
      }).catch(() => {
       
      })
    },
    // 上下架
    handleStand(type, row) {
      if (type === 'down') {
        this.$confirm('此操作将下架该专题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.questStand(type, row)
        }).catch(() => {
        
        })
      } else {
        this.questStand(type, row)
      }
    },
    // 批量上下架
    handleAllStand(type) {
      if (!(this.selectList && this.selectList.length)) {
        return this.$message('请选择专题')
      }
      if (type === 'down') {
        this.$confirm('此操作将下架该专题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.questAllStand(type)
        }).catch(() => {
         
        })
      } else {
        this.questAllStand(type)
      }
    },
    // 批量上下架接口
    async questAllStand(type) {
      const homeDataUuidList = this.selectList.map(item => {
        return item.homeDataUuid
      })
      const res = await homePageBatchUpOrDown({
        homeDataUuidList: homeDataUuidList,
        dataStatus: type === 'up' ? '1' : '2'
      })
      if (res.result === '0') {
        this.$message({
          type: 'success',
          message: res.description
        })
        this.getList()
      }
    },
    // 上下架接口
    async questStand(type, row) {
      const res = await homePageUpdatestatus({
        homeDataUuid: row.homeDataUuid,
        dataStatus: type === 'up' ? '1' : '2'
      })
      if (res.result === '0') {
        this.$message({
          type: 'success',
          message: res.description
        })
        this.getList()
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    }
  }
}

</script>