<template>
  <div class="container mt-4 post-excerpt">
    <div class="col-xs-12">
      <h2>{{ post.title }}</h2>
      <p v-html="excerpt"></p>
      <router-link :to="{ name: 'single', params: { id: post.id } }"
        >Read more</router-link
      >
    </div>
  </div>
</template>

<script>
const EXCERPT_MAX_LENGTH = 50;

export default {
  name: "PostExcerpt",
  props: ["post"],
  computed: {
    excerpt() {
      let content = this.post.content?.substring(0, EXCERPT_MAX_LENGTH);
      if ((this.post.content?.length ?? 0) > EXCERPT_MAX_LENGTH) {
        content += "&hellip;";
      }

      return content;
    },
  },
};
</script>
