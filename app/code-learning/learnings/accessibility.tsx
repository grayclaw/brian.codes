import { CodeCard, CodeSnippet, DefinitionList, Message, Tab } from '../code-card/code-card';

export default function Accessibility() {
    const id = 'accessibility';
    const title = 'Semantic HTML & Accessibility';

    return (
        <CodeCard id={id} title={title}>
            <Message>
                Semantic HTML clearly describes its meaning and purpose. Use meaningful tags like{' '}
                <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;button&gt;</code>,
                etc.
            </Message>

            <Message>
                <strong>Page Structure:</strong>
            </Message>

            <DefinitionList
                items={[
                    {
                        term: '<header>',
                        definitions: [
                            'Intro section of a page or section',
                            'Announces page or section context',
                        ],
                    },
                    {
                        term: '<nav>',
                        definitions: [
                            'Navigation menus',
                            'Screen readers identify as a navigation region',
                        ],
                    },
                    {
                        term: '<main>',
                        definitions: [
                            'The main content of the document',
                            'Lets users skip straight to the main area',
                        ],
                    },
                    {
                        term: '<footer>',
                        definitions: [
                            'Footer content for page or section',
                            'Identified as footer by assistive tech',
                        ],
                    },
                    {
                        term: '<section>',
                        definitions: [
                            'Thematic grouping of content',
                            'Adds structure; can include its own heading',
                        ],
                    },
                    {
                        term: '<article>',
                        definitions: [
                            'Self-contained piece (e.g., blog post, card)',
                            'Treated as standalone readable item',
                        ],
                    },
                    {
                        term: '<aside>',
                        definitions: ['Sidebar, related content', 'Marked as complementary info'],
                    },
                    {
                        term: '<div>',
                        definitions: [
                            'Generic container (use only when no semantic fit)',
                            'Use sparingly — not read as meaningful',
                        ],
                    },
                ]}
            />

            <Message>
                <strong>Text Content Elements:</strong>
            </Message>

            <DefinitionList
                items={[
                    {
                        term: '<h1>–<h6>',
                        definitions: [
                            'Headings (logical outline of page)',
                            'Defines document structure for screen readers',
                        ],
                    },
                    {
                        term: '<p>',
                        definitions: ['Paragraph of text', 'Standard text block'],
                    },
                    {
                        term: '<ul>, <ol>, <li>',
                        definitions: ['Lists', 'Helps assistive tech announce lists properly'],
                    },
                    {
                        term: '<dl>, <dt>, <dd>',
                        definitions: [
                            'Definition lists',
                            'Great for glossaries or key/value content',
                        ],
                    },
                    {
                        term: '<blockquote>',
                        definitions: ['Quoted external content', 'Properly announced as a quote'],
                    },
                    {
                        term: '<cite>',
                        definitions: ['Citation source', 'Adds attribution'],
                    },
                    {
                        term: '<pre>',
                        definitions: [
                            'Preformatted text (e.g., code)',
                            'Preserves structure and spacing',
                        ],
                    },
                    {
                        term: '<code>',
                        definitions: ['Inline code', 'Announced as “code” by screen readers'],
                    },
                    {
                        term: '<strong>',
                        definitions: ['Important text', 'Read with emphasis'],
                    },
                    {
                        term: '<em>',
                        definitions: ['Emphasized text', 'Read with tone emphasis'],
                    },
                ]}
            />

            <Message>
                <strong>Interactive Elements:</strong>
            </Message>

            <DefinitionList
                items={[
                    {
                        term: '<button>',
                        definitions: [
                            'Clickable actions',
                            'Fully keyboard- and screen-reader-friendly',
                        ],
                    },
                    {
                        term: '<a>',
                        definitions: ['Navigation or links', 'Automatically announced as “link”'],
                    },
                    {
                        term: '<label>',
                        definitions: ['Labels form inputs', 'Ensures screen readers read context'],
                    },
                    {
                        term: '<input>, <textarea>, <select>',
                        definitions: ['Collect user input', 'Recognized as form fields'],
                    },
                    {
                        term: '<fieldset> & <legend>',
                        definitions: ['Group related inputs', 'Adds form context for users'],
                    },
                    {
                        term: '<details> & <summary>',
                        definitions: ['Expandable content', 'Accessible collapsible section'],
                    },
                ]}
            />

            <Message>
                <strong>Media & Images:</strong>
            </Message>

            <DefinitionList
                items={[
                    {
                        term: '<img>',
                        definitions: [
                            'Display images',
                            'Use alt for description; announced to users',
                        ],
                    },
                    {
                        term: '<figure> & <figcaption>',
                        definitions: ['Image + caption', 'Caption read with image'],
                    },
                    {
                        term: '<video>',
                        definitions: ['Play video content', 'Use captions/subtitles'],
                    },
                    {
                        term: '<audio>',
                        definitions: ['Play audio', 'Include transcripts'],
                    },
                    {
                        term: '<track>',
                        definitions: ['Captions/subtitles for media', 'Enables closed captioning'],
                    },
                ]}
            />

            <Message>
                <strong>Table & Data:</strong>
            </Message>

            <DefinitionList
                items={[
                    {
                        term: '<table>',
                        definitions: ['Data table', 'Must be used for data (not layout!)'],
                    },
                    {
                        term: '<caption>',
                        definitions: ['Describes table', 'Read as table title'],
                    },
                    {
                        term: '<th>',
                        definitions: ['Table header cell', 'Helps screen readers announce columns'],
                    },
                    {
                        term: '<tr>, <td>',
                        definitions: ['Rows and data cells', 'Defines structure'],
                    },
                ]}
            />

            <CodeSnippet>{`<header>
  <h1>Galactic News</h1>
  <nav>
    <ul>
      <li><a href="#articles">Articles</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>

<main id="articles">
  <article>
    <header>
      <h2>Rebellion Gains Ground</h2>
      <p><time datetime="2025-10-11">October 11, 2025</time></p>
    </header>
    <p>The Rebellion continues to push against the Empire...</p>
  </article>
</main>

<aside>
  <h3>Related Topics</h3>
  <ul>
    <li><a href="#">Galactic Senate</a></li>
    <li><a href="#">Jedi Council</a></li>
  </ul>
</aside>

<footer>
  <p>© 2025 Galactic News Network</p>
</footer>
`}</CodeSnippet>
        </CodeCard>
    );
}
