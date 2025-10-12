import { CodeCard, CodeSnippet, Message, Tab } from '../code-card/code-card';

export default function PlaceHolder() {
    const id = '';
    const title = '';

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
