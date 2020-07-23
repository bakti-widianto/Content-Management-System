<template>
  <div>
    <navbar></navbar>
    <h1 class="text-center mt-2">Maps Dashboard</h1>
    <hr />
    <!-- ADD -->
    <div class="container">
      <div class="collapse" id="add-maps">
        <div>
          <form>
            <div class="row">
              <div class="col-2">
                <h3>
                  <i class="far fa-plus-square">Add :</i>
                </h3>
              </div>
              <div class="col-3">
                <input type="text" v-model="title" class="form-control" placeholder="Title of maps" />
              </div>
              <div class="col-3">
                <input type="Number" v-model="lat" class="form-control" placeholder="Latitude" />
              </div>
              <div class="col-3">
                <input type="Number" v-model="lng" class="form-control" placeholder="Longitude" />
              </div>
              <button
                class="btn btn-secondary"
                data-toggle="collapse"
                data-target="#add-maps"
                @click="hendleAdd"
              >save</button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#add-maps">
        <span>
          <i class="fas fa-plus"></i> add
        </span>
      </button>
    </div>
    <!-- END ADD -->
    <!-- EDIT -->
    <br />
    <div class="container">
      <div class="collapse" id="edit-maps">
        <div>
          <form>
            <div class="row">
              <div class="col-2">
                <h3>
                  <i class="fas fa-edit">Edit :</i>
                </h3>
              </div>
              <div class="col-3">
                <input
                  type="text"
                  v-model="etitle"
                  class="form-control"
                  placeholder="Title of maps"
                />
              </div>
              <div class="col-3">
                <input type="Number" v-model="elat" class="form-control" placeholder="Latitude" />
              </div>
              <div class="col-3">
                <input type="Number" v-model="elng" class="form-control" placeholder="Longitude" />
              </div>
              <button
                class="btn btn-secondary"
                data-toggle="collapse"
                data-target="#edit-maps"
                @click="handleUpdate"
              >save</button>
            </div>
          </form>
        </div>
      </div>
      <br />
    </div>
    <!-- END EDIT -->
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header text-white bg-dark">
              <br />
              <form>
                <div class="row">
                  <div class="col-2">
                    <h3>
                      <i class="fas fa-search">Search</i>
                    </h3>
                  </div>
                  <div class="col-3">
                    <input
                      type="text"
                      v-model="stitle"
                      class="form-control"
                      placeholder="Title of maps"
                    />
                  </div>
                  <div class="col-3">
                    <input type="Number" v-model="slat" class="form-control" placeholder="Latitude" />
                  </div>
                  <div class="col-3">
                    <input
                      type="Number"
                      v-model="slng"
                      class="form-control"
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body">
              <table class="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for=" (data,index) in datas" v-bind:key="data._id">
                    <th>{{index + 1}}</th>
                    <td>{{data.title}}</td>
                    <td>{{data.lat}}</td>
                    <td>{{data.lng}}</td>
                    <td>
                      <button
                        role="button"
                        v-bind:id="data._id"
                        data-toggle="collapse"
                        data-target="#edit-maps"
                        class="btn btn-success"
                        @click="getUpdate"
                      >
                        <i class="fas fa-edit">update</i>
                      </button>

                      <button
                        role="button"
                        class="btn btn-danger"
                        v-bind:id="data._id"
                        onclick="return confirm('Are you sure you want to delete this item?');"
                        @click="handleDelete"
                      >
                        <i class="fas fa-trash-alt">delete</i>
                      </button>
                    </td>
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
    navbar: Navbar,
  },
  data() {
    return {
      datas: null,
      title: "",
      lat: "",
      lng: "",
      etitle: "",
      elat: "",
      elng: "",
      stitle: "",
      slat: "",
      slng: "",
      id: "",
    };
  },
  watch: {
    stitle: function () {
      this.searchData();
      // console.log(this.stitle);
    },
    slat: function () {
      this.searchData();
      // console.log(this.slat);
    },
    slng: function () {
      this.searchData();
      // console.log(this.slng);
    },
  },
  methods: {
    loadData() {
      this.$axios
        .get("http://localhost:3000/api/maps/")
        .then((response) => {
          //   console.log(response.data);
          this.datas = response.data;
        })
        .catch((err) => console.log(err));
    },
    hendleAdd(e) {
      e.preventDefault();
      //   console.log(this.title, this.lat, this.lng);
      this.$axios
        .post("http://localhost:3000/api/maps/", {
          title: this.title,
          lat: this.lat,
          lng: this.lng,
        })
        .then((response) => {
          if (response.data.success == true) {
            this.title = "";
            this.lat = "";
            this.lng = "";
            this.loadData();
          } else {
            console.log("internal server error to Add");
          }
        })
        .catch((err) => console.log("Something wrong with API connection"));
    },
    getUpdate(e) {
      e.preventDefault();
      const id = event.currentTarget.id;
      this.$axios
        .get("http://localhost:3000/api/maps/" + id)
        .then((result) => {
          if (result.data.success == true) {
            // console.log(result.data);
            this.etitle = result.data.data.title;
            this.elat = result.data.data.lat;
            this.elng = result.data.data.lng;
            this.id = result.data.data._id;
          } else {
            console.log("error bang");
          }
        })
        .catch((err) => console.log(err));
    },
    handleUpdate(e) {
      e.preventDefault();
      //   console.log(this.etitle, this.elat, this.elng, this.id);
      this.$axios
        .put("http://localhost:3000/api/maps/" + this.id, {
          title: this.etitle,
          lat: this.elat,
          lng: this.elng,
        })
        .then((response) => {
          if (response.data.success == true) {
            this.etitle = "";
            this.elat = "";
            this.elng = "";
            this.id = "";
            this.loadData();
          } else {
            console.log("error update");
          }
        })
        .catch((err) => console.log(err));
    },
    handleDelete(e) {
      e.preventDefault();
      const id = event.currentTarget.id;
      //   console.log(id);
      this.$axios
        .delete("http://localhost:3000/api/maps/" + id)
        .then((response) => {
          if (response.data.success == true) {
            this.loadData();
          } else console.log("Gagal remove");
        })
        .catch((err) => console.log(err));
    },
    searchData() {
      let search = {};
      if (this.stitle) {
        search.title = this.stitle;       
      } 
      this.$axios
        .post("http://localhost:3000/api/maps/search", search)
        .then((response) => {
          this.datas = response.data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.loadData();
  },
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