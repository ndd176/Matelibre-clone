import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useLayoutEffect, useState } from 'react'

function AccordionItem({ title, content, isOpen, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="border-2 border-green-800 rounded-[24px] overflow-hidden transition-all">
      <button
        className="w-full text-left px-6 py-4 text-green-900 font-bold text-lg flex justify-between items-center"
        onClick={onClick}
      >
        {title}
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={ref} className="px-8 pb-5 pt-2 text-green-800 text-sm">
              <ul className="list-disc list-inside space-y-1">
                {content.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
