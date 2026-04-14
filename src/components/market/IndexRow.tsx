'use client'

import { motion } from 'framer-motion'
import type { IndexData } from '@/types/index-type'
import IndexCard from './IndexCard'

interface IndexRowProps {
  indices: IndexData[]
}

export default function IndexRow({ indices }: IndexRowProps) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
      {indices.map((index, i) => (
        <motion.div
          key={index.slug}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="shrink-0 w-44"
        >
          <IndexCard index={index} className="w-44 h-full" />
        </motion.div>
      ))}
    </div>
  )
}
