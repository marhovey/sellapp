<template>
  <div class="ratings" ref="ratings">
    <div>
      <div class="title border-1bott">
        <div class="lef border-1rig">
          <h3 class="score">{{seller.score}}</h3>
          <h4>综合评分</h4>
          <p>高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="rig">
          <div class="serv clearfix"><span class="word">服务态度</span><span class="score"><star :size="36" :score="seller.serviceScore"></star></span><span>{{seller.serviceScore}}</span></div>
          <div class="foodScore clearfix"><span class="word">美食评分</span><span class="score"><star :size="36" :score="seller.foodScore"></star></span><span>{{seller.foodScore}}</span></div>
          <div class="delitime clearfix"><span class="word">送达时间</span><span class="time">{{seller.deliveryTime}}分钟</span></div>
        </div>
      </div>
      <div class="content border-1top">
        <selectratings @onlytext="onlyText" @select="selectRating" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></selectratings>
        <div class="rating-wrapper">
          <ul v-show="ratings && ratings.length">
            <li v-for="rating in ratings" v-show="needShow(rating.text,rating.rateType)">
              <div class="list-title border-1bott">
                <img :src="rating.avatar" alt="" width="28" height="28" class="avatar">
                <div class="name">
                  <p class="clearfix name-tit"><span class="lef">{{rating.username}}</span><span class="rig">{{rating.rateTime | timeTrim}}</span></p>
                  <div class="clearfix deliti"><span class="starp"><star :size="36" :score="rating.score"></star></span><span>{{rating.deliveryTime}}分钟送达</span></div>
                  <p class="text">{{rating.text}}</p>
                  <p class="recom clearfix" v-show="rating.rateType===0"><span class="up"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-thumb_up"></use></svg></span><span v-for="recomd in rating.recommend">{{recomd}}</span></p>
                  <p class="recom clearfix" v-show="rating.rateType===1"><span class="down"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-thumb_down"></use></svg></span><span v-for="recomd in rating.recommend">{{recomd}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star';
import selectratings from '@/components/selectRatings/selectRatings';
import BScroll from 'better-scroll';
import {trimTime} from '@/common/js/trimTime.js';
const ERR_OK = 0;
const AllRatings = 2;
  export default {
    name: 'ratings',
    components: {
      'selectratings': selectratings,
      'star': star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        onlyContent: true,
        selectType: AllRatings
      };
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      onlyText () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      selectRating (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (text, type) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === AllRatings) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      timeTrim (times) {
        let trim = trimTime(times).Y + '-' + trimTime(times).M + '-' + trimTime(times).D + '   ' + trimTime(times).H + ':' + trimTime(times).min;
        return trim;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/index.styl'
  .ratings
    background-color: #f3f5f7
    position: absolute
    width: 100%
    top: 174px
    bottom: 0
    overflow: hidden
    .title
      display: flex
      padding: 18px 0
      background-color: #fff
      border-1bott(rgba(7,17,27,.1))
      margin-bottom: 18px
      .lef
        flex: 0 0 138px
        text-align: center
        border-1rig(rgba(7,17,27,.1))
        h3
          font-size: 24px
          color: rgb(255,153,0)
          line-height: 28px
        h4
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
          margin: 6px 0 8px
        p
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
          margin-bottom: 6px
      .rig
        flex: 1
        padding: 0 24px
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 18px
        .serv,.foodScore
          margin-bottom: 8px
        span
          float: left
          &.word,&.score
            margin-right: 2px
          &.time
            color: rgb(147,153,159)
    .content
      background-color: #fff
      border-1top(rgba(7,17,27,.1))
      li
        padding: 18px 18px 0
      .list-title
        display: flex
        padding-bottom: 18px
        border-1bott(rgba(7,17,27,.1))
        img
          border-radius: 50%
          flex: 0 0 28px
          margin-right: 12px
        .name
          flex: 1
          .name-tit
            font-size: 10px
            color: rgb(7,17,27)
            line-height: 12px
            margin-bottom: 4px
            .lef
              float: left
            .rig
              float: right
              color: rgb(147,153,159)
          .deliti
            margin-bottom: 6px
            span
              float: left
              color: rgb(147,153,159)
              &.starp
                margin-right: 6px
          .text
            font-size: 12px
            line-height: 18px
            color: rgb(7,17,27)
          .recom
            margin-top: 8px
            span
              float: left
              color: rgb(147,153,159)
              margin-right: 4px
              font-size: 10px
              line-height: 24px
              padding: 0 6px
              border: 1px solid rgb(147,153,159)
              max-width: 30px
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
            .up
              font-size: 24px
              border: none
              color: rgb(0,160,220)
            .down
              font-size: 24px
              border: none
</style>
