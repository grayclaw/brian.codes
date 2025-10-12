import { PropsWithChildren, ReactNode } from 'react';

type CodeCardProps = PropsWithChildren<{
    id: string;
    title: string;
}>;

type ChildrenProp = {
    children: ReactNode;
};

export function CodeCard({ children, id, title }: CodeCardProps) {
    return (
        <div id={id} className="bg-slate-900 p-6 text-md inline-block w-full mb-4">
            <h2 className="text-left mb-4 text-2xl">{title}</h2>
            {children}
        </div>
    );
}

export function CodeSnippet({ children }: ChildrenProp) {
    return (
        <div
            className="text-indigo-300 p-4 rounded-md leading-relaxed text-left overflow-x-scroll max-w-full [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-indigo-500 [&::-webkit-scrollbar-thumb]:rounded-full border-indigo-900 border-2 mb-6"
            style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#6366f1 #1e293b',
                scrollbarGutter: 'stable',
            }}
        >
            <pre>
                <code className="block">{children}</code>
            </pre>
        </div>
    );
}

export function Message({ children }: ChildrenProp) {
    return <p className="text-left mb-6 font-sans text-white">{children}</p>;
}

export function Tab() {
    return <span style={{ marginLeft: '2em' }} />;
}

export function DefinitionList({ items }: { items: { term: string; definitions: string[] }[] }) {
    return (
        <dl className="mb-6">
            {items.map(({ term, definitions }) => (
                <div key={term} className="mb-4 text-left">
                    <dt className="font-mono text-indigo-300">{term}</dt>
                    {definitions.map((def, i) => (
                        <dd key={i} className="ml-4 text-white font-sans">
                            {def}
                        </dd>
                    ))}
                </div>
            ))}
        </dl>
    );
}
