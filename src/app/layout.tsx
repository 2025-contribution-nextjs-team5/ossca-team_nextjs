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
			<body className={`${pretendard.variable} antialiased`}>
				<AppHeader />
				<main className="pt-18">{children}</main>
			</body>
		</html>
	);
}
