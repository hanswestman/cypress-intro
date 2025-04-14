<template>
  <div class="container">
    <div class="col-xs-12 text-center">
      <h1>Example blog</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/write">Write</router-link>
      </nav>
    </div>
    <div class="col-xs-12">
      <router-view />
    </div>
  </div>
</template>
