import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);

  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });





  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderfromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderfromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderfromUrl || "desc",
      });
    }





    const fetchListings = async () => {

      setLoading(true);
      setShowMore(false);

      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();

      if (data.length > 9) {

        setShowMore(true);

      } else {

        setShowMore(false);

      }


      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);





  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSideBarData({
        ...sideBarData,
        searchTerm: e.target.value,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "create_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({
        ...sideBarData,
        sort,
        order,
      });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };



  const onShowMoreClick = async () => {

     const numberOfListings = listings.length;
     const startIndex = numberOfListings;

     const urlParams = new URLSearchParams(location.search);

     urlParams.set( 'startIndex', startIndex );
     const searchQuery = urlParams.toString();

     const res = await fetch(`/api/listing/get?${searchQuery}`);

     const data = await res.json();


     if ( data.length < 9 ) {

        setShowMore(false);

     }

     setListings([ ...listings, ...data ]);

  }



  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 xl:px-10 border-b md:border-b-0 border-gray-400">
        <form onSubmit={handleSubmit} className=" left-0 top-24 sticky">
          <div className=" flex flex-col items-center gap-3">
            <h2 className="mt-1 font-semibold text-2xl">Search</h2>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="px-3 py-4 border-2 w-72 sm:w-80"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <h3 className="font-medium text-xl text-gray-700 text-center md:text-start md:ml-3 mt-5">
              Type:
            </h3>

            <div className="flex flex-col gap-3 mt-3 items-center md:items-start  justify-center md:justify-start ">
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "all"}
                />
                <span className="mr-5">Rent & Sale</span>

                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "rent"}
                />
                <span className="mr-5">Rent</span>
              </div>

              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "sale"}
                />
                <span className="mr-5">Sale</span>

                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.offer}
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-medium text-xl text-gray-700 text-center md:text-start md:ml-3 mt-5">
                Amenities:
              </h3>

              <div className="flex flex-row gap-2 mt-3 md:justify-start justify-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.parking}
                />
                <span className="mr-5">Parking</span>

                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>

            <div className="flex flex-row gap-3 md:ml-3 mt-6 items-center justify-center md:justify-start">
              <label className="text-lg font-medium">Sort by:</label>

              <select
                id="sort_order"
                className="border-2 pl-2 pr-9 py-3"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
              >
                <option value={"regularPrice_desc"}>Price high to low</option>
                <option value={"regularPrice_asc"}>Price low to high</option>
                <option value={"createdAt_asc"}>Oldest</option>
                <option value={"createdAt_desc"}>Latest</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button className="bg-sky-600 text-white font-medium w-72 mb-4 md:w-full  mt-8 self-center px-3 py-4 hover:opacity-80 disabled:opacity-50">
                Create Listing
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden -mt-20 md:block w-0.5 min-h-screen mx-1 bg-gray-400" />

      <div className="p-7 w-full">
        <h1 className="mt-3 md:border-b border-gray-400  pb-4 text-3xl font-semibold">
          Listing Results
        </h1>

        <hr className="md:hidden w-full sm:w-80 mt-2 h-0.5 bg-gray-600" />

        <div className="flex flex-col">
          {!loading && listings.length === 0 && (
            <p className="text-xl font-normal mt-28 text-center">
              Can't find any Listings!
            </p>
          )}

          {loading && (
            <p className="text-2xl font-normal mt-28 text-center">Loading...</p>
          )}

          <div className="mt-14 flex flex-col md:flex-row gap-5 gap-y-9 flex-wrap">
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>

          {showMore && (
            <button
              onClick={() => {
                onShowMoreClick();
              }}
              className="bg-cyan-600 px-20 md:px-14 xl:px-20 py-5 text-lg text-white font-semibold hover:opacity-80 hover:shadow-lg self-center mt-14 mb-10 "
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
