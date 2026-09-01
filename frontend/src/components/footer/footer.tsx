import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Container } from "@/components/layout/container";

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "Colleges", href: "/college/akgec" },
  { title: "About", href: "/about" },
];

const supportLinks = [
  { title: "Contact", href: "/contact" },
  { title: "FAQ", href: "/faq" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">

      <Container>

        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-black shadow-lg shadow-blue-500/30">
                Z
              </div>

              <div>

                <h2 className="text-2xl font-black tracking-tight">
                  ZentStay
                </h2>

                <p className="text-xs text-slate-400">
                  Student Accommodation Platform
                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-slate-400">
              Discover verified PGs, hostels and student apartments near top
              colleges with transparent pricing, premium amenities and zero
              brokerage.
            </p>

            <div className="mt-8 flex gap-4">

              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-800
                    text-slate-300
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-gradient-to-r
                    hover:from-blue-600
                    hover:to-cyan-500
                    hover:text-white
                  "
                >
                  <Icon size={18} />
                </a>
              ))}

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Quick Links
            </h3>

            <div className="space-y-4">

              {quickLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  {item.title}
                </Link>
              ))}

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Support
            </h3>

            <div className="space-y-4">

              {supportLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-blue-400"
                >
                  {item.title}
                </Link>
              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Contact
            </h3>

            <div className="space-y-6 text-slate-400">

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>zentstay@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91 88405 07951</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-blue-400" />

                <span>
                  Ghaziabad
                  <br />
                  Uttar Pradesh
                  <br />
                  India
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026{" "}
            <span className="font-semibold text-white">
              ZentStay
            </span>
            . All rights reserved.
          </p>

          <p>
            Built for Students • Made in India 🇮🇳
          </p>

        </div>

      </Container>

    </footer>
  );
}