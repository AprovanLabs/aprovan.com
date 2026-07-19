import {
  ArrowRight,
  Github,
  Linkedin,
  MessageSquare,
  MonitorIcon,
  Package,
  SmartphoneIcon,
} from "lucide-react";
import { AppHeader, type AppNavLink } from "@aprovan/ui/shell";
import Folderol from "../components/Folderol";
import { HeaderSession } from "../components/HeaderSession";
import logoBw from "../resources/logo/logo-bw.svg";
import logoText from "../resources/logo/logo-text.svg";
import lahiloLogo from "../resources/logo/logo-lahilo.svg";

const NAV: AppNavLink[] = [
  { label: "Home", href: "/", current: true },
  { label: "Chat", href: "/chat/" },
  { label: "Registry", href: "/registry/" },
];

// ---------------------------------------------------------------------------
// Platform apps
// ---------------------------------------------------------------------------

interface PlatformApp {
  title: string;
  href: string;
  cta: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
}

const PLATFORM_APPS: PlatformApp[] = [
  {
    title: "Chat",
    href: "/chat/",
    cta: "Open chat",
    description:
      "Tell it what you want. It builds it in front of you — live widgets, wired to your tools.",
    points: [
      "Live React widgets, rendered as you chat",
      "Your LLM, your keys — OpenAI, Claude, Gemini, Synthetic.new",
      "Widgets call whatever your workspace has connected",
    ],
    icon: <MessageSquare className="size-5" />,
  },
  {
    title: "Registry",
    href: "/registry/",
    cta: "Browse the registry",
    description:
      "Connect a provider once and it works everywhere — chat, widgets, scripts.",
    points: [
      "GitHub, Linear, Figma, PostHog, and more",
      "Credentials and permissions scoped to your workspace",
      "One gateway in front of everything",
    ],
    icon: <Package className="size-5" />,
  },
];

// ---------------------------------------------------------------------------
// Product showcase (the things Aprovan has shipped)
// ---------------------------------------------------------------------------

interface Product {
  title: string;
  href?: string;
  description: string;
  platforms: React.ReactNode;
  logo: React.ReactNode;
  image: { src: string; alt: string };
}

const PRODUCTS: Product[] = [
  {
    title: "Lahilo",
    href: "https://lahilo.aprovan.com",
    description: "Language learning done naturally",
    platforms: (
      <>
        <MonitorIcon className="size-4" />
        <SmartphoneIcon className="size-4" />
      </>
    ),
    logo: <img alt="Lahilo" className="h-6" src={lahiloLogo} />,
    image: { src: "/images/lahilo-reader.png", alt: "Lahilo reader" },
  },
  {
    title: "ERM",
    href: "https://extron-remote-management.web.app/",
    description: "Ag-tech monitoring app — on the App Store and Google Play",
    platforms: <SmartphoneIcon className="size-4" />,
    logo: <img alt="" className="h-6" src={logoBw} />,
    image: { src: "/images/erm-assets.png", alt: "ERM asset monitoring" },
  },
  {
    title: "Lotus Technical",
    description: "Staffing website and job portal",
    platforms: <MonitorIcon className="size-4" />,
    logo: <img alt="" className="h-6" src={logoBw} />,
    image: { src: "/images/lotus-home.png", alt: "Lotus Technical home" },
  },
  {
    title: "El Yankee",
    href: "https://elyankee.org",
    description: "Study abroad blogging site",
    platforms: <MonitorIcon className="size-4" />,
    logo: <img alt="" className="h-6" src={logoBw} />,
    image: { src: "/images/elyankee-home.png", alt: "El Yankee home" },
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader
        homeHref="/"
        links={NAV}
        logo={<img alt="" className="size-7" src="/logo-bw.png" />}
      >
        <HeaderSession />
      </AppHeader>

      {/* Wave banner — the original hero, back where it belongs */}
      <section className="mx-auto mt-4 w-full max-w-6xl px-4">
        <div className="relative flex overflow-hidden rounded-sm bg-brand py-10">
          <img
            alt="Aprovan"
            className="relative z-10 mx-auto mb-8 h-14 sm:h-20"
            src={logoText}
          />
          <Folderol className="absolute bottom-0 left-0" />
        </div>
      </section>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:pt-20">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Building what&rsquo;s next.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Custom software, and the tools we build to make it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            href="/chat/"
          >
            Open chat
            <ArrowRight className="size-4" />
          </a>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
            href="/registry/"
          >
            Browse the registry
          </a>
        </div>
      </section>

      {/* Platform */}
      <section className="border-t bg-muted/30 py-20" id="platform">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The platform
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Two apps, one workspace.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PLATFORM_APPS.map((app) => (
              <a
                className="group flex flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                href={app.href}
                key={app.title}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {app.icon}
                  </span>
                  <h3 className="text-lg font-semibold">{app.title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {app.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {app.points.map((point) => (
                    <li className="flex gap-2" key={point}>
                      <span className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {app.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20" id="work">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Other projects
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRODUCTS.map((product) => {
              const body = (
                <>
                  <div className="aspect-[16/10] overflow-hidden border-b bg-muted">
                    <img
                      alt={product.image.alt}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      src={product.image.src}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold">{product.title}</h3>
                      <span className="ml-auto flex items-center gap-1.5 text-muted-foreground">
                        {product.platforms}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </>
              );
              const cardClass =
                "group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md";
              return product.href ? (
                <a
                  className={cardClass}
                  href={product.href}
                  key={product.title}
                  rel="noreferrer"
                  target="_blank"
                >
                  {body}
                </a>
              ) : (
                <div className={cardClass} key={product.title}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t bg-muted/30 py-16" id="contact">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Work with us
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Reach out on LinkedIn for inquiries.
            </p>
          </div>
          <div className="flex gap-3 sm:ml-auto">
            <a
              aria-label="Aprovan on GitHub"
              className="inline-flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              href="https://github.com/AprovanLabs"
              rel="noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
            </a>
            <a
              aria-label="Aprovan on LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              href="https://www.linkedin.com/company/aprovan"
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <img alt="" className="size-5" src="/logo-bw.png" />
            Aprovan &copy; {new Date().getFullYear()}
          </span>
          <a className="hover:text-foreground" href="/chat/">
            Chat
          </a>
          <a className="hover:text-foreground" href="/registry/">
            Registry
          </a>
          <a className="ml-auto hover:text-foreground" href="/privacy-policy/">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
