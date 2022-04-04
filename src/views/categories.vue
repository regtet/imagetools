<template>
  <div class="box">
    <div class="boxs">
      <el-button type="primary">添加分类</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="cat_name"  label="分类名称">
         
        </el-table-column>
        <el-table-column prop="name" label="是否有效">
          <template slot-scope="scope">
            <i class="el-icon-circle-check" style="color:green"></i>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="排序">
          <template slot-scope="scope">

            <el-button :type="scope.row.cat_level==0?'info':scope.row.cat_level==1?'primary':'danger'" size="small" plain >{{scope.row.cat_level==0?"一级":scope.row.cat_level==1?"二级":'三级'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" plain >编辑</el-button>
            <el-button type="danger" size="small" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
          currentPage4: 1, //当前页
      total: 0, //总页数
      pagesize: 1, //每页几个
      tableData: [
       
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
       
      ],
     
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.getData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getData();
    },
    getData(){
      this.$axios
        .get(
          "categories?query=&pagenum=" +
            this.currentPage4 +
            "&pagesize=" +
            this.pagesize +
            ""
        )
        .then((res) => {
          if (res.data.meta.status == 200) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.result;
            console.log(this.tableData,111);
          }
        });
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {
      this.getData()
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  padding-top: 0;
  height: 90vh;
  overflow: scroll;
  padding-bottom: 300px;
  .boxs {
    padding: 20px;
    margin: 20px auto;
    box-shadow: 0 0px 10px 0px #ccc;
  }
}
</style>
