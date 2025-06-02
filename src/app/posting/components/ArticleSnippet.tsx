interface Props {
  title: string;
  subHeadings: string[];
}

export default function ArticleSnippet({ title, subHeadings }: Props) {
  return (
    <div style={{ backgroundColor: 'rgba(206, 206, 206, 0.2)' }} className="w-[90%] px-7 py-7 mb-2 mx-auto rounded-xl">
        {/* mb-2(margin bottom 2)를 나중에 구분선으로 교체 R값 15 주기*/ }
      <div className="flex items-start">
        {/* 제목 */}
        <h2 className="text-ossca-mint-500 font-bold text-xl">{title} /</h2>

        {/* 서브헤딩 리스트: 제목 오른쪽으로 떨어짐 (ml-~~)*/}
        {subHeadings.length > 0 && (
          <ul className="ml-15 list-none text-sm text-gray-700 space-y-3">
            {subHeadings.map((heading, index) => (
              <li key={index}>{heading}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
