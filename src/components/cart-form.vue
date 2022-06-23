<template>
  <div class="cart-form__wrap">
    <p class="cart-form__descr">
      Checkout
    </p>
    <form
      class="cart-form" action=""
      @submit.prevent="submitForm"
    >
      <label>
        <input
          placeholder="Your name"
          class="default-form__input"
          :class="$v.name.$dirty && !$v.name.required ? 'invalid' : ''"
          type="text"
          v-model.trim="name"
        >
        <span
          class="validation-error"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Field is required
        </span>
        <span
          class="validation-error"
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >
          Minlength is {{ $v.name.$params.minLength.min }}
        </span>
      </label>
      <label>
        <input
          placeholder="Phone"
          class="default-form__input"
          type="text"
          ref="field"
          v-model="phone"
          :class="$v.phone.$dirty && !$v.phone.required ? 'invalid' : ''"
          @blur="$v.phone.$touch()"
        >
        <span
          class="validation-error"
          v-if="$v.phone.$dirty && !$v.phone.required"
        >
          Field is required
        </span>
        <span
          class="validation-error"
          v-else-if="$v.phone.$dirty && !$v.phone.maxLength"
        >
          minLength is {{ $v.phone.$params.maxLength.max }}
        </span>
      </label>
      <label>
        <input
          placeholder="Address"
          class="default-form__input"
          type="text"
          v-model="$v.address.$model"
          :class="$v.address.$dirty && !$v.address.required ? 'invalid' : ''"
        >
        <span
          class="validation-error"
          v-if="$v.address.$dirty && !$v.address.required"
        >
          Field is required
        </span>
        <span
          class="validation-error"
          v-else-if="$v.address.$dirty && !$v.address.maxLength"
        >
          Minlength is {{ $v.address.$params.maxLength.max }}
        </span>
      </label>
      <button type="submit" class="reset__btn submit-form__btn">
        <span>Send</span>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'
import { eventBus } from "../main";
import Inputmask from 'inputmask'

export default {
  name: "cart-form",
  data() {
    return {
      name: '',
      phone: '',
      phoneMask: '380-99-999-99-99',
      address: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    address: {
      required,
      maxLength: maxLength(10)
    },
    phone: {
      required,
      maxLength: maxLength(12)
    }
  },
  methods: {
    submitForm() {
      if (!this.$v.$invalid) {
        this.$store.dispatch('resetCart')
        eventBus.$emit('success', true)
      } else {
        this.$v.$touch()
        console.log('invalid')
      }
    },
    initPhoneMask() {
      const newPhoneMask = new Inputmask({
        mask: this.phoneMask,
        showMaskOnHover: false,
        clearMaskOnLostFocus: false,
        autoUnmask: true
      })
      newPhoneMask.mask(this.$refs.field)
    }
  },
  mounted() {
    this.initPhoneMask()
  }
}
</script>

<style lang="sass" scoped>
.cart-form__wrap
  padding-top: 32px

  .cart-form__descr
    font-weight: 400
    font-size: 18px
    color: $grey
    margin-bottom: 15px

  .cart-form
    display: flex
    flex-direction: column

  label
    margin-bottom: 16px
    position: relative

    &:last-of-type
      margin-bottom: 0

  .default-form__input
    height: 50px
    border-radius: 8px
    background-color: $greyExtraLight
    padding: 0 14px
    width: 100%
    border: none
    font-weight: 400
    font-size: 16px
    color: $greyLight

    &::placeholder
      color: $greyLight

  .submit-form__btn
    background-color: $black
    border-radius: 8px
    height: 50px
    padding: 0
    border: none
    margin-top: 24px

    span
      font-weight: 400
      font-size: 16px
      color: $white
      font-family: "PT Sans", sans-serif

  .invalid
    border: 1px solid red

  .validation-error
    font-size: 12px
    font-weight: 400
    color: red

</style>