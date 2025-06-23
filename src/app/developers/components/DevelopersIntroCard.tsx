'use client';

import React, { useState } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
}

const Github = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
	</svg>
);

const Mail = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
		<polyline points="22,6 12,13 2,6" />
	</svg>
);

const ExternalLink = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		<polyline points="15,3 21,3 21,9" />
		<line x1="10" y1="14" x2="21" y2="3" />
	</svg>
);

const Check = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<polyline points="20,6 9,17 4,12" />
	</svg>
);

const Laptop = ({ size = 24, ...props }: IconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
	</svg>
);

interface Developer {
	id: number;
	name: string;
	feature: string;
	page: string;
	reflection: string;
	links: {
		github: string;
		blog: string;
		email: string;
	};
	avatar: {
		bg: string;
		accent: string;
	};
}

interface DevelopersIntroCardProps {
	developer: Developer;
}

const DevelopersIntroCard = ({ developer }: DevelopersIntroCardProps) => {
	const [copied, setCopied] = useState(false);

	const copyEmail = async (email: string) => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy email: ', err);
		}
	};

	return (
		<div className="flex-none w-80 h-[150] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100/50 hover:border-teal-200 cursor-pointer hover:bg-white flex flex-col">
			{/* Avatar Section */}
			<div className="flex justify-center mb-6">
				<div className="relative">
					<div
						className={`w-20 h-20 ${developer.avatar.bg} rounded-2xl shadow-md`}
					/>
					<div
						className={`absolute -bottom-1 -right-1 w-6 h-6 ${developer.avatar.accent} rounded-full border-2 border-white shadow-sm`}
					/>
				</div>
			</div>

			{/* Name */}
			<div className="text-center mb-6">
				<h3 className="text-xl font-semibold text-gray-900">
					{developer.name}
				</h3>
			</div>

			{/* Page */}
			<div className="mb-6">
				<p className="text-gray-500 text-sm mb-3">Responsible Page</p>
				<div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-teal-50 p-3 rounded-xl">
					<Laptop size={16} className="text-teal-500" />
					<span className="text-gray-700 text-sm font-medium">
						{developer.page}
					</span>
				</div>
			</div>

			{/* Reflection - Flexible area that takes remaining space */}
			<div className="flex-1 mb-6 flex flex-col min-h-0">
				<p className="text-gray-500 text-sm mb-3">Reflection</p>
				<div className="bg-gradient-to-br from-gray-50 to-teal-50/30 rounded-xl p-4 border border-gray-100/50 flex-1 overflow-y-auto">
					<p className="text-gray-700 text-sm leading-relaxed break-words">
						{developer.reflection}
					</p>
				</div>
			</div>

			{/* Contact Links - Fixed at bottom */}
			<div className="pt-4 border-t border-teal-100/50 mt-auto">
				<div className="flex justify-center space-x-4">
					<a
						href={developer.links.github}
						target="_blank"
						rel="noopener noreferrer"
						className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center hover:from-teal-100 hover:to-cyan-100 hover:text-teal-600 transition-all duration-300 shadow-sm hover:shadow-md"
					>
						<Github size={18} />
					</a>
					<a
						href={developer.links.blog}
						target="_blank"
						rel="noopener noreferrer"
						className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center hover:from-teal-200 hover:to-cyan-200 hover:text-teal-700 transition-all duration-300 shadow-sm hover:shadow-md"
					>
						<ExternalLink size={18} />
					</a>
					<button
						onClick={() => copyEmail(developer.links.email)}
						className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center hover:from-emerald-200 hover:to-teal-200 hover:text-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md relative"
					>
						{copied ? (
							<Check size={18} className="text-emerald-600" />
						) : (
							<Mail size={18} />
						)}
						{copied && (
							<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
								Copied!
							</div>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DevelopersIntroCard;
