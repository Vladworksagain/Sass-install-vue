import Vue from "vue"

Vue.filter("priceSplitting", val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))