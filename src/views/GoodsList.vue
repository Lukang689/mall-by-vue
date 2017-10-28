<template>
    <div>
<nav-header></nav-header>
<!-- 面包屑导航 -->
<div class="nav-breadcrumb-wrap">
  <div class="container">
    <nav class="nav-breadcrumb">
      <a href="/">Home</a>
      <span>Goods</span>
    </nav>
  </div>
</div>

<!-- 价格排序 -->
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <!-- 向下箭头 svg icon -->
      <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter价格筛选 -->
      <div class="filter stopPop" id="filter">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)">All</a></dd>
          <dd>
            <a href="javascript:void(0)">0 - 100</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <!-- 商品橱窗图 -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li>
              <div class="pic">
                <a href="#"><img src="./../assets/img/1.jpg" alt=""></a>
              </div>
              <div class="main">
                <div class="name">XX</div>
                <div class="price">XX</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<nav-footer></nav-footer>
</div>
</template>

<script type="text/ecmascript-6">
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import "./../assets/css/login.css";

import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";

export default {
  data() {
    return {};
  },
  components: {
    NavHeader: NavHeader,
    NavFooter: NavFooter
  }
};
</script>
