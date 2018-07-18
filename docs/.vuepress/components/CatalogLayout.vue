<template>
  <Content class="content__catalog"/>
</template>

<script>
import Vue from 'vue';
import * as components from './../../../src/components';

Object.values(components).forEach((component) => {
  Vue.component(component.name, component);
});

export default {};
</script>

<style scoped>
.content__catalog {
  padding: 2rem;
}
</style>

