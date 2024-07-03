import React, { useState, useEffect } from 'react';
import Categories from '../Components/Sidebar/Categories';
import Filter from '../Components/Sidebar/FilterTickets';
import Ticket from '../Components/Tickets/Ticket';
import Filtered from '../Components/Tickets/Filtered';
import { Navigate, useNavigate } from 'react-router-dom';
import user_icon from '../Pages/user.png';
import suzukilogo from '../../src/Components/Assets/logo-suzu.svg'
import ticketly from '../../src/Components/Assets/ticketly.png'


const TicketingPage = ({ filteredTickets, onFilter }) => {
  const [tickets, setTickets] = useState([]);
  const [userName, setUserName] = useState({}); // State to store the user's name
  const [filters, setFilters] = useState({
    assignedTo: '',
    dateRange: '',
    priority: '',
  }); 
  const navigate = useNavigate();
  const [updateTicket,setupdateTicket]=useState(true)

  useEffect(() => {
    if (!filteredTickets || filteredTickets.length === 0) {
      fetchAllTickets();
    }
    fetchUserName(); // Fetch the user's name when the component mounts
  }, [filteredTickets,updateTicket]);

  const fetchAllTickets = async () => {
    try {
      const response = await fetch("http://localhost:3000/viewalltickets");
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data.data); // Assuming the data contains an array of tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
      // Handle error
    }
  };

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch("http://localhost:3000/view1", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with an error:", errorData);
        throw new Error(`Failed to fetch user name: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setUserName(data.data); // Assuming data contains user information
    } catch (error) {
      console.error("Error fetching user name:", error);
      // Handle error
    }
  };

  const handleSelectCategory = (category) => {
    console.log('Selected category:', category);
  };

  const handleAddNewLabel = () => {
    console.log('Add new label clicked');
  };

  const handleCreateTicket = (newTicket) => {
    // Handle new ticket creation logic
  };

  const handleFilter = (filterCriteria) => {
    onFilter(filterCriteria);
  };

  const handleLogout = () => {
    // Redirect to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="ticketing-page">
      <header className="user-header">
        <div style={{marginLeft:"100px", display:"flex", gap : "25px"}}><img src={suzukilogo} /> </div>
        <span className='user-header'>
        <img src={ticketly} width={150} style={{marginRight:"50px"}}/>
        <div className="user-box">
          <img className='image' src={user_icon} alt="User" />
          <h5> {`${userName.firstName} ${userName.lastName}`}</h5>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        </span>
      </header>
      <div className="main-content">
        <div className="sidebar">
          {/* <div className="left-bar"> */}
            <Categories
              onSelectCategory={handleSelectCategory}
              onAddNewLabel={handleAddNewLabel}
              onCreateTicket={handleCreateTicket}
            />
            <Filter onFilter={handleFilter} />
          {/* </div> */}
        </div>
        <div className="content">
          {filteredTickets && filteredTickets.length > 0 ? (
            <Filtered tickets={filteredTickets} />
          ) : (
            <Ticket tickets={tickets} setupdateTicket={setupdateTicket}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketingPage;
