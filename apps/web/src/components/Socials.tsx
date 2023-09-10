import { GithubIcon, LinkedinIcon } from 'lucide-react'

const Socials = () => (
  <section className="relative mx-4 mb-4 mt-32 flex items-end justify-around gap-4 sm:justify-start">
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

    <p>Reach out on LinkedIn for inquiries</p>
  </section>
)

export default Socials
