<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Content Management System</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/data" class="nav-link">Data</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/datedata" class="nav-link">Date Data</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/maps" class="nav-link">Maps</router-link>
        </li>
      </ul>
      <router-link to="/logout">
        <button @click="logout" class="btn btn-outline-danger logout-btn">Logout</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout: function() {
      //   console.log(localStorage.getItem("token"));
      this.$axios
        .get("http://localhost:3000/api/users/logout", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(response => {
          //   console.log(response)
          if (response.data.logout == true) {
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            this.$router.push("/login");
          } else {
            console.log("error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
nav {
  font-family: "Philosopher", sans-serif;
  font-size: 18px;
}
.nav-link {
  font-weight: 100;
}
.logout-btn {
  border-radius: 20px;
}
.nav-link:hover::after {
  content: "";
  display: block;
  border-bottom: 3px solid #14c8ff;
  width: 20px;
  margin: auto;
  padding-bottom: 5px;
  margin-bottom: -8px;
}
.navbar-brand {
  font-size: 20px;
  font-weight: 500;
}
</style>