import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className=" mt-7 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold ">
            {" "}
            Contact{" "}
            <span className="text-2xl text-sky-600 font-bold">
              {" "}
              {landlord.username}
            </span>{" "}
          </h1>

          <span className="font-medium text-xl mt-2">for</span>

          <h2 className="mt-4 text-xl font-semibold bg-sky-200 px-5 p-3 text-center max-w-sm">
            {listing.name.toLowerCase()}
          </h2>

          <textarea
            name="message"
            id="message"
            value={message}
            rows="3"
            onChange={onChange}
            className="mt-8 border-2 w-11/12 sm:w-10/12 md:w-9/12 p-3"
            placeholder="Enter your Message here...."
          ></textarea>

          <Link
            to={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${landlord.email}&subject=Regarding%20${listing.name}&body=${message}
            `}
            
            className="bg-sky-600 p-4 hover:opacity-80 text-white font-medium text-lg px-5 mt-7 w-56 text-center"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
