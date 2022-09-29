import { Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent, HttpResponseNotFound, HttpResponseOK, Post, ValidateBody, ValidatePathParam } from '@foal/core';
import { Todo } from '../entities';

export class ApiController {

  @Get('/todos')
  async getTodos() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      text: { type: 'string' }
    },
    required: [ 'text' ],
    type: 'object'
  })
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    await todo.save();
    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidatePathParam('id', { type: 'number' })
  async deleteTodo(ctx: Context) {
    const todo = await Todo.findOne({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await todo.remove();
    return new HttpResponseNoContent();
  }

}
