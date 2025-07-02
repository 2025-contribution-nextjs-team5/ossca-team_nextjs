import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import AppDropdownButton from './AppDropdownButton';
import AppHeaderBottomBar from './AppHeaderBottomBar';

/**
 * 포스팅 드롭다운 메뉴 아이템 배열
 */
const postingMenuItems = [
	{ label: 'April', href: '/posting?tab=04' },
	{ label: 'May', href: '/posting?tab=05' },
];

/**
 * 피드백 드롭다운 메뉴 아이템 배열
 */
const feedbackMenuItems = [
	{ label: 'Design', href: '/feedback/design' },
	{ label: 'ETC', href: '/feedback/etc' },
];

/**
 * 헤더 내용 컴포넌트 (useSearchParams 사용)
 */
function AppHeaderContent() {
	return (
		<header
			className="fixed top-0 left-0 right-0 bg-black shadow-sm z-50 pretendard-700"
			role="banner"
		>
			<nav className="flex space-x-2" role="navigation" aria-label="네비게이션">
				<div className="max-w-7xl flex h-16 items-center">
					{/* 로고 */}
					<Link href="/" className="ml-4" aria-label="홈으로 이동">
						<Image
							src="/ossca_logo.svg"
							alt="OSSCA 로고"
							width={0}
							height={0}
							priority
							className="w-[80%] h-auto"
						/>
					</Link>

					<AppDropdownButton
						title="Posting"
						items={postingMenuItems}
						id="posting"
					/>

					<AppDropdownButton
						title="Feedback"
						items={feedbackMenuItems}
						id="feedback"
					/>

					<Link
						href="/developers"
						className="px-8 py-2 text-white relative group"
						aria-label="제작자 페이지로 이동"
					>
						Developers
						<AppHeaderBottomBar highlightRoutes={['/developers']} />
					</Link>
				</div>
			</nav>
		</header>
	);
}

/**
 * AppHeader 컴포넌트
 * @component
 * @example
 * ```tsx
 * <AppHeader />
 * ```
 */
export default function AppHeader() {
	return (
		<Suspense
			fallback={
				<header
					className="fixed top-0 left-0 right-0 bg-black shadow-sm z-50 pretendard-700"
					role="banner"
				>
					<nav className="flex space-x-2" role="navigation">
						<div className="max-w-7xl flex h-16 items-center">
							<Link href="/" className="ml-4 mr-8">
								<Image
									src="/ossca_logo.svg"
									alt="OSSCA 로고"
									width={158}
									height={37}
									priority/>
							</Link>
							<Link href="/posting" className="px-8 py-2 text-white">
								Posting
							</Link>
							<Link href="/feedback/design" className="px-8 py-2 text-white">
								Feedback
							</Link>
							<Link
								href="/developers"
								className="px-8 py-2 text-white relative group"
							>
								Developers
							</Link>
						</div>
					</nav>
				</header>
			}
		>
			<AppHeaderContent />
		</Suspense>
	);
}
