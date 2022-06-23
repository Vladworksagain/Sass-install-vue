import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cartState: false,
  cart: []
}

const getters = {
  cartQuantity: state => state.cart.length,
  cartProductsTotalPrice: state => {
    let totalPrice = 0
    state.cart.forEach(el => {
      totalPrice += el.product.price * el.currentQuantity
    })
    return totalPrice
  }
}

const mutations = {
  openCart(state, payload) {
    state.cartState = payload
  },
  updateProductCart(state, {item, quantity}) {
    const find = state.cart.find( productItem => {
      return productItem.product.id === item.id
    })
    if(find) {
      return state.cart
    } else {
      state.cart.push({
        product: item,
        currentQuantity: quantity
      })
    }
  },
  removeProductFromCart(state, id) {
    state.cart = state.cart.filter(item => item.product.id !== id)
  },
  resetCartAfterSentForm(state) {
    state.cart = []
  }
}

const actions = {
  addProductToCart({commit}, {item, quantity}) {
    commit('updateProductCart', {item, quantity})
  },
  removeProduct({commit}, id) {
    commit('removeProductFromCart', id)
  },
  resetCart({commit}) {
    commit('resetCartAfterSentForm')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})