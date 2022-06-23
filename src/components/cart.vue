<template>
  <div
    class="cart-modal"
    :class="cartState ? '__open' : ''"
  >
    <div class="cart-content">
      <div class="cart-content__top">
        <span class="cart-content__title">
          Cart
        </span>
        <button
          class="reset__btn cart-close__btn"
          @click="closeCart"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="black"/>
          </svg>
        </button>
      </div>
      <div
        class="cart-content__main"
        v-if="productCartLength > 0"
      >
        <p class="cart-content__descr">
          Items in the cart
        </p>
        <div
          class="cart-product"
          v-for="item in cartProducts"
          :key="item.product.id"
        >
          <div class="cart-product__top">
            <div class="cart-product__img">
              <img
                :src="item.product.img"
                alt="#"
              >
            </div>
          </div>
          <div class="cart-product__main">
            <p class="cart-product__title">
              {{ item.product.title }}
            </p>
            <p class="cart-product__price">
              {{ item.product.price | priceSplitting }} UAH
            </p>
            <div class="star-rating__inner cart-product__rating">
              ★ {{ item.product.rating }}
            </div>
          </div>
          <button
            class="cart-product__remove reset__btn"
            @click="removeProductFromCart(item.product.id)"
          >
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5Z" fill="#959DAD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H8ZM15 4V3C15 2.20435 14.6839 1.44129 14.1213 0.87868C13.5587 0.31607 12.7956 0 12 0H8C7.20435 0 6.44129 0.31607 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H3C2.44772 4 2 4.44772 2 5V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V5C18 4.44772 17.5523 4 17 4H15ZM4 6V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V6H4Z" fill="#959DAD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C8.55229 9 9 9.44771 9 10V16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16V10C7 9.44771 7.44772 9 8 9Z" fill="#959DAD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C12.5523 9 13 9.44771 13 10V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V10C11 9.44771 11.4477 9 12 9Z" fill="#959DAD"/>
            </svg>
          </button>
        </div>
        <div class="cart-total__price">
          Total price: {{ getTotalProductsPrice }} UAH
        </div>
        <cart-form></cart-form>
      </div>
      <div
        class="cart-content__empty"
        v-else-if="productCartLength === 0 && successMes !== true"
      >
        <p class="cart-content__descr">
          You haven't added anything to your cart yet.
        </p>
        <button
          class="reset__btn back-to__shop"
          @click="closeCart"
        >
          <span>Go to selection</span>
        </button>
      </div>
      <div
        class="modal"
        v-else
      >
        <div class="modal-content">
          <img src="@/assets/img/icon/success-sent-form-icon.jpg" alt="">
          <p class="modal-content__title">Заявка успешно отправлена</p>
          <p class="modal-content__descr">Вскоре наш менеджер свяжется с Вами</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartForm from '@/components/cart-form'
import { eventBus } from "../main";

export default {
  name: "cart",
  components: {
    cartForm
  },
  data() {
    return {
      successMes: false
    }
  },
  created() {
    eventBus.$on('success', data => {
      this.successMes = data
    })
  },
  computed: {
    cartState() {
      return this.$store.state.cartState
    },
    productCartLength() {
      return this.$store.getters.cartQuantity
    },
    cartProducts() {
      return this.$store.state.cart
    },
    getTotalProductsPrice() {
      return this.$store.getters.cartProductsTotalPrice
    }
  },
  methods: {
    closeCart() {
      this.$store.commit('openCart', false)
      this.successMes = false
    },
    removeProductFromCart(id) {
      this.$store.dispatch('removeProduct', id)
    },
  },
}
</script>

<style scoped lang="sass">
.cart-modal
  position: fixed
  top: 0
  right: 0
  background-color: rgba(255, 255, 255, .8)
  width: 100%
  height: 100%
  display: flex
  align-items: flex-start
  justify-content: flex-end
  opacity: 0
  visibility: hidden
  transition: $transition

  &.__open
    opacity: 1
    visibility: visible

  .cart-content
    padding: 48px
    max-width: 460px
    width: 100%
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05)
    border-radius: 8px 0 0 8px
    background-color: $white
    height: 100%

    @media screen and (max-width: 500px)
      padding: 15px

  .cart-content__top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px

    .cart-content__title
      font-weight: 700
      font-size: 32px
      color: $defaultBlack

  .cart-content__empty

    .cart-content__descr
      font-weight: 400
      font-size: 22px
      color: $defaultBlack
      line-height: 28px
      margin-bottom: 24px

    .back-to__shop
      width: 100%
      height: 50px
      background-color: #1F1F1F
      border-radius: 8px

      span
        font-size: 16px
        font-weight: 400
        color: $white
        font-family: "PT Sans", sans-serif

  .cart-content__main
    height: calc(100% - 20px)
    overflow-y: auto

  .cart-content__descr
    font-size: 18px
    font-weight: 400
    line-height: 23px
    color: $grey
    margin-bottom: 15px

  .cart-product
    display: flex
    align-items: center
    justify-content: space-between
    border-radius: 8px
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05)
    padding: 15px 22px

    @media screen and (max-width: 500px)
      padding: 10px

    &:not(&:last-child)
      margin-bottom: 12px

    .cart-product__top
      margin-right: 34px

      .cart-product__quantity
        text-align: center
        font-weight: 700
        color: $grey
        font-size: 12px

    &__img
      max-width: 70px
      width: 100%

      img
        object-fit: cover
        width: 100%
        height: 100%

    &__main

      .cart-product__title
        font-weight: 400
        font-size: 14px
        color: $grey
        line-height: 18px
        margin-bottom: 5px
        max-width: 170px
        width: 100%

      .cart-product__price
        font-weight: 700
        font-size: 14px
        color: $black
        margin-bottom: 20px

      .cart-product__rating
        font-weight: 700
        font-size: 10px
        color: #F2C94C

  .cart-total__price
    font-weight: 700
    color: $black
    font-size: 14px

  .modal
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    height: 100%

    .modal-content
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column

      img
        width: 80px
        height: 80px
        margin-bottom: 24px

      .modal-content__title
        font-weight: 700
        font-size: 24px
        color: $defaultBlack
        line-height: 31px
        margin-bottom: 3px

      .modal-content__descr
        font-weight: 400
        font-size: 16px
        color: $grey
        line-height: 20px

</style>