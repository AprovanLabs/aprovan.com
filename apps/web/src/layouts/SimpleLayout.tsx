import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'

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
    <Link to="/showcase">
      <Button variant="link">Showcase</Button>
    </Link>
    <Link to="/contact">
      <Button variant="link">Contact</Button>
    </Link>
  </header>
)

const Footer: React.FC = () => (
  <footer className="relative bottom-0 h-12 w-full bg-primary">
    <div className="grid grid-rows-3">
      <p className="col-span-3">aprovan</p>
      <Link to="/">
        <Button className="text-white" variant="link">
          Home
        </Button>
      </Link>
      <Link to="/showcase">
        <Button className="text-white" variant="link">
          Showcase
        </Button>
      </Link>
      <Link to="/contact">
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
      <main className="relative flex h-full w-full flex-col justify-start  overflow-hidden bg-white p-0">
        {children}
      </main>
      <Footer />
    </div>
  </>
)

export default SimpleLayout
