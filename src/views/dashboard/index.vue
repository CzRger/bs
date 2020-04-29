<template>
  <div class="dashboard">
    <div class="layer layer-1">
      <single-line :data="lines"/>
    </div>
    <div class="layer layer-2">
sssssssssssssss
    </div>
    <div class="layer layer-3">
      <div class="layer-3-block-1">
ssssssssssssss
      </div>
      <div class="layer-3-block-2">
sssssssssssss
      </div>
    </div>
  </div>
</template>

<script>



  import SingleLine from "../common/components/echarts/line/single-line";
  export default {
    components: {
      SingleLine

    },
    data() {
      return {
        lines: [
          [
            "2000-06-05",
            116
          ],[
            "2000-06-05",
            116
          ],[
            "2000-06-05",
            116
          ]
        ]
      }
    },
    mounted() {

    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  $item-space: 25px;
  $header-height: 20px;

  @mixin flex-center-space-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @mixin header {
    font: 12px/1.14 arial, \5b8b\4f53;
    font-family: 微软雅黑;
    width: 100%;
    height: $header-height;
    font-size: 18px;
    color: #444;
    margin-bottom: $item-space;
  }

  @mixin block-item {
    background: #FFFFFF;
    box-shadow: 0 0 3px 3px #ececec;
    border-radius: 3px;

    .header {
      @include header;
    }
  }

  .dashboard {
    width: 100%;
    padding-top: $item-space;
    padding-bottom: $item-space;

    background-color: $element-background-color-base;
    /*TODO 2019-10-15 quan*/
    .square {
      width: 10px;
      height: 10px;
      border: 5px #FF1821 solid;
      border-radius: 200px;
      margin: 0;
    }

    .layer {
      width: 1500px;
      margin: 0 auto;
    }

    .layer-1 {
      height: 345px;
      margin-bottom: $item-space;
      @include flex-center-space-between;

      $block-1-w: 290px;
      &-block-1 {
        width: $block-1-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content {
          width: 251px;
          height: 247px;
          position: relative;

          .item-1 {
            width: 240px;
            height: 47px;
            line-height: 47px;
            padding: 0 20px;
            position: absolute;
          }
          .item-2 {
            width: 237px;
            position: absolute;
            left: 7px;
            top: 184px;
            text-align: center;
          }
          .name {
            font-size: 14px;
            color: #fff;
            float: left;
          }
          .value {
            font-size: 22px;
            color: #fff;
            float: right;
          }
          .base {
            left: 7px;
            top: 3px;
          }
          .theme {
            left: 7px;
            top: 65px;
          }
          .dept {
            left: 7px;
            top: 127px;
          }
          .dept-state {
            table {
              width: 100%;

              p {
                font-size: 14px;
                color: #6c6c6d;
              }

              h1 {
                font-size: 22px;
                color: #666;
                margin-top: 5px;
              }
            }
          }

        }
      }

      $block-2-w: 265px;
      &-block-2 {
        width: $block-2-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        &-layer {
          $p-color: #9B9B9B;
          $num-color: #666;
          $num-font-family: 微软雅黑;

          &-1 {
            width: calc(100%);
            height: 180px;
            .echarts {
              width: calc(100%);
              height: calc(100%);
            }
          }
          &-2 {
            width: calc(100%);
            height: 40px;
            &-block-1 {
              float: left;
              height: calc(100%);
              width: calc(50%);
              &-block-1 {
                float: left;
                height: calc(100%);
                width: 20px;
                > p {
                  margin-top: 10px;
                }
                .square {
                  border: 5px #6ABAF7 solid;
                }
              }
              &-block-2 {
                float: left;
                height: calc(100%);
                width: calc(100% - 20px);
                > p {
                  margin: 0;
                  font-size: 14px;
                  color: $p-color;
                }
                .num {
                  font-weight: bold;
                  font-size: 18px;
                  font-family: $num-font-family;
                  color: $num-color;
                }
              }
            }
            &-block-2 {
              float: left;
              height: calc(100%);
              width: calc(50%);
              &-block-1 {
                float: left;
                height: calc(100%);
                width: 20px;
                > p {
                  margin-top: 10px;
                }
                .square {
                  border: 5px #6E6BFF solid;
                }
              }
              &-block-2 {
                float: left;
                height: calc(100%);
                width: calc(100% - 20px);
                > p {
                  margin: 0;
                  font-size: 14px;
                  color: $p-color;
                }
                .num {
                  font-weight: bold;
                  font-size: 18px;
                  font-family: $num-font-family;
                  color: $num-color;
                }
              }
            }
          }
          &-3 {
            width: calc(100%);
            height: 40px;
            margin-top: 10px;
            &-block-1 {
              float: left;
              height: calc(100%);
              width: calc(50%);
              &-block-1 {
                float: left;
                height: calc(100%);
                width: 20px;
                > p {
                  margin-top: 10px;
                }
                .square {
                  border: 5px #F5762D solid;
                }
              }
              &-block-2 {
                float: left;
                height: calc(100%);
                width: calc(100% - 20px);
                > p {
                  margin: 0;
                  font-size: 14px;
                  color: $p-color;
                }
                .num {
                  font-weight: bold;
                  font-size: 18px;
                  font-family: $num-font-family;
                  color: $num-color;
                }
              }
            }
            &-block-2 {
              float: left;
              height: calc(100%);
              width: calc(50%);
              &-block-1 {
                float: left;
                height: calc(100%);
                width: 20px;
                > p {
                  margin-top: 10px;
                }
                .square {
                  border: 5px #40CEB8 solid;
                }
              }
              &-block-2 {
                float: left;
                height: calc(100%);
                width: calc(100% - 20px);
                > p {
                  margin: 0;
                  font-size: 14px;
                  color: $p-color;
                }
                .num {
                  font-family: $num-font-family;
                  color: $num-color;
                }
              }
            }
          }
        }
      }

      $block-3-w: 440px;
      &-block-3 {
        width: $block-3-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content {
          width: 402px;
          height: 247px;
          position: relative;
          color: #fff;

          .converge-value {
            font-size: 26px;
            position: absolute;
            left: 40px;
            top: 20px;
          }
          .converge-name {
            font-size: 14px;
            position: absolute;
            left: 40px;
            top: 55px;
          }
          .name {
            width: 128px;
            text-align: center;
            font-size: 14px;
            color: #6c6c6d;
            position: absolute;
          }
          .value {
            font-size: 22px;
            color: #fff;
            position: absolute;
            width: 128px;
            text-align: center;
          }

          .db-name {
            left: 7px;
            top: 105px;
          }
          .db-value {
            left: 7px;
            top: 190px;
          }
          .file-name {
            left: 137px;
            top: 105px;
          }
          .file-value {
            left: 137px;
            top: 190px;
          }
          .interface-name {
            left: 267px;
            top: 105px;
          }
          .interface-value {
            left: 267px;
            top: 190px;
          }
        }
      }

      &-block-4 {
        width: calc(100% - #{$block-1-w} - #{$block-2-w} - #{$block-3-w} - 3 * #{$item-space});
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content-item {
          width: calc(100%);
          height: 35px;
          margin-bottom: 20px;

          .title {
            height: 15px;
            font-size: 14px;
            margin-bottom: 5px;

            .name {
              float: left;
            }
            .value {
              float: right;
            }
          }

          .progress {
            width: calc(100%);
            height: 15px;
            background-image: linear-gradient(#e9f0f5, #e9f0f5), linear-gradient(#666666, #666666);
            background-blend-mode: normal, normal;
            border-radius: 6px;
            position: relative;

            .inner {
              width: 0%;
              height: 15px;
              background-blend-mode: normal, normal;
              border-radius: 6px;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 1;
              animation-name: progressbar;
              animation-duration: 1s;
              animation-timing-function: ease;
              animation-fill-mode: forwards;

              &.bar-1 {
                background-image: linear-gradient(90deg, #f75627 0%, #f0bb3a 90%), linear-gradient(#666666, #666666);
              }
              &.bar-2 {
                background-image: linear-gradient(90deg, #0bb4e3 0%, #4dd7b0 90%), linear-gradient(#666666, #666666);
              }
              &.bar-3 {
                background-image: linear-gradient(90deg, #1e88f0 0%, #64a7f6 90%), linear-gradient(#666666, #666666);
              }
              &.bar-4 {
                background-image: linear-gradient(90deg, #8a62ff 0%, #0b8dff 90%), linear-gradient(#666666, #666666);
              }
              &.bar-5 {
                background-image: linear-gradient(90deg, #8363f9 0%, #ee70e9 90%), linear-gradient(#666666, #666666);
              }
            }
          }
        }
      }
    }
    .layer-2 {
      height: 340px;
      margin-bottom: $item-space;
      @include flex-center-space-between;

      $block-2-w: 495px;
      $block-3-w: 465px;
      &-block-1 {
        width: calc(100% - #{$block-2-w} - #{$block-3-w} - 2 * #{$item-space});
        height: calc(100%);
        padding: 20px;
        @include block-item;

        &-layer {
          width: calc(100%);
          height: calc(100% - #{$item-space} - #{$header-height});

          &-1 {
            width: calc(100%);
            height: 34px;
            h1 {
              font-size: 16px;
              color: #6c6c6d;
              float: right;
              margin: 0;
              padding: 0;
              span {
                font-size: 30px;
                font-weight: normal;
                color: #1e87f0;
              }
            }
          }

          &-2 {
            width: calc(100%);
            height: calc(100% - 43px - 34px);
            margin-top: 10px;
            .echarts {
              height: calc(100%);
              width: calc(100%);
            }
          }
          &-3 {
            width: calc(100%);
            height: 43px;
            margin-left: 30px;
            > p {
              float: left;
              font-size: 14px;
              text-align: center;
              width: calc((100% - 30px) / 4);
            }
          }
        }

      }

      &-block-2 {
        width: $block-2-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content {
          @include flex-center-space-between;

          .content-left {
            width: 207px;
            height: 245px;
            position: relative;

            .data-set, .interface {
              width: 101px;
              height: 108px;
              text-align: center;
              position: absolute;
              left: 0;
              top: 0;

              .name {
                font-size: 16px;
                color: #fff;
                line-height: 45px;
              }

              .value {
                font-size: 22px;
                color: #fff;
                line-height: 60px;
              }
            }

            .interface {
              left: 106px;
              top: 0;
            }

            .table {
              width: 207px;
              position: absolute;
              top: 126px;
              left: 0;

              .column {
                height: 50px;
                line-height: 40px;
                overflow: hidden;
                font-size: 14px;
                color: #696969;
                margin-bottom: 10px;
                border-bottom: 1px #cacaca solid;

                .square {
                  border: 2.5px #FF1821 solid;
                  border-radius: 0px;
                  margin-top: 20px;
                  margin-right: 10px;
                  height: 20px;
                  width: 2px;
                  float: left;
                }
                ._dataset {
                  border-color: #4A90E2;
                }
                ._interface {
                  border-color: #DE6960;
                }

                .name {
                  margin-top: 10px;
                  float: left;
                }

                .value {
                  margin-top: 10px;
                  float: right;
                }
              }
            }
          }

          .content-right {
            width: 218px;
            height: 245px;
            $p-size: 16px;
            $square-margin-top: 15px;
            &-layer {
              height: calc(100%);
              width: calc(100%);
              &-1 {
                height: 159px;
                width: calc(100%);
                position: relative;
                .echarts {
                  height: calc(100%);
                  width: calc(100%);
                  z-index: 100;
                }

                p {
                  position: absolute;
                  width: calc(100%);
                  text-align: center;
                  font-size: 18px;
                  color: #666;
                  left: 0px;
                  top: 60px;
                  margin: 0;
                  padding: 0;
                }
              }
              &-2 {
                width: calc(100%);
                height: 40px;
                margin-left: 10px;
                p {
                  margin-top: 10px;
                }
                &-block-1 {
                  float: left;
                  height: calc(100%);
                  width: calc(50%);
                  &-block-1 {
                    float: left;
                    height: calc(100%);
                    width: 20px;
                    .square {
                      margin-top: #{$square-margin-top};
                      border: 5px #6ABAF7 solid;
                    }
                  }
                  &-block-2 {
                    float: left;
                    height: calc(100%);
                    width: calc(100% - 20px);
                    > p {
                      font-size: #{$p-size};
                      color: #9B9B9B;
                    }
                  }
                }
                &-block-2 {
                  float: left;
                  height: calc(100%);
                  width: calc(50% - 20px);
                  margin-left: 20px;
                  &-block-1 {
                    float: left;
                    height: calc(100%);
                    width: 20px;
                    .square {
                      margin-top: #{$square-margin-top};
                      border: 5px #F5762D solid;
                    }
                  }
                  &-block-2 {
                    float: left;
                    height: calc(100%);
                    width: calc(100% - 20px);
                    > p {
                      font-size: #{$p-size};
                      color: #9B9B9B;
                    }
                  }
                }
              }
              &-3 {
                width: calc(100%);
                height: 40px;
                margin-left: 10px;
                p {
                  margin-top: 10px;
                }
                &-block-1 {
                  float: left;
                  height: calc(100%);
                  width: calc(50%);
                  &-block-1 {
                    float: left;
                    height: calc(100%);
                    width: 20px;
                    .square {
                      margin-top: #{$square-margin-top};
                      border: 5px #9263FC solid;
                    }
                  }
                  &-block-2 {
                    float: left;
                    height: calc(100%);
                    width: calc(100% - 20px);
                    > p {
                      font-size: #{$p-size};
                      color: #9B9B9B;
                    }
                  }
                }
                &-block-2 {
                  float: left;
                  height: calc(100%);
                  width: calc(50% - 20px);
                  margin-left: 20px;
                  &-block-1 {
                    float: left;
                    height: calc(100%);
                    width: 20px;
                    .square {
                      margin-top: #{$square-margin-top};
                      border: 5px #40CEB8 solid;
                    }
                  }
                  &-block-2 {
                    float: left;
                    height: calc(100%);
                    width: calc(100% - 20px);
                    > p {
                      font-size: #{$p-size};
                      color: #9B9B9B;
                    }
                  }
                }
              }
            }
          }
        }
      }

      &-block-3 {
        width: $block-3-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content {
          width: 432px;
          height: 235px;
          position: relative;
          text-align: center;

          .title {
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0px 2px 2px rgba(0, 111, 220, 0.4);
            position: absolute;

            &.left {
              left: 94px;
              top: 80px;
            }
            &.right {
              right: 94px;
              top: 80px;
            }
          }

          .column {
            position: absolute;

            .title {
              width: 84px;
              text-align: center;
              font-size: 14px;
              color: #6c6c6d;
            }
            .content-1 {
              width: 84px;
              height: 58px;
              margin-top: 37px;
            }
            .content-2, .content-3 {
              width: 84px;
              height: 58px;
              margin-top: 10px;
            }

            p {
              font-size: 12px;
              color: #6c6c6d;
              padding-top: 10px;
            }

            h1 {
              font-size: 22px;
              color: #1a73cc;
              margin-top: 5px;
            }

            &.column-1 {
              left: 0;
              top: 0;
            }

            &.column-2 {
              left: 121px;
              top: 0;
            }

            &.column-3 {
              left: 227px;
              top: 0;

              h1 {
                color: #f66029;
              }
            }

            &.column-4 {
              right: 0;
              top: 0;

              h1 {
                color: #f66029;
              }
            }
          }
        }
      }
    }
    .layer-3 {
      height: 360px;
      @include flex-center-space-between;

      $block-2-w: 465px;
      &-block-1 {
        width: calc(100% - #{$block-2-w} - #{$item-space});
        height: calc(100%);
        padding: 20px;
        @include block-item;

        .content {
          width: calc(100%);
          @include flex-center-space-between;

          $content-left-w: 390px;
          $content-left-h: 270px;
          .content-left {
            display: inline-block;
            width: $content-left-w;
            height: $content-left-h;
            text-align: center;
            p, h1 {
              font-weight: normal;
              margin: 0;
              padding: 0;
            }
            h1 {
              font-size: 16px;
              color: #6c6c6d;
              margin-top: 30px;
            }
            p {
              font-size: 30px;
              color: #1e87f0;
            }
            .item {
              float: left;
              width: $content-left-w / 2;
              height: $content-left-h / 2;
              position: relative;

              .echarts {
                bottom: calc(10%);
                text-align: left;
                z-index: 100;
              }

              > div {
                width: 100%;
                height: 100%;
              }

              h1 {
                margin: 0;
                font-size: 14px;
                color: #9b9b9b;
                width: $content-left-w / 2;
                text-align: center;
                position: absolute;
                left: 0px;
                bottom: 25px;
              }

              p {
                font-size: 18px;
                color: #666;
                width: $content-left-w / 2;
                text-align: center;
                position: absolute;
                left: 0px;
                bottom: 45px;
              }
              .all_h1 {
                color: #666666;
                font-size: 18px;
              }
              .all_p {
                font-size: 22px;
                font-weight: bold;
              }

            }
          }

          .content-right {
            display: inline-block;
            width: calc(100% - #{$content-left-w} - 20px);
            height: 270px;
            .center {
              text-align: center;
            }

            h1 {
              font-size: 16px;
              color: #6c6c6d;

              span {
                font-size: 30px;
                font-weight: normal;
                color: #1e87f0;
              }
            }

            table {
              width: calc(100%);
              border-collapse: collapse;
              border-spacing: 0;
              border-color: #808080;

              tr {
                width: calc(100%);
                border-bottom: solid 1px #e2e2e2;
                &.bg {
                  background: #f7f9fb;
                }
              }

              th {
                padding: 8px 5px;
                border-top: solid 1px #e2e2e2;
                text-align: left;
                font-weight: normal;
                color: white;
                background: #2197ff;
              }

              /deep/ td {
                padding: 8px 5px;
                font-size: 14px;
                color: #666;
                text-align: left;
                font-weight: normal;
                width: calc(100%);
                float: left;
              }

              .one {
                width: 50px;
                float: left;
              }
              .two {
                width: calc(100% - 50px - 105px - 155px);
                float: left;
              }
              .three {
                width: 105px;
                float: left;
              }
              .four {
                width: 155px;
                float: left;
              }
            }
          }
        }
      }

      &-block-2 {
        width: $block-2-w;
        height: calc(100%);
        padding: 20px;
        @include block-item;

        &-layer {
          width: calc(100%);

          &-block-1 {
            float: left;
            width: calc(100% / 2);
            &-layer {
              &-1 {
                text-align: center;
                > h1 {
                  font-size: 16px;
                  color: #6c6c6d;
                }
              }
              &-2 {
                .echarts {
                  text-align: center;
                  height: 159px;
                  width: 159px;
                  margin: 15px auto;
                }
              }
              &-3 {
                height: calc(100%);
                margin-top: 15px;
                text-align: center;
                > p {
                  margin: 0;
                  padding: 0;
                  font-size: 14px;
                  color: #9B9B9B;
                }
              }
            }
          }
          &-block-2 {
            float: left;
            width: calc(100% / 2);
            &-layer {
              &-1 {
                text-align: center;
                > h1 {
                  font-size: 16px;
                  color: #6c6c6d;
                }
              }
              &-2 {
                .echarts {
                  text-align: center;
                  height: 159px;
                  width: 159px;
                  margin: 15px auto;
                }
              }
              &-3 {
                margin-top: 15px;
                text-align: center;
                > p {
                  margin: 0;
                  padding: 0;
                  font-size: 14px;
                  color: #9B9B9B;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
