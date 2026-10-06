import Image from "next/image";
import heroImage from "@/public/hero.jpg";
import HeaderLayout from "./HeaderLayout";

function LandingPage() {
  return (
    <>
      <section>
        <HeaderLayout />
      </section>
      <section
        className="
        relative
        isolate
        mx-auto
        w-[calc(100%-2rem)]
        max-w-[1750px]
        overflow-hidden
        rounded-[22px]
        border
        border-white/10
        bg-black
        min-h-130
        sm:min-h-145
        sm:mt-5
        lg:min-h-175
      "
      >
        {/* Background image */}
        <Image
          src={heroImage}
          alt="background-image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1750px"
          className="object-cover object-center"
        />

        {/* Cinematic dark overlay */}
        <div
          className="
          absolute
          inset-0
          z-0
          bg-linear-to-r
          from-black
          via-black/65
          to-black/10
        "
        />

        {/* Bottom darkness */}
        <div
          className="
          absolute
          inset-x-0
          bottom-0
          h-[55%]
          z-0
          bg-linear-to-t
          from-black/85
          via-black/40
          to-transparent
        "
        />

        {/* Content */}
        <div
          className="
          relative
          z-10
          flex
          min-h-130
          items-end
          sm:min-h-145
          lg:min-h-175
        "
        >
          <div
            className="
            w-full
            max-w-190
            px-6
            pb-10
            sm:px-10
            sm:pb-14
            lg:px-20
            lg:pb-16
          "
          >
            {/* Title */}
            <h1
              className="
              mb-4
              text-4xl
              font-bold
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-[58px]
              lg:leading-[1.05]
            "
            >
              Movie Hub
            </h1>

            {/* Description */}
            <p
              className="
              mb-6
              max-w-195
              text-base
              font-medium
              leading-6
              text-white
              sm:text-lg
              sm:leading-7
              lg:text-[21px]
              lg:leading-7
            "
            >
              Movies move us like nothing else can, whether they’re scary,
              funny, dramatic, romantic or anywhere in-between. So many titles,
              so much to experience.
            </p>

            {/* Form */}
            <form
              className="
              flex
              w-full
              max-w-175
              flex-col
              gap-3
              sm:flex-row
            "
            >
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="yourMail@gmail.com"
                required
                className="
                h-14
                min-w-0
                flex-1
                rounded-full
                border
                border-white/40
                bg-black/40
                px-6
                py-2
                text-base
                text-white
                outline-none
                backdrop-blur-sm
                placeholder:text-white/65
                transition
                focus:border-white
                focus:bg-black/55
              "
              />

              {/* CTA */}
              <button
                type="submit"
                className="
                h-14
                min-w-20
                rounded-full
                bg-[#E50914]
                px-8
                text-base
                font-bold
                text-white
                transition
                hover:bg-[#f40612]
                active:scale-[0.98]
              "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
      </section>
    </>
  )
}
export default LandingPage;