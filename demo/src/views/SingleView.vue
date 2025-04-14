<template>
  <div class="container mt-4">
    <div class="col-xs-12">
      <PostFull :post="post" />
    </div>
  </div>
</template>
<script>
import PostFull from "@/components/PostFull.vue";

export default {
  name: "SingleView",
  components: {
    PostFull,
  },
  props: {
    id: String,
  },
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const response = await fetch("http://localhost:5050/posts/" + this.id);

      this.post = await response.json();
    },
  },
};
</script>
