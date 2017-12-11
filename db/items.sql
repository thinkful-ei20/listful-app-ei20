DROP TABLE IF EXISTS  items_tags;
DROP TABLE IF EXISTS  tags;
DROP TABLE IF EXISTS  items;
DROP TABLE IF EXISTS  users;


CREATE TABLE users (
    id serial PRIMARY KEY,
    email text NOT NULL,
    username text NOT NULL    
);


CREATE TABLE items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
	completed boolean DEFAULT false,  
	created timestamp DEFAULT now(),
  user_id integer REFERENCES users ON DELETE RESTRICT
);


CREATE TABLE tags (
    id serial PRIMARY KEY,
    tag text NOT NULL
);


CREATE TABLE items_tags (
    item_id integer REFERENCES items(id) ON DELETE CASCADE,
    tag_id integer REFERENCES tags(id) ON DELETE RESTRICT,
    PRIMARY KEY (item_id, tag_id)
);


INSERT INTO users 
	(id, username, email) 
VALUES
	(31, 'Foo', 'foo@example.com'),
	(42, 'Bar', 'bar@example.com'),
	(53, 'Qux', 'qux@example.com'),
	(64, 'Baz', 'baz@example.com');


INSERT INTO items 
	(id, name, description, user_id)
VALUES 
  (1001, 'Avocados', 'avacado mash', 31),
  (1002, 'Orange juice', 'not just for breakfast', 42),
  (1003, 'Ice Cream', 'Ben & Jerry''s', 53),
  (1004, 'Oil Change', 'stop at dealership', 31),
  (1005, 'Cat Food', null, 42),
  (1006, 'Sun Glasses', 'for vacation', 53),
  (1007, 'Dark roast', 'nectar of the gods', 31),
  (1008, 'Running Shoes', null, 42),
  (1009, 'Espresso', 'nectar of the gods', 53),
  (1010, 'Merlot', 'for dinner', null);


INSERT INTO tags
	(id, tag)
VALUES 
	(171, 'Grocery'),
	(172, 'Coffee'),
	(173, 'Pet');


INSERT INTO items_tags (item_id, tag_id) VALUES 
(1001, 171),
(1002, 171),
(1003, 171),
(1005, 171), (1005, 173),
(1006, 171),
(1007, 171), (1007, 172),
(1009, 171), (1009, 172);


SELECT users.id, email, username, items.id,
name, description, completed, user_id
FROM users JOIN items
ON users.id = items.user_id;


SELECT users.id, email, username, items.id,
name, description, completed, user_id
FROM users LEFT JOIN items
ON users.id = items.user_id;


SELECT users.id, email, username, items.id,
name, description, completed, user_id
FROM users RIGHT JOIN items
ON users.id = items.user_id;


SELECT users.id, email, username, items.id,
name, completed, user_id, tag
FROM users
JOIN items ON users.id = items.user_id
JOIN items_tags ON items.id = items_tags.item_id
JOIN tags ON items_tags.tag_id = tags.id;