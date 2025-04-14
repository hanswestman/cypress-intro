<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-6">
        <h2>New post</h2>
        <form @submit.prevent="save">
          <div class="mb-3">
            <label for="post-title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              name="post-title"
              id="post-title"
              required
              minlength="2"
              v-model="post.title"
            />
          </div>
          <div class="mb-3">
            <label for="post-content" class="form-label">Content</label>
            <textarea
              class="form-control"
              id="post-content"
              name="post-content"
              rows="3"
              required
              minlength="3"
              v-model="post.content"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
      <div class="col-sm-6">
        <h2>Preview</h2>
        <PostFull :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import PostFull from "@/components/PostFull.vue";

export default {
  name: "WriteView",
  components: {
    PostFull,
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    async save() {
      const response = await fetch("http://localhost:5050/posts/", {
        method: "POST",
        body: JSON.stringify(this.post),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      this.$router.push({ name: "single", params: { id: responseData.id } });
    },
  },
};
</script>
