'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsListVariants = cva('flex items-center shrink-0', {
  variants: {
    variant: {
      default: 'p-1',
      button: '',
      line: 'border-b border-white/20',
    },
    size: {
      lg: 'gap-2.5',
      md: 'gap-2',
      sm: 'gap-1.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const tabsTriggerVariants = cva(
  'shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium transition-colors [&:hover]:!rounded-[5px] [&[data-state=active]]:!rounded-[5px]',
  {
    variants: {
      variant: {
        default:
          'text-white/70 hover:bg-white/10 hover:backdrop-blur-sm hover:text-white data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-sm data-[state=active]:text-white',
        button:
          'text-white/70 hover:bg-white/10 hover:backdrop-blur-sm hover:text-white data-[state=active]:bg-white/10 data-[state=active]:backdrop-blur-sm data-[state=active]:text-white',
        line: 'border-b-2 text-white/70 border-transparent data-[state=active]:border-primary hover:text-white data-[state=active]:text-white',
      },
      size: {
        lg: 'gap-2.5 text-base py-2.5 px-4',
        md: 'gap-2 text-sm py-1.5 px-3',
        sm: 'gap-1.5 text-xs py-1.5 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type TabsContextType = {
  variant?: 'default' | 'button' | 'line';
  size?: 'lg' | 'sm' | 'md';
};

const TabsContext = React.createContext<TabsContextType>({
  variant: 'default',
  size: 'md',
});

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('', className)} {...props} />;
}

function TabsList({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsContext.Provider value={{ variant: variant || 'default', size: size || 'md' }}>
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant, size }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsTrigger({ className, style, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, size } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      className={cn(tabsTriggerVariants({ variant, size }), className)}
      style={{
        ...style,
        // Force override button styles
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
      }}
      data-override-button="true"
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn('mt-2.5', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
