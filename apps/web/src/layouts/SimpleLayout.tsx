import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'
import logoTextBottom from 'src/resources/logo/logo-text-bottom.svg'

const Header: React.FC = () => (
  <header className="relative top-0 flex h-16 w-full items-center gap-2 bg-white pl-2">
    <img
      className="relative -translate-y-1"
      src="/logo-bw.png"
      width={40}
      height={40}
      alt="Aprovan"
    />
    <Link to="/">
      <Button variant="link">Home</Button>
    </Link>
    <Link to="/#showcase">
      <Button variant="link">Showcase</Button>
    </Link>
    <Link to="/contact">
      <Button variant="link">Contact</Button>
    </Link>
  </header>
)

const Footer: React.FC = () => (
  <footer className="relative mt-auto  w-full bg-primary py-4 align-bottom">
    <div className="grid grid-rows-3">
      <div className="col-start-1 row-span-full  text-white">
        <img
          src={logoTextBottom}
          alt="Aprovan"
          className="absolute bottom-0 left-0"
        ></img>
      </div>
      <Link to="/" className="col-start-2 text-right">
        <Button className="text-white" variant="link">
          Home
        </Button>
      </Link>
      <Link
        to="/showcase"
        className="col-start-2 text-right"
      >
        <Button className="text-white" variant="link">
          Showcase
        </Button>
      </Link>
      <Link
        to="/contact"
        className="col-start-2 text-right"
      >
        <Button className="text-white" variant="link">
          Contact
        </Button>
      </Link>
    </div>
  </footer>
)

const SimpleLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <>
    <div className="absolute flex h-full w-full flex-col">
      <Header />
      <main className="relative flex h-screen min-h-screen w-full flex-col justify-start overflow-x-hidden bg-white p-0">
        {children}
        <Footer />
      </main>
    </div>
  </>
)

export default SimpleLayout
