"use client"

import { useState } from "react"
import { GripVertical } from 'lucide-react'

interface RankingProps {
  options: string[]
  selectedRanking: string[]
  onRankingChange: (ranking: string[]) => void
}

const Ranking = ({ options, selectedRanking, onRankingChange }: RankingProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const currentRanking = selectedRanking.length > 0 ? selectedRanking : [...options]

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (!draggedItem) return

    const dragIndex = currentRanking.indexOf(draggedItem)
    if (dragIndex === -1) return

    const newRanking = [...currentRanking]
    
    newRanking.splice(dragIndex, 1)
    
    newRanking.splice(dropIndex, 0, draggedItem)

    onRankingChange(newRanking)
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  return (
    <div className="w-full px-2 space-y-2">
      {currentRanking.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`
            flex items-center gap-3 p-3 border rounded-lg cursor-move transition-all
            ${draggedItem === item ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
            ${dragOverIndex === index ? 'border-blue-500' : 'border-gray-200'}
            hover:border-gray-300 hover:shadow-sm
          `}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
          
          <div className="flex-shrink-0 w-6 h-6 bg-white text-zinc-900 rounded-full flex items-center justify-center text-xs font-medium">
            {index + 1}
          </div>
          
          <div className="flex-1 text-sm font-inter font-semibold">
            {item}
          </div>
          
          {draggedItem === item && (
            <div className="text-xs text-gray-500">Sürükleniyor...</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Ranking
