import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CartModal from "./CartModal";
import { useWishlistStore } from "@/store/useWishList";
import { useUserStore } from "@/store/user/user.store";
import { createSelectors } from "@/lib/auto-genarate-selector";
import useCartStore from "@/store/useCartStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { isClient } from "@/lib";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  //STORE
  const userStore = createSelectors(useUserStore);
  const user = userStore.use.user();
  const logoutAction = userStore.use.logout();

  const handleProfile = () => {
    if (!session) {
      router.push("/auth/login");
    } else setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    logoutAction();
    setIsProfileOpen(false);
    setSession(null);
    router.push("/auth/login");
  };

  const { wishlist, getWishList } = useWishlistStore();
  const { cart, getCart } = useCartStore();

  useEffect(() => {
    if (localStorage.getItem("token") && isClient()) {
      getWishList();
      getCart();
    }
  }, []);

  useEffect(() => {
    let current = null;
    if (isClient()) {
      current = localStorage.getItem("token");
    }

    if (current) setSession(current);
  }, [pathname]);

  return (
    <div className="font-poppins flex items-center gap-4 xl:gap-6 relative">
      {/* Shop Icon */}
      <Link href="/shop">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <span className="text-xs text-gray-600 font-semibold">Shop</span>
        </div>
      </Link>
      {/* Wishlist Icon */}
      <Link href="/wishlist">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200 relative">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {wishlist.length > 0 && (
              <div className="absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-lama rounded-full bottom-0 right-0">
                {wishlist.length}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600 font-semibold">Wishlist</span>
        </div>
      </Link>
      {/* Cart Icon */}
      <Link href="/cart">
        <div
          onClick={() => setIsCartOpen((prev) => !prev)}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200 relative">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cart?.cartItems?.length > 0 && (
              <div className="absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-lama rounded-full bottom-0 right-0">
                {cart?.cartItems?.length}
              </div>
            )}
            {isCartOpen && <CartModal />}
          </div>
          <span className="text-xs text-gray-600 font-semibold">Cart</span>
        </div>
      </Link>
      {/* Profile Icon */}
      {
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <div className="flex flex-col justify-center items-center gap-1">
        //       <User size={24} className="text-primary-dk" />
        //       <span className="text-xs text-gray-600 font-semibold">Profile</span>
        //     </div>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent className="w-56">
        //     <Link href={`/profile/${user?.id}`} className="text-primary">
        //       Profile
        //     </Link>
        //     <DropdownMenuSeparator />
        //   </DropdownMenuContent>
        // </DropdownMenu>
      }
      <button onClick={handleProfile} className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
          {!session ? (
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>
        <span className="text-xs text-gray-600 font-semibold">
          {!session ? "SignIn" : "Account"}
        </span>
      </button>
      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-20 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 flex flex-col gap-3 w-fit">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <Link href={`/profile/${user?.id}`} className="text-primary">
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <Link href="/my-order" className="whitespace-nowrap text-primary">
              My Order
            </Link>
          </div>

          <div className="cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <span className="text-primary">
                {isLoading ? "Logging out" : "Logout"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavIcons;
