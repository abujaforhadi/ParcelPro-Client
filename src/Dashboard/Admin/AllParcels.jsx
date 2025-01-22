import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

const AllParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;

  // Function to fetch parcels with optional date filters
  const fetchParcels = async (page = 1, startDate = "", endDate = "") => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/all-parcels",
        {
          params: { page, limit: itemsPerPage, startDate, endDate },
        }
      );

      setParcels(response.data.parcels);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels(currentPage); 
  }, [currentPage]);

  // Handle date search
  const handleSearch = () => {
    if (!searchStartDate || !searchEndDate) {
      toast.warning("Please select both start and end dates.");
      return;
    }

    fetchParcels(1, searchStartDate, searchEndDate); 
    setCurrentPage(1); 
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">All Parcels</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={searchStartDate}
            onChange={(e) => setSearchStartDate(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={searchEndDate}
            onChange={(e) => setSearchEndDate(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>User’s Name</TableCell>
              <TableCell>User’s Phone</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Requested Delivery Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell>{parcel.name}</TableCell>
                <TableCell>{parcel.phoneNumber}</TableCell>
                <TableCell>{parcel.bookingDate}</TableCell>
                <TableCell>{parcel.requestedDeliveryDate}</TableCell>
                <TableCell>{parcel.price} Tk</TableCell>
                <TableCell>{parcel.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationPrevious>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  active={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 5 && <PaginationEllipsis />}
          </PaginationContent>
          <PaginationNext
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </div>
  );
};

export default AllParcels;
