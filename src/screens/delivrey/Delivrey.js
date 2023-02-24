import { useState, useEffect } from 'react';
import axios from 'axios';

const DHL_EXPRESS_API_KEY = 'sWtA57Fvhot8U3lTtGUWuHssuRF1w8Je';
const DHL_EXPRESS_API_SECRET = 'BwyQh1vec33FI6kr';
const DHL_EXPRESS_API_URL = 'https://express.api.dhl.com/mydhlapi/';

const ShippingForm = () => {
  const [pickupCountryCode, setPickupCountryCode] = useState('');
  const [destinationCountryCode, setDestinationCountryCode] = useState('');
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [shippingQuote, setShippingQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchShippingQuote = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${DHL_EXPRESS_API_URL}/rate/quote`, {
        data: {
          pickupCountryCode,
          destinationCountryCode,
          weight,
          dimensions: {
            length,
            width,
            height,
          },
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'DHL-API-Key': DHL_EXPRESS_API_KEY,
          'DHL-API-Secret': DHL_EXPRESS_API_SECRET,
        },
      });
      console.log(response.data)
      setShippingQuote(response.data);
      
    } catch (error) {
      console.error(error);
      setShippingQuote(null);
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchShippingQuote();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchShippingQuote();
  };

  return (
    <div className='mt-5 pt-5 text-light'>
      <form onSubmit={handleSubmit}>
        <label>
          Pickup Country Code:
          <input type="text" value={pickupCountryCode} onChange={(event) => setPickupCountryCode(event.target.value)} />
        </label>
        <br />
        <label>
          Destination Country Code:
          <input type="text" value={destinationCountryCode} onChange={(event) => setDestinationCountryCode(event.target.value)} />
        </label>
        <br />
        <label>
          Weight:
          <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} />
        </label>
        <br />
        <label>
          Length:
          <input type="number" value={length} onChange={(event) => setLength(event.target.value)} />
        </label>
        <br />
        <label>
          Width:
          <input type="number" value={width} onChange={(event) => setWidth(event.target.value)} />
        </label>
        <br />
        <label>
          Height:
          <input type="number" value={height} onChange={(event) => setHeight(event.target.value)} />
        </label>
        <br />
        <button type="submit">Get Shipping Quote</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {shippingQuote && (
        <div>
          <h2>Shipping Quote:</h2>
          <p>{shippingQuote.quoteAmount}</p>
          <p>{shippingQuote.currencyCode}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
