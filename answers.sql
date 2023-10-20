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
    JOIN orders o ON o.cupcake_id = c.id
GROUP BY name
ORDER BY name ASC;