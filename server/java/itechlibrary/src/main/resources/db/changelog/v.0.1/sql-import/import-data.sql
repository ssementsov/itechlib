INSERT INTO status (name)
VALUES ('AVIABLE') ON CONFLICT (id) DO NOTHING;
INSERT INTO status (name)
VALUES ('NOT AVIABLE') ON CONFLICT (id) DO NOTHING;
INSERT INTO status (name)
VALUES ('IN USE') ON CONFLICT (id) DO NOTHING;

INSERT INTO category (name)
VALUES ('PROFESSIONAL') ON CONFLICT (id) DO NOTHING;
INSERT INTO category (name)
VALUES ('NOT PROFESSIONAL') ON CONFLICT (id) DO NOTHING;

INSERT INTO language (name)
VALUES ('ENGLISH') ON CONFLICT (id) DO NOTHING;
INSERT INTO language (name)
VALUES ('RUSSIAN') ON CONFLICT (id) DO NOTHING;
