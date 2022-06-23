<template>
  <main class="main">
    <section class="catalog">
      <div class="container">
        <div class="catalog-top__inner">
          <h1 class="catalog-title">Catalog</h1>
          <div
            class="catalog-sort__inner"
            @click="toggleDropdown"
          >
            <span class="catalog-sort__subtitle">
              Sort by:
            </span>
            <span
              class="catalog-sort__selected"
              :class="toggleDropdownMenu ? '__rotate' : ''"
            >
              {{ sortOptionSelected }}
            </span>
            <ul
              class="catalog-sort__dropdown"
              :class="toggleDropdownMenu ? '__toggle' : ''"
            >
              <li
                v-for="item in toggleDropdownOptions"
                :key="item.id"
                @click="selectOption(item)"
                ref="sort"
                class="default-sort"
              >
                <span>
                  {{ item.title }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="catalog-main">
          <div class="catalog-main__tabs">
            <button
              v-for="(tabBtn,idx) in tabBtns"
              :key="tabBtn.id"
              class="reset__btn tab-btn"
              ref="tab"
              @click="currentTab(idx)"
              :class="tabBtn.isActive ? '__active' : ''"
            >
              <span>{{ tabBtn.title }}</span>
            </button>
          </div>
          <div class="catalog-main__content">
            <product
              v-for="(product,idx) in FilteredData"
              :key="idx"
              :product="product"
            >
            </product>
          </div>
        </div>
      </div>
      <cart></cart>
    </section>
  </main>
</template>

<script>
import products from '@/json/products.json'
import product from '@/components/product'
import cart from '@/components/cart'

export default {
  components: {
    product,
    cart
  },
  data() {
    return {
      filter: '',
      sortType: '',
      toggleDropdownOptions: [
        {
          id: 1,
          title: 'By price',
          sort: 'price'
        },
        {
          id: 2,
          title: 'By popularity',
          sort: 'popular'
        },
      ],
      toggleDropdownMenu: false,
      sortOptionSelected: 'price',
      selectedTabId: 1,
      tabBtns: [
        {
          id: 1,
          title: 'Backpacks',
          isActive: false,
          tabTitle: 'backpack'
        },
        {
          id: 2,
          title: 'T-shirts',
          isActive: false,
          tabTitle: 't-shirts'
        },
        {
          id: 3,
          title: 'Shirts',
          isActive: false,
          tabTitle: 'shirts'
        },
      ],
      products: products,
    }
  },
  computed: {
    FilteredData() {
      if(!this.filter) {
        return this.products.products
      } else {
        return this.products.products
          .filter(el => el.category === this.filter)
          .sort((a,b) => {
            if(this.sortType === 'price') {
              return b.price - a.price
            } else if(this.sortType === 'popular') {
              return b.rating - a.rating
            } else {
              return b.price - a.price
            }
          })
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.toggleDropdownMenu = !this.toggleDropdownMenu
    },
    selectOption(item) {
      this.sortOptionSelected = item.title.substr(2)
      this.sortType = item.sort
    },
    currentTab(tabIdx) {
      this.tabBtns.forEach((el,idx) => {
        if(tabIdx === idx) {
          el.isActive = true
          this.filter = el.tabTitle
        } else {
          el.isActive = false
        }
      })
    },
    selectTab() {
      if(document.querySelector('.tab-btn')) {
        this.$refs.tab[0].click()
        this.filter = this.tabBtns[0].tabTitle
      }
    },
  },
  mounted() {
    this.selectTab()
  }
}
</script>

<style lang="sass" scoped>
.catalog

  &-top__inner
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px

  .catalog-title
    font-weight: 700
    font-size: 32px
    color: $black
    line-height: 41px

  .catalog-sort__inner
    cursor: pointer
    position: relative

    @media screen and (max-width: 1300px)
      margin-right: 15px

    .catalog-sort__subtitle
      font-weight: 400
      font-size: 16px
      line-height: 20px
      color: $black

    .catalog-sort__selected
      font-weight: 400
      font-size: 16px
      color: $grey
      line-height: 20px
      position: relative

      &:after
        content: ''
        background: url("../assets/img/icon/arrow-bottom-icon.svg") no-repeat 100%
        background-size: contain
        width: 8px
        height: 8px
        display: inline-block
        position: absolute
        top: 45%
        right: -12px
        vertical-align: middle
        transition: $transition

      &.__rotate
        &:after
          transform: rotate(180deg)

    .catalog-sort__dropdown
      width: 100%
      min-width: 110px
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05)
      border-radius: 8px
      padding: 10px 0
      position: absolute
      top: 140%
      opacity: 0
      visibility: hidden
      transition: $transition
      background-color: $white
      z-index: 101

      &.__toggle
        opacity: 1
        visibility: visible

      li
        padding: 4px 12px
        transition: $transition

        span
          font-weight: 400
          font-size: 14px
          color: $greyLight
          transition: $transition

        &:hover
          background-color: $greyExtraLight
          span
            color: $black

  .catalog-main
    display: grid
    grid-template-columns: 15% 85%

    @media screen and (max-width: 768px)
      grid-template-columns: 1fr

    .catalog-main__tabs
      display: flex
      flex-direction: column

      @media screen and (max-width: 768px)
        flex-direction: row
        justify-content: space-between
        align-items: center
        margin-bottom: 15px

      button
        background-color: transparent
        text-align: left
        font-family: "PT Sans", sans-serif
        margin-bottom: 16px
        &:last-child
          margin-bottom: 0

        @media screen and (max-width: 768px)
          margin-bottom: 0

        span
          font-weight: 400
          font-size: 16px
          color: $greyLight
          transition: $transition
          padding-bottom: 2px
        &:hover

          span
            color: $grey

        &.__active

          span
            color: $black
            text-decoration: underline

    .catalog-main__content
      display: grid
      grid-template-columns: repeat(4, 1fr)
      grid-gap: 16px

      @media screen and (max-width: 768px)
        grid-template-columns: repeat(3, 1fr)

      @media screen and (max-width: 500px)
        grid-template-columns: repeat(2, 1fr)

</style>