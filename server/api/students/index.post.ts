import { constants as http2 } from 'http2';
import { MongoServerError } from 'mongodb';
import { createStudentSchema } from '@validators';
import { Students } from '@models';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = createStudentSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: http2.HTTP_STATUS_BAD_REQUEST,
      message: 'invalid student',
      data: result.error.flatten()
    });
  }

  try {
    return await new Students(result.data).save();
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
