const employeeService = require("../services/employeeService");
const commonResponse = require("../middlewares/commonResponse");

const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    commonResponse.success(res, employees);
  } catch (error) {
    res.status(500);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const employee = req.body;
    const newEmployee = await employeeService.createEmployee(employee);
    commonResponse.success(res, newEmployee);
  } catch (error) {
    res.status(400);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employee = req.body;
    const updatedEmployee = await employeeService.updateEmployee(id, employee);
    commonResponse.success(res, updatedEmployee);
  } catch (error) {
    res.status(400);
  }
};

const deleteEmployees = async (req, res, next) => {
  try {
    const ids = req.query.ids;
    await employeeService.deleteEmployees(ids);
    commonResponse.success(res, null);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployees,
};
