import lessonsData from './lessons-data.json';

export type Lesson = {
  slug: string;
  order: number;
  section: string;
  title: {
    th: string;
    en: string;
  };
  summary: {
    th: string;
    en: string;
  };
  defaultCode?: string;
};

const snippetMap = new Map<string, string | undefined>();
/* ----------------------------- */
/* JSX */
/* ----------------------------- */

const jsxSnippet = `const name = "Mint";
const skills = ["React", "JSX", "Components"];

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Hello, {name}</h1>
      <p>JSX lets you write UI using JavaScript.</p>

      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
`;

/* ----------------------------- */
/* FIRST COMPONENT */
/* ----------------------------- */

const componentSnippet = `function Title() {
  return <h1>My First Component</h1>;
}

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Title />
      <p>Components help you reuse UI pieces.</p>
    </div>
  );
}
`;

/* ----------------------------- */
/* PROPS */
/* ----------------------------- */

const propsSnippet = `function Greeting({ name }) {
  return <p>Hello {name}</p>;
}

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Greeting name="Mint" />
      <Greeting name="Beam" />
      <Greeting name="Nam" />
    </div>
  );
}
`;

/* ----------------------------- */
/* STATE */
/* ----------------------------- */

const stateSnippet = `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  );
}
`;

/* ----------------------------- */
/* EVENTS */
/* ----------------------------- */

const eventsSnippet = `import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Review JSX", done: false },
    { id: 2, text: "Learn props", done: true }
  ]);

  function toggle(id) {
    setItems(list =>
      list.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <ul style={{ padding: 20 }}>
      {items.map(item => (
        <li key={item.id}>
          <button onClick={() => toggle(item.id)}>
            {item.done ? "✓" : "○"}
          </button>{" "}
          {item.text}
        </li>
      ))}
    </ul>
  );
}
`;

/* ----------------------------- */
/* CONDITIONAL RENDERING */
/* ----------------------------- */

const conditionalSnippet = `import { useState } from "react";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setLoggedIn(!loggedIn)}>
        Toggle Login
      </button>

      {loggedIn ? <p>Welcome</p> : <p>Please log in</p>}
    </div>
  );
}
`;

/* ----------------------------- */
/* LIST RENDERING */
/* ----------------------------- */

const listSnippet = `const lessons = [
  { id: 1, title: "Intro to React" },
  { id: 2, title: "JSX" },
  { id: 3, title: "Components" }
];

export default function App() {
  return (
    <ul style={{ padding: 20 }}>
      {lessons.map((lesson) => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}
`;

/* ----------------------------- */
/* USE EFFECT */
/* ----------------------------- */

const effectSnippet = `import { useEffect, useState } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>{seconds}s</h1>
      <p>Effect updates every second.</p>
    </div>
  );
}
`;

/* ----------------------------- */
/* FETCH API */
/* ----------------------------- */

const fetchSnippet = `import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums?_limit=3")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {items.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
`;

/* ----------------------------- */
/* FORMS */
/* ----------------------------- */

const formSnippet = `import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ name: "", goal: "learn-react" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form style={{ padding: 20 }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <select name="goal" value={form.goal} onChange={handleChange}>
        <option value="learn-react">Learn React</option>
        <option value="ship-mini">Ship mini project</option>
      </select>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}
`;

/* ----------------------------- */
/* ASSIGN SNIPPETS */
/* ----------------------------- */

function assign(slugs: string[], snippet?: string) {
  slugs.forEach((slug) => snippetMap.set(slug, snippet));
}

assign(['web-basics'], );
assign(['js-essentials'], );
assign(['react-intro'], );
assign(['jsx'], jsxSnippet);
assign(['first-component'], componentSnippet);
assign(['props'], propsSnippet);
assign(['state'], stateSnippet);
assign(['events'], eventsSnippet);
assign(['conditional-rendering'], conditionalSnippet);
assign(['list-rendering'], listSnippet);
assign(['use-effect'], effectSnippet);
assign(['fetch-api'], fetchSnippet);
assign(['forms'], formSnippet);

/* ----------------------------- */
/* FINAL EXPORTS */
/* ----------------------------- */

export const lessons: Lesson[] = lessonsData.map((lesson) => {
  const snippet = snippetMap.get(lesson.slug);
  return {
    ...lesson,
    ...(snippet ? { defaultCode: snippet } : {}),
  };
});

export const orderedLessons = [...lessons].sort((a, b) => a.order - b.order);

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const index = orderedLessons.findIndex((l) => l.slug === slug);
  return {
    previous: index > 0 ? orderedLessons[index - 1] : null,
    next: index < orderedLessons.length - 1 ? orderedLessons[index + 1] : null,
  };
}

export function getLessonSlugs() {
  return lessons.map((lesson) => lesson.slug);
}
