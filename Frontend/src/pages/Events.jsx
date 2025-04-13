import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { events } from "../api/events";

const EventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <>
        <h1 className="text-4xl font-bold text-center mb-8">
          Event Categories
        </h1>
        <div className="   m-auto flex flex-wrap w-[70%]  justify-center  ">
          {events.map((event) => (
            <Link
              to={`/events/${event.name.toLowerCase()} `}
              key={event.id}
              className=""
            >
              <div
                className={`  'bg-[url('${event.logo}')]  '  bg-center bg-cover bg-no-repeat  w-[310px] h-[250px] m-5  rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105`}
              >
                <img
                  src={event.logo || "/placeholder.svg"}
                  alt={event.name}
                  className="w-full h-32 object-cover "
                />
                {/* <Computer className='w-full h-32 object-cover  '/> */}
                <div className="p-3 rounded-md bg-black bg-opacity-50 backdrop-blur ">
                  <h3 className="text-xl font-semibold mb-2 text-white  ">
                    {event.name}
                  </h3>
                  <p className="text-gray-100">
                    {event.activities.length} activities
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export default EventsPage;
