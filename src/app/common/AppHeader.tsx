import Link from 'next/link';
import Image from 'next/image';
import AppDropdownButton from './AppDropdownButton';
import AppHeaderBottomBar from './AppHeaderBottomBar';

const postingMenuItems = [
	{ label: 'April', href: '/posting/april' },
	{ label: 'May', href: '/posting/may' },
];

const feedbackMenuItems = [
	{ label: 'Design', href: '/feedback/design' },
	{ label: 'ETC', href: '/feedback/etc' },
];

export default function AppHeader() {
	return (
		<header className="fixed top-0 left-0 right-0 bg-black shadow-sm z-10 pretendard-700">
			<div className="max-w-7xl flex h-16 items-center">
				{/* 로고 */}
				<Link href="/" className="ml-4 mr-8">
					<Image
						src="/ossca_logo.svg"
						alt="ossca_logo"
						width={158}
						height={37}
						priority
					/>
				</Link>

				{/* 네비게이션 메뉴 */}
				<nav className="flex space-x-2">
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
					>
						Developers
						<AppHeaderBottomBar isDevelopers />
					</Link>
				</nav>
			</div>
		</header>
	);
}
