import React from 'react';

export default function LocationPanel(props) {
  const {
    suggestions,
    setPickup,
    setDestination,
    setPanelOpen,
    setVehiclePanel,
    activeField,
  } = props;

  // Handler function to process suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);
    } else if (activeField === 'destination') {
      setDestination(suggestion.description);
    }

  };

  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          key={suggestion.place_id || idx}
          onClick={() => handleSuggestionClick(suggestion)}
          className="flex active:border-black border-2 p-3 rounded-xl gap-3 items-center my-2 justify-start"
        >
          <h2 className="h-10 ml-4 w-12 bg-[#eee] flex justify-center items-center rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          {/* Render the description field */}
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
}
