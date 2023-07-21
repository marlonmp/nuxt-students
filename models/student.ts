import { randomUUID } from 'crypto';
import { Schema, model } from 'mongoose';

import type { Student } from '@types';

const studentSchema = new Schema<Student>({
  uuid: { type: String, default: randomUUID, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  date_of_birth: Date
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const Students = model('Student', studentSchema);
