CREATE DATABASE RRTCEDB;

CREATE TABLE Usuario (
id int IDENTITY(1,1) NOT NULL,
username VARCHAR(60) NOT NULL,
usertype VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
passwd VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE TCC (
id INT IDENTITY(1,1) NOT NULL,
title VARCHAR(60) NOT NULL,
author_id INT NOT NULL,
professor_id INT NOT NULL,
approved BIT default 'FALSE',
keywords VARCHAR(160),
abstract VARCHAR(500),
date_creation DATE ,
PRIMARY KEY (id),
FOREIGN KEY (author_id) REFERENCES Usuario(id),
FOREIGN KEY (professor_id) REFERENCES Usuario(id),
);

CREATE TABLE LogUsuario (
id INT IDENTITY(1,1) NOT NULL,
description_text VARCHAR(200) NOT NULL,
author_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE LogTCC (
id INT IDENTITY(1,1) NOT NULL,
description_text VARCHAR(200) NOT NULL,
author_id INT NOT NULL,
PRIMARY KEY (id)
);