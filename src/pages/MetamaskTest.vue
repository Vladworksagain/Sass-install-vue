<template>
  <main>
    <div class="container">
      <label class="def-label">
        <input
          v-model="ethAmountField"
          type="number"
          placeholder="Enter amount, ETH"
        >
      </label>
      <button
        class="reset__btn def-button"
        @click="initMetamask"
      >
        <span>
          Donate with Metamask
        </span>
      </button>
      <a :href="metamaskDeepLink" class="mobile-meta reset__btn">
        mobile meta
      </a>
    </div>
    <hr>
    <hr>
    <div
      class="container"
      style="margin-top: 50px"
    >
      <div>
        this is test wallet connect
      </div>
    </div>
  </main>
</template>

<script>

import Web3 from 'web3'

export default {
  name: "MetamaskTest",
  data() {
    return {
      ethAmountField: '',
      errorMess: false,
      errorText: '',
      statusMessage: '',
      customStatusClass: '',
      status: false,
      metamaskDeepLink: '',
    }
  },
  created() {
    const metamaskAppLink = 'https://metamask.app.link/dapp/'
    const origin = window.location.href
    const resultSubstr = origin.substring(7)
    this.metamaskDeepLink = metamaskAppLink + resultSubstr
  },
  methods: {
    async initMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then( accounts => {
            if(accounts) {
              this.errorMess = false
              this.sendTransaction(accounts[0])
            }
          })
          .catch( err => {
            this.errorMess = true
            this.errorText = err.message
            this.ethAmountField = ''
          })
      } else {
        console.log('MetaMask is not installed!')
      }
    },
    sendTransaction(userWallet) {
      let provider = window.ethereum
      const web3ForMetamask = new Web3(provider)

      window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: Web3.utils.toHex(userWallet),
            to: '0x20f828217EfF8f5D162DedB586B028E5Bf9Dad5d',
            value: parseInt(Web3.utils.toWei(this.ethAmountField, "ether")).toString(16),
          }
        ]
      }).then( txHash => {
        console.log(txHash,'txHash')
        this.statusMessage = 'Your transaction in pending <span class="dot-carousel"></span>'
        this.customStatusClass = 'pending'
        this.ethAmountField = ''
        this.status = true

        const checkStatusTransaction = setInterval(() => {
          web3ForMetamask.eth.getTransaction(txHash).then( res => {
            if(res.blockHash) {
              this.ethAmountField = ''
              this.statusMessage = 'Transaction successful'
              this.customStatusClass = 'successful'
              clearInterval(checkStatusTransaction)
              this.$emit('metamask-donation-res', res.value)
              console.log(res,'get result txHash')
            }
            // if(res !== null) {
            //   clearInterval(checkStatusTransaction)
            //   console.log(res,'get result txHash')
            // }
          }).catch( err => {
            clearInterval(checkStatusTransaction)
            this.statusMessage = 'Transaction fail'
            this.customStatusClass = 'err'
            console.log(err,'transaction fail')
          })
        }, 3000)
      }).catch( err => {
        this.errorMess = true
        this.errorText = err.message
        this.ethAmountField = ''
      })
      console.log(userWallet,'userWallet for transaction')
    }
  }
}
</script>

<style scoped>



</style>