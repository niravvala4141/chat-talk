CREATE DATABASE chat_talk;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    uid UUID DEFAULT uuid_generate_v4() NOT NULL,  
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL
);

ALTER TABLE "user"
ADD CONSTRAINT user_id_unique UNIQUE (uid);

CREATE TABLE "chat_room" (
    id SERIAL PRIMARY KEY,
    room_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    from_id UUID NOT NULL,
    to_id UUID NOT NULL,
    status BOOLEAN NOT NULL,
    created_ip VARCHAR(20) NOT NULL,
    updated_ip VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ,
    FOREIGN KEY (from_id)
        REFERENCES "user"(uid),
    FOREIGN KEY (to_id)
        REFERENCES "user"(uid)
);

ALTER TABLE "chat_room"
ADD CONSTRAINT room_id_unique UNIQUE (room_id);

CREATE TYPE content_type AS 
    ENUM(
        'text',
        'image',
        'media'
    );

CREATE TABLE chat_room_dtl (
    id SERIAL NOT NULL PRIMARY KEY,
    chat_room_id uuid NOT NULL,
    from_id uuid NOT NULL,
    to_id uuid NOT NULL,
    message VARCHAR(1000),
    is_read BOOLEAN DEFAULT FALSE,
    message_type content_type NOT NULL DEFAULT 'text',
    created_ip VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_ip VARCHAR(20),
    updated_at TIMESTAMP,

    FOREIGN KEY (from_id)
        REFERENCES "user"(uid),
    FOREIGN KEY (to_id)
        REFERENCES "user"(uid),
    FOREIGN KEY (chat_room_id)
        REFERENCES "chat_room"(room_id)
);

CREATE INDEX idx_chat_room_dtl_from_id ON chat_room_dtl(from_id);
CREATE INDEX idx_chat_room_dtl_to_id ON chat_room_dtl(to_id);
CREATE INDEX idx_chat_room_dtl_created_at ON chat_room_dtl(created_at);

