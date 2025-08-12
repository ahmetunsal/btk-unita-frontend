"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface LikertProps {
  selectedValue: string
  onValueSelect: (value: string) => void
  scale?: 5 | 7
  labels?: string[]
}

const Likert = ({ 
  selectedValue, 
  onValueSelect, 
  scale = 5,
  labels 
}: LikertProps) => {
  
  const defaultLabels5 = [
    "Kesinlikle Katılmıyorum",
    "Katılmıyorum", 
    "Kararsızım",
    "Katılıyorum",
    "Kesinlikle Katılıyorum"
  ]

  const defaultLabels7 = [
    "Kesinlikle Katılmıyorum",
    "Katılmıyorum",
    "Biraz Katılmıyorum", 
    "Kararsızım",
    "Biraz Katılıyorum",
    "Katılıyorum",
    "Kesinlikle Katılıyorum"
  ]

  const scaleLabels = labels || (scale === 5 ? defaultLabels5 : defaultLabels7)
  const scaleValues = Array.from({ length: scale }, (_, i) => (i + 1).toString())

  return (
    <div className="w-full space-y-6">
      <RadioGroup value={selectedValue} onValueChange={onValueSelect}>
        <div className="w-full space-y-4">
          {scaleValues.map((value, index) => (
            <div key={value} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
              <RadioGroupItem value={value} id={`likert-${value}`} />
              
              <div className="flex-shrink-0 w-8 h-8 bg-white text-zinc-800 rounded-full flex items-center justify-center text-sm font-medium">
                {value}
              </div>
              
              <Label 
                htmlFor={`likert-${value}`} 
                className="flex-1 text-sm cursor-pointer"
              >
                {scaleLabels[index]}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-6 p-4 border border-white/25 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Kesinlikle Katılmıyorum</span>
          <span className="text-xs text-gray-500">Kesinlikle Katılıyorum</span>
        </div>
        
        <div className="flex space-x-1">
          {scaleValues.map((value) => (
            <div
              key={value}
              className={`flex-1 h-2 rounded transition-colors ${
                selectedValue === value 
                  ? 'bg-blue-500' 
                  : selectedValue && parseInt(selectedValue) >= parseInt(value)
                    ? 'bg-blue-300'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        {selectedValue && (
          <div className="mt-3 text-center">
            <span className="text-sm font-medium text-white">
              Seçiminiz: {selectedValue} - {scaleLabels[parseInt(selectedValue) - 1]}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Likert
