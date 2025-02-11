-- name: GetList :one
SELECT * FROM lists
WHERE user_id = $1 AND name = $2 LIMIT 1;

-- name: ListLists :many
SELECT * FROM lists
WHERE user_id = $1
ORDER BY created_at;

-- name: CreateList :one
INSERT INTO lists (
    name, user_id, created_at, updated_at
) VALUES (
    $1, $2, NOW(), NOW()
)
RETURNING *;

-- name: DeleteList :exec
DELETE FROM lists
WHERE id = $1 AND user_id = $2;

-- name: UpdateList :one
UPDATE lists
SET 
    name = $2,
    updated_at = NOW()
WHERE id = $1
RETURNING *;