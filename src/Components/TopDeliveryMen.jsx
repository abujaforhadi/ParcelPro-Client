import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, CardHeader, CardContent } from "./ui/card";
import Loading from "./Loading";

const TopDeliveryMen = () => {
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const fetchTopDeliveryMen = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://parcelpro-server.vercel.app/totaluser");
                const allUsers = response.data;
                const deliveryMenData = allUsers.filter((user) => user.role === "deliveryman");

                const reviewResponse = await axios.get("https://parcelpro-server.vercel.app/allreview");
                const allReviews = reviewResponse.data.reviews;

                const parcelsResponse = await axios.get("https://parcelpro-server.vercel.app/allparcels");
                const allParcels = parcelsResponse.data;

                const updatedDeliveryMen = deliveryMenData.map((man) => {
                    const reviewsForMan = allReviews.filter((review) => review.deliveryManId === man._id);
                    const totalScore = reviewsForMan.reduce((acc, review) => acc + Number(review.rating), 0);
                    const averageReview = reviewsForMan.length > 0 ? (totalScore / reviewsForMan.length).toFixed(2) : "N/A";

                    const parcelsDelivered = man.parcelsDelivered || 0;

                    return {
                        ...man,
                        parcelsDelivered,
                        averageReview,
                    };
                });

                updatedDeliveryMen.sort((a, b) => {
                    if (b.parcelsDelivered !== a.parcelsDelivered) {
                        return b.parcelsDelivered - a.parcelsDelivered;
                    }
                    return b.averageReview - a.averageReview;
                });

                setTopDeliveryMen(updatedDeliveryMen.slice(0, 3));
            } catch (error) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopDeliveryMen();
    }, []);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <>
                {Array(fullStars).fill(<FaStar className="text-yellow-500" />)}
                {halfStar > 0 && <FaStar className="text-yellow-500" style={{ opacity: 0.5 }} />}
                {Array(emptyStars).fill(<FaStar className="text-gray-300" />)}
            </>
        );
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Top Delivery Men</h2>
                <p className="text-lg text-gray-600">These are the top 3 delivery men based on their performance and ratings.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 lg:px-20">
                {topDeliveryMen.map((man, idx) => (
                    <Card
                        key={idx}
                        className="shadow-lg hover:shadow-2xl transition-all p-6 bg-white rounded-lg"
                        data-aos="fade-up"
                        data-aos-delay={100 * (idx + 1)}
                    >
                        <CardHeader className="text-center">
                            <img
                                src={man.photoURL || "https://via.placeholder.com/150"}
                                alt={man.displayName}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800">{man.displayName}</h3>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-lg text-gray-600 mt-2">
                                <strong>Parcels Delivered:</strong> {man.parcelsDelivered}
                            </p>
                            <p className="text-lg text-gray-600 mt-2">
                                
                                <span className="flex justify-center items-center gap-1">
                                    {man.averageReview !== "N/A" ? (
                                        <>
                                            {renderStars(Number(man.averageReview))}
                                            
                                        </>
                                    ) : (
                                        "No Reviews"
                                    )}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default TopDeliveryMen;
