"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MultipleChoiceProps {
  options: string[]
  selectedOptions: string[]
  onOptionSelect: (option: string, checked: boolean) => void
}

const MultipleChoice = ({ options, selectedOptions, onOptionSelect }: MultipleChoiceProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-start space-y-3">
      {options.map((option) => (
        <div key={option} className="flex items-center border py-3 px-2 rounded-md space-x-2">
          <Checkbox
            id={option}
            checked={selectedOptions.includes(option)}
            onCheckedChange={(checked) => onOptionSelect(option, checked as boolean)}
          />
          <Label 
            htmlFor={option} 
            className="text-sm font-normal cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default MultipleChoice
