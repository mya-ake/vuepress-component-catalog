<doc>
# BaseButton

ボタンのコンポーネント

## Variation(props)

### default

<base-button>Default Button</base-button>

### primary

<base-button variation="primary">Primary Button</base-button>

</doc>

<template>
  <button
    v-bind:type="type"
    v-bind:class="`base-button--${variation}`"
    class="base-button" 
    v-on:click="handleClick"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'base-button',

  props: {
    type: {
      type: String,
      default: 'button',
    },

    variation: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary'].includes(value);
      },
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
  padding: 8px 16px 9px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
}

.base-button--default {
}

.base-button--primary {
  --c-vue: #3eaf7c;

  color: #fff;
  background-color: var(--c-vue);
  border-color: var(--c-vue);
}
</style>
