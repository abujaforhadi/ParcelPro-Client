import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import Loading from "@/Components/Loading";

const StatisticsPage = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("https://parcelpro-server.vercel.app/allparcels");
        const parcels = response.data;

        const bookingsCount = parcels.reduce((acc, parcel) => {
          const date = parcel.bookingDate;
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const bookingsChartData = Object.entries(bookingsCount).map(([date, count]) => ({
          date,
          count,
        }));

        setBookingsData(bookingsChartData);

        const comparisonCount = parcels.reduce((acc, parcel) => {
          const date = parcel.bookingDate;
          if (!acc[date]) {
            acc[date] = { booked: 0, delivered: 0 };
          }
          acc[date].booked += 1;
          if (parcel.status === "Delivered") {
            acc[date].delivered += 1;
          }
          return acc;
        }, {});

        const comparisonChartData = Object.entries(comparisonCount).map(([date, counts]) => ({
          date,
          booked: counts.booked,
          delivered: counts.delivered,
        }));

        setComparisonData(comparisonChartData);
      } catch (err) {
        console.error("Failed to fetch parcel data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const bookingsChartConfig = {
    series: [
      {
        name: "Bookings",
        data: bookingsData.map((item) => item.count),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: bookingsData.map((item) => item.date),
        title: {
          text: "Booking Date",
        },
      },
      yaxis: {
        title: {
          text: "Number of Bookings",
        },
      },
      title: {
        text: "Bookings by Date",
        align: "center",
      },
    },
  };

  const comparisonChartConfig = {
    series: [
      {
        name: "Booked Parcels",
        data: comparisonData.map((item) => item.booked),
      },
      {
        name: "Delivered Parcels",
        data: comparisonData.map((item) => item.delivered),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      xaxis: {
        categories: comparisonData.map((item) => item.date),
        title: {
          text: "Booking Date",
        },
      },
      yaxis: {
        title: {
          text: "Number of Parcels",
        },
      },
      title: {
        text: "Booked vs Delivered Parcels by Date",
        align: "center",
      },
    },
  };

  if (loading) return <Loading/>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Bookings by Date</h2>
        <ApexCharts
          options={bookingsChartConfig.options}
          series={bookingsChartConfig.series}
          type="bar"
          height={350}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Booked vs Delivered Parcels</h2>
        <ApexCharts
          options={comparisonChartConfig.options}
          series={comparisonChartConfig.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default StatisticsPage;
