import { Zap, Clock, CircleHelp, LucideIcon } from 'lucide-react'

interface SectionData {
  icon: LucideIcon
  title: string
  content?: string
}

const sections: SectionData[] = [
  {
    icon: Zap,
    title: 'What',
    content: 'EXPLOSIVE power blend! Amino acids, creatine, and electrolytes for MAXIMUM gains!',
  },
  {
    icon: Clock,
    title: 'When',
    content: '30 MIN before workout! Prime your body for INTENSE performance!',
  },
  {
    icon: CircleHelp,
    title: 'Why',
    content: 'CRUSH your goals! Boost endurance, recovery, and muscle growth NOW!',
  },
]

const Trio = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full md:justify-between'>
      {sections.map((section, index) => (
        <div
          key={index}
          className='flex items-center md:flex-col md:items-center space-x-4 md:space-x-0 flex-1 md:text-center'
        >
          <div className='w-8 h-8 mb-0 md:mb-3'>
            <section.icon className='w-full h-full text-primary' />
          </div>
          <div className='flex-1 md:flex-none'>
            <h3 className='font-extrabold text-lg mb-1'>{section.title}</h3>
            <p className='text-muted-foreground text-sm md:text-base'>{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Trio
