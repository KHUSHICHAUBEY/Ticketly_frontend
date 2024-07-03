import React from 'react';

const TicketList = ({ tickets }) => {
  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <p>Assign To: {ticket.assignTo}</p>
          <p>Start Date: {ticket.startDate}</p>
          <p>End Date: {ticket.endDate}</p>
          <p>Priority: {ticket.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
