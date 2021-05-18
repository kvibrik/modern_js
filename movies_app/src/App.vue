<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
  },
  data: () => ({
    posterBg: '',
  }),
  computed: {
    ...mapGetters('movies', [
      'moviesList',
      'currentPage',
      'moviesPerPage',
      'moviesLength',
    ]),
  },
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onPageQueryChange({ page = 1 } = {}) {
      this.changeCurrentPage(Number(page));
    },
    onChangePoster(poster) {
      console.log(poster);
      this.posterBg = poster;
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
