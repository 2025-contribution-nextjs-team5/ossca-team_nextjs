import { Suspense } from 'react';
import MainContent from './MainContent';

export default function Home() {
	return (
		<div className="pt-16">
			<Suspense fallback={<div>Loading...</div>}>
				<MainContent />
			</Suspense>
		</div>
	);
}
