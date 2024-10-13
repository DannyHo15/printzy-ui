import Image from "next/image";
import Link from "next/link";

const PerfectFitGuarantee = () => {
  return (
    <>
      <div className=" left-0 w-full  overflow-hidden">
        <div className="h-[15vh] min-h-[100px] max-h-[150px]">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="haru-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              ></path>
              <linearGradient id="haru-wave-gradient">
                <stop offset="5%" stopColor="#ED5221"></stop>
                <stop offset="95%" stopColor="#F4B30B"></stop>
              </linearGradient>
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#haru-wave"
                className="wave wave-1"
                x="48"
                y="0"
                fill="#F6FAFC"
              ></use>
              <use
                xlinkHref="#haru-wave"
                className="wave wave-2"
                x="48"
                y="5"
                fill="#ffeaf4"
              ></use>
            </g>
          </svg>
        </div>
      </div>
      <div className="pb-9 bg-pink-100">
        {/* Wave divider */}

        {/* Content */}
        <div className="relative max-w-[70%] mx-auto px-4 text-center">
          <Link href="/the-printblur-guarantee-n18.html">
            <div className="text-2xl lg:text-4xl font-bold text-secondary mb-3 block">
              {" "}
              {/* Changed to text-black */}
              Your Perfect Fit, Our Guarantee
            </div>
          </Link>
          <div className="text-lg lg:text-xl font-medium mb-6">
            Ensuring Your Delight
          </div>

          <div className="flex justify-center items-start space-x-6 mt-12">
            {/* Free Exchange */}
            <div className="flex flex-col items-center w-1/3 text-center text-gray-800">
              <Image
                src="https://cdn.printblur.com/unsafe/540x540/printblur.com/images/alterations-blur.png?v=20241007070044"
                alt="Free Exchange"
                width={165}
                height={148}
                className="mb-4"
              />
              <div className="font-semibold text-xl mb-2">Free Exchange</div>
              <p className="text-base">
                Enjoy hassle-free exchanges on your purchases with no hidden
                costs. If you're not satisfied with your product, swap it for
                another with ease.
              </p>
            </div>

            {/* Easy Refund */}
            <div className="flex flex-col items-center w-1/3 text-center text-gray-800">
              <Image
                src="https://cdn.printblur.com/unsafe/540x540/printblur.com/images/return-blur.png?v=20241007070044"
                alt="Easy Refund"
                width={165}
                height={157}
                className="mb-4"
              />
              <div className="font-semibold text-xl mb-2">Easy Refund</div>
              <p className="text-base">
                Experience stress-free refunds with Printblur. If you're not
                happy with your order, get your money back quickly and without
                any complications.
              </p>
            </div>

            {/* End-to-End Support */}
            <div className="flex flex-col items-center w-1/3 text-center text-gray-800">
              <Image
                src="https://cdn.printblur.com/unsafe/540x540/printblur.com/images/remake-blur.png?v=20241007070044"
                alt="End-to-End Support"
                width={165}
                height={162}
                className="mb-4"
              />
              <div className="font-semibold text-xl mb-2">
                End-to-End Support
              </div>
              <p className="text-base">
                At Printblur, we commit to providing comprehensive support for
                your custom prints, from design assistance to production and
                delivery. Our dedicated team is{" "}
                <a href="/contact-us">
                  <span className="text-blue-500">here</span>
                </a>{" "}
                to assist you with any queries or concerns throughout your
                shopping journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfectFitGuarantee;
