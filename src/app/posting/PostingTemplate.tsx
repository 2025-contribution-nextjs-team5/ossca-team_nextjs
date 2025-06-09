// posting/PostingTemplate.tsx
'use client';

import { fetchMdFileList } from '@/lib/github';
import { useEffect, useState } from 'react';

export default function PostingTemplate() {
	const [fileList, setFileList] = useState<any[]>([]);

	useEffect(() => {
		fetchMdFileList().then(setFileList).catch(console.error);
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">📂 TIL 목록</h1>
			<ul className="space-y-2">
				{fileList.map((file) => (
					<li key={file.name}>
						<a
							href={file.download_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							{file.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
