<template>
  <div>
    <div class="box">
      <div class="boxs">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          type="index"
          style="width: 100%"
        >
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column property="authName" label="权限名称">
          </el-table-column>
          <el-table-column property="path" label="权限路径"> </el-table-column>

          <el-table-column
            prop="level"
            label="权限等级"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.level === '0'
                    ? 'primary'
                    : scope.row.level === '1'
                    ? 'success'
                    : 'warning'
                "
                disable-transitions
                >{{
                  scope.row.level == 0
                    ? "一级"
                    : scope.row.level == 1
                    ? "二级"
                    : "三级"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.$axios.get("rights/list").then((res) => {
      console.log(res);
      this.tableData = res.data.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  height: 90vh;
  overflow: scroll;
  
  .boxs {
    padding: 20px;

    margin: auto;
    box-shadow: 0 0px 10px 0px #ccc;
  }
}
</style>
