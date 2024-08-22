
import React, { useState } from 'react';
import axios from 'axios';
import './CreateAuction.css';
const CreateAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState(0);
  const [endTime, setEndTime] = useState('');

  const handleCreateAuction = () => {
    axios.post('http://localhost:3001/auctions', {
      title,
      description,
      starting_price: startingPrice,
      end_time: endTime,
      user_id: 1, 
    })
    .then(response => {
      alert('Auction created successfully');
      
      setTitle('');
      setDescription('');
      setStartingPrice(0);
      setEndTime('');
    })
    .catch(error => {
      alert('Failed to create auction');
      console.error('Error creating auction:', error);
    });
  };

  return (
    <div>
      <h1>Create a New Auction</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <input
        type="number"
        placeholder="Starting Price"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button onClick={handleCreateAuction}>Create Auction</button>
    </div>
  );
};

export default CreateAuction;
