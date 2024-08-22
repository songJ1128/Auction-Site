import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:3001/items');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: ${item.current_bid || item.starting_bid}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;