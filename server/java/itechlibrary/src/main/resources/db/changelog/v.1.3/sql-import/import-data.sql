INSERT INTO booking_acceptance_status (name)
VALUES ('ACCEPTED') ON CONFLICT (id) DO NOTHING;
INSERT INTO booking_acceptance_status (name)
VALUES ('DECLINED') ON CONFLICT (id) DO NOTHING;