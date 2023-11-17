const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/api/employees", employeeController.getEmployees);
router.post("/api/employees", employeeController.createEmployee);
router.put("/api/employees/:id", employeeController.updateEmployee);
router.delete("/api/employees", employeeController.deleteEmployees);


module.exports = router;
