import Script from 'next/script';
import localFont from 'next/font/local';
import './globals.css';
import AppHeader from './common/AppHeader';

const pretendard = localFont({
	src: '../../public/PretendardVariable.woff2',
	weight: '100 900',
	display: 'swap',
	variable: '--font-pretendard',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<head>
				{/* Google tag (gtag.js) */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-QNJ6TTK7KL"
					async
				/>
				<Script id="google-analytics">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QNJ6TTK7KL');
          `}
				</Script>
			</head>
			<body className={`${pretendard.variable} antialiased`}>
				<AppHeader />
				<main className="pt-18">{children}</main>
			</body>
		</html>
	);
}
