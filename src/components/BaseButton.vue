<doc>
# BaseButton

ボタンのコンポーネント

<base-button>Sample Button</base-button>
</doc>

<template>
  <button class="base-button" v-on:click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'base-button',

  props: {
    kind: {
      type: String,
      default: 'deafult',
    },
  },

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
