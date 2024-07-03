import React, { useState } from 'react';
//import './CreateComment.css';

const CreateComment = ({ ticketId, onClose, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/createcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, comment }),
      });

      const result = await response.json();
      if (result.success) {
        onCommentAdded(result.data);
        setComment('');
        onClose();
      } else {
        alert('Error adding comment: ' + result.message);
      }
    } catch (error) {
      alert('Error adding comment: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Comment:
            <textarea name="comment" value={comment} onChange={handleCommentChange} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
