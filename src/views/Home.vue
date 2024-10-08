<!-- src/views/Home.vue -->

<template>
  <div class="container mx-auto p-6">
    <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
      <select
        v-model="selectedCategory"
        class="border p-2 rounded mb-2 sm:mb-0"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <Loading v-if="loading" />
    <ProductGrid v-else :products="filteredProducts" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import Loading from "../components/Loading.vue";
import ProductGrid from "../components/ProductGrid.vue";

/**
 * The home view component.
 *
 * @component
 */

export default {
  components: {
    Loading,
    ProductGrid,
  },
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortOrder = ref("");
    const loading = ref(true);

    /**
     * Fetches products from the API.
     */

    const fetchProducts = async () => {
      loading.value = true;
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      products.value = data;
      loading.value = false;
    };

    /**
     * Fetches product categories from the API.
     */

    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      categories.value = data;
    };

    /**
     * Filters products based on the search query.
     */

    const searchProducts = () => {
      filteredProducts.value = products.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    /**
     * Computes the filtered and sorted products based on category, sort order, and search query.
     *
     * @returns {Array<Object>} The filtered and sorted products.
     */

    const filteredProducts = computed(() => {
      let prods = products.value;
      if (selectedCategory.value) {
        prods = prods.filter(
          (product) => product.category === selectedCategory.value
        );
      }
      if (sortOrder.value === "asc") {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === "desc") {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === "default") {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        prods = prods.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    return {
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts,
    };
  },
};
</script>
