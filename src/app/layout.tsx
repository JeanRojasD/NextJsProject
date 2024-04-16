import { Aside } from '@/components/Aside';
import { Prompt } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

const prompt = Prompt({
  weight: ['400', '600'],
  subsets: [ 'latin'],
  display:  'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <div className='app-container'>
          <Aside />
          <div className='main-content'>{children}</div>
        </div>
      </body>
    </html>
  );
}
