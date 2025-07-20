// const geistSans = localFont({
//     src: '../public/fonts/GeistVF.woff',
//     variable: '--font-geist-sans',
//     weight: '100 900',
// });
// const geistMono = localFont({
//     src: '../public/fonts/GeistMonoVF.woff',
//     variable: '--font-geist-mono',
//     weight: '100 900',
// });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
