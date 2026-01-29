import "./globals.css";

export const metadata = {
  title: "TripSquad AI - One Page Prototype",
  description: "Decide where to go in minutes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
