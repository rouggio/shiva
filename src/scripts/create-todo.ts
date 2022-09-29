// 3p
import { createConnection } from 'typeorm';

// App
import { Todo } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    text: { type: 'string' }
  },
  required: ['text'],
  type: 'object',
};

export async function main(args: any) {
  const connection = await createConnection();

  try {
    const todo = new Todo();
    todo.text = args.text;

  } catch (error: any) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
