import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/app.css';

import { ColorSchemeScript } from '@mantine/core';
import { Envs } from '@/utils';

import RootEntry from './entry';
import initData from './initData';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInvalidToken, user, wordsCount, phrasesCount, conversationsCount } =
    await initData();

  return (
    <html lang="en">
      <head>
        <title>{Envs.app.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={Envs.app.description} />
        <link rel="icon" href="/favicon.ico" />
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body suppressHydrationWarning>
        <RootEntry
          isInvalidToken={isInvalidToken}
          user={user}
          stats={{ wordsCount, phrasesCount, conversationsCount }}
        >
          {children}
        </RootEntry>
      </body>
    </html>
  );
}
