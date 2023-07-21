<script setup lang="ts">
import type { Student } from '@types';

const { data: students, refresh } = await useFetch('/api/students');

useSeoMeta({ title: 'Students' });

const columns = [
  'First name',
  'Last name',
  'Email',
  'Birth of date',
  'Edit',
  'Delete'
];

const deleteStudent = async (student: Student) => {
  try {
    await $fetch(`/api/students/${student.uuid}`, { method: 'delete' });
    await refresh();
  } catch (err) {}
};
</script>

<template>
  <div class="w-4/5 xl:w-[1080px] mx-auto m-12">
    <div class="flex justify-between items-center mb-6">
      <div class="text-2xl font-black text-neutral-700">
        Students
      </div>

      <NuxtLink to="/students/new">
        <button class="green">
          Create student
        </button>
      </NuxtLink>
    </div>

    <div class="rounded-lg border-2">
      <table class="w-full">
        <thead class="text-sm">
          <tr>
            <th v-for="col, i in columns" :key="i" scope="col">
              {{ col }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="student in students" :key="student.uuid">
            <th scope="row">
              {{ student.first_name }}
            </th>
            <td>{{ student.last_name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.date_of_birth }}</td>
            <td>
              <a href="#" class="font-medium text-blue-600 hover:underline" @click="navigateTo(`/students/${student.uuid}`)">Edit</a>
            </td>
            <td>
              <a href="#" class="font-medium text-red-600 hover:underline" @click="deleteStudent(student as Student)">Delete</a>
            </td>
          </tr>

          <tr v-if="(students?.length ?? 0) === 0">
            <td colspan="100%">
              There are not students found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
    <ul class="inline-flex -space-x-px text-sm h-8">
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
      </li>
      <li>
        <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
      </li>
    </ul>
  </nav> -->
</template>
