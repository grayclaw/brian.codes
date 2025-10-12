import { CodeCard, CodeSnippet, Message, Tab } from '../code-card/code-card';

export default function PropagationBubbling() {
    const code = `<div id="outer">
    <button id="inner">Click Me</button>
</div>

document.getElementById("outer").addEventListener("click", () => {
    console.log("Outer clicked");
});
document.getElementById("inner").addEventListener("click", () => {
    console.log("Inner clicked");
});

output:
Inner clicked
Outer clicked

// explicitly stop the propagation
element.addEventListener("click", (event) => {
    event.stopPropagation();
});
`;
    const id = 'bubbling';
    const title = 'Event Propagation & Event Bubbling';

    return (
        <CodeCard id={id} title={title}>
            <Message>
                When you click a nested element, the event fires on that element first, then
                "bubbles up" to each parent element.
                <br />
                <br />
                The Order (which your code demonstrates):
                <br />
                Click on &lt;button&gt;
                <br />
                <Tab />↓<br />
                [Target Phase] → Button listener fires
                <br />
                "Inner clicked" fires first
                <br />
                <Tab />↓<br />
                [Bubbling Phase] → Div listener fires
                <br />
                "Outer clicked" fires second
                <br />
                <Tab />↓<br />
                Document listener fires
                <br />
                <br />
                Key Takeaway
                <br />
                Event bubbling means child events automatically trigger parent events unless you
                explicitly stop them. This is powerful for event delegation but can cause unexpected
                behavior if you're not aware of it.
            </Message>
            <CodeSnippet>{`<div id="outer">
    <button id="inner">Click Me</button>
</div>

document.getElementById("outer").addEventListener("click", () => {
    console.log("Outer clicked");
});
document.getElementById("inner").addEventListener("click", () => {
    console.log("Inner clicked");
});

// explicitly stop the propagation
element.addEventListener("click", (event) => {
    event.stopPropagation();
});`}</CodeSnippet>
            <Message>
                output:
                <br />
                Inner clicked
                <br />
                Outer clicked
            </Message>
            <CodeSnippet>{`// explicitly stop the propagation
element.addEventListener("click", (event) => {
    event.stopPropagation();
});`}</CodeSnippet>
        </CodeCard>
    );
}
