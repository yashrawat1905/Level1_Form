import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const initialFormData = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      newErrors.guestName = 'Guest Name is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmittedData(formData);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <div className="container mt-5">
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="form-group w-100">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="form-group w-100">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group w-100">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
          />
          {errors.age && <p className="text-danger">{errors.age}</p>}
        </div>
        <div className="form-group w-100">
          <label htmlFor="attendingWithGuest">Are you attending with a guest?</label>
          <select
            name="attendingWithGuest"
            id="attendingWithGuest"
            value={formData.attendingWithGuest}
            onChange={handleChange}
            className="form-control"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.attendingWithGuest === 'Yes' && (
          <div className="form-group w-100">
            <label htmlFor="guestName">Guest Name:</label>
            <input
              type="text"
              name="guestName"
              id="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className="form-control"
            />
            {errors.guestName && <p className="text-danger">{errors.guestName}</p>}
          </div>
        )}
        <div className="w-100 text-center">
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
        </div>
      </form>
      {submittedData && (
        <div className="mt-4">
          <h2>Submitted Data</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Age: {submittedData.age}</p>
          <p>Attending with Guest: {submittedData.attendingWithGuest}</p>
          {submittedData.attendingWithGuest === 'Yes' && (
            <p>Guest Name: {submittedData.guestName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
