-- name: GetTask :one
-- SELECT * FROM tasks
-- LEFT JOIN lists ON tasks.list_id = lists.id
-- WHERE lists.user_id = $1 AND name = $2 LIMIT 1;

-- name: ListTasks :many
SELECT * FROM tasks
LEFT JOIN lists ON tasks.list_id = lists.id
WHERE lists.user_id = $1;

-- name: CreateTask :one
INSERT INTO tasks (
    list_id, name, description, deadline, created_at, updated_at
) VALUES (
    $1, $2, $3, $4, NOW(), NOW()
)
RETURNING *;

-- name: DeleteTask :exec
DELETE FROM tasks
WHERE id = $1 AND list_id = $2;

-- name: UpdateTask :one
UPDATE tasks
SET 
    name = $1,
    description = $2,
    deadline = $3,
    is_done = $4,
    updated_at = NOW()
WHERE email = $1
RETURNING *;