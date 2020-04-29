<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ name: tag.name, query: tag.query, params: tag.params }"
        :key="tag.name"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)">
        <el-tag :type="$route.name === tag.name ? '' : 'info'" closable @close="closeSelectedTag(tag)">{{ tag.meta.title
          }}
        </el-tag>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭当前页面</li>
      <li @click="closeOthersTags">关闭其他页面</li>
      <li @click="closeAllTags">关闭全部页面</li>
    </ul>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane'

  export default {
    components: {ScrollPane},
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      isActive(route) {
        return route.name === this.$route.name
      },
      addViewTags() {
        const {name} = this.$route
        if (name) {
          this.$store.dispatch('addView', this.$route)
        }
        return false
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.name === this.$route.name && tag.to.fullPath !== this.$route.fullPath) {
              // when query is different then update
              this.$store.dispatch('updateVisitedView', this.$route)
              break
            }
          }
        })
      },
      refreshSelectedTag(view) {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + view.fullPath
          })
        })
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delView', view).then(({visitedViews}) => {
          if (this.isActive(view)) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView)
            } else {
              this.$router.push('/redirect/index')
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('delOthersViews', this.selectedTag)
      },
      closeAllTags() {
        this.$store.dispatch('delAllViews')
        this.$router.push('/redirect/index')
      },
      openMenu(tag, e) {
        const menuMinWidth = 105

        const offsetLeft = this.$el.getBoundingClientRect().left
        const offsetTop = this.$el.getBoundingClientRect().top
        const offsetWidth = this.$el.offsetWidth
        const maxLeft = offsetWidth - menuMinWidth
        const left = e.clientX - offsetLeft + 15

        if (left > maxLeft) {
          this.left = maxLeft
        } else {
          this.left = left
        }
        this.top = e.clientY - offsetTop + 60

        this.visible = true
        this.selectedTag = tag
      },
      closeMenu() {
        this.visible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .tags-view-container {
    width: 100%;

    .tags-view-wrapper {
      /deep/ .el-scrollbar__wrap {
        height: $menu-history-tags-height;
      }
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;

        &:last-of-type {
          margin-right: 10px;
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: $--menu-background-color;
      z-index: 9999;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: $--color-text-regular;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: $--menu-item-hover-fill;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;

        float: right;
        margin-top: 4px;
      }
    }
  }
</style>
