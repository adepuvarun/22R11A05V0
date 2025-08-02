CREATE DATABASE IF NOT EXISTS url_shortener;

USE url_shortener;

CREATE TABLE urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  long_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at DATETIME NOT NULL,
  expires_at DATETIME NOT NULL
);
select * from urls
