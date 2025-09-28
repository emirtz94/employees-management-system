-- Randomly assign employees to departments
INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date)
SELECT e.emp_no,
       (SELECT dept_no 
        FROM departments 
        ORDER BY RAND() 
        LIMIT 1) AS dept_no,
       CURRENT_DATE AS from_date,
       NULL AS to_date
FROM employees e;