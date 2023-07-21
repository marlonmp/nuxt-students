import { Students } from '@models';
import { Student } from '@types';

export default defineEventHandler(async (_event) => {
  const students = await Students.find() as Student[];
  return students;
});
