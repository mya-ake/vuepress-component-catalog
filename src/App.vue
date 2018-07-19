<template>
  <div id="app">
    <h1>Use vuepress as component catalog</h1>

    <div>
      <base-button>Default Button</base-button>
      <base-button variation="primary">Primary Button</base-button>
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
