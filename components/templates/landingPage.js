import Link from "next/link";

export default function LandingPage() {
  return (
    // Full‑screen section with a rich gradient background
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      {/* Subtle overlay pattern for extra texture (optional) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />

      {/* Card container that holds all content */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg md:p-12">
        {/* Movie icon / emoji */}
        <div className="mb-6 text-center text-6xl">🎬</div>

        {/* Main heading */}
        <h1 className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Movies Hub
        </h1>

        {/* Subtitle / description */}
        <p className="mt-6 text-center text-lg leading-relaxed text-gray-300 sm:text-xl">
          The one place where film lovers gather to share thoughts, reviews, and
          honest comments on every movie they watch.
        </p>

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/movies"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/25 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {/* Ripple/shine effect on hover */}
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              Go To Movie List
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
