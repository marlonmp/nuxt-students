import { z } from 'zod';

const first_name = z.string({ required_error: 'The first name is required' })
  .trim()
  .min(3, { message: 'This field must have 3 or more characters' })
  .max(45, { message: 'This field musy have 45 or less characters' });

const last_name = z.string({ required_error: 'The last name is required' })
  .trim()
  .min(3, { message: 'This field must have 3 or more characters' })
  .max(45, { message: 'This field musy have 45 or less characters' });

const email = z.string({ required_error: 'The email is required' })
  .trim().toLowerCase()
  .email({ message: 'Enter a valid email address' });

const date_of_birth = z.coerce
  .date({ required_error: 'The date of birth is required', invalid_type_error: 'Enter a valid date' });

export const createStudentSchema = z.object({
  first_name,
  last_name,
  email,
  date_of_birth
});

export const updateStudentSchema = z.object({
  first_name,
  last_name,
  email,
  date_of_birth
});

export const studentFields = { first_name, last_name, email, date_of_birth };
