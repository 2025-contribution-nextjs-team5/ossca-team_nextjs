'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import DropDownButton from './DropDownButton';
import HeaderBottomBar from './HeaderBottomBar';

export default function Header() {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const pathname = usePathname();
	const isDropdownActive = activeDropdown !== null;

	return (
		<>
			{/* 검은색 반투명 배경 - 드롭다운이 활성화됐을 때만 표시 */}
			{isDropdownActive && (
				<div
					className="fixed inset-0 bg-black/30 z-5"
					onClick={() => setActiveDropdown(null)}
				/>
			)}

			<header className="fixed top-0 left-0 right-0 z-10 bg-black shadow-sm pretendard-700">
				<div className="max-w-7xl">
					<div className="flex h-16 items-center">
						{/* 로고 */}
						<Link href="/" className="ml-4 mr-8">
							<Image
								src="/ossca_logo.svg"
								alt="ossca_logo"
								width={140}
								height={70}
							/>
						</Link>

						{/* 네비게이션 메뉴 */}
						<div className="flex items-center space-x-2">
							<DropDownButton
								title="Posting"
								items={[
									{ label: 'April', href: '/posting/april' },
									{ label: 'May', href: '/posting/may' },
								]}
								id="posting"
								activeDropdown={activeDropdown}
								setActiveDropdown={setActiveDropdown}
							/>

							<DropDownButton
								title="Q&A"
								items={[
									{ label: 'Career', href: '/qna/career' },
									{ label: 'Employment', href: '/qna/employment' },
									{ label: 'Frontend', href: '/qna/frontend' },
								]}
								id="qna"
								activeDropdown={activeDropdown}
								setActiveDropdown={setActiveDropdown}
							/>

							<Link
								href="/developers"
								className="px-8 py-2 text-white relative group"
							>
								Developers
								<HeaderBottomBar isVisible={pathname === '/developers'} />
							</Link>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
