<template>
  <div>
    <navbar></navbar>
    <br />
    <br />
    <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
      <div class="row">
        <div class="col-sm-9 col-md-8 col-lg-9 mx-auto">
          <div class="card bg-light mb-3" style="max-width: 50rem;">
            <div class="card-body">
              <h5 class="card-title"><h1>Welcome, {{user}}</h1></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  components: {
    navbar: Navbar
  },
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.user = localStorage.getItem("email");
  }
};
</script>

<style>
</style>