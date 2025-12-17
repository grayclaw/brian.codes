import { CodeCard, CodeSnippet, Message, Tab } from '../code-card/code-card';

export default function ReverseString() {
    const id = 'reverseString';
    const title = 'Reverse a string';

    return (
        <CodeCard id={id} title={title}>
            <Message>
                <Tab />
                placeHolder
            </Message>
            <CodeSnippet>{``}</CodeSnippet>
        </CodeCard>
    );
}
