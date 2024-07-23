import "../styles/globals.css";
import Header from "../components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo.ico" />
        <title>TodayFin</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
