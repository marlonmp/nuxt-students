<script setup lang="ts">
import { z } from 'zod';
import { updateStudentSchema, studentFields } from '@validators';
import type { Student } from '@types';

useSeoMeta({ title: 'Update student' });

definePageMeta({
  validate: route => z.string().uuid().safeParse(route.params?.uuid).success
});

const route = useRoute();

type FormField = { name: keyof Student, label: string, placeholder: string, error?: string | null };

const student = reactive<Student>({
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: ''
});

const { data: studentFound, pending, error } = await useFetch(`/api/students/${route.params.uuid}`);

Object.assign(student, studentFound.value);

const isValid = computed(() => {
  const res = updateStudentSchema.safeParse(student);
  return res.success;
});

const fields: FormField[] = [
  { name: 'first_name', label: 'First name *', placeholder: 'Enter the student\'s first name' },
  { name: 'last_name', label: 'Last name *', placeholder: 'Enter the student\'s last name' },
  { name: 'email', label: 'Email *', placeholder: 'Enter the student\'s email' },
  { name: 'date_of_birth', label: 'Date of birth *', placeholder: 'Enter the student\'s birth date' }
];

const validateField = (field: FormField) => {
  const zodField = studentFields[field.name as keyof typeof studentFields];

  const res = zodField.safeParse(student[field.name]);

  field.error = res.success ? null : res.error.issues[0]?.message;
};

const submit = async () => {
  if (!isValid) { return; }

  try {
    await $fetch(`/api/students/${route.params.uuid}`, { method: 'put', body: { ...student } });
    navigateTo('/students');
  } catch (err) {}
};
</script>

<template>
  <div class="w-4/5 rounded-lg border m-12 mx-auto px-10 py-12">
    <div class="text-2xl font-black text-neutral-700">
      Edit student
    </div>

    <div v-if="pending">
      Loading...
    </div>

    <div v-else-if="error">
      An error has ocurred
    </div>

    <form v-else class="mt-4 space-y-6" @submit.prevent="submit">
      <div v-for="field, i in fields" :key="i">
        <label :for="`input_${field.name}`">{{ field.label }}</label>
        <input :id="`input_${field.name}`" v-model="student[field.name]" type="text" class="green" :placeholder="field.placeholder" @input="validateField(field)">
        <p :id="`message_${field.name}`" class="input-error-message">
          {{ field.error }}
        </p>
      </div>

      <button class="green" :disabled="!isValid">
        Update
      </button>
    </form>
  </div>
</template>
