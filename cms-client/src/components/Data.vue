<template>
  <div>
    <navbar></navbar>
    <h1 class="text-center mt-2">Data Dashboard</h1>
    <hr />
    <!-- ADD -->
    <div class="container">
      <div class="collapse" id="formAdd">
        <div>
          <form>
            <div class="row">
              <div class="col-5">
                <input type="text" v-model="letter" class="form-control" placeholder="Letter" />
              </div>
              <div class="col-5">
                <input type="text" v-model="frequency" class="form-control" placeholder="Frequency" />
              </div>
              <button
                class="btn btn-secondary"
                data-toggle="collapse"
                data-target="#formAdd"
                @click="hendleAdd"
              >save</button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#formAdd">
        <span>
          <i class="fas fa-plus"></i> add
        </span>
      </button>
    </div>
    <!-- END ADD -->
    <br />
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header text-white bg-dark">
              <h5>Search</h5>
            </div>
            <div class="card-body">
              <!-- SEARCH -->
              <form>
                <div class="row">
                  <div class="col-4">
                    <input type="text" class="form-control" placeholder="Latter" required/>
                  </div>
                  <div class="col-4">
                    <input type="text" class="form-control" placeholder="Frequency" required/>
                  </div>
                </div>
              </form>
              <!-- END SEARCH -->
              <br />
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Letter</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
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
      datas: null,
      letter: "",
      frequency: ""
    };
  },
  methods: {
    loadData() {
      this.$axios
        .get("http://localhost:3000/api/data/")
        .then(response => {
          console.log(response.data);
        })
        .catch(err => console.log(err));
    },
    hendleAdd(e) {
      e.preventDefault();
    //   console.log(this.letter, this.frequency)
        this.$axios
      .post("http://localhost:3000/api/data/", {
        letter: this.letter,
        frequency: this.frequency
      })
      .then(response => {
        if (response.data.success == true) {
          this.letter = "";
          this.frequency = "";
          this.loadData();
        } else {
          console.log("internal server error to Add");
        }
      })
      .catch(err => console.log("Something wrong with API connection"));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
.card {
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>