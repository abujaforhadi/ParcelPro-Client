import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  
  TableCell,
  
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";

const Modal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-10">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-semibold">{message}</h3>
      <div className="mt-4 flex justify-between">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("https://parcelpro-server.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("token");

    axios
      .patch(
        `https://parcelpro-server.vercel.app/users/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => console.error("Error updating role:", error));
  };

  const handleDelete = () => {
    if (userToDelete) {
      const token = localStorage.getItem("token");
      axios
        .delete(`https://parcelpro-server.vercel.app/users/${userToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userToDelete)
          );
          setIsModalOpen(false);
          toast.success("User deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        });
    }
  };

  const openModal = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Display Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border px-2 py-1 rounded"
                  disabled={user.role === "admin"} 
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="deliveryman">Deliveryman</option>
                </select>

              </TableCell>
              <TableCell>
                <button
                  onClick={() => openModal(user._id)}
                  className={`px-3 py-1 rounded ${user.role === "admin" ? "bg-gray-400 text-gray-200" : "bg-red-500 text-white"
                    }`}
                  disabled={user.role === "admin"}
                >
                  Delete
                </button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                href="#"
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "bg-blue-500 text-white" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {isModalOpen && (
        <Modal
          message="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default AllUsers;
