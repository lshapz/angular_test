<template>
    <div id="vuePie">
      <D3PieChart :dataModel="pieData" />>
    </div>
</template>

<script>
import vueCustomElement from 'vue-custom-element';
import {D3PieChart} from 'jscatalyst'

export default {
  props: ['pieData'],
  components: {D3PieChart},
}

</script>

<style scoped>

  #vuePie {
    height: 500px;
    width: 500px;
    margin: 0 auto;
  }

</style>
