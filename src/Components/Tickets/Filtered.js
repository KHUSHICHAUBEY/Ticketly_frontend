import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import './Ticket.css';

const Filtered = ({ tickets }) => {
    const data = useMemo(() => tickets, [tickets]);

    const columns = useMemo(
        () => [
            {
                Header: 'Ticket Name',
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
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="ticket-container">
            <h2>Filtered Tickets</h2>
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
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Filtered;