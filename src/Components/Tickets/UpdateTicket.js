import React, { useState, useEffect } from 'react';
import './UpdateTicket.css';

const UpdateTicket = ({ ticket, isOpen, onClose, onUpdate, updateTicketOnPage ,setupdateTicket}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    assignTo: '',
    label: '',
  });
  const [userList, setUserList] = useState([]);
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        priority: ticket.priority || '',
        status: ticket.status || '',
        assignTo: ticket.assignTo || '',
        label: ticket.label || '',
      });
    }
  }, [ticket]);

  useEffect(() => {
    fetchUsers();
    fetchLabels();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/getallusers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUserList(data.Users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchLabels = async () => {
    try {
      const response = await fetch("http://localhost:3000/viewlabel");
      if (!response.ok) {
        throw new Error("Failed to fetch labels");
      }
      const data = await response.json();
      setLabelList(data.labels);
    } catch (error) {
      console.error("Error fetching labels:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, priority, status, assignTo, label } = formData;

    // Check if all fields are filled
    if (!title || !description || !priority || !status || !assignTo || !label) {
      alert('All fields are mandatory');
      return;
    }

    const updatedTicket = {
      ticketId: ticket._id,
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:3000/updateticket", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTicket),
      });

      const result = await response.json();
      if (result.success) {
        onUpdate(updatedTicket);
        onClose();
        // Call the function to update ticket on the page
        updateTicketOnPage(updatedTicket);
        setupdateTicket(prev=>!prev)
      } else {
        alert('Error updating ticket: ' + result.message);
      }
    } catch (error) {
      alert('Error updating ticket: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>
            Priority:
            <select name="priority" value={formData.priority} onChange={handleChange} required>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
          <label>
            Assign To:
            <select name="assignTo" value={formData.assignTo} onChange={handleChange} required>
              <option value="">Select User</option>
              {userList.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </label>
          <label>
            Label:
            <select name="label" value={formData.label} onChange={handleChange} required>
              <option value="">Select Label</option>
              {labelList.map(label => (
                <option key={label._id} value={label.name}>{label.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;
