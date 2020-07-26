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
              <div class="col-2">
                <h3>
                  <i class="far fa-plus-square">Add :</i>
                </h3>
              </div>
              <div class="col-4">
                <input type="text" v-model="letter" class="form-control" placeholder="Letter" />
              </div>
              <div class="col-4">
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
    <!-- EDIT -->
    <br />
    <div class="container">
      <div class="collapse" id="formEdit">
        <div>
          <form>
            <div class="row">
              <div class="col-2">
                <h3>
                  <i class="fas fa-edit">Edit :</i>
                </h3>
              </div>
              <div class="col-4">
                <input type="text" v-model="eLetter" class="form-control" placeholder="Letter" />
              </div>
              <div class="col-4">
                <input
                  type="text"
                  v-model="eFrequency"
                  class="form-control"
                  placeholder="Frequency"
                />
              </div>
              <button
                class="btn btn-secondary"
                data-toggle="collapse"
                data-target="#formEdit"
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
                  <div class="col-4">
                    <input
                      type="text"
                      v-model="sLetter"
                      class="form-control"
                      placeholder="Latter"
                      required
                    />
                  </div>
                  <div class="col-4">
                    <input
                      type="Number"
                      step="0.1"
                      v-model="sFrequency"
                      class="form-control"
                      placeholder="Frequency"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="card-body">
              <pagination
                v-bind:page="pagination.page"
                v-bind:pages="pagination.pages"
                v-bind:per-page="pagination.perPage"
                v-on:change-page="changePage"
              ></pagination>
              <table class="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Letter</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for=" (data,index) in computedDatas" v-bind:key="data._id">
                    <th>{{pagination.page == 1 ? index + 1 : (pagination.perPage * pagination.page - pagination.perPage) + index + 1}}</th>
                    <td>{{data.letter}}</td>
                    <td>{{data.frequency}}</td>
                    <td>
                      <button
                        role="button"
                        v-bind:id="data._id"
                        @click="getUpdate"
                        data-toggle="collapse"
                        data-target="#formEdit"
                        class="btn btn-success"
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
import Pagination from "./Pagination.vue";

export default {
  components: {
    navbar: Navbar,
    pagination: Pagination,
  },
  data() {
    return {
      datas: null,
      letter: "",
      frequency: "",
      eLetter: "",
      eFrequency: "",
      sLetter: "",
      sFrequency: "",
      id: "",
      pagination: {
        page: 1,
        pages: 1,
        perPage: 10,
      },
    };
  },
  watch: {
    sLetter: function () {
      this.searchData();
    },
    sFrequency: function () {
      this.searchData();
    },
  },
  computed: {
    computedDatas() {
      if (!this.datas) return [];
      else {
        const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
        const lastIndex = this.pagination.page * this.pagination.perPage;

        console.log(firstIndex, lastIndex);
        return this.datas.slice(firstIndex, lastIndex);
      }
    },
  },
  methods: {
    loadData() {
      this.$axios
        .get("http://localhost:3000/api/data/")
        .then((response) => {
          //   console.log(response.data);
          this.datas = response.data;
          this.pagination.pages = Math.ceil(
            response.data.length / this.pagination.perPage
          );
        })
        .catch((err) => console.log(err));
    },
    hendleAdd(e) {
      e.preventDefault();
      //   console.log(this.letter, this.frequency)
      this.$axios
        .post("http://localhost:3000/api/data/", {
          letter: this.letter,
          frequency: this.frequency,
        })
        .then((response) => {
          if (response.data.success == true) {
            this.letter = "";
            this.frequency = "";
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
        .get("http://localhost:3000/api/data/" + id)
        .then((result) => {
          if (result.data.success == true) {
            // console.log(result.data);
            this.eLetter = result.data.data.letter;
            this.eFrequency = result.data.data.frequency;
            this.id = result.data.data._id;
          } else {
            console.log("error bang");
          }
        })
        .catch((err) => console.log(err));
    },
    handleUpdate(e) {
      e.preventDefault();
      this.$axios
        .put("http://localhost:3000/api/data/" + this.id, {
          letter: this.eLetter,
          frequency: this.eFrequency,
        })
        .then((response) => {
          if (response.data.success == true) {
            this.eLetter = "";
            this.eFrequency = "";
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
      console.log(id);
      this.$axios
        .delete("http://localhost:3000/api/data/" + id)
        .then((response) => {
          if (response.data.success == true) {
            this.loadData();
          } else console.log("Gagal remove");
        })
        .catch((err) => console.log(err));
    },
    searchData() {
      let search = {};
      if (this.sLetter && this.sFrequency) {
        search.letter = this.sLetter;
        search.frequency = this.sFrequency;
      } else if (this.sLetter) {
        search.letter = this.sLetter;
      } else if (this.sFrequency) {
        search.frequency = this.sFrequency;
      }
      this.$axios
        .post("http://localhost:3000/api/data/search", search)
        .then((response) => {
          this.datas = response.data;
        })
        .catch((err) => console.log(err));
    },
    changePage(data) {
      this.pagination.page = data.page;
      this.pagination.pages = data.pages;
      this.pagination.perPage = data.perPage;
      console.log("change page", data);
      console.log(this.pagination.page);
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