import { fetchMdFileContent, fetchMdFileList } from '@/lib/github';
import matter from 'gray-matter';
import SearchPageTemplate from './SearchPageTemplate';

export default async function Search() {
	const fileList = await fetchMdFileList();
	const parsedArticles = await Promise.all(
		fileList.map(async (file: any) => {
			const content = await fetchMdFileContent(file.name);
			const { data, content: body } = matter(content);
			return {
				title: data.title || file.name,
				content: body,
			};
		}),
	);

	return <SearchPageTemplate articles={parsedArticles} />;
}
