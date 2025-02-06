import { Briefcase, Users, Star } from "lucide-react";

const ClientsSection = () => {
  const clients = [
    {
      id: 1,
      name: "John Doe",
      company: "FastExpress",
      feedback: "ParcelPro is the most reliable parcel service I've ever used!",
      icon: <Briefcase size={32} className="text-blue-500" />,
    },
    {
      id: 2,
      name: "Sarah Lee",
      company: "QuickShip",
      feedback: "Super fast and secure delivery, highly recommended!",
      icon: <Users size={32} className="text-blue-500" />,
    },
    {
      id: 3,
      name: "Michael Smith",
      company: "SafeParcel",
      feedback: "Excellent service and great customer support!",
      icon: <Star size={32} className="text-blue-500" />,
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Happy Clients</h2>
        <p className="text-gray-600 mt-2">Trusted by top businesses and individuals</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">{client.icon}</div>
              <p className="text-gray-700 italic">"{client.feedback}"</p>
              <h4 className="mt-4 font-semibold text-gray-900">{client.name}</h4>
              <span className="text-sm text-gray-500">{client.company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
