import * as React from 'react';

import { cn } from '@/lib/cn';

function Input({
  className,
  type,
  startContent,
  ...props
}: React.ComponentProps<'input'> & { startContent?: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        {startContent}
      </div>
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30  h-11 w-full min-w-0 rounded-sm border px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#FAFAFA] border-[#F5F5F5]',
          'focus-visible:border-cornflower-blue-400',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          startContent && 'pl-8',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
