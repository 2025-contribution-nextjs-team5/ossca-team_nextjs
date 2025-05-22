'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import DropDownButton from './DropDownButton';
import AppHeaderBottomBar from './AppHeaderBottomBar';

const qnaMenuItems = [
	{ label: 'Career', href: '/qna/career' },
	{ label: 'Employment', href: '/qna/employment' },
	{ label: 'Frontend', href: '/qna/frontend' },
];

export default function AppHeader() {
	// 1. 변수명 수정
	const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
	const pathname = usePathname();
	const isDropdownOpen = activeDropdownId !== null;

	// 2. 이벤트 핸들러의 명시적인 이름 부여 및 표현식으로부터의 분리
	const closeDropdown = () => {
		setActiveDropdownId(null);
	};

	// 드롭다운이 열려있는 상태에서 경로 변경시 드롭다운 닫기
	useEffect(() => {
		setActiveDropdownId(null);
	}, [pathname]);

	return (
		<>
			{/* 검은색 반투명 배경 - 드롭다운이 활성화됐을 때만 표시 */}
			{isDropdownOpen && (
				<div
					className="fixed inset-0 bg-black/30 z-5"
					onClick={closeDropdown}
				/>
			)}

			<header className="fixed top-0 left-0 right-0 bg-black shadow-sm z-10 pretendard-700">
				<div className="max-w-7xl">
					<div className="flex h-16 items-center">
						{/* 로고 */}
						<Link href="/" className="ml-4 mr-8" onClick={closeDropdown}>
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
								activeDropdownId={activeDropdownId}
								setActiveDropdownId={setActiveDropdownId}
							/>

							<DropDownButton
								title="Q&A"
								items={qnaMenuItems}
								id="qna"
								activeDropdownId={activeDropdownId}
								setActiveDropdownId={setActiveDropdownId}
							/>

							<Link
								href="/developers"
								className="px-8 py-2 text-white relative group"
							>
								Developers
								<AppHeaderBottomBar isVisible={pathname === '/developers'} />
							</Link>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
