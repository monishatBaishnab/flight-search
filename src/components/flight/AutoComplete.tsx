'use client';

import { Check, Loader2, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/cn';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  icon?: LucideIcon;
  className?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  disabled?: boolean;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
}

export function Autocomplete({
  options,
  value: controlledValue,
  onValueChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No option found.',
  icon: Icon,
  className,
  buttonClassName,
  popoverClassName,
  disabled = false,
  onSearch,
  isLoading = false,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const selectedOption = options?.find((option) => option.value === value);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'w-full! justify-start h-11 bg-[#FAFAFA]! border border-[#F5F5F5]! text-gray-700',
              buttonClassName,
            )}
          >
            {Icon && <Icon className="size-4 text-gray-400" />}
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span className="text-gray-400 font-normal">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-[200px] p-0', popoverClassName)}>
          <Command shouldFilter={false}>
            <CommandInput
              onValueChange={(value) => onSearch?.(value)}
              placeholder={searchPlaceholder}
              className="h-9"
            />
            <CommandList>
              {isLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="size-4 animate-spin text-gray-400" />
                </div>
              )}
              {!isLoading && <CommandEmpty>{emptyMessage}</CommandEmpty>}
              {!isLoading && (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        handleValueChange(
                          currentValue === value ? '' : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
