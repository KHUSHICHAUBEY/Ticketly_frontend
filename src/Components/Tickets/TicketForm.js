import React, { useState, useEffect } from "react";
// import "./Ticket.css";
import "./CreateTicket.css";
import { Navigate, useNavigate } from "react-router-dom";

const TicketForm = ({ onCreateTicket, users, labels }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [label, setLabelTo] = useState("");
  const [status, setStatusTo] = useState("");
  const [userList, setUserList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const navigate = useNavigate();

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
      console.error("Error fetching users:", error);
    }
  };

  const fetchLabels = async () => {
    try {
      const response = await fetch("http://localhost:3000/viewlabel");
      if (!response.ok) {
        throw new Error("Failed to fetch label");
      }
      const data = await response.json();
      setLabelList(data.labels);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      assignTo === "" ||
      label === "" 
      // status === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newTicket = {
      title: title,
      description,
      priority,
      assignTo,
      label,
      status,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch("http://localhost:3000/createticket", {
        method: "POST",
        body: JSON.stringify(newTicket),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const data = await response.json();
      // alert(data.message);
      if (data.success) {
        onCreateTicket(data.ticket);
        setTitle("");
        setDescription("");
        setPriority("");
        setAssignTo("");
        setLabelTo("");
        setStatusTo("");
      }
      navigate('/ticket');
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Error creating a ticket: " + error.message);
    }
  };

  return (
    <div className="create-ticket">
      <h3>CREATE A NEW TICKET HERE !</h3> 
      <form onSubmit={handleCreateTicket}>
        <label>
          Ticket Name:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Assign To:
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
          >
            <option value="">Select User</option>
            {userList?.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select your label:
          <select
            value={label}
            onChange={(e) => setLabelTo(e.target.value)}
          >
            <option value="">Select Your Label</option>
            {labelList?.map((label) => (
              <option key={label._id} value={label.name}>
                {label.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select your Status:
          <select
            value={status}
            onChange={(e) => setStatusTo(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
