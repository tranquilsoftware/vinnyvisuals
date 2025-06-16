interface GradientHeroCardProps {
    name: string
    role: string
    avatarSrc?: string
    className?: string
  }
  
  export function GradientHeroCard({ 
    name, 
    role, 
    avatarSrc,
    className = ''
  }: GradientHeroCardProps) {
    return (
      <div className={`relative  p-8 overflow-hidden ${className}`}>
        <div className="relative z-10 p-8 md:p-12 h-full">
          <div className={`flex flex-col ${avatarSrc ? 'md:flex-row' : 'items-center text-center'} gap-8 md:gap-12`}>
            {/* Left content section */}
            {/* <div className="absolute -inset-1 -bottom-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-20 group-hover:opacity-100 z-0"
                 style={{ width: '70%', left: '50%', transform: 'translateX(-50%)' }}/>
             */}
            <div className={`flex-1 flex flex-col min-w-0 ${!avatarSrc ? 'w-full max-w-4xl' : 'w-full md:w-2/3'}`}>
              <h1 className="text-content-white text-5xl md:text-6xl font-bold mb-4 
                           leading-[1.2] md:leading-[1.15] tracking-tight py-1"
                           style={{ fontFamily: 'AnandaBlack' }}>
                {name}
              </h1>
              <h2 className="text-content-primary text-xl md:text-2xl mb-6">
                {role}
              </h2>
            </div>
            
            {/* Right avatar section - only shown if avatarSrc is provided */}
            {avatarSrc && (
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-300 to-accent-300 blur-lg opacity-60" />
                <div className="relative h-full w-full overflow-hidden">
                  <img 
                    src={avatarSrc} 
                    alt={name}
                    className="w-full h-full object-cover rounded-full border-4 border-primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }