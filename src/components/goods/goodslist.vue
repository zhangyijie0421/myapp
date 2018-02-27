<template>
  <div class="tmpl">
    <el-row>
      <el-col :span="24">
        <!-- 面包屑导航组件 -->
        <div class="abread bt-line">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="abread bt-line">
          <el-row>
            <el-col :span="6">
              <!-- 按钮和搜索框 -->
              <div>
                <el-button size="small">全选</el-button>
                <router-link to="/admin/goodsadd">
                  <el-button size="small">新增</el-button>
                </router-link>
                <el-button size="small">删除</el-button>
              </div>
            </el-col>
            <el-col :offset="12" :span="5">
              <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" :on-icon-click="getlist">
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- 表格区域 -->
        <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%">
          <!-- 这一列是一个多选框 -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="标题">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" placement="right-end">
                <div slot="content">
                  <img :src="scope.row.imgurl" height="150" width="150" alt="">
                </div>
                <a href="#">{{scope.row.title}}</a>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="categoryname" label="所属类别" width="100">
          </el-table-column>
          <el-table-column prop="stock_quantity" label="库存" width="100">
          </el-table-column>
          <el-table-column prop="market_price" label="市场价" width="100">
          </el-table-column>
          <el-table-column prop="sell_price" label="销售价" width="100">
          </el-table-column>
          <el-table-column label="属性" width="100">
            <!-- scope代表的是当前：data中指向的某个对象，可以通过scope -->
            <template scope="scope">
              <!-- 取得的是list对象中的某个属性值 -->
              <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlinght')}"></i>
              <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlinght')}"></i>
              <i v-bind="{class:'el-icon-star-on '+(scope.row.is_hot==1?'':'unlinght')}"></i>
            </template>
          </el-table-column>
          <!-- 属于当前列的模板 -->
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <a href="#">修改</a>
            </template>
          </el-table-column>
          <!-- 表示当前列的数据来源于el-table中 -->
          <!-- <el-table-column prop="name" label="姓名" width="120">
          </el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- 分页 -->
        <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[1,10, 20, 30, 40]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
        </el-pagination>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  // import axios from 'axios';
  export default {
    data() {
      return {
        pageSize: 10,//定义一个分页组件中页容量，默认是10条；
        pageIndex: 1,//定义一个分页中的页索引，默认是第一页；
        totalcount: 0,//返回商品的数据总条数
        searchValue: '',//搜索条件
        list: []//存放商品数据的数组
      }
    },
    methods: {

      //2分页相关事件
      // 获取当前页面索引
      pageIndexChange(currentPage) {
        // console.log(currentPage);
        this.pageIndex = currentPage;
        // 重新获取数据
        this.getlist();
      },

      // 获取当前页面的页面容量
      pageSizeChange(size) {
        console.log(size)
        this.pageSize = size;
        // 重新获取数据
        this.getlist();
      },

      getlist() {
        // 定义url路径
        var url = '/admin/goods/getlist?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchValue;

        this.$ajax.get(url).then(res => {
          this.list = res.data.message;
          this.totalcount = res.data.totalcount;
        });
      }
    },
    mounted() {
      //当页面进入的时候就请求数据
      this.getlist();
    }
  }
</script>
<style scoped>
  .unlinght {
    color: rgba(0, 0, 0, 0.3);
  }
</style>