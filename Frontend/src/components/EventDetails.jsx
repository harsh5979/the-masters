import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { events } from "../api/events";
import { ArrowLeft } from "lucide-react";
const EventDetails = () => {
  const [showPayment, setShowPayment] = useState(false);
  const { activityName } = useParams();

  const event = events.find((e) => e.activities.includes(activityName));

  if (!event) return null;
  const handleParticipate = () => {
    setShowPayment(true);
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-white/15 w-fit justify-center  backdrop-blur-md   m-auto rounded-lg shadow-md p-6 my-20  ">
      <div className="flex  items-center justify-center">
        <button onClick={goBack} className="mb-5 ">
          <ArrowLeft />
        </button>
        <h2 className="text-3xl font-semibold mb-4 text-center flex-1">{activityName}</h2>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 ">Description</h3>
        <p className="text-gray-400">
          This is a placeholder description for the {activityName}. Replace this
          with the actual event description.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Rules</h3>
        <ul className="list-disc pl-5 text-gray-400">
          <li>Rule 1: This is a placeholder rule.</li>
          <li>Rule 2: Replace these with actual rules for the event.</li>
          <li>Rule 3: Ensure all participants are aware of these rules.</li>
        </ul>
      </div>
      {!showPayment ? (
        <button
          onClick={handleParticipate}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Participate
        </button>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment</h3>
          <p className="text-gray-600 mb-2">
            Please complete the payment to participate:
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
            Pay Fee
          </button>
        </div>
      )}
    </div>
  );
};
export default EventDetails;
