import React from "react";

const Contact = () => {
    return (
        <section
            className="mt-10 w-full lg:flex-row flex items-center gap-[30px] flex-col justify-between bg-[#0A0D17] p-[40px] rounded-xl">

            {/* form area */}
            <form className="lg:w-[60%] w-full">
                <div className="lg:w-[80%] w-full mx-auto">
                    <div className="text-white">
                        <h1 className="text-[1.7rem] font-[600] leading-[35px]">Get in Touch</h1>
                        <p className="text-[0.9rem] mt-2 mb-8">
                            Have questions or want to collaborate? Reach out and let's make something amazing together.
                        </p>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="text"
                                placeholder="Your name"
                                className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                            />
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="email"
                                placeholder="Email address"
                                className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                        <textarea
                            placeholder="Write message"
                            className="peer min-h-[200px] border-[#383844] border rounded-md outline-none px-4 bg-[#22222f] py-3 w-full text-gray-400 transition-colors duration-300"
                        ></textarea>
                    </div>

                    <button type="submit"
                        className="py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full">
                        Send Message
                    </button>
                </div>
            </form>

            {/* Map Section */}
            <div className="w-full lg:w-[40%]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29199.778834576493!2d90.43375579669666!3d23.819582092292556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fce7d991f%3A0xacfaf1ac8e944c05!2sBasundhara%20Residential%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1739956237855!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
};

export default Contact;
