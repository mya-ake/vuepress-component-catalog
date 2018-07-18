<template>
  <div id="app">
    <h1>Use vuepress as component catalog</h1>

    <div>
      <base-button>sample button</base-button>
    </div>
  </div>
</template>

<script>
import { BaseButton } from '@/components';

export default {
  name: 'app',

  components: {
    BaseButton,
  },
};
</script>

<style>
</style>
