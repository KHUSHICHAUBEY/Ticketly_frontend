import React, { useState, useMemo } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useTable } from 'react-table';
import 'react-tabs/style/react-tabs.css';
import './Ticket.css';
import UpdateTicket from './UpdateTicket';
import CreateComment from './CreateComment'; // Import the CreateComment component
import Comments from './Comments';

const Ticket = ({ tickets, users, labels ,setupdateTicket}) => {
  const [status, setStatus] = useState('Open');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State for comment modal
  const [ticketId, setTicketId] = useState(null);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false); // State for viewing comments modal

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Label',
        accessor: 'label',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <div>
              <button onClick={() => handleUpdateClick(row.original)} className='btn2'>Update</button>
            </div>
          </div>
        ),
      },
      {
        Header: 'Comments',
        accessor: 'comments',
        Cell: ({ row }) => (
        
            <div >
              <button onClick={() => handleCommentClick(row.original)} className='btn2'>Add Comment</button>
            </div>
          
        ),
      },
      {
        Header: 'View Comments', // New column for viewing comments
        accessor: 'viewComments',
        Cell: ({ row }) => (
            <button onClick={() => handleViewComments(row.original)} className='btn2'>View Comments</button>
        ),
      }, 
    ],
    []
  );

  const filterTicketsByStatus = (status) => {
    return tickets.filter(ticket => ticket.status.toLowerCase() === status.toLowerCase());
  };

  const data = useMemo(() => filterTicketsByStatus(status), [status, tickets]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const handleUpdateClick = (ticket) => {
    setCurrentTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTicket(null);
  };

  const handleUpdate = (updatedTicket) => {
    const updatedTickets = tickets.map(ticket =>
      ticket._id === updatedTicket.ticketId ? { ...ticket, ...updatedTicket } : ticket
    );
  };

  const updateTicketOnPage = (updatedTicket) => {
    setCurrentTicket(updatedTicket);
  };

  const handleCommentClick = (ticket) => {
    setCurrentTicket(ticket);
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    setCurrentTicket(null);
  };

  const handleCommentAdded = (newComment) => {
    const updatedTicket = {
      ...currentTicket,
      comments: [...currentTicket.comments, newComment]
    };
    setCurrentTicket(updatedTicket);
  };
  const handleViewComments = (ticketId) => {
    setTicketId(ticketId);
    setIsCommentsModalOpen(true); // Open the view comments modal
  };

  const handleCloseCommentsModal = () => {
    setIsCommentsModalOpen(false);
    setTicketId(null);
  };
  

  const handleViewComment = (comments) => {
    setCurrentTicket((prevTicket) => ({ ...prevTicket, comments }));
  };
 
  


  return (
    <div className="ticket-container">
      <h2>Tickets</h2>
      <hr></hr>
      <Tabs>
        <TabList className="tabs">
          <Tab className={`tab ${status === 'Open' ? 'active' : ''}`} onClick={() => setStatus('Open')}>Open <span className='count'>{tickets.filter((item)=>item.status == "Open").length}</span></Tab>
          <Tab className={`tab ${status === 'Resolved' ? 'active' : ''}`} onClick={() => setStatus('Resolved')}>Resolved <span className='count'>{tickets.filter((item)=>item.status == "Resolved").length}</span></Tab>
          <Tab className={`tab ${status === 'In-Progress' ? 'active' : ''}`} onClick={() => setStatus('In-Progress')}>In-Progress <span className='count'>{tickets.filter((item)=>item.status == "In-Progress").length}</span></Tab>
          <Tab className={`tab ${status === 'Closed' ? 'active' : ''}`} onClick={() => setStatus('Closed')}>Closed <span className='count'>{tickets.filter((item)=>item.status == "Closed").length}</span></Tab>
        </TabList>

        <TabPanel>
          <h3>{status} Tickets</h3>
          <table {...getTableProps()} className="ticket-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.length >=1 ? rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              }) : <p>No Data Found</p>}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h3>Resolved Tickets</h3>
          <table {...getTableProps()} className="ticket-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.length>=1 ? rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              }) : <p>No Data Found</p>}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h3>In-Progress Tickets</h3>
          <table {...getTableProps()} className="ticket-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.length >=1 ? rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              }) : <p>No Data Found</p>}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h3>Closed Tickets</h3>
          <table {...getTableProps()} className="ticket-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows?.length >=1 ? rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              }): <p>No Data Found</p>}
            </tbody>
          </table>
        </TabPanel>
      </Tabs>

      {isModalOpen && (
        <UpdateTicket
          ticket={currentTicket}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          users={users}
          labels={labels}
          updateTicketOnPage={updateTicketOnPage}
          setupdateTicket={setupdateTicket}
        />
      )}

      {isCommentModalOpen && (
        <CreateComment
          ticketId={currentTicket._id}
          onClose={handleCloseCommentModal}
          onCommentAdded={handleCommentAdded}
        />
      )}
      
{isCommentsModalOpen && (
        <Comments
          ticketId={ticketId}
          onClose={handleCloseCommentsModal}
        />
      )}
    </div>
  );
};

export default Ticket;


