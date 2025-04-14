<template>
  <PostExcerpt v-for="(post, index) in posts" v-bind:key="index" :post="post" />
</template>

<script>
import PostExcerpt from "@/components/PostExcerpt.vue";

export default {
  name: "ListView",
  components: {
    PostExcerpt,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await fetch("http://localhost:5050/posts");

      this.posts = await response.json();
    },
  },
};
</script>
