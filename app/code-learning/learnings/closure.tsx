import { CodeCard, CodeSnippet, Message, Tab } from '../code-card/code-card';

export default function Closure() {
    const id = 'closures';
    const title = 'Closures';

    return (
        <CodeCard id={id} title={title}>
            <Message>
                A closure is a function that:
                <br />
                <Tab />
                Remembers variables from it's outer scope even after that scope has finished
                executing.
                <br />
                <Tab />
                Captures it's lexical environment, allowing access to variables defined outside it's
                own block.
                <br />
                Why use closures?
                <br />
                <Tab />
                Encapsilation: Hide internal variables (like private state).
                <br />
                <Tab />
                Persistence: Maintain state between function calls.
                <br />
                <Tab />
                Factory Functions: Create customized function with shared behavior.
            </Message>
            <CodeSnippet>{`function createCounter() {
    // count isn't accessible other than through the return function
    // count is also preserved between calls
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}
`}</CodeSnippet>
        </CodeCard>
    );
}
