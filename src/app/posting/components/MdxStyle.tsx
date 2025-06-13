// src/app/posting/components/MdxStyle.ts
import React from 'react';

type IntrinsicProps<T extends HTMLElement> = React.HTMLAttributes<T>;

export const MdxStyle = {
	h1: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h1', {
			className: 'text-4xl font-bold my-4',
			...props,
		}),

	h2: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h2', {
			className: 'text-3xl font-bold my-3',
			...props,
		}),

	h3: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h3', {
			className: 'text-2xl font-bold my-2',
			...props,
		}),

	h4: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h4', {
			className: 'text-xl font-bold my-2',
			...props,
		}),

	h5: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h5', {
			className: 'text-lg font-bold my-1',
			...props,
		}),

	h6: (props: IntrinsicProps<HTMLHeadingElement>) =>
		React.createElement('h6', {
			className: 'text-base font-bold my-1',
			...props,
		}),

	p: (props: IntrinsicProps<HTMLParagraphElement>) =>
		React.createElement('p', { className: 'my-2 leading-relaxed', ...props }),

	ul: (props: IntrinsicProps<HTMLUListElement>) =>
		React.createElement('ul', { className: 'list-disc pl-6 my-2', ...props }),

	ol: (props: IntrinsicProps<HTMLOListElement>) =>
		React.createElement('ol', {
			className: 'list-decimal list-inside my-2',
			...props,
		}),

	li: (props: IntrinsicProps<HTMLLIElement>) =>
		React.createElement('li', { className: 'ml-4 mb-1', ...props }),

	code: (props: IntrinsicProps<HTMLElement>) =>
		React.createElement('code', {
			className: 'bg-gray-100 px-1 rounded',
			...props,
		}),

	pre: (props: IntrinsicProps<HTMLPreElement>) =>
		React.createElement('pre', {
			className: 'bg-gray-800 text-white p-4 rounded overflow-x-auto',
			...props,
		}),

	a: (props: IntrinsicProps<HTMLAnchorElement>) =>
		React.createElement('a', {
			className:
				'text-blue-600 hover:text-blue-800 underline transition-colors',
			...props,
		}),

	blockquote: (props: IntrinsicProps<HTMLElement>) =>
		React.createElement('blockquote', {
			className: 'border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4',
			...props,
		}),

	table: (props: IntrinsicProps<HTMLTableElement>) =>
		React.createElement('table', {
			className:
				'table-auto border-collapse border border-gray-300 w-full my-4',
			...props,
		}),

	thead: (props: IntrinsicProps<HTMLTableSectionElement>) =>
		React.createElement('thead', { className: 'bg-gray-100', ...props }),

	tbody: (props: IntrinsicProps<HTMLTableSectionElement>) =>
		React.createElement('tbody', { ...props }),

	tr: (props: IntrinsicProps<HTMLTableRowElement>) =>
		React.createElement('tr', {
			className: 'border border-gray-300',
			...props,
		}),

	th: (props: IntrinsicProps<HTMLTableCellElement>) =>
		React.createElement('th', {
			className: 'border border-gray-300 px-4 py-2 text-left bg-gray-200',
			...props,
		}),

	td: (props: IntrinsicProps<HTMLTableCellElement>) =>
		React.createElement('td', {
			className: 'border border-gray-300 px-4 py-2',
			...props,
		}),
};
