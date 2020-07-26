<template>
  <div>
    <nav class="pagination-container">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href @click.prevent="changePage('one')" aria-label="Previous">
            <span aria-hidden="true"><i class="fas fa-fast-backward"></i></span>
          </a>
        </li>
        <li class="page-item">
          <button class="page-link" @click.prevent="changePage('prev')">Previous</button>
        </li>

        <li class="page-item disabled">
          <span class="page-link inner-pagination-content">Page {{page}} of {{pages}}</span>
        </li>
        
        <li class="page-item">
          <button class="page-link" @click.prevent="changePage('next')">Next</button>
        </li>
        <li class="page-item">
          <a class="page-link" href @click.prevent="changePage('last')" aria-label="Next">
            <span aria-hidden="true"><i class="fas fa-fast-forward"></i></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["page", "pages", "perPage"],
  data() {
    return {};
  },
  methods: {
    changePage(val) {
      switch (val) {
        case "one":
          this.page = 1;
          break;
        case "prev":
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case "next":
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
        case "last":
          this.page = this.pages;
          break;
      }
      this.$emit("change-page", {
        page: this.page,
        pages: this.pages,
        perPage: this.perPage
      });
    }
  }
};
</script>

<style scoped>
.inner-pagination-content {
  display: flex;
  align-items: center;
  margin: 0px 10px;
}
</style>