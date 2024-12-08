import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="w-full max-w-md text-center">
        <div className="relative w-full h-64 mb-8">
          <Image
            src="/404illustration.svg"
            alt="404 Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold text-primary mb-4">Page Not Found</h1>

        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-dk transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
