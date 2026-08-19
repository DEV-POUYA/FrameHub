"use client";

import Link from "next/link";
import { useState } from "react";

function CommentBox({ isAuth }) {
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleComment = (e) => {
    e.preventDefault();

    const trimmedComment = comment.trim();

    if (!trimmedComment) return;

    const newReview = {
      id: crypto.randomUUID(),
      content: trimmedComment,
      createdAt: new Date(),
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setComment("");
  };

  return (
    <section className="mt-16 w-full max-w-3xl">
      {/* Section Header */}
      <header className="mb-7">
        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Share Your Thoughts
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
          What did you think about this movie or series?
        </p>
      </header>

      {/* =========================
          REVIEW COMPOSER
      ========================== */}
      {isAuth ? (
        <form
          onSubmit={handleComment}
          className="
            overflow-hidden
            rounded-2xl
            border border-gray-800
            bg-gray-900/70
            shadow-xl shadow-black/10
            sm:rounded-3xl
          "
        >
          <div className="p-4 sm:p-6">
            {/* Label + Character Counter */}
            <div className="mb-3 flex items-center justify-between gap-4">
              <label
                htmlFor="review"
                className="text-sm font-medium text-gray-200"
              >
                Your review
              </label>

              <span
                className={`shrink-0 text-xs ${
                  comment.length >= 900
                    ? "text-orange-400"
                    : "text-gray-500"
                }`}
              >
                {comment.length}/1000
              </span>
            </div>

            {/* Textarea */}
            <textarea
              id="review"
              name="postContent"
              rows={6}
              maxLength={1000}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others what you thought about this one..."
              className="
                min-h-40
                w-full
                resize-y
                rounded-xl
                border
                border-gray-700
                bg-gray-950/70
                px-4
                py-4
                text-sm
                leading-6
                text-white
                placeholder:text-gray-600
                outline-none
                transition-all
                duration-200
                hover:border-gray-600
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-500/20
                sm:rounded-2xl
                sm:px-5
              "
            />

            {/* Footer */}
            <div
              className="
                mt-4
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p className="text-xs leading-5 text-gray-500">
                Be respectful and keep your review relevant.
              </p>

              <button
                type="submit"
                disabled={!comment.trim()}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-600
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-purple-500
                  hover:shadow-lg
                  hover:shadow-purple-500/20
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:bg-gray-800
                  disabled:text-gray-500
                  disabled:shadow-none
                  sm:w-auto
                "
              >
                Post Review
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* =========================
           NOT AUTHENTICATED
        ========================== */
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gray-800
            bg-gradient-to-br
            from-gray-900
            via-gray-900
            to-purple-950/20
            p-7
            text-center
            sm:rounded-3xl
            sm:p-10
          "
        >
          {/* Decorative Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-40
              w-40
              rounded-full
              bg-purple-600/10
              blur-3xl
            "
          />

          <div className="relative">
            {/* Icon */}
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-purple-500/10
                ring-1
                ring-purple-500/20
              "
            >
              <svg
                className="h-6 w-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M7 8h10M7 12h6m-6 8h10a3 3 0 003-3V7a3 3 0 00-3-3H7a3 3 0 00-3 3v10a3 3 0 003 3z"
                />
              </svg>
            </div>

            <h4 className="text-xl font-semibold text-white">
              Have something to say?
            </h4>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              Sign in to share your review and let other movie lovers know
              what you thought about this title.
            </p>

            <Link
              href="/signin"
              className="
                mt-6
                inline-flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-purple-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-purple-500
                hover:shadow-lg
                hover:shadow-purple-500/20
                active:scale-[0.98]
                sm:w-auto
              "
            >
              Sign in to review
            </Link>
          </div>
        </div>
      )}

      {/* =========================
          REVIEWS
      ========================== */}
      {reviews.length > 0 && (
        <section className="mt-10">
          {/* Reviews Header */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white sm:text-xl">
                Your Reviews
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="
                  rounded-2xl
                  border
                  border-gray-800
                  bg-gray-900/50
                  p-4
                  transition-colors
                  duration-200
                  hover:border-gray-700
                  sm:p-5
                "
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-purple-600/20
                      text-xs
                      font-semibold
                      text-purple-400
                      sm:h-11
                      sm:w-11
                    "
                  >
                    You
                  </div>

                  {/* Review Content */}
                  <div className="min-w-0 flex-1">
                    {/* User Information */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-semibold text-white">
                        You
                      </span>

                      <span className="text-xs text-gray-600">
                        {review.createdAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Comment */}
                    <p
                      className="
                        mt-2
                        break-words
                        text-sm
                        leading-6
                        text-gray-300
                        sm:text-[15px]
                      "
                    >
                      {review.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default CommentBox;