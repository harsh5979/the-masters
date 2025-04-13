import { Link, useParams } from "react-router-dom";
import { events } from "../api/events";
const ChildEventCard = () => {
  const { eventName } = useParams();

  const event = events.find(
    (e) => e.name.toLowerCase() === eventName.toLowerCase()
  );
  if (!event) return null;
  return (
    <div className="min-h-screen   m-auto flex flex-col   p-8">
      <h1 className="text-3xl font-bold   text-left m-auto  my-10 ">{event.name}</h1>
      <div className=" flex  justify-center ">
        {event.activities?.map((e, index) => {
          return (
            <Link to={'/events/'+eventName+'/'+e}
              key={index}
              className="bg-white/15 mx-5  w-[300px] h-[200px] rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50/25"
              //   onClick={onClick}
            >
              <h3 className="text-2xl font-semibold mb-2">{e}</h3>
              <p className="text-sm text-gray-400">Click for details</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ChildEventCard;
