# Node_mysql

this is raw package using node express mysql2

As there is no sequelize 


## For Docker branch just run:

```
docker compose up
```

# Else for master

Please add Database post_db 

and two table init:
    1. posts
    2. users
    
### Users: 
```
CREATE TABLE users ( id smallint unsigned not null auto_increment, name varchar(20)  null,email varchar(25) not null, password varchar(255) not null, token varchar(255) null,  constraint pk_example primary key (id) );
```


### Posts:


```

CREATE TABLE postss ( id smallint unsigned not null auto_increment, title varchar(20)  null,body varchar(255) null,  constraint pk_example primary key (id) );
```
