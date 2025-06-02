export const MdxStyle = {
  h1: (props: any) => <h1 className="text-4xl font-bold my-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold my-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold my-2" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold my-2" {...props} />,
  h5: (props: any) => <h5 className="text-lg font-bold my-1" {...props} />,
  h6: (props: any) => <h6 className="text-base font-bold my-1" {...props} />,
  p: (props: any) => <p className="my-2 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside my-2" {...props} />,
  li: (props: any) => <li className="ml-4 mb-1" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-1 rounded" {...props} />,
  pre: (props: any) => <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto" {...props} />,
  a: (props: any) => (
    <a
      {...props}
      className="text-blue-600 hover:text-blue-800 underline transition-colors"
    />
  ),
  blockquote: (props: any) => (
  <blockquote
    className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4"
    {...props}
  />
  ),
  table: (props) => (
    <table className="table-auto border-collapse border border-gray-300 w-full my-4" {...props} />
  ),
  thead: (props) => (
    <thead className="bg-gray-100" {...props} />
  ),
  tbody: (props) => <tbody {...props} />,
  tr: (props) => (
    <tr className="border border-gray-300" {...props} />
  ),
  th: (props) => (
    <th className="border border-gray-300 px-4 py-2 text-left bg-gray-200" {...props} />
  ),
  td: (props) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
};
