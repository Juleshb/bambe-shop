import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import MapComponent from "./MapComponent"; 
import Nav from './navs/Nav';
import Footer from './navs/Footer';
import { FormattedNumber } from "react-intl";
import { Popover } from "flowbite-react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
  } from 'react-share';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile, setProfile] = useState([]);


  const shareUrl = `${URL}${window.location.pathname}`;
  const title = "Check out this amazing property!";

  // Fetch listing data from API
  useEffect(() => {
    fetch(`https://bambe.shop/api/listings/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!property) return <div className="text-center py-10">Property not found.</div>;

  // Function to show next/prev image
  const showImage = (index) => setCurrentIndex(index);

  const content = (
    <div className=" text-sm text-gray-500 dark:text-gray-400">
      <div className=" flex gap-5 px-3 py-2">
        {/* Facebook Share */}
        <FacebookShareButton url={shareUrl} quote={title}>
        <span className="border-r border-r-stone-100 px-2"><Icon className="text-blue-300" icon="iconoir:facebook" width="24" height="24" /></span>
        </FacebookShareButton>

        {/* Twitter Share */}
        <TwitterShareButton url={shareUrl} title={title}>
        <span className="border-r border-r-stone-100 px-2"><Icon className="text-blue-500" icon="si:twitter-line" width="24" height="24" /></span>
        </TwitterShareButton>

        {/* WhatsApp Share */}
        <WhatsappShareButton url={shareUrl} title={title}>
        <span className="px-2"><Icon className="text-green-500" icon="basil:whatsapp-outline" width="24" height="24" /></span>
        </WhatsappShareButton>

        {/* LinkedIn Share */}
        <LinkedinShareButton url={shareUrl} title={title}>
        <span className="border-r border-r-stone-100 px-2"><Icon className="text-green-500" icon="basil:linkedin-outline" width="24" height="24" /></span>
        </LinkedinShareButton>
      </div>
    </div>
  );


  return (
    <>
<Nav/>
<section className="py-24">
    <main className="flex-grow container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 mx-auto px-4 py-6 lg:gap-10">
        <div className="lg:col-span-2 mb-6">
          {/* Header: Title, Status & Price */}
          <div className="flex justify-between py-2">
            <div>
              <span className="lg:text-4xl mb-2">
                {property.name} ({property.listing_type})
              </span>
              <div className="flex gap-1 mt-2">
                <span className="bg-[#38B496] text-white px-3 rounded-sm">Status</span>
                <span
                  className={`${
                    property.status?.toLowerCase() === "sold" ? "bg-green-600" : "bg-[#F15C26]"
                  } text-white px-3 rounded-sm`}
                >
                  {property.status}
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                <Icon icon="basil:location-outline" width="24" height="24" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <div>
              <span className="lg:text-4xl">
                <FormattedNumber value={property.price} style="currency" currency="RWF" />
              </span>
            </div>
          </div>

          {/* Image Slider */}
          <div className="col-span-2 bg-white mb-6">
            <div className="mb-2 relative">
              <img
                src={`https://bambe.shop${property.images[currentIndex]?.url}`}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-[25rem] lg:h-[30rem] rounded-2xl object-cover"
              />
              <div className="flex items-center justify-between absolute top-1/2 w-full px-5">
                <button
                  onClick={() =>
                    showImage(currentIndex - 1 < 0 ? property.images.length - 1 : currentIndex - 1)
                  }
                  className="px-3 py-1 bg-[#F15C26] bg-opacity-20 hover:bg-[#F15C26] text-white transition ease-in-out"
                >
                  <Icon icon="ep:arrow-left-bold" width="12" height="24" />
                </button>
                <button
                  onClick={() =>
                    showImage(currentIndex + 1 === property.images.length ? 0 : currentIndex + 1)
                  }
                  className="px-3 py-1 bg-[#F15C26] bg-opacity-20 hover:bg-[#F15C26] text-white transition ease-in-out"
                >
                  <Icon icon="weui:arrow-filled" width="12" height="24" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-1 overflow-x-auto scroll-smooth scrollbar-hidden py-2 px-12 w-full">
              {property.images.map((img, index) => (
                <img
                  key={img.id}
                  src={`https://bambe.shop${img.url}`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => showImage(index)}
                  className={`md:w-16 md:h-16 w-12 h-12 object-cover cursor-pointer rounded-lg border-2 transition ${
                        currentIndex === index
                          ? "border-[#F15C26]"
                          : "border-transparent"
                      }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 mb-6">
            <h2 className="border-b-2 py-2 mb-4">Description</h2>
            <p className="text-gray-900">{property.description}</p>
          </div>

          {/* Location Map */}
          <div className="bg-white p-6">
            <h2 className="border-b-2 py-2 mb-2">Location</h2>
            <div>
              <MapComponent coordinates={property.coordinates}
                    image={property.images.url}
                    price={property.price}
                    beds={property.listing_type}
                    propertyAddress={property.location} />
            </div>
          </div>
        </div>

        {/* Sidebar: Contact Form & Buttons */}
        <div className="lg:max-w-lg justify-end ">
            <div className="bg-white px-4 py-5 flex justify-between mb-4">
              <Popover content={content} trigger="hover" arrow={false} placement="top">
                <button className="border py-2 px-6 flex rounded-md border-[#38B496] bg-green-50 text-sm text-[#38B496] font-semibold">
                  <Icon icon="ion:arrow-redo" width="12" height="12" />
                  <span className="ml-2">Share</span>
                </button>
              </Popover>

              <button className="border py-2 px-6 flex rounded-md border-[#F15C26] bg-red-50 text-sm font-semibold text-[#F15C26]">
                <Icon icon="mdi:heart" width="12" height="12" />
                <span className="ml-2">Save</span>
              </button>
            </div>
            <div className="bg-[#38B496] bg-opacity-50 py-4 px-6 rounded-tr-sm rounded-tl-sm">
              <div className="flex flex-row gap-10">
                <div>
                  {profile.length ? (
                    <img
                      src="https://example.com/profile.jpg"
                      alt="Profile"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <Icon icon="solar:user-bold" width="24" height="24" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">Contact Agent</div>
                  <div className="text-gray-50 text-sm flex">
                    <Icon
                      icon="solar:phone-outline"
                      width="24"
                      height="24"
                      className="text-yellow"
                    />
                    <span className="ml-1">123-456-7890</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white pb-6 px-6">
              <div>
                <form className="flex flex-col gap-5 py-5">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      className="w-full p-2 round bg-gray-100 focus:ring-red-700 focus:border-red-500"
                      placeholder="Names"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      className="w-full p-2 round bg-gray-100 "
                      placeholder="Phone"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      className="w-full p-2 round bg-gray-100"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex gap-4">
                    <textarea
                      rows="4"
                      className="w-full p-2 round bg-gray-100"
                      placeholder="Message"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button className="w-full px-6 py-6 rounded-sm border-[#38B496] bg-[#38B496] text-sm text-white font-semibold hover:bg-[#F15C26]">
                      <Icon icon="ion:send" width="12" height="12" />
                      <span className="ml-2">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </main>
    </section>
    <Footer/>
    </>
  );
}

export default PropertyDetails;
