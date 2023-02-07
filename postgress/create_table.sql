CREATE TABLE expense (
  id serial primary key,
  comment text not null,
  amount integer not null,
  insertdate date not null
);