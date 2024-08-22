
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [selectedAuction, setSelectedAuction] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/auctions')
      .then(response => {
        setAuctions(response.data);
      })
      .catch(error => {
        console.error('Error fetching auctions:', error);
      });
  }, []);

  const handleBid = (auctionId) => {
    axios.post(`http://localhost:3001/auctions/${auctionId}/bid`, {
      bid_amount: bidAmount,
      user_id: 1, 
    })
    .then(response => {
      alert('Bid placed successfully');
      setBidAmount(0); 
      setSelectedAuction(null); 
     
      axios.get('http://localhost:3001/auctions')
        .then(response => {
          setAuctions(response.data);
        });
    })
    .catch(error => {
      alert('Failed to place bid');
      console.error('Error placing bid:', error);
    });
  };

  return (
    <div>
      <h1>Available Auctions</h1>
      {auctions.map(auction => (
        <div key={auction.id}>
          <h2>{auction.title}</h2>
          <p>{auction.description}</p>
          <p>Current Price: ${auction.current_price}</p>
          <p>Ends At: {new Date(auction.end_time).toLocaleString()}</p>
          {selectedAuction === auction.id ? (
            <div>
              <input
                type="number"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <button onClick={() => handleBid(auction.id)}>Place Bid</button>
              <button onClick={() => setSelectedAuction(null)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setSelectedAuction(auction.id)}>Bid</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Auctions;
