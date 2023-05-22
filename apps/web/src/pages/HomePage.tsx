import { Button } from 'src/components/Button'
import SimpleLayout from 'src/layouts/SimpleLayout'
import logoText from 'src/resources/logo/logo-text.svg'

const ContactCallout: React.FC = () => (
  <div className="relative mx-auto grid py-8">
    <h2 className="font-bold">the one-stop-shop</h2>
    <p>for custom software solutions</p>
    <Button variant="secondary" className="mt-4">
      contact us
    </Button>
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
  </SimpleLayout>
)

export default HomePage
