import React, { useState } from 'react';
import Modal from 'react-modal';

const AuctionForm = ({ handleCreateAuction }) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    category: '',
    description: '',
    startingBid: 0,
    startTime: '',
    startDate: '',
  });

  const createItem = (event) => {
    event.preventDefault();
    handleCreateAuction(newItem.itemName, newItem.category, newItem.description, newItem.startingBid, newItem.startTime, newItem.startDate,
    );
    setNewItem({
      itemName: '',
      category: '',
      description: '',
      startingBid: 0,
      startTime: '',
      startDate: '',
    });
    setShowModal(false);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Create Auction</button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel='Create Auction Modal'
      >
        <form onSubmit={createItem}>
          <h1>Create Auction Form</h1>
          <div>
            Item name:
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={newItem.itemName}
              onChange={handleInput}
            />
          </div>
          <div>
            Category:
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newItem.category}
              onChange={handleInput}
            />
          </div>
          <div>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newItem.description}
              onChange={handleInput}
            />
          </div>
          <div>
            Starting Bid:
            <input
              type="number"
              name="startingBid"
              placeholder="Starting Bid"
              value={newItem.startingBid}
              onChange={handleInput}
            />
          </div>
          <div>
            Start Time:
            <input
              type="text"
              name="startTime"
              placeholder="Start Time"
              value={newItem.startTime}
              onChange={handleInput}
            />
          </div>
          <div>
            Start Date:
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={newItem.startDate}
              onChange={handleInput}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </Modal>

    </div>
  );
};

export default AuctionForm;
