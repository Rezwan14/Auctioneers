import React, { useState } from 'react';

const AuctionForm = ({ handleCreateAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    category: '',
    description: '',
    startingBid: 0,
    startTime: '',
    startDate: '',
    endDate: '',
  });
  
  const createItem = (event) => {
    event.preventDefault();
    handleCreateAuction(newItem.itemName,newItem.category,newItem.description,newItem.startingBid,newItem.startTime,newItem.startDate,newItem.endDate,
    );
    setNewItem({
      itemName: '',
      category: '',
      description: '',
      startingBid: 0,
      startTime: '',
      startDate: '',
      endDate: '',
    });
    setShowForm(false);
  };
  
  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };
  
  return (
    <div>
      <button onClick={() => setShowForm(true)}>Create Auction</button>
      {showForm && (
        <form onSubmit={createItem}>
          <div>
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={handleInput}
          />
          </div>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleInput}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleInput}
          />
          <input
            type="number"
            name="startingBid"
            placeholder="Starting Bid"
            value={newItem.startingBid}
            onChange={handleInput}
          />
          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={newItem.startTime}
            onChange={handleInput}
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={newItem.startDate}
            onChange={handleInput}
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={newItem.endDate}
            onChange={handleInput}
          />
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default AuctionForm;
