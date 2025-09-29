export const getEmployeeListQuery = ({ dept_no, search }: {dept_no?: number, search?: string}) => {
  let sql = `FROM employees e`;

  const params: any[] = [];
  const whereConditions: string[] = [];

  if (dept_no) {
    sql += `
      JOIN dept_emp de ON e.emp_no = de.emp_no AND de.dept_no = ? AND de.to_date IS NULL
    `;
    params.push(dept_no);
  }

  if (search) {
    whereConditions.push(
      `(LOWER(e.first_name) LIKE ? OR LOWER(e.last_name) LIKE ?)`
    );
    const searchTerm = `%${search.toLowerCase()}%`;
    params.push(searchTerm, searchTerm);
  }

  if (whereConditions.length > 0) {
    sql += ` WHERE ` + whereConditions.join(" AND ");
  }

  return { sql, params };
};
