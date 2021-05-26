<template>
  <div>
    <BContainer>
      <h3 class="list-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @removeItem="onRemoveItem"
              @showModal="onShowMovieInfo"
            />
          </BCol>
        </template>
        <template v-else>
          <div>
            Empty List
          </div>
        </template>
      </BRow>
      <BModal :id="movieInfoModalID" size="xl" hide-footer hide-header>
        <p>Some text</p>
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem.vue';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalID: 'movie-info',
    selectedMovieID: '',
  }),
  computed: {
    ...mapGetters('movies', ['isSearch']),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? 'Search result' : 'IMDB top 250';
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    },
  },
  methods: {
    ...mapActions('movies', ['removeMovie']),
    ...mapActions(['showNotify']),
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure to delete ${title}`,
      );

      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: 'Movie deleted successful',
          variant: 'success',
          title: 'success',
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>
