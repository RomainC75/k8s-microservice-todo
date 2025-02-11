CREATE TABLE lists (
    id BIGSERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    user_id  BIGSERIAL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    list_id  BIGSERIAL NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    deadline DATE,
    is_done BOOLEAN,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
