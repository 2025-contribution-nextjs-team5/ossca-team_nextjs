// src/app/posting/components/MdxStyle.tsx
import React from 'react';

/** JSX.IntrinsicElements[...] 타입을 간편하게 쓰기 위한 제네릭 alias */
type IntrinsicComponent<K extends keyof JSX.IntrinsicElements> = (
	props: JSX.IntrinsicElements[K],
) => JSX.Element;

export const MdxStyle: {
	h1: IntrinsicComponent<'h1'>;
	h2: IntrinsicComponent<'h2'>;
	h3: IntrinsicComponent<'h3'>;
	h4: IntrinsicComponent<'h4'>;
	h5: IntrinsicComponent<'h5'>;
	h6: IntrinsicComponent<'h6'>;
	p: IntrinsicComponent<'p'>;
	ul: IntrinsicComponent<'ul'>;
	ol: IntrinsicComponent<'ol'>;
	li: IntrinsicComponent<'li'>;
	code: IntrinsicComponent<'code'>;
	pre: IntrinsicComponent<'pre'>;
	a: IntrinsicComponent<'a'>;
	blockquote: IntrinsicComponent<'blockquote'>;
	table: IntrinsicComponent<'table'>;
	thead: IntrinsicComponent<'thead'>;
	tbody: IntrinsicComponent<'tbody'>;
	tr: IntrinsicComponent<'tr'>;
	th: IntrinsicComponent<'th'>;
	td: IntrinsicComponent<'td'>;
} = {
	h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
	h2: (props) => <h2 className="text-3xl font-bold my-3" {...props} />,
	h3: (props) => <h3 className="text-2xl font-bold my-2" {...props} />,
	h4: (props) => <h4 className="text-xl font-bold my-2" {...props} />,
	h5: (props) => <h5 className="text-lg font-bold my-1" {...props} />,
	h6: (props) => <h6 className="text-base font-bold my-1" {...props} />,
	p: (props) => <p className="my-2 leading-relaxed" {...props} />,
	ul: (props) => <ul className="list-disc pl-6 my-2" {...props} />,
	ol: (props) => <ol className="list-decimal list-inside my-2" {...props} />,
	li: (props) => <li className="ml-4 mb-1" {...props} />,
	code: (props) => <code className="bg-gray-100 px-1 rounded" {...props} />,
	pre: (props) => (
		<pre
			className="bg-gray-800 text-white p-4 rounded overflow-x-auto"
			{...props}
		/>
	),
	a: (props) => (
		<a
			{...props}
			className="text-blue-600 hover:text-blue-800 underline transition-colors"
		/>
	),
	blockquote: (props) => (
		<blockquote
			className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4"
			{...props}
		/>
	),
	table: (props) => (
		<table
			className="table-auto border-collapse border border-gray-300 w-full my-4"
			{...props}
		/>
	),
	thead: (props) => <thead className="bg-gray-100" {...props} />,
	tbody: (props) => <tbody {...props} />,
	tr: (props) => <tr className="border border-gray-300" {...props} />,
	th: (props) => (
		<th
			className="border border-gray-300 px-4 py-2 text-left bg-gray-200"
			{...props}
		/>
	),
	td: (props) => <td className="border border-gray-300 px-4 py-2" {...props} />,
};
