CREATE TABLE post (
    id         BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title      VARCHAR     NOT NULL check ( length(title) >= 3 ),
    message    VARCHAR,
    state      VARCHAR     NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);