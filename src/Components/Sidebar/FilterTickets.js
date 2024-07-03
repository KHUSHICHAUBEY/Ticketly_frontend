import React, { useState } from 'react';

const FilterTickets = ({ onFilter }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleFilter = () => {
    // Check if at least one field is filled
    if (!assignedTo && !startDate && !endDate && !priority) {
      alert('Please choose at least one field to filter');
      return;
    }

    const filterCriteria = {
      assignedTo,
      startDate,
      endDate,
      priority,
    };
    onFilter(filterCriteria);
  };

  return (
    <div className="filter-sidebar">
            <h2
        style={{
          fontSize: "20px",
          textAlign: "left",
          padding: "10px 10px 0px 10px",
        }}
      >
        Filter Tickets
      </h2>
      <hr></hr>
      <label style={{textAlign:"left", marginBottom:"20px"}}>
        Assigned To:
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </label>
      <label style={{textAlign:"left" , marginBottom:"20px"}}>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label style={{textAlign:"left" , marginBottom:"20px"}}>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label style={{textAlign:"left" , marginBottom:"20px"}}>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterTickets;
