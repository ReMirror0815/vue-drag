<template>
  <div class="app">
    <Editor v-model="state" ></Editor>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import data from './data.json';
import { registerConfig as config } from './utils/editor-config.jsx';
import Editor from './components/editor.jsx';


export default {
  components: {
    Editor
  },

  setup() {
    const state = ref(data);

    // 直接提供出去
    provide('config', config);

    return {
      state
    }

  }
}

</script>

<style lang="scss">
  .app{
    position: fixed;
    left: 20px;
    top: 20px;
    right: 20px;
    bottom:20px;
  }
</style>
