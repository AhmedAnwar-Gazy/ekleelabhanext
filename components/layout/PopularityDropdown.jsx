import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PopularityDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('الأكثر شعبية');

  const options = [
    'إلغاء تحديد الخيار',
    'الأكثر شعبية',
    'الجديد',
    'العروض',
    'السعر الأعلى فالأقل',
    'السعر الأقل فالأعلى'
  ];

  const handleOptionSelect = (option) => {
    if (option === 'إلغاء تحديد الخيار') {
      setSelectedOption('الأكثر شعبية');
    } else {
      setSelectedOption(option);
    }
  };

  return (
    <div className="w-64 mx-auto " dir="rtl">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-white border-gray-300 text-gray-700 hover:bg-gray-50 h-10 px-4"
          >
            <span className="font-normal">{selectedOption}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-64 bg-white border border-gray-200 shadow-lg rounded-md p-0"
          align="start"
        >
          {options.map((option, index) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`
                px-4 py-3 cursor-pointer text-right text-gray-700 hover:bg-gray-50 focus:bg-gray-50
                ${index === 0 ? 'border-b border-gray-200' : ''}
                ${index === 1 ? 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600' : ''}
                ${selectedOption === option && index !== 1 ? 'bg-blue-50 text-blue-700' : ''}
              `}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-normal">{option}</span>
                {selectedOption === option && index !== 0 && (
                  <Check className="h-4 w-4 text-current" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>


    </div>
  );
};

export default PopularityDropdown;