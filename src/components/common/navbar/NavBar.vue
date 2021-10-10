<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
         <div class="center"><slot name="center"></slot></div>
          <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    name: "NavBar"
}
</script>
<style>
   .nav-bar {
    display: flex;
    height: 43px;
    line-height: 43px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left, .right {
    width: 80px;
  }

  .center {
    flex: 1;
  }
</style>