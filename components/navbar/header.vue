<script setup lang="ts">
const title = 'Students crud';
const routes = [
  { to: '/', name: 'Home' },
  { to: '/students', name: 'Students' }
];
</script>

<template>
  <nav class="bg-green-600 border-gray-200 dark:bg-green-400">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">{{ title }}</span>

      <div class="w-full md:w-auto">
        <ul class="font-medium flex flex-row p-4 md:p-0 mt-4 md:space-x-8 md:mt-0 md:border-0">
          <li v-for="route, i in routes" :key="i">
            <NuxtLink :to="route.to" active-class="active" class="navbar-link">
              {{ route.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
