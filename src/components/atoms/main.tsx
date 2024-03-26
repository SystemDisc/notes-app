import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className='relative top-4 p-4 bg-white dark:bg-neutral-700 max-w-5xl mx-auto rounded overflow-hidden shadow-md shadow-neutral-700 dark:shadow-neutral-400 border border-neutral-300 dark:border-white'>
      {children}
    </main>
  );
}