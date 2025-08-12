import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react'


type SingleChoiceProps = {
  options: string[];
  selectedOption: string | string[];
  onOptionSelect: (option: string) => void;
};

const SingleChoice = ({ options, selectedOption, onOptionSelect }: SingleChoiceProps) => {
  return (
    <div className='w-full h-full justify-start flex flex-col'>
        <RadioGroup defaultValue={typeof selectedOption === "string" ? selectedOption : ""} onValueChange={onOptionSelect} className="flex flex-col gap-2">
          {options.map((option, index) => (
                  <div key={index} className={`w-full flex px-2 py-3 rounded-lg items-center border space-x-2`}>
                      <RadioGroupItem value={option} id={option} />
                      <Label className='w-full text-sm' htmlFor={option}>{option}</Label>
                  </div>
          ))}   
        </RadioGroup>
    </div>
  )
}

export default SingleChoice