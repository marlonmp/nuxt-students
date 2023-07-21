<script setup lang="ts">
import { FetchError } from 'ofetch';
import { createStudentSchema, studentFields } from '@validators';
import type { Student } from '@types';

useSeoMeta({ title: 'Create new student' });

type FormField = { name: keyof Student, label: string, placeholder: string, error?: string | null };

const student = reactive<Student>({
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: ''
});

const isValid = computed(() => {
  const res = createStudentSchema.safeParse(student);
  return res.success;
});

const errorMessage = ref('');

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
    await $fetch('/api/students', { method: 'post', body: { ...student } });
    navigateTo('/students');
  } catch (err) {
    if (err instanceof FetchError) {
      if (err.statusCode === 409) {
        errorMessage.value = 'The user with this email already exists';
      }
    }
  }
};
</script>

<template>
  <div class="w-4/5 rounded-lg border m-12 mx-auto px-10 py-12">
    <div class="text-2xl font-black text-neutral-700">
      New Student
    </div>

    <form class="mt-4 space-y-6" @submit.prevent="submit">
      <div v-for="field, i in fields" :key="i">
        <label :for="`input_${field.name}`">{{ field.label }}</label>
        <input :id="`input_${field.name}`" v-model="student[field.name]" type="text" class="green" :placeholder="field.placeholder" @input="validateField(field)">
        <p :id="`message_${field.name}`" class="input-error-message">
          {{ field.error }}
        </p>
      </div>

      <p class="input-error-message">
        {{ errorMessage }}
      </p>

      <button class="green" :disabled="!isValid">
        Create
      </button>
    </form>
  </div>
</template>
