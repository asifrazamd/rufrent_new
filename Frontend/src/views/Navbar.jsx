import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import tailwindStyles from "../utils/tailwindStyles";
import AuthModal from "./AuthModalView";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const listingsLength = 1;
  const showMyListings = listingsLength !== 0;
  const listingStyle = showMyListings ? "text-white" : "text-gray-400";
  const pointerType = showMyListings ? "" : "none";

  const jwtToken = Cookies.get("jwtToken");
  const isLogin = jwtToken !== undefined;
  // State to handle mobile/tablet menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onClickLoginBtn = () => {
    openModal();
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-3 pl-8 pr-10 fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand logo */}
          <Link to="/user">
            <div>
              <img
                src="https://media-hosting.imagekit.io//3be5dd5979af4971/RUFRENT2.png?Expires=1733978587&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uwUG94CUqahQzPbx7V0sDfnXr353w5iEvEw1XtG-MENcOJ9iUYPYR8q~pLla-1~0DgawjK~ZoG-T8hfLbGyePiI3j~ioFu90yOLepFXOII9sIWjzkgMP3OtFP4gn9NVnYAGjdsYvxZXtMw1~YRM2I1pzx6L2hgobXyMcBOj68~K40q69sE4xnxwwwAwlB5b0n1QkXWNX-S86Rsl30Vpdu3r81AxuKQxnN6RpcZYL34cYi2amhdV-70fxSwzSHEI82m9Z3uNPKmvs1J3VD4KAdbhk88fp27pqP7aM-0Y3Uy71-yb31symtxZmiwu2NofqyQdXoyBUUbNFzdZwVOuV8A__"
                alt="logo"
                className={`${tailwindStyles.logo}`}
              />
            </div>
          </Link>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            className="lg:hidden text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            &#9776;
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 items-center ">
            {path == "/postProperties" ? (
              <Link to="/postProperties">
                <button
                  className={`${tailwindStyles.activeTab} rounded-md font-semibold text-sm`}
                >
                  Post a Property
                </button>
              </Link>
            ) : (
              <Link to="/postProperties">
                <button className="bg-white text-gray-900  px-4 py-2 rounded-md font-semibold text-sm">
                  Post a Property
                </button>
              </Link>
            )}
            {path == "/mylistings" ? (
              <Link
                to="/mylistings"
                style={{ pointerEvents: `${pointerType}` }}
                className={`${tailwindStyles.activeTab} font-semibold text-sm ${listingStyle}`}
              >
                My Listings
              </Link>
            ) : (
              <Link
                to="/mylistings"
                style={{ pointerEvents: `${pointerType}` }}
                className={`font-semibold text-sm ${listingStyle}`}
              >
                My Listings
              </Link>
            )}

            {path == "/favorites" ? (
              <Link
                to="/favorites"
                className={`${tailwindStyles.activeTab} font-semibold text-sm`}
              >
                My Favourites
              </Link>
            ) : (
              <Link to="/favorites" className={`font-semibold text-sm`}>
                My Favourites
              </Link>
            )}

            {path == "/recentlyViewed" ? (
              <Link
                to="/recentlyViewed"
                className={`${tailwindStyles.activeTab} font-semibold text-sm`}
              >
                Recently Viewed
              </Link>
            ) : (
              <Link to="/recentlyViewed" className={`font-semibold text-sm`}>
                Recently Viewed
              </Link>
            )}
            {path == "/notifications" ? (
              <Link
                to="/notifications"
                className={`${tailwindStyles.activeTab} text-sm`}
              >
                &#128276; {/* Bell icon */}
              </Link>
            ) : (
              <Link to="/notifications" className="text-2xl">
                &#128276; {/* Bell icon */}
              </Link>
            )}
            {isLogin ? (
              <Link
                to="/profile"
                className="text-2xl"
                style={{ color: "#FFC156" }}
              >
                <FaUserAlt />
              </Link>
            ) : (
              <div>
                <button
                  onClick={onClickLoginBtn}
                  className={`${tailwindStyles.secondaryButton}`}
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile/Tablet Nav */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4">
            {/* {path === '/user' && (
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-2 py-1"
                            placeholder="Search"
                        />
                    )} */}
            <Link to="/postProperties" className="block text-center">
              <button className="bg-white text-gray-900 px-3 py-2 rounded-md font-semibold text-sm w-full hover:bg-gray-200">
                Post A Property
              </button>
            </Link>
            <Link
              to="/mylistings"
              style={{ pointerEvents: `${pointerType}` }}
              className={`block text-center font-semibold text-sm ${listingStyle}`}
            >
              My Listings
            </Link>
            <Link
              to="/favorites"
              className="block text-center font-semibold text-sm"
            >
              My Favourites
            </Link>
            <Link
              to="/recentlyViewed"
              className="block text-center font-semibold text-sm"
            >
              Recently Viewed
            </Link>
            <Link to="/notifications" className="block text-center text-2xl">
              &#128276; {/* Bell icon */}
            </Link>
            <Link to="/profile" className="block text-center text-2xl">
              &#128100; {/* User icon */}
            </Link>
          </div>
        )}
      </header>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
