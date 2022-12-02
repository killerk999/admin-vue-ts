<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div class="login-container flex-center">
    <!-- <SwitchDark class="dark" /> -->
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Vue-Admin</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
