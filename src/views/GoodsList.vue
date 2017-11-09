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
      <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" v-on:click="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter价格筛选 -->
      <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" v-on:click="allShow">All</a></dd>
          <dd v-for="(item,index) in priceFilter":key="index">
            <a href="javascript:void(0)" v-on:click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice+"-"+item.endPrice}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <!-- 商品橱窗图 -->
      <div class="accessory-list-wrap">
        <!-- <div class="accessory-list col-4">
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
            <ul>
              <li v-for="(item,index) in goodsList":key="index">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/img/'+item.productImage" alt=""></a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> -->
          <div class="accessory-list col-4" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
            <ul>
              <li v-for="(item,index) in goodsList":key="index">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/img/'+item.productImage" alt=""></a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <img class="loading-img" src="./../assets/loading-spinning-bubbles.svg" alt="loading..." v-show="loading">
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
          startPrice:0,
          endPrice:100
        },
        {
          startPrice:100,
          endPrice:500
        },
        {
          startPrice:500,
          endPrice:1000
        },
        {
          startPrice:1000,
          endPrice:5000
        }
      ],
      priceChecked:'all',
      filterBy:false,
      overLayFlag:false,
      page:1,
      pageSize:8,
      sortFlag:true,
      busy:false,
      loading:false
    };
  },
  components: {
    NavHeader: NavHeader,
    NavFooter: NavFooter,
    NavBread: NavBread
  },
  mounted:function(){this.getGoodsList();},
  methods:{
    getGoodsList(flag){
    var param = {
      page:this.page,
      pageSize:this.pageSize,
      sort:this.sortFlag?1:-1,
      priceLevel:this.priceChecked
    }
      this.loading = true;
    axios.get('/goods',{params:param}).then(res=>{  //axios不支持跨域请求，所以需要一个代理
      var res = res.data;
      this.loading = false;
      if(res.status=='0'){
        if(flag){
          this.goodsList = this.goodsList.concat(this.goodsList = res.result.list);
          if(res.result.count==0){
            this.busy = true;
          }else{
            this.busy = false;
          }
        }else{
          this.goodsList = res.result.list;
        }
        
      }else{
        this.goodsList = [];
      }
    })
 
  },
  sortGoods(){
    this.sortFlag = ! this.sortFlag;
    this.page = 1;
    this.getGoodsList();
    this.clickLoadMore();
  },
    showFilterPop(){
      this.filterBy = true;
      this.overLayFlag = true;
    },
    overLayClose(){
      this.filterBy = false;
      this.overLayFlag = false;
    },
    closePop(){
      this.filterBy = false;
      this.overLayFlag = false;
    },
    setPriceFilter(index){
      this.priceChecked = index;
      this.closePop();
      this.page = 1;
      this.clickLoadMore();
      this.getGoodsList();
    },
    loadMore(){
      this.busy=true;
      setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
      },500);
    },
    clickLoadMore(){
       this.busy=false;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
      },500);
    },
    allShow(){
      this.priceChecked='all';
      this.page = 1;
      this.getGoodsList();
      this.clickLoadMore();
    }
  }
};
</script>
