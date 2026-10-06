import React from "react";
import Link from "next/link";
// import { Github, Instagram, Mail, Film } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#160b24] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-20">
          {/* Brand */}
          <div className="max-w-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                {/* <Film size={20} strokeWidth={1.7} /> */}
              </div>

              <span className="text-lg font-semibold tracking-tight">
                MovieHub
              </span>
            </div>

            <h2 className="max-w-sm text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Discover something worth watching.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50 sm:text-base">
              Explore movies, discover new stories, and find your next
              favorite film.
            </p>
          </div>

          {/* Explore */}
          

          {/* Connect */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Connect
            </h3>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {/* <Github size={18} /> */}
              </a>

              <a
                href="mailto:"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {/* <Mail size={18} /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/[0.08]" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </p>

          <p className="text-white/45">
            This site is currently under development by{" "}
            <span className="font-medium text-white/70">Pouya Yamouti</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;