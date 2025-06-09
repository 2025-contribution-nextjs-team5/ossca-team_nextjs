import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import './globals.css';
import AppHeader from './common/AppHeader';
import image from '../../public/open_graph.png';

const pretendard = localFont({
	src: '../../public/PretendardVariable.woff2',
	weight: '100 900',
	display: 'swap',
	variable: '--font-pretendard',
});

const SITE_CONFIG = {
	title: '2025 OSSCA NEXT.JS 블로그',
	description:
		'2025년 OSSCA 체험형 1차 [Git 활용 및 Next.js 뽀개기] 과정에서 진행한 TIL을 모아볼 수 있는 블로그 입니다.',
	url: 'https://ossca-team-nextjs.vercel.app/',
	gaId: 'G-QNJ6TTK7KL',
} as const;

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.title,
		template: `%s | ${SITE_CONFIG.title}`,
	},
	description: SITE_CONFIG.description,

	openGraph: {
		type: 'website',
		locale: 'ko_KR',
		url: SITE_CONFIG.url,
		title: SITE_CONFIG.title,
		description: SITE_CONFIG.description,
		images: [
			{
				url: image.src,
				width: 1200,
				height: 630,
				alt: SITE_CONFIG.title,
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: SITE_CONFIG.title,
		description: SITE_CONFIG.description,
		images: [image.src],
	},

	icons: {
		icon: '/favicon.ico',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false, // 모바일에서 확대/축소 방지
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={`${pretendard.variable} antialiased`}>
				<AppHeader />
				<main>{children}</main>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${SITE_CONFIG.gaId}');
					`}
				</Script>
			</body>
		</html>
	);
}
