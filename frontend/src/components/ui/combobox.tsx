'use client';

import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

type ComboboxProps = {
  options: Option[];
  value: string;
  setValue: (v: string) => void;
};

export function Combobox({ options, value, setValue }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const popoverTriggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverTriggerWidth = popoverTriggerRef?.current?.offsetWidth;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-zinc-800 border-none text-zinc-400"
        >
          {value ? options.find((option) => option.value === value)?.label : 'Select a market'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: popoverTriggerWidth }}>
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? value : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
