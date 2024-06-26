import { Link } from 'react-router-dom'
import { Button } from 'src/components/Button'
import logoTextBottom from 'src/resources/logo/logo-text-bottom.svg'

const Header: React.FC = () => (
  <header className="fixed top-0 flex h-16 w-full items-center gap-2 bg-white pl-2">
    <img
      className="relative -translate-y-1"
      src="/logo-bw.png"
      width={40}
      height={40}
      alt="Aprovan"
    />
    {/* <Link
      to="/"
      onClick={() => (window.location.hash = '#title')}
    >
      <Button variant="link">Home</Button>
    </Link> */}
    <Link
      to="/#showcase"
      onClick={() => (window.location.hash = '#showcase')}
    >
      <Button variant="link">Showcase</Button>
    </Link>
    <Link
      to="/#contact"
      onClick={() => (window.location.hash = '#contact')}
    >
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
      {/* <Link to="/" className="col-start-2 text-right">
        <Button className="text-white" variant="link">
          Home
        </Button>
      </Link> */}
      <Link
        to="/#showcase"
        onClick={() => (window.location.hash = '#showcase')}
        className="col-start-2 text-right"
      >
        <Button className="text-white" variant="link">
          Showcase
        </Button>
      </Link>
      <Link
        to="/#contact"
        onClick={() => (window.location.hash = '#contact')}
        className="col-start-2 text-right"
      >
        <Button className="text-white" variant="link">
          Contact
        </Button>
      </Link>
      <Link to="/privacy-policy">
        <p className="absolute top-5   left-4 text-slate-400 border-b border-b-transparent transition-all ease-in-out hover:border-b-slate-400 hover:cursor-pointer">Privacy Policy</p>
      </Link>
    </div>
  </footer>
)

const SimpleLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <>
    <div
      className="absolute flex w-full flex-col"
      style={{
        background: `
            /* Shadow covers */
            linear-gradient(white 0%, rgba(255, 255, 255, 0)), linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 50%,
            /* Shadows */
            radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%
          `,
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '4rem',
        backgroundSize:
          '100% 12px, 100% 12px, 100% 5px, 100% 5px',
        /* Opera doesn't support this in the shorthand */
        backgroundAttachment: 'fixed',
        // overflow: 'auto',
        // backgroundAttachment:
        // 'local, local, scroll, scroll',
      }}
    >
      <main className="relative mt-16 flex min-h-screen w-full flex-col justify-start overflow-x-hidden  px-0">
        {children}
        <Footer />
      </main>
      <Header />
    </div>
  </>
)

export default SimpleLayout
