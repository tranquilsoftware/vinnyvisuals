import { ScrollAnimation } from './animations/ScrollAnimation'
import { OWNER_NAME, OWNER_PIC, ABOUT_ME_DESC } from '../globals'

//// THIS IS FOR THE MAIN LANDING PAGE! (LIL CARD THINGO)
const About = () => {

  return (
    <section id="about" className="relative py-20 bg-transparent mt-[-100px]">
      <ScrollAnimation>
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            About Me
          </h2>
          
          {/* Owner's card with gradient bubble */}
          <div className="relative group mb-8">
            {/* Gradient bubble background */}
            <div className="absolute -inset-1 -bottom-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-20 group-hover:opacity-100 z-0"
                 style={{ width: '70%', left: '50%', transform: 'translateX(-50%)' }}/>
            
            {/* Card content */}
            <div className="relative z-10 max-w-3xl mx-auto card-gradient rounded-xl shadow-lg overflow-hidden border border-border">
              <div className="flex flex-col md:flex-row">
                <div className="md:flex-shrink-0">
                  <img 
                    src={OWNER_PIC} 
                    alt={OWNER_NAME} 
                    width={256}
                    height={256}
                    className="h-full w-full object-cover md:w-64"
                  />
                </div>
                <div className="p-6 md:p-12">
                  <div className="uppercase tracking-wide text-sm text-primary-light font-semibold">
                    Artist
                  </div>
                  <h3 className="mt-1 text-2xl font-semibold leading-tight text-content">
                    {OWNER_NAME}
                  </h3>
                  <p className="text-content-secondary mt-4">
                    {/* {OWNER_NAME} is the founder of {BRAND_NAME}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel nisl tincidunt placerat. Nullam nec metus vel nisl tincidunt placerat. */}
                    {/* My name is {OWNER_NAME}. I am an artist, and aspiring to be a game art designer!  */}
                    {ABOUT_ME_DESC}
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  )
}

export default About
