<template>
    <div id="main">
      <topheader title="我的喵喵"></topheader>
      <div id="content">
        <Login />
      </div>
      <tab></tab>
    </div>
</template>

<script>
  import topheader from '@/components/header'
  import tab from "@/components/tabBar"
  import Login from "@/components/Login"
    export default {
        name: 'mine',
        created() {
        },
        methods: {},
        computed: {},
        components: {
          topheader,
          tab,
          Login
        }
    }
</script>

<style scoped>

</style>
