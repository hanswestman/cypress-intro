<template>
  <div class="container mt-4 post-full">
    <div class="col-xs-12">
      <h2>{{ post.title }}</h2>
      <p v-for="(paragraph, index) in paragraphs" v-bind:key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFull",
  props: ["post"],
  computed: {
    paragraphs() {
      return this.post.content
        ?.split("\n")
        .filter((paragraph) => paragraph.length > 0);
    },
  },
};
</script>
