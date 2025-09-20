import React, { useEffect, useState } from "react";
import axios from "axios";

const TimesSlots = ({ doctor, onSelectSlot, selectedSlot }) => {
  const [slots, setSlots] = useState([]);

  const generateSlots = (start, end) => {
    const slots = [];
    let current = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    while (current <= endTime) {
      const timeStr = current.toTimeString().slice(0, 5);
      slots.push(timeStr);
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  useEffect(() => {
    if (doctor && doctor.id) {
      axios
        .get(`http://localhost:8000/api/doctors/${doctor.id}/available-times`)
        .then((res) => {
          let allSlots = [];
          res.data.forEach((slot) => {
            allSlots = [
              ...allSlots,
              ...generateSlots(slot.start_time, slot.end_time),
            ];
          });
          setSlots(allSlots);
        })
        .catch((err) => console.error("Error fetching times", err));
    } else {
      setSlots([]);
    }
  }, [doctor]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {slots.length > 0 ? (
          slots.map((time, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelectSlot(time)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: selectedSlot === time ? "2px solid #147C87" : "1px solid #ccc",
                backgroundColor: selectedSlot === time ? "#147C87" : "#f9f9f9",
                color: selectedSlot === time ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {time}
            </button>
          ))
        ) : (
          <p>Select a Doctor First </p>
        )}
      </div>
    </div>
  );
};

export default TimesSlots;
