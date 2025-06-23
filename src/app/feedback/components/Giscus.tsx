// components/Giscus.tsx
'use client'; // 이 지시어는 App Router 환경에서 클라이언트 컴포넌트로 명시합니다. Pages Router에서는 선택 사항입니다.

import React, { useEffect, useRef } from 'react';
// import { useTheme } from 'next-themes'; // next-themes를 사용한다면 이 줄의 주석을 해제해주세요.

interface GiscusProps {
	repo: string; // "소유자명/저장소명"
	repoId: string;
	category: string;
	categoryId: string;
	mapping: string; // 예: "pathname", "url", "title", "og:title"
	dataTerm?: string;
	strict?: string; // 예: "0" (false) 또는 "1" (true)
	reactionsEnabled?: string; // 예: "0" (false) 또는 "1" (true)
	emitMetadata?: string; // 예: "0" (false) 또는 "1" (true)
	inputPosition?: string; // 예: "top" 또는 "bottom"
	theme?: string; // 예: "light", "dark", "preferred_color_scheme"
	lang?: string; // 예: "ko", "en"
	loading?: string; // 예: "lazy"
}

const Giscus: React.FC<GiscusProps> = ({
	repo = '2025-contribution-nextjs-team5/ossca-team_nextjs',
	repoId = 'R_kgDOOoJCgw',
	category = 'project',
	categoryId = 'DIC_kwDOOoJCg84Cqrjc',
	dataTerm = 'frontend',
	mapping = 'specific',
	strict = '0',
	reactionsEnabled = '1',
	emitMetadata = '0',
	inputPosition = 'bottom',
	theme, // theme prop을 받습니다.
	lang = 'ko',
	loading = 'lazy',
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.async = true;

		// props로 받은 값들을 data-* 속성으로 설정
		script.setAttribute('data-repo', repo);
		script.setAttribute('data-repo-id', repoId);
		script.setAttribute('data-category', category);
		script.setAttribute('data-category-id', categoryId);
		script.setAttribute('data-mapping', mapping);
		script.setAttribute('data-term', dataTerm);
		script.setAttribute('data-strict', strict);
		script.setAttribute('data-reactions-enabled', reactionsEnabled);
		script.setAttribute('data-emit-metadata', emitMetadata);
		script.setAttribute('data-input-position', inputPosition);
		script.setAttribute('data-theme', theme || 'preferred_color_scheme');
		script.setAttribute('data-lang', lang);
		script.setAttribute('data-loading', loading);
		script.setAttribute('crossorigin', 'anonymous');

		if (ref.current) {
			ref.current.innerHTML = ''; // 기존 Giscus 인스턴스가 있다면 제거 (중복 방지)
			ref.current.appendChild(script);
		}

		return () => {
			if (ref.current && ref.current.firstChild) {
				ref.current.removeChild(ref.current.firstChild);
			}
		};
	}, [
		repo,
		repoId,
		category,
		categoryId,
		mapping,
		dataTerm,
		strict,
		reactionsEnabled,
		emitMetadata,
		inputPosition,
		theme,
		lang,
		loading,
	]);

	return <div ref={ref} className="giscus" />;
};

export default Giscus;
