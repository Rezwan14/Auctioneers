import React, { useState } from 'react';
import axios from 'axios';

const CreditCardForm = ({ username }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [linked, setLinked] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleLinkCard = async () => {
    try {
      const response = await axios.post('/api/link-credit-card', {
        username,
        cardNumber,
      });
      if (response.data.message === 'Credit card linked successfully') {
        setLinked(true);
      }
    } catch (error) {
      console.error('Error linking credit card:', error);
    }
  };

  return (
    <div>
      <h2>Link Credit Card</h2>
      {linked ? (
        <p>Credit card linked successfully!</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter credit card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          <button onClick={handleLinkCard}>Link Credit Card</button>
        </div>
      )}
    </div>
  );
};

export default CreditCardForm;