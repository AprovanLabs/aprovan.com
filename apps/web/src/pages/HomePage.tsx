import {
  ExternalLink,
  GithubIcon,
  LinkedinIcon,
  MonitorIcon,
  SmartphoneIcon,
} from 'lucide-react'
import { Button } from 'src/components/Button'
import SimpleLayout from 'src/layouts/SimpleLayout'
import logoText from 'src/resources/logo/logo-text.svg'
import logoBw from 'src/resources/logo/logo-bw.svg'
import lahiloLogo from 'src/resources/logo/logo-lahilo.svg'
import { cn } from 'src/lib/utils'
import React from 'react'

const ContactCallout: React.FC = () => (
  <div className="relative mx-auto grid py-8">
    <h2 className="font-bold">the one-stop-shop</h2>
    <p>for custom software solutions</p>
    <a href="/contact" className="mt-4">
      <Button variant="secondary" className="w-full">
        contact us
      </Button>
    </a>
  </div>
)

interface ProjectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  titleLink?: string
  description: string
  logo: React.ReactNode
  icons: React.ReactNode
}
const Project = React.forwardRef<
  HTMLDivElement,
  ProjectProps
>(
  (
    {
      className,
      logo,
      title,
      titleLink,
      description,
      icons,
      children,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        className,
        'sm:grid-template-rows-1 relative mx-auto grid w-3/4 grid-rows-2 gap-8 py-8 sm:grid-cols-[18rem_1fr] sm:grid-rows-1 sm:gap-12 md:grid-cols-[30rem_10rem] md:gap-12 lg:grid-cols-[70%_1fr] lg:gap-32',
      )}
    >
      <div className="relative h-full w-full">
        {children}
      </div>
      <div className="flex flex-col justify-start">
        <div className="mb-4">{logo}</div>
        {titleLink ? (
          <a href={titleLink}>
            <Button
              className="px-0 text-left text-lg font-bold"
              variant="link"
            >
              {title}{' '}
              <ExternalLink className="ml-1" size={15} />
            </Button>
          </a>
        ) : (
          <h2 className="text-lg font-bold">{title}</h2>
        )}
        <p className="mb-2">{description}</p>
        <div className="flex gap-2 opacity-50">{icons}</div>
      </div>
    </div>
  ),
)

const HomePage: React.FC = () => (
  <SimpleLayout>
    <section className="align-center relative m-4 flex rounded-sm bg-secondary p-4">
      <img
        src={logoText}
        alt="Aprovan"
        className="mx-auto mb-6"
      ></img>
      <div className="absolute bottom-0 left-0 h-12 w-12 rounded-t-full bg-white">
        <div className="absolute inset-0 m-auto h-5 w-5 rounded-full bg-secondary"></div>
      </div>
    </section>
    <ContactCallout />

    {/* Showcase */}
    <h2
      id="showcase"
      className="ml-4 mt-24 text-xl font-bold md:text-2xl"
    >
      Showcase
    </h2>
    <div className="m-4 flex flex-col gap-12 md:gap-24 lg:gap-64">
      <Project
        title="lahilo"
        titleLink="https://lahilo.aprovan.com"
        description="langage learning done naturally"
        icons={
          <>
            <MonitorIcon size={20} />
            <SmartphoneIcon size={20} />
          </>
        }
        logo={<img src={lahiloLogo} alt="Lahilo"></img>}
      >
        <div className="relative mx-auto h-full overflow-hidden lg:h-96">
          <img
            className="t-0 max-w-20rem absolute w-full rotate-[-10deg]"
            src="/images/lahilo-reader.png"
            alt="Lahilo Reader Bottom"
          />
          <img
            className="t-0 absolute w-full"
            src="/images/lahilo-reader.png"
            alt="Lahilo Reader"
          />
          <div className="absolute left-0 top-[100%] h-1/4 w-full bg-white drop-shadow-2xl"></div>
        </div>
      </Project>

      <Project
        title="lotus technical"
        titleLink="https://lotustechnical.com"
        description="staffing website and job portal"
        icons={
          <>
            <MonitorIcon size={20} />
          </>
        }
        logo={
          <img src={logoBw} alt="Lotus Technical"></img>
        }
      >
        <img
          className="absolute left-1/2 w-full origin-top -translate-x-1/4 scale-75"
          src="/images/lotus-about.png"
          alt="Lotus Technical Home"
        />
        <img
          className="absolute left-1/2 right-16 w-full origin-top -translate-x-3/4 scale-75"
          src="/images/lotus-home.png"
          alt="Lotus Technical About"
        />
      </Project>

      <Project
        title="el yankee"
        titleLink="https://elyankee.org"
        description="study abroad blogging site"
        icons={
          <>
            <MonitorIcon size={20} />
          </>
        }
        logo={<img src={logoBw} alt="E<l Yankee"></img>}
      >
        <img
          className="absolute left-1/2 top-0 w-full origin-top -translate-x-3/4 rotate-[-20deg] scale-[60%]"
          src="/images/elyankee-reports.png"
          alt="El Yankee Reports"
        />
        <img
          className="absolute left-1/2 top-0 w-full origin-top -translate-x-1/4 rotate-[10deg] scale-75"
          src="/images/elyankee-home.png"
          alt="El Yankee Home"
        />
      </Project>

      <Project
        title="erm"
        titleLink="https://extron-remote-management.web.app/"
        description="ag-tech monitoring app"
        icons={
          <>
            <SmartphoneIcon size={20} />
          </>
        }
        logo={<img src={logoBw} alt="El Yankee"></img>}
      >
        <div className="relative h-full w-full lg:h-96">
          <img
            className="absolute left-1/2 h-[120%] -translate-x-3/4 -translate-y-6"
            src="/images/erm-bin.png"
            alt="ERM Assets"
          />
          <img
            className="absolute left-1/2 h-[120%] -translate-x-1/4"
            src="/images/erm-assets.png"
            alt="ERM Bin"
          />
        </div>
      </Project>
    </div>

    {/* Links */}
    <section className="mx-4 my-32 flex justify-around gap-4 sm:justify-start md:mb-4">
      <a href="https://github.com/AprovanLabs">
        <div className="rounded-sm bg-primary p-8 text-white transition-colors hover:bg-secondary/10 hover:text-secondary">
          <GithubIcon />
        </div>
      </a>
      <a href="https://www.linkedin.com/company/aprovan">
        <div className="rounded-sm bg-primary p-8 text-white transition-colors hover:bg-secondary/10 hover:text-secondary">
          <LinkedinIcon />
        </div>
      </a>
    </section>
  </SimpleLayout>
)

export default HomePage
