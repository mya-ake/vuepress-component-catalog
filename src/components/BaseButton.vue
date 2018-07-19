<doc>
# BaseButton

ボタンのコンポーネント
</doc>

<template>
  <button class="base-button" v-on:click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'base-button',

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style scoped>
.base-button {
  border: solid 1px #333;
  border-radius: 3px;
  padding: 4px 8px 5px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
}
</style>
