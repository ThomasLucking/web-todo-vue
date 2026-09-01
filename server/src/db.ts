import { Database } from 'bun:sqlite'

export const db = new Database('todos.sqlite')

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

const columns = db.query('PRAGMA table_info(todos)').all() as { name: string }[]
if (!columns.some((c) => c.name === 'completed')) {
  db.run('ALTER TABLE todos ADD COLUMN completed INTEGER NOT NULL DEFAULT 0')
}

export interface Todo {
  id: number
  title: string
  description: string | null
  completed: number
  created_at: string
}
