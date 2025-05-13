export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ padding: '2rem', background: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}