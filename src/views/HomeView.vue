<template>
  <div class="home">
    <h2>
      电商后台管理系统 <el-button type="info" @click="del">退出登录</el-button>
    </h2>
    <el-row style="">
      <el-col :span="3">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#21e985"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-submenu
            :index="item.order.toString()"
            v-for="(item, i) in tabs"
            :key="i"
          >
            <template slot="title">
              <i
                :class="
                  i == 0
                    ? 'el-icon-user'
                    : i == 1
                    ? 'el-icon-s-platform'
                    : i == 2
                    ? 'el-icon-s-cooperation'
                    : i == 3
                    ? 'el-icon-s-order'
                    : i == 4
                    ? 'el-icon-s-promotion'
                    : ''
                "
              ></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="ele.path"
                v-for="(ele, ind) in item.children"
                :key="ind"
                @click="click(ele.authName, item.authName)"
              >
                <i class="el-icon-sunset"></i>
                <span slot="title">{{ ele.authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="right">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ ee }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ e }}</el-breadcrumb-item>
          </el-breadcrumb>
          <i style="margin:30px" v-show="$router.currentRoute.name=='home'" class="el-icon-sunset"> 爱你呦</i>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [],
      isCollapse: false,
      e: "用户管理",
      ee: "用户列表",
    };
  },
  methods: {
    del() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    click(e, ee) {
      this.e = e;
      this.ee = ee;
      console.log(e, ee);
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.$axios
      .get("menus", { touken: sessionStorage.getItem("token") })
      .then((res) => {
        console.log(res);
        this.tabs = res.data.data;
      });
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  h2 {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: rgb(39, 39, 39);
    color: #fff;
  }
  .right {
    background-color: #fff;
  }
  .el-row {
    width: 100%;
    height: 758px;
    .el-col-3 {
      height: 100%;
      background-color: #545c64;
    }
    .el-col-21 {
      padding: 15px;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
