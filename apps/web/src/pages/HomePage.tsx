import { GithubIcon, LinkedinIcon } from 'lucide-react'
import { Button } from 'src/components/Button'
import SimpleLayout from 'src/layouts/SimpleLayout'
import logoText from 'src/resources/logo/logo-text.svg'

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
    <section className="m-4 flex justify-around gap-4 sm:justify-start">
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
