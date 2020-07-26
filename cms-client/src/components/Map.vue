<template>
  <div class="index">
    <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header bg-info">
            <div class="row">
              <div class="col-5">
                <router-link to="/">
                  <h3 style="color: white">
                    <i class="far fa-hand-point-left">.Menu</i>
                  </h3>
                </router-link>
              </div>
              <div class="col-5">
                <h3 style="color: white">
                  <i class="far fa-bookmark">Map Chart</i>
                </h3>
              </div>
              <router-link to="/maps">
                <div class="col">
                  <h3 style="color: white">
                    <i class="fas fa-book-open">.Data</i>
                  </h3>
                </div>
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div id="chart_div"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapChart } from "../chart";

export default {
  ata() {
    return {
      msg: "Map-Chart",
    };
  },
  mounted() {
    this.$axios
      .get("http://localhost:3000/api/maps/")
      .then((response) => {
        // console.log(response.data)
        mapChart(response.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>


<style>
body {
  font-family: "Philosopher", sans-serif;
  background: #00e1ff;
  background: linear-gradient(to right, #28b9fc, #dffaff);
}
.card span {
  font-family: "Philosopher", sans-serif;
  font-size: 23px;
}
.card {
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.card-header {
  border: solid 0;
  border-radius: 10px;
  overflow: hidden;
}
</style>