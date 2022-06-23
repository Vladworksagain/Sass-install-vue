<template>
  <div class="product">
    <div class="product-top__inner">
      <div class="product-star__rating">
        <div class="star-rating__inner">
          ★
        </div>
        {{ product.rating }}
      </div>
      <button
        class="product-add__cart reset__btn"
        @click="addToCart(product)"
      >
        <img src="@/assets/img/icon/cart-icon.svg" alt="">
      </button>
    </div>
    <div class="product-main__inner">
      <img
        :src="product.img"
        alt="#"
      >
    </div>
    <div class="product-bottom__inner">
      <div class="product-title">
        {{ product.title }}
      </div>
      <div class="product-price">
        {{ product.price | priceSplitting }} UAH
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  props: {
    product: {
      type: Object,
      default: (() => [])
    }
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch('addProductToCart', {
        item,
        quantity: 1
      })
    }
  },
}
</script>

<style lang="sass" >
.product
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05)
  border-radius: 8px
  background-color: $white
  padding: 16px

  @media screen and (max-width: 1024px)
    padding: 10px

  &-top__inner
    display: flex
    align-items: center
    justify-content: space-between

    .product-star__rating
      display: flex
      align-items: baseline
      font-weight: 700
      font-size: 10px
      color: $yellow

    .product-add__cart
      background-color: transparent
      img
        width: 14px
        height: 14px
        vertical-align: middle
        filter: invert(.5)
        transition: $transition
      &:hover
        img
          filter: initial

  &-main__inner
    max-width: 142px
    width: 100%
    margin: 0 auto 5px auto
    position: relative

    img
      object-fit: contain
      width: 100%
      height: 100%

  &-bottom__inner

    .product-title
      font-weight: 400
      font-size: 14px
      color: $grey
      line-height: 18px
      margin-bottom: 5px

    .product-price
      font-weight: 700
      font-size: 14px
      color: $black

.star-rating__inner
  display: flex
  align-items: center
  margin-right: 4px
  position: relative
  font-size: 12px
</style>