
import "./globals.css";


export const metadata = {
  title: "Top Apex Legends Team",
  description: "Professional Esport of Apex Legends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="flex justify-center items-center min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
