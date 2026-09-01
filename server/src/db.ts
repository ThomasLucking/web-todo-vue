import { Database } from 'bun:sqlite'

export const db = new Database('todos.sqlite')

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

export interface Todo {
  id: number
  title: string
  description: string | null
  completed: number
  created_at: string
}
