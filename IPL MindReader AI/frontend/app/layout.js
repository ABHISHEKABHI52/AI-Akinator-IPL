import './globals.css';
import { Providers } from '../components/providers.js';

export const metadata = {
  title: 'IPL MindReader AI',
  description: 'Adaptive IPL player guessing system powered by probabilistic reasoning and Gemini AI.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
