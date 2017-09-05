--
-- PostgreSQL database dump
--

\c engage

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE activity (
    id integer NOT NULL,
    subject_id integer,
    difficulty integer,
    hint text,
    description text
);


ALTER TABLE activity OWNER TO postgres;

--
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE activity_id_seq OWNER TO postgres;

--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE activity_id_seq OWNED BY activity.id;


--
-- Name: child; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE child (
    id integer NOT NULL,
    name text,
    age integer
);


ALTER TABLE child OWNER TO postgres;

--
-- Name: child_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE child_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE child_id_seq OWNER TO postgres;

--
-- Name: child_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE child_id_seq OWNED BY child.id;


--
-- Name: child_subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE child_subject (
    child_id integer,
    subject_id integer
);


ALTER TABLE child_subject OWNER TO postgres;

--
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE message (
    id integer NOT NULL,
    user_id integer,
    content text,
    created_at text DEFAULT date_part('epoch'::text, now()),
    conversation_id integer
);


ALTER TABLE message OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comment_id_seq OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comment_id_seq OWNED BY message.id;


--
-- Name: conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE conversation (
    id integer NOT NULL,
    channel text
);


ALTER TABLE conversation OWNER TO postgres;

--
-- Name: conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE conversation_id_seq OWNER TO postgres;

--
-- Name: conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE conversation_id_seq OWNED BY conversation.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE session (
    id integer NOT NULL,
    activity_id integer,
    score integer,
    notes text,
    user_id integer,
    child_id integer,
    created_at text DEFAULT date_part('epoch'::text, now())
);


ALTER TABLE session OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE session_id_seq OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE session_id_seq OWNED BY session.id;


--
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE subject (
    id integer NOT NULL,
    title text
);


ALTER TABLE subject OWNER TO postgres;

--
-- Name: subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subject_id_seq OWNER TO postgres;

--
-- Name: subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE subject_id_seq OWNED BY subject.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    email text,
    "firstName" text,
    "lastName" text
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_child; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_child (
    user_id integer,
    child_id integer
);


ALTER TABLE user_child OWNER TO postgres;

--
-- Name: user_conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_conversation (
    conversation_id integer,
    user_id integer
);


ALTER TABLE user_conversation OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity ALTER COLUMN id SET DEFAULT nextval('activity_id_seq'::regclass);


--
-- Name: child id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY child ALTER COLUMN id SET DEFAULT nextval('child_id_seq'::regclass);


--
-- Name: conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY conversation ALTER COLUMN id SET DEFAULT nextval('conversation_id_seq'::regclass);


--
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY message ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY session ALTER COLUMN id SET DEFAULT nextval('session_id_seq'::regclass);


--
-- Name: subject id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subject ALTER COLUMN id SET DEFAULT nextval('subject_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY activity (id, subject_id, difficulty, hint, description) FROM stdin;
1	1	1	At first, use your fingers together and count along with your child promting them when hesitant. When the can do it alone without your help they're ready to move on.	Counting to ten.
2	1	6	Count backwards from 100. Try to maintain the rhythm over the decimal barriers. 	Counting backwards from 100.
3	1	2	At first, use your fingers together and count along with your child promting them when hesitant. When the can do it alone without your help they're ready to move on.	Counting to twenty.
4	1	3	At first, use your fingers together and count along with your child promting them when hesitant. When the can do it alone without your help they're ready to move on.	Counting backwards from ten.
5	1	4	At first, use your fingers together and count along with your child promting them when hesitant. When the can do it alone without your help they're ready to move on.	Counting backwards from twenty.
6	1	5	At first, use your fingers together and count along with your child promting them when hesitant. When the can do it alone without your help they're ready to move on.	Counting in twos.
\.


--
-- Name: activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('activity_id_seq', 1, true);


--
-- Data for Name: child; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY child (id, name, age) FROM stdin;
1	Aniela	3
2	Bella	6
\.


--
-- Name: child_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('child_id_seq', 1, true);


--
-- Data for Name: child_subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY child_subject (child_id, subject_id) FROM stdin;
1	1
2	2
\.


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comment_id_seq', 199, true);


--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY conversation (id, channel) FROM stdin;
\.


--
-- Name: conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('conversation_id_seq', 1, false);


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY message (id, user_id, content, created_at, conversation_id) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY session (id, activity_id, score, notes, user_id, child_id, created_at) FROM stdin;
1	1	75	Getting better!	1	1	2017-07-22 21:57:11.758383
3	1	80	No fingers!	1	1	2017-07-22 22:02:07.288529
4	2	100	Awesome work!	2	2	2017-08-03 13:17:04.819873
\.


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('session_id_seq', 3, true);


--
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY subject (id, title) FROM stdin;
1	Numbers
2	Shapes
3	Nature
4	Words
5	Colors
\.


--
-- Name: subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('subject_id_seq', 5, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "user" (id, email, "firstName", "lastName") FROM stdin;
1	hally9k@gmail.com	Hal	Smith Stevens
2	k.shrosbree@gmail.com	Kirsty	Smith Stevens
\.


--
-- Data for Name: user_child; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_child (user_id, child_id) FROM stdin;
1	1
2	2
\.


--
-- Data for Name: user_conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_conversation (conversation_id, user_id) FROM stdin;
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_id_seq', 2, true);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- Name: conversation conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: session activity_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY session
    ADD CONSTRAINT activity_fkey FOREIGN KEY (activity_id) REFERENCES activity(id);


--
-- Name: user_child child_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_child
    ADD CONSTRAINT child_fkey FOREIGN KEY (child_id) REFERENCES child(id);


--
-- Name: child_subject child_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY child_subject
    ADD CONSTRAINT child_fkey FOREIGN KEY (child_id) REFERENCES child(id);


--
-- Name: session child_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY session
    ADD CONSTRAINT child_fkey FOREIGN KEY (child_id) REFERENCES child(id);


--
-- Name: message comment_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY message
    ADD CONSTRAINT comment_user FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: message conversation_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY message
    ADD CONSTRAINT conversation_id FOREIGN KEY (conversation_id) REFERENCES conversation(id);


--
-- Name: child_subject subject_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY child_subject
    ADD CONSTRAINT subject_fkey FOREIGN KEY (subject_id) REFERENCES subject(id);


--
-- Name: activity subject_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT subject_fkey FOREIGN KEY (subject_id) REFERENCES subject(id);


--
-- Name: user_conversation user_conversation_conversation_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_conversation
    ADD CONSTRAINT user_conversation_conversation_id FOREIGN KEY (conversation_id) REFERENCES conversation(id);


--
-- Name: user_conversation user_conversation_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_conversation
    ADD CONSTRAINT user_conversation_user_id FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: user_child user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_child
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: session user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY session
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- PostgreSQL database dump complete
--
