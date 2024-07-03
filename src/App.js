// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./Pages/LoginPage";
// import RegisterPage from "./Pages/RegisterPage";
// import TicketingPage from "./Pages/TicketingPage";
// import "./App.css";

// function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [user, setUser] = useState(null);
//   const [filteredTickets, setFilteredTickets] = useState([]);

//   const handleFilter = async (filterCriteria) => {
//     try {
//       const response = await fetch('http://localhost:3000/filterticket', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(filterCriteria)
//       });
//       if (!response.ok) {
//         throw new Error('Failed to filter tickets');
//       }
//       const data = await response.json();
//       setFilteredTickets(data.data);
//     } catch (error) {
//       console.error('Error filtering tickets:', error);
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <div className="container">
//           <Routes>
//             <Route path="/login" element={<LoginPage onLogin={setUser} setIsLogin={setIsLogin} />} />
//             <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
//             <Route path="/create-ticket" element={<TicketCreatePage onCreateTicket={setUser} />} />
//             <Route path="/ticket" element={<TicketingPage filteredTickets={filteredTickets} onFilter={handleFilter} />} />
//             <Route path="/" element={user ? <Navigate to="/ticket" /> : <Navigate to="/login" />} />
//             {user && (<Route path="/ticket" element={<TicketingPage user={user} />} />)}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TicketingPage from "./Pages/TicketingPage";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleFilter = async (filterCriteria) => {
    try {
      const response = await fetch('http://localhost:3000/filterticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterCriteria)
      });
      if (!response.ok) {
        throw new Error('Failed to filter tickets');
      }
      const data = await response.json();
      setFilteredTickets(data.data);
      if (data.data.length === 0) {
        alert("No such Ticket exists");
      }
    } catch (error) {
      console.error('Error filtering tickets:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={setUser} setIsLogin={setIsLogin} />} />
            <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
            {/* <Route path="/create-ticket" element={<TicketCreatePage onCreateTicket={setUser} />} /> */}
            <Route path="/ticket" element={<TicketingPage filteredTickets={filteredTickets} onFilter={handleFilter} />} />
            <Route path="/" element={user ? <Navigate to="/ticket" /> : <Navigate to="/login" />} />
            {user && (<Route path="/ticket" element={<TicketingPage user={user} />} />)}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
