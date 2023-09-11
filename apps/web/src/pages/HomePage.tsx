import {
  ExternalLink,
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
import Folderol from 'src/components/Folderol'
import Socials from 'src/components/Socials'

const ContactCallout: React.FC = () => (
  <div className="relative mx-auto grid py-8">
    <h2 className="font-bold">The one-stop-shop</h2>
    <p>for custom software solutions</p>
    <Button
      onClick={() => (window.location.hash = '#contact')}
      variant="secondary"
      className="mt-4 w-full"
    >
      Contact Us
    </Button>
  </div>
)

interface ProjectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  titleLink?: string
  description: string
  date?: Date
  logo: React.ReactNode
  icons: React.ReactNode
  simple?: boolean
  celebrate?: boolean
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
      date,
      titleLink,
      description,
      icons,
      children,
      simple = false,
      celebrate = false,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        className,
        'sm:grid-template-rows-1 relative mx-auto grid w-3/4 grid-cols-1 gap-8 py-8',
        !simple &&
          'grid-rows-2 sm:grid-cols-[18rem_1fr] sm:grid-rows-1 sm:gap-12 md:grid-cols-[30rem_10rem] md:gap-12 lg:grid-cols-[70%_1fr] lg:gap-32',
      )}
    >
      {!simple && (
        <div className="relative h-full w-full">
          {children}
        </div>
      )}
      {celebrate && (
        <div className="absolute right-0 h-full opacity-[0.05]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5.8 11.3 2 22l10.7-3.79" />
            <path d="M4 3h.01" />
            <path d="M22 8h.01" />
            <path d="M15 2h.01" />
            <path d="M22 20h.01" />
            <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
            <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
            <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
            <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
          </svg>
        </div>
      )}
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
        {date && (
          <p className="mb-4 opacity-50">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        <div className="flex gap-2 opacity-50">{icons}</div>
      </div>
    </div>
  ),
)

const HomePage: React.FC = () => (
  <SimpleLayout>
    <section className="align-center relative mx-4 mb-4 flex rounded-sm bg-secondary py-4">
      <img
        id="title"
        src={logoText}
        alt="Aprovan"
        className="relative mx-auto mb-6"
      ></img>
      {/* <div className="absolute bottom-0 left-0 h-12 w-12 rounded-t-full bg-white">
        <div className="absolute inset-0 m-auto h-5 w-5 rounded-full bg-secondary"></div>
      </div> */}

      <Folderol className="absolute bottom-0" />
    </section>
    <ContactCallout />

    {/* Announcements */}
    <div className="mt-36 bg-slate-200 pb-36 pt-24">
      <h2 className="mb-24 ml-4 text-center text-xl font-bold md:text-2xl">
        Latest Projects
      </h2>
      <Project
        simple
        celebrate
        date={new Date('2023-09-01')}
        title="EXTRON Company"
        titleLink="https://www.linkedin.com/posts/extron_were-proud-to-announce-the-next-step-in-activity-7103030449890852864-M8Ii?utm_source=share&utm_medium=member_desktop"
        description="Extron Remote Management (ERM) app released to the Google Play Store and Apple App Store"
        icons={
          <>
            <SmartphoneIcon size={20} />
          </>
        }
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            fill="currentColor"
            width="24"
            height="24"
            focusable="false"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        }
      ></Project>
    </div>

    {/* Showcase */}
    <h2
      id="showcase"
      className="ml-4 mt-12 text-center text-xl font-bold md:text-2xl"
    >
      {/* Showcase */}
    </h2>
    <div className="m-4 flex flex-col gap-12 md:gap-24 lg:gap-64">
      <Project
        title="Lahilo"
        titleLink="https://lahilo.aprovan.com"
        description="Langage learning done naturally"
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
        title="Lotus Technical"
        // titleLink="https://lotustechnical.com"
        description="Staffing website and job portal"
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
        title="El Yankee"
        titleLink="https://elyankee.org"
        description="Study abroad blogging site"
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
        title="ERM App"
        titleLink="https://extron-remote-management.web.app/"
        description="Ag-tech monitoring app"
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

    {/* Contact */}
    <h2
      id="contact"
      className="ml-4 mt-12 text-xl font-bold md:text-2xl"
    >
      {/* Contact */}
    </h2>

    <Socials />
  </SimpleLayout>
)

export default HomePage
