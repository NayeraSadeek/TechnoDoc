import React from "react";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        className="bg-white shadow-lg relative text-center"
        style={{
          width: "646px",
          height: "647px",
          borderRadius: "25px",
          borderWidth: "3px",
          borderStyle: "solid",
          borderColor: "#147C87",
          opacity: 1,
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-[#147C87] text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Title */}
          <h2 className="text-[#147C87] font-semibold text-xl mb-6 text-center">
            Your appointment has been <br /> successfully booked!
          </h2>

          {/* Check Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-[#147C87] bg-opacity-10">
              <i className="fas fa-check text-6xl text-[#147C87]"></i>
            </div>
          </div>

          {/* Thank you message */}
          <h3 className="text-[#147C87] font-semibold text-lg mb-2">
            Thank you for choosing TechnoDoc!
          </h3>
          <p className="text-gray-500 text-md">
            Hope you feel better soon – we’re here for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;








