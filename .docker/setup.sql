CREATE DATABASE IF NOT EXISTS post_db;

USE post_db;

CREATE TABLE users ( id smallint unsigned not null auto_increment, name varchar(20)  null,email varchar(25) not null, password varchar(255) not null, token varchar(255) null,  constraint pk_example primary key (id) );

CREATE TABLE posts ( id smallint unsigned not null auto_increment, title varchar(20)  null,body varchar(255) null,  constraint pk_example primary key (id) );

FLUSH PRIVILEGES;