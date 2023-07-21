import { constants as http2 } from 'http2';
import { MongoServerError } from 'mongodb';
import { z } from 'zod';
import { Student } from '@types';
import { updateStudentSchema } from '@validators';
import { Students } from '@models';

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid;

  if (!z.string().uuid().safeParse(event.context.params?.uuid).success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'students: invalid uuid'
    });
  }

  const body = await readBody(event);

  const result = updateStudentSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: http2.HTTP_STATUS_BAD_REQUEST,
      message: 'invalid student',
      data: result.error.flatten()
    });
  }

  try {
    const student = await Students.findOneAndUpdate({ uuid }, result.data) as Student | null;

    if (!student) {
      throw createError({
        statusCode: 404,
        statusMessage: 'students: not found'
      });
    }

    return student;
  } catch (err) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        throw createError({
          status: http2.HTTP_STATUS_CONFLICT,
          message: 'this email is already in use'
        });
      }
    }
    throw err;
  }
});
