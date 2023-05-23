import { ConstructionIcon } from 'lucide-react'
import SimpleLayout from 'src/layouts/SimpleLayout'

const ContactPage: React.FC = () => (
  <SimpleLayout>
    <section className="align-center md:w-md lg:w-lg relative m-4 flex max-w-lg justify-center gap-4 rounded-sm bg-yellow-200 p-4 md:mx-auto">
      <ConstructionIcon />
      <pre>Under Construction</pre>
    </section>
  </SimpleLayout>
)

export default ContactPage
