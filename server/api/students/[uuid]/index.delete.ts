import { z } from 'zod';
import { Students } from '@models';
import { Student } from '@types';

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid;

  if (!z.string().uuid().safeParse(event.context.params?.uuid).success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'students: invalid uuid'
    });
  }

  const student = await Students.findOneAndDelete({ uuid }) as Student | null;

  if (!student) {
    throw createError({
      statusCode: 404,
      statusMessage: 'students: not found'
    });
  }

  return student;
});
