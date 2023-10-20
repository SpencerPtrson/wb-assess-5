-- Problem 1
SELECT *
FROM customers
ORDER BY email;


-- Problem 2
SELECT id
FROM orders
WHERE customer_id IN (
    SELECT id
    FROM customers
    WHERE fname = 'Elizabeth' AND lname = 'Crocker'
);


-- Problem 3
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = 'f';


-- Problem 4
SELECT name, SUM(num_cupcakes) as sum
FROM cupcakes c
    LEFT JOIN orders o ON o.cupcake_id = c.id
GROUP BY name
ORDER BY name ASC;


-- Problem 5
SELECT email, sum(num_cupcakes) as total
FROM customers c
    JOIN orders o ON c.id = o.customer_id
GROUP BY email
ORDER BY total DESC;


-- Problem 6
SELECT DISTINCT fname, lname, email
FROM customers c
    JOIN orders o ON c.id = o.customer_id
    JOIN cupcakes ck ON o.cupcake_id = ck.id
WHERE 
    processed = 't' AND
    name = 'funfetti'
;
