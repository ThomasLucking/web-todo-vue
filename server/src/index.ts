import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { db, type Todo } from './db'

const app = new Elysia()
  .use(cors())
  .group('/todos', (app) =>
    app
      .get('/', () => db.query('SELECT * FROM todos ORDER BY id DESC').all() as Todo[])

      .get(
        '/:id',
        ({ params: { id }, status }) => {
          const todo = db.query('SELECT * FROM todos WHERE id = ?').get(id) as Todo | null
          return todo ?? status(404, { message: 'Todo not found' })
        },
        { params: t.Object({ id: t.Numeric() }) },
      )

      .post(
        '/',
        ({ body }) => {
          const todo = db
            .query('INSERT INTO todos (title, description) VALUES (?, ?) RETURNING *')
            .get(body.title, body.description ?? null) as Todo
          return todo
        },
        {
          body: t.Object({
            title: t.String({ minLength: 1 }),
            description: t.Optional(t.String()),
          }),
        },
      )

      .put(
        '/:id',
        ({ params: { id }, body, status }) => {
          const existing = db.query('SELECT * FROM todos WHERE id = ?').get(id) as Todo | null
          if (!existing) return status(404, { message: 'Todo not found' })

          const updated = db
            .query(
              `UPDATE todos SET
                title = ?,
                description = ?,
                completed = ?
              WHERE id = ?
              RETURNING *`,
            )
            .get(
              body.title ?? existing.title,
              body.description ?? existing.description,
              body.completed !== undefined ? Number(body.completed) : existing.completed,
              id,
            ) as Todo
          return updated
        },
        {
          params: t.Object({ id: t.Numeric() }),
          body: t.Object({
            title: t.Optional(t.String({ minLength: 1 })),
            description: t.Optional(t.String()),
            completed: t.Optional(t.Boolean()),
          }),
        },
      )

      .delete(
        '/:id',
        ({ params: { id }, status }) => {
          const existing = db.query('SELECT * FROM todos WHERE id = ?').get(id) as Todo | null
          if (!existing) return status(404, { message: 'Todo not found' })

          db.query('DELETE FROM todos WHERE id = ?').run(id)
          return { success: true }
        },
        { params: t.Object({ id: t.Numeric() }) },
      ),
  )
  .listen(3000)

console.log(`Elysia server running at ${app.server?.hostname}:${app.server?.port}`)
