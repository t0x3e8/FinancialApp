<script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
  };
</script>

<template>
  <div>
    {{ count }}
    <button @click="count++">Count</button>
  </div>
</template>
