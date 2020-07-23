<template>
  <div class="index">
    <div class="container d-flex w-80 h-80 p-3 mt-5 mb-5 flex-column">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header bg-info">
            <div class="row">
              <div class="col-9">
                <h4 style="color: white">
                  <i class="far fa-bookmark"></i>
                  Bar Chart
                </h4>
              </div>
              <router-link to="/data">
                <div class="col">
                  <h4 style="color: white">
                    <i class="fas fa-database"></i>.To Edit Data
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="card flex-row">
            <div class="card-body"></div>
            <div class="container">
              <div id="bar-chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { barChart } from "../chart";

export default {
  ata() {
    return {
      msg: "Bar-Chart",
    };
  },
  mounted() {
    this.$axios
      .get("http://localhost:3000/api/data/")
      .then((response) => {
        barChart(response.data);
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