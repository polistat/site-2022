import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import { HTMLAttributes } from "react";

export default function MDXCompProvider(props: HTMLAttributes<HTMLDivElement>) {
  const components: MDXComponents = {
    p: (props) => <p className="my-4" {...props} />,
    h1: (props) => <h1 className="mt-10 mb-2 text-3xl font-bold" {...props} />,
    h2: (props) => <h2 className="mt-8 mb-2 text-2xl font-bold" {...props} />,
    h3: (props) => <h3 className="mt-6 mb-2 text-xl font-bold" {...props} />,
    h4: (props) => <h4 className="mt-4 mb-2 text-lg font-bold" {...props} />,
    h5: (props) => <h5 className="mt-2 mb-2 text-md font-bold" {...props} />,
    h6: (props) => <h6 className="mt-2 text-sm font-bold" {...props} />,
    blockquote: (props) => <blockquote className="my-4 pl-5 border-l-4" {...props}/>,
    ul: (props) => <ul className="my-4 pl-8 list-disc" {...props}/>,
    ol: (props) => <ol className="my-4 pl-8 list-decimal" {...props}/>,
    li: (props) => <li {...props}/>,
    table: (props) => <table className="my-4 table-auto" {...props}/>,
    thead: (props) => <thead className="text-left uppercase text-sm text-neutral-500" {...props}/>,
    tbody: (props) => <tbody {...props}/>,
    tr: (props) => <tr {...props}/>,
    th: (props) => <th className="px-6 py-3" {...props}/>,
    td: (props) => <td className="px-6 py-3 border-y" {...props}/>,
    code: (props) => <code className="text-sm bg-neutral-200 rounded-sm" {...props}/>,
    pre: (props) => <pre className="my-4 py-4 px-3 text-sm bg-neutral-200 rounded-lg overflow-y-auto" {...props}/>,
    em: (props) => <em {...props}/>,
    strong: (props) => <strong {...props}/>,
    del: (props) => <del {...props}/>,
    hr: (props) => <hr {...props}/>,
    a: (props) => <a className="text-blue-500 hover:underline underline-offset-1 decoration-blue-500" target="_blank" rel="noopener noreferrer" {...props}/>,
    img: (props) => <img className="my-4 w-full" {...props}/>,
    button: (props) => <button {...props}/>,
    input: (props) => <input className="my-2 ml-4 mr-1" {...props}/>, // task lists

    section: ({ children, ...props }) => props.className === 'footnotes' ?
      <div className="container max-w-3xl border-t">
        {/* @ts-expect-error ; TODO: fix*/}
        <section {...props}>{children.filter(child => child.props?.id !== 'footnote-label')}</section>
      </div>
    : <section {...props}/>,
  };

  return (
    <MDXProvider components={components}>
      <div {...props} />
    </MDXProvider>
  );
}