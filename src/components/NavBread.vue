<template>
    <div>
        <!-- 面包屑导航 -->
<div class="nav-breadcrumb-wrap">
  <div class="container">
    <nav class="nav-breadcrumb">
      <a href="/">Home</a>
      <slot name="bread"></slot>
    </nav>
  </div>
</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
