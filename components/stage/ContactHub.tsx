"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { EASE_SPATIAL } from "@/lib/motion";

const items = [
  { label: "GITHUB", href: site.socials.github, Icon: Github, ext: true },
  { label: "LINKEDIN", href: site.socials.linkedin, Icon: Linkedin, ext: true },
  { label: "EMAIL", href: `mailto:${site.socials.email}`, Icon: Mail, ext: false },
];

export default function ContactHub() {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {items.map(({ label, href, Icon, ext }) => (
        <motion.a
          key={label}
          href={href}
          target={ext ? "_blank" : undefined}
          rel={ext ? "noopener noreferrer" : undefined}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.3, ease: EASE_SPATIAL }}
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-xs font-semibold tracking-[0.14em] text-dim backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.10] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spectral-blue"
        >
          <Icon size={15} className="transition-transform group-hover:scale-110" aria-hidden />
          {label}
        </motion.a>
      ))}
    </div>
  );
}
