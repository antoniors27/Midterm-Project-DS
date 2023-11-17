const mysql = require("../dbDriver/mysql");
const errorMessages = require("../utils/errorMessages");

const getEmployees = async () => {
  const sql = "SELECT * FROM employee";
  const [rows] = await mysql.query(sql);
  return rows;
};

const createEmployee = async (employee) => {
  const sql =
    "INSERT INTO employee (name, email, phone) VALUES (?, ?, ?)";
  const [result] = await mysql.query(sql, [
    employee.name,
    employee.email,
    employee.phone,
  ]);
  return { id: result.insertId, ...employee };
};

const updateEmployee = async (id, employee) => {
  const { email, phone } = employee;
  const sql = "SELECT * FROM employee WHERE (email = ? OR phone = ?) AND id <> ?";
  const [rows] = await mysql.query(sql, [email, phone, id]);
  if (rows.length > 0) {
    throw new Error(errorMessages.EMAIL_EXISTS);
  }
  // otherwise, update the employee
  const sql2 =
    "UPDATE employee SET name = ?, email = ?, phone = ? WHERE id = ?";
  const [result] = await mysql.query(sql2, [
    employee.name,
    employee.email,
    employee.phone,
    id,
  ]);
  // return the updated employee
  return { id, ...employee };
};

const deleteEmployees = async (ids) => {
  const sql = "DELETE FROM employee WHERE id IN (?)";
  const [result] = await mysql.query(sql, [ids]);
  if (result.affectedRows === 0) {
    throw new Error(errorMessages.employeeNotFound(ids));
  }
};


module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployees,
};
