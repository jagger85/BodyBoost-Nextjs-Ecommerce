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
    <div className='flex gap-8 w-full justify-between'>
      {sections.map((section, index) => (
        <div key={index} className='flex-1 flex flex-col items-center text-center'>
          <section.icon className='w-8 h-8 text-primary mb-3' />
          <h3 className='font-extrabold text-lg mb-2'>{section.title}</h3>
          <p className='text-muted-foreground'>{section.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Trio
