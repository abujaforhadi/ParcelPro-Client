import React from "react";

const ParcelModal = ({
  parcel,
  deliveryMen,
  deliveryDate,
  setDeliveryDate,
  onClose,
  onAssign,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Manage Parcel</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Delivery Man</label>
          <select
            onChange={(e) => parcel.deliveryMenId = e.target.value}
            defaultValue={parcel.deliveryMenId || ""}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select a delivery man</option>
            {deliveryMen.map((man) => (
              <option key={man._id} value={man._id}>
                {man.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Approximate Delivery Date
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onAssign(parcel._id, parcel.deliveryMenId)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParcelModal;
