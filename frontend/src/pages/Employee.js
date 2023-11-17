import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Employee.css';
import { toast } from "react-toastify";


function Employee() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/employees?page=${page}`
      );
      setEmployees(response.data.data);
      setTotalPages(response.data.totalPages);
  
    } catch (error) {
      
    }
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:5001/api/employees', {
        params: { ids: selected },
      });
      fetchEmployees();
      setSelected([]);
      window.alert("Employee deleted");
    } catch (error) {
      window.alert("Error when tryingto delete");
    }
  };

  const handleAdd = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5001/api/employees', {
          name,
          email,
          phone,
        });
        fetchEmployees();
        setShowAdd(false);
        setName('');
        setEmail('');
        setPhone('');
        setErrors({});
        window.alert("EMployee Added");
      } catch (error) {
        window.alert("Employee with the same email or phone number already exists");
  
      }
    }
  };

  const handleEdit = async () => {
    if (validateForm()) {
      try {
        await axios.put(`http://localhost:5001/api/employees/${editId}`, {
          name,
          email,
          phone,
        });
        fetchEmployees();
        setShowEdit(false);
        setName('');
        setEmail('');
        setPhone('');
        setErrors({});
        window.alert("Employee data Updated");
      } catch (error) {
        window.alert("Employee with the same email or phone number already exists");
      }
    }
  };

  const handleShowEdit = (id) => {
    const employee = employees.find((item) => item.id === id);
    setName(employee.name);
    setEmail(employee.email);
    setPhone(employee.phone);
    setEditId(id);
    setShowEdit(true);
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!phone) {
      errors.phone = 'Phone is required';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="employee">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(employee.id)}
                  onChange={() => handleSelect(employee.id)}
                />
                {employee.name}
              </td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button onClick={() => handleShowEdit(employee.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Previous</button>
        )}
        {page < totalPages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>

      <div className="buttons">
        <button onClick={() => setShowAdd(true)}>Add</button>
        {selected.length > 0 && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>

      {showAdd && (
        <div className="form">
          <h2>Add Employee</h2>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <button onClick={handleAdd}>Submit</button>
          <button onClick={() => setShowAdd(false)}>Cancel</button>
        </div>
      )}

      {showEdit && (
        <div className="form">
          <h2>Edit Employee</h2>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <button onClick={handleEdit}>Submit</button>
          <button onClick={() => setShowEdit(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Employee;
