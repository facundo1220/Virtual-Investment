CREATE DATABASE wbankdatabase OWNER postgres;

\c wbankdatabase;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'users',
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--INSERT INTO users (name, email, password)
--VALUES ('Test User', 'test.user@gmail.com', '123456');

CREATE TABLE simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DOUBLE PRECISION NOT NULL,
    "paymentTerm" VARCHAR(10) NOT NULL CHECK ("paymentTerm" IN ('monthly', 'anual')),
    "fromDate" DATE NOT NULL,
    "toDate" DATE NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "netInvestmentReturn" DOUBLE PRECISION NOT NULL,
    "returnPerPeriod" DOUBLE PRECISION NOT NULL,
    "withholdingTax" DOUBLE PRECISION NOT NULL,
    "finalInvestmentValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE investment_ranges (
    id SERIAL PRIMARY KEY,
    days_range_start INT NOT NULL,
    days_range_end INT NOT NULL,
    amount_range_start NUMERIC(15, 2) NOT NULL,
    amount_range_end NUMERIC(15, 2),
    percentage NUMERIC(5, 2) NOT NULL
);


INSERT INTO investment_ranges (days_range_start, days_range_end, amount_range_start, amount_range_end, percentage)
VALUES
  (30, 60, 500000, 20000000, 8.5),
  (61, 180, 500000, 20000000, 9),
  (181, 365, 500000, 20000000, 9.5),
  (366, 1000000, 500000, 20000000, 12),
  (30, 60, 20000001, 100000000, 8.7),
  (61, 180, 20000001, 100000000, 9.2),
  (181, 365, 20000001, 100000000, 9.7),
  (366, 1000000, 20000001, 100000000, 12.2),
  (30, 60, 100000001, 1000000000, 9),
  (61, 180, 100000001, 1000000000, 9.5),
  (181, 365, 100000001, 1000000000, 10),
  (366, 1000000, 100000001, 1000000000, 12.5),
  (30, 60, 1000000001, 2000000000, 10),
  (61, 180, 1000000001, 2000000000, 10.5),  
  (181, 365, 1000000001, 2000000000, 11),
  (366, 1000000, 1000000001, 2000000000, 13);

