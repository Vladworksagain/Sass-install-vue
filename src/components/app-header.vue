<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <router-link class="header-logo" to="/">
          TestList
        </router-link>
        <div class="header-cart__inner">
          <button
            class="header-cart reset__btn"
            @click="openCart"
          >
            <img src="@/assets/img/icon/cart-icon.svg" alt="">
          </button>
          <span
            class="header-cart__count"
            v-if="currentCartProductLength > 0"
          >
            {{ currentCartProductLength }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "app-header",

  data() {
    return {
      cartOpen: false
    }
  },
  computed: {
    currentCartProductLength() {
      return this.$store.getters.cartQuantity
    }
  },
  methods: {
    openCart() {
      this.cartOpen = true
      this.$store.commit('openCart', this.cartOpen)
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05)
  border-radius: 0 0 8px 8px
  padding: 18px 0
  margin-bottom: 32px

  &-inner
    display: flex
    align-items: center
    justify-content: space-between
  &-logo
    color: $grey
    font-weight: 700
    font-size: 22px
    line-height: 28px

  .header-cart__inner
    position: relative

    .header-cart__count
      position: absolute
      top: 0
      right: 0
      width: 14px
      height: 14px
      border-radius: 50%
      background-color: $greyLight
      font-size: 9px
      font-weight: 700
      color: $white
      display: flex
      align-items: center
      justify-content: center
      padding: 0 4px
      transform: translate(5px, -5px)
</style>