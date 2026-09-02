import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import logo from "@/assets/6.png.asset.json";
import { COMPANY } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="PreTT ApS logo" className="h-10 w-10" />
            <span className="font-display text-xl font-semibold">PreTT ApS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/70">{COMPANY.tagline}</p>
        </div>

        <div className="text-sm text-ink-foreground/80">
          <p className="eyebrow mb-3">Company</p>
          <p>PreTT ApS</p>
          <p>CVR: {COMPANY.cvr}</p>
          <p className="mt-1">{COMPANY.address}</p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-1 inline-block underline-offset-4 hover:underline"
          >
            {COMPANY.email}
          </a>
        </div>

        <div className="text-sm text-ink-foreground/80">
          <p className="eyebrow mb-3">Elsewhere</p>
          <a
            href={COMPANY.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
          <div className="mt-2">
            <Link to="/privacy" className="underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-ink-foreground/60 sm:px-8">
          © {new Date().getFullYear()} PreTT ApS · CVR: {COMPANY.cvr} · {COMPANY.address}
        </p>
      </div>
    </footer>
  );
}
