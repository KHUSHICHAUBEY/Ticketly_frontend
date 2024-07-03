import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import TicketForm from '../Tickets/TicketForm'; // Adjust the path as per your project structure
import { useNavigate } from 'react-router-dom';

const Categories = ({ onSelectCategory, onCreateTicket }) => {
  const [categories, setCategories] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [labelList, setLabelList] = useState([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/viewlabel");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCategories(data.labels);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleAddNewLabel = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleConfirmLabel = () => {
    if (newLabel.trim() !== '') {
      fetch("http://localhost:3000/createlabel", {
        method: "POST",
        body: JSON.stringify({ name: newLabel }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(prevCategories => [...prevCategories, { name: newLabel }]);
          setNewLabel('');
          setShowInput(false);
          fetchLabels(); // Refresh labels after adding new one
        }
      })
      .catch((error) => {
        console.error('Error creating label:', error);
        alert('Error in creating a label: ' + error.message);
      });
    }
  };

  const handleCreateTicket = () => {
    setShowTicketForm(true);
  };

  const handleCancelCreateTicket = () => {
    setShowTicketForm(false);
  };

  return (
    <div className="categories-sidebar">
      <h2 style={{ fontSize: "20px", textAlign: "left", padding: "10px 10px 0px 10px" }}>
        Categories
      </h2>
      <hr />
      <ul style={{ textAlign: "left" }}>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onSelectCategory(category.name)}>
            {category.name}
          </li>
        ))}
      </ul>
      <div>
        <div className="new-label">
          <button onClick={handleAddNewLabel} className='btn1'>Add New Label</button>
        </div>
        {showInput && (
          <div className="new-label">
            <input
              style={{margin :"0px 0px 10px 0px"}}
              type="text"
              value={newLabel}
              onChange={handleInputChange}
              placeholder="Enter new label"
            />
            <button onClick={handleConfirmLabel}>Confirm</button>
          </div>
        )}
        <hr style={{marginTop:"20px"}} />
        <div className="new-label">
          <button onClick={handleCreateTicket} className='btn1' style={{border:"2px dotted black"}}>
            Create a Ticket
          </button>
        </div>
      </div>

      {/* Centered TicketForm */}
      {showTicketForm && (
        <div className="overlay">
          <div className="ticket-form-container">
            <TicketForm
              onCreateTicket={(ticket) => {
                onCreateTicket(ticket);
                setShowTicketForm(false);
              }}
              users={[]} // Pass your user list here
              labels={labelList} // Pass the label list fetched from server
            />
            <button onClick={handleCancelCreateTicket} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
