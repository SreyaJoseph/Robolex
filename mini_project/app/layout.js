import { StoryProvider } from "./context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Robolex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StoryProvider>
          {children}
        </StoryProvider>
      </body>
    </html>
  );
}
