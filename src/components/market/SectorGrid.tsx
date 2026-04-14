'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { SectorData } from '@/types/sector'
import SectorCard from './SectorCard'

interface SectorGridProps {
  sectors: SectorData[]
  newsMap?: Record<string, { headline: string; url: string }[]>
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function SectorGrid({ sectors, newsMap = {} }: SectorGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {sectors.map((sector) => (
        <motion.div key={sector.slug} variants={itemVariants}>
          <SectorCard
            sector={sector}
            headlines={newsMap[sector.slug] ?? []}
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
