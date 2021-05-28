<template>
  <header class="header">
    <BNavbar type="dark" variant="dark" class="navbar">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm @submit.prevent="onSubmit">
          <BFormInput
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="searchValue"
            debounce="500"
          ></BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: '',
  }),
  watch: {
    searchValue: 'onSearchValueChanged',
  },
  methods: {
    ...mapActions('movies', [
      'searchMovies',
      'fetchMovies',
      'toggleSearchState',
    ]),
    onSearchValueChanged(val) {
      if (val) {
        this.toggleSearchState(true);
        this.searchMovies(val);
        return;
      }
      this.toggleSearchState(false);
      this.fetchMovies();
    },
    onSubmit(event) {
      this.onSearchValueChanged(event.target[0].value);
    },
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.search-input:focus {
  box-shadow: none;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.form-inline {
  list-style: none;
}
</style>
