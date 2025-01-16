import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const StatisticsPage = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/stats"); 
        const data = response.data; 

        setBookingsData(data.bookingsByDate);
        setComparisonData(data.parcelsComparison);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  // Prepare data for the charts
  const bookingsChartData = {
    series: [
      {
        name: "Bookings",
        data: bookingsData.map((item) => item.bookings),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: bookingsData.map((item) => item.date),
      },
      title: {
        text: "Bookings by Date",
        align: "center",
      },
    },
  };

  const comparisonChartData = {
    series: [
      {
        name: "Booked",
        data: comparisonData.map((item) => item.booked),
      },
      {
        name: "Delivered",
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
      },
      title: {
        text: "Booked vs Delivered Parcels",
        align: "center",
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Statistics</h1>

      <div className="mt-6">
        <ApexCharts
          options={bookingsChartData.options}
          series={bookingsChartData.series}
          type="bar"
          height={350}
        />
      </div>

      <div className="mt-6">
        <ApexCharts
          options={comparisonChartData.options}
          series={comparisonChartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default StatisticsPage;
