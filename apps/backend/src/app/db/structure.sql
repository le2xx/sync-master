CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(50) DEFAULT NULL,
	last_name VARCHAR(50) DEFAULT NULL,
  register_at TIMESTAMP DEFAULT NOW(),
	password VARCHAR(255),
	is_active BOOL DEFAULT true,
	is_deleted BOOL DEFAULT false
);

CREATE TABLE public.companies (
  company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) DEFAULT NULL,
  inn VARCHAR(12) DEFAULT NULL,
  ogrn VARCHAR(15) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOL DEFAULT true,
  is_deleted BOOL DEFAULT false
);

CREATE TABLE public.roles (
  role_id SERIAL PRIMARY KEY,
  name VARCHAR(50) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL
);

INSERT INTO public.roles (name) VALUES
('Admin'),
('Owner'),
('Customer');

CREATE TABLE public.user_company_roles (
  user_id UUID REFERENCES public.users(user_id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(company_id) ON DELETE CASCADE,
  role_id INT REFERENCES public.roles(role_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, company_id, role_id)
);

