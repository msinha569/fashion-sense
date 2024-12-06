import React, { useState } from "react";
import AccountDetails from "./AccountDetails";

function AccountTabs() {
  const [activeTab, setActiveTab] = useState("ACCOUNT");
  const [isModalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullname: "Manish kumar sinha",
      email: "msinha569@gmail.com",
      phone: "9693226972",
      address: "Greater Noida, Delhi NCR",
    },
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, { id: addresses.length + 1, ...newAddress }]);
    setModalOpen(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="mt-24 p-4 max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-evenly">
          {["ACCOUNT", "ADDRESS", "ORDER"].map((tab) => (
            <button
              key={tab}
              className={`text-gray-600 py-2 px-4 border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent hover:text-gray-800 hover:border-blue-500"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "ACCOUNT" && (
          <div>
            <div className="items-center justify-center flex "><AccountDetails/></div>
          </div>
        )}

        {activeTab === "ADDRESS" && (
          <div>
            {/* Add Address Button */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setModalOpen(true)}
            >
              Add Address
            </button>

            {/* Address List */}
            <div className="mt-4 space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 border border-gray-300 rounded shadow"
                >
                  <p className="font-semibold">Name: {address.fullname}</p>
                  <p>Email: {address.email}</p>
                  <p>Phone: {address.phone}</p>
                  <p>Address: {address.address}</p>
                  <button
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Modal for Adding Address */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Add Address</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const newAddress = {
                        fullname: formData.get("fullname"),
                        email: formData.get("email"),
                        phone: formData.get("phone"),
                        address: formData.get("address"),
                      };
                      handleAddAddress(newAddress);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="fullname"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Address</label>
                      <textarea
                        name="address"
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ORDER" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Purchased At</th>
                  <th className="border border-gray-300 px-4 py-2">Qty</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Sample Item</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Product"
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">2024-11-29</td>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">$25</td>
                  <td className="border border-gray-300 px-4 py-2">$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountTabs;
