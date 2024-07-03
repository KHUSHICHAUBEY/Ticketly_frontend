import React, { useState, useEffect } from "react";

const Comments = ({ ticketId, onClose }) => {
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3000/viewcomment', {
          method: 'POST', // Change method to POST since the ticketId is sent in the request body
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketId }), // Send ticketId in the request body
        });

        const result = await response.json();
        console.log(result.data); // Log the response data to understand its structure
        if (response.ok) {
          // Extract and format 'comment' and 'createdAt1' fields with serial numbers and new lines
          const commentsText = result.data.reverse().map((comment, index) => 
            `${index + 1}. Comment: ${comment.comment}\nCreated At: ${comment.createdAt1}`
          ).join('\n\n'); // Add extra newline character for spacing
          setComments(commentsText);
        } else {
          alert('Error viewing comments: ' + result.message);
        }
      } catch (error) {
        alert('Error viewing comments: ' + error.message);
      }
    };

    fetchComments();
  }, [ticketId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>View Comments</h2>
        <textarea value={comments} readOnly rows={10} cols={50} />
        <div>
          <button type="button" onClick={onClose}>Okay</button> {/* Added onClick handler */}
        </div>
      </div>
    </div>
  );
};

export default Comments;
