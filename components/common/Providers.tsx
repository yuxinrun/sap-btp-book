'use client';

import { ThemeProvider } from 'next-themes';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ProgressProvider } from '@/lib/progress';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Tooltip.Provider delayDuration={300}>
        <ProgressProvider>{children}</ProgressProvider>
      </Tooltip.Provider>
    </ThemeProvider>
  );
}
