<template>
    <div>
<nav-header></nav-header>
<nav-bread>
    <span slot="bread">Goods</span>
</nav-bread>

<!-- 价格排序 -->
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur">Default</a>
      <!-- 向下箭头 svg icon -->
      <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" v-on:click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter价格筛选 -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" v-on:click="priceChecked='all'">All</a></dd>
          <dd v-for="(item,index) in priceFilter":key="index">
            <a href="javascript:void(0)" v-on:click="priceChecked=index" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice+"-"+item.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <!-- 商品橱窗图 -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList":key="index">
              <div class="pic">
                <a href="#"><img v-bind:src="'/static/img/'+item.productImg" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.productPrice}}</div>
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
<div class="md-overlay" v-show="overLayFlag" v-on:click="overLayClose"></div>
<nav-footer></nav-footer>
</div>
</template>

<script type="text/ecmascript-6">
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import "./../assets/css/login.css";

import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import axios from "axios";

export default {
  data() {
    return {
      goodsList:[],
      priceFilter:[
        {
          startPrice:0.00,
          endPrice:100.00
        },
        {
          startPrice:100.00,
          endPrice:500.00
        },
        {
          startPrice:500.00,
          endPrice:1000.00
        },
        {
          startPrice:1000.00,
          endPrice:2000.00
        }
      ],
      priceChecked:'all',
      filterBy:false,
      overLayFlag:false
      
    };
  },
  components: {
    NavHeader: NavHeader,
    NavFooter: NavFooter,
    NavBread: NavBread
  },
  mounted:function(){this.getGoodsList();},
  methods:{
    getGoodsList(){
    axios.get('/goods').then(res=>{
      var res = res.data;
      this.goodsList = res.result;
    })
  },
    showFilterPop(){
      this.filterBy = true;
      this.overLayFlag = true;
    },
    overLayClose(){
      this.filterBy = false;
      this.overLayFlag = false;
    }
  }
};
</script>
