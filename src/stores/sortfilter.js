import { reactive } from "vue";

const state = reactive({
  searchQuery: "",
  selectedCategory: "",
  sortOrder: "",
});

const setSearchQuery = (query) => {
  state.searchQuery = query;
};

const setSelectedCategory = (category) => {
  state.selectedCategory = category;
};

const setSortOrder = (order) => {
  state.sortOrder = order;
};

export default {
  state,
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
};
