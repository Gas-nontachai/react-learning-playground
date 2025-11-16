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

const jsxSnippet = `// app.jsx
  const name = "Nontachai";
  const isOnline = true;

  // ฟังก์ชันเล็กๆ ไว้ใช้ใน JSX
  const getGreeting = () => {
    return \`Hello, \${name}!\`;
  };

  export default function App() {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>{getGreeting()}</h1>

        {/* แสดงค่าตัวแปร */}
        <p>Welcome to basic JSX example.</p>

        {/* ternary operator */}
        <p>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>

        {/* วนลูปด้วย map */}
        <ul>
          {["React", "JSX", "Components"].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* ปุ่มแบบ JSX */}
        <button onClick={() => alert("You clicked the button!")}>
          Click me
        </button>
      </div>
    );
  }
`;

const componentSnippet = `type CardProps = {
  title: string;
  description: string;
};

function LessonCard({title, description}: CardProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

const lessons = [
  {title: 'Component', description: 'Small building blocks'},
  {title: 'Composition', description: 'Combine many blocks'},
  {title: 'Reuse', description: 'Share props smartly'}
];

export default function App() {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-3">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.title} {...lesson} />
      ))}
    </div>
  );
}
`;

const propsSnippet = `type GreetingProps = {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
};

function Greeting({name, level = 'beginner'}: GreetingProps) {
  return (
    <p className="rounded-md bg-emerald-100 p-3 text-emerald-900">
      👋 สวัสดี {name}! Status: {level}
    </p>
  );
}

export default function App() {
  return (
    <div className="space-y-3 p-6">
      <Greeting name="Mint" />
      <Greeting name="Beam" level="intermediate" />
      <Greeting name="Nam" level="advanced" />
    </div>
  );
}
`;

const stateSnippet = `import {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  return (
    <div className="space-y-4 p-6">
      <div className="rounded-xl border border-purple-200 p-4 text-center">
        <p className="text-sm text-purple-600">Clicks</p>
        <p className="text-4xl font-bold">{count}</p>
        <button
          className="mt-3 rounded-full bg-purple-600 px-4 py-2 text-white"
          onClick={() => setCount((c) => c + 1)}
        >
          Add 1
        </button>
      </div>
      <div className="rounded-xl border border-orange-200 p-4">
        <label className="text-sm text-orange-600">Focus word</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded border border-orange-300 p-2"
        />
        <p className="mt-2">You are focused on {name}</p>
      </div>
    </div>
  );
}
`;

const eventsSnippet = `import {useState} from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text: 'Review JSX', done: false},
    {id: 2, text: 'Practice props', done: true}
  ]);

  const toggleTodo = (id: number) => {
    setTodos((items) =>
      items.map((item) => (item.id === id ? {...item, done: !item.done} : item))
    );
  };

  return (
    <ul className="space-y-2 p-6">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center gap-3 rounded border border-slate-200 p-3">
          <button
            onClick={() => toggleTodo(todo.id)}
            className={[
              'size-6 rounded-full border',
              todo.done ? 'bg-emerald-500 border-emerald-600' : 'border-slate-400'
            ].join(' ')}
          />
          <span className={todo.done ? 'text-slate-400 line-through' : ''}>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}
`;

const conditionalSnippet = `import {useState} from 'react';

const badges = ['Beginner', 'Builder', 'Deployer'];

export default function App() {
  const [level, setLevel] = useState<string | null>(badges[0]);

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-3">
        {badges.map((badge) => (
          <button
            key={badge}
            onClick={() => setLevel(badge)}
            className={[
              'rounded-full border px-3 py-1',
              badge === level ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
            ].join(' ')}
          >
            {badge}
          </button>
        ))}
        <button onClick={() => setLevel(null)} className="text-sm text-slate-500">
          Reset
        </button>
      </div>
      {level ? (
        <p className="rounded-md bg-blue-50 p-3 text-blue-900">Selected: {level}</p>
      ) : (
        <p className="rounded-md bg-slate-100 p-3 text-slate-600">Pick a badge</p>
      )}
    </div>
  );
}
`;

const listSnippet = `const checklist = [
  {id: 1, label: 'Create lesson component'},
  {id: 2, label: 'Load MDX content'},
  {id: 3, label: 'Wire the Sandpack playground'}
];

export default function App() {
  return (
    <ol className="space-y-3 p-6">
      {checklist.map((item) => (
        <li key={item.id} className="rounded-lg border border-slate-200 p-3">
          <span className="font-semibold">Step {item.id}</span>
          <p>{item.label}</p>
        </li>
      ))}
    </ol>
  );
}
`;

const effectSnippet = `import {useEffect, useState} from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <h1 className="text-4xl font-bold">⏱️ {seconds}s</h1>
      <p className="text-slate-600">Effect keeps ticking even if you re-render.</p>
    </div>
  );
}
`;

const fetchSnippet = `import {useEffect, useState} from 'react';

type Course = {
  id: number;
  title: string;
};

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums?_limit=3')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading lessons...</p>;
  }

  return (
    <div className="space-y-3 p-6">
      {courses.map((course) => (
        <article key={course.id} className="rounded border border-emerald-200 p-3">
          {course.title}
        </article>
      ))}
    </div>
  );
}
`;

const formSnippet = `import {useState} from 'react';

export default function App() {
  const [form, setForm] = useState({name: '', goal: 'learn-react'});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  return (
    <form className="space-y-4 p-6">
      <label className="block">
        <span className="text-sm text-slate-500">Name</span>
        <input
          className="mt-1 w-full rounded border border-slate-300 p-2"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label className="block">
        <span className="text-sm text-slate-500">Goal</span>
        <select
          className="mt-1 w-full rounded border border-slate-300 p-2"
          name="goal"
          value={form.goal}
          onChange={handleChange}
        >
          <option value="learn-react">Learn React</option>
          <option value="ship-mini">Ship mini project</option>
        </select>
      </label>
      <pre className="rounded bg-slate-900 p-3 text-sm text-green-300">
{JSON.stringify(form, null, 2)}
      </pre>
    </form>
  );
}
`;

const compositionSnippet = `type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({title, children}: LayoutProps) {
  return (
    <section className="rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 text-slate-600">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-2">
      <Panel title="Header Slot">Put navigation here</Panel>
      <Panel title="Content Slot">Render lesson text</Panel>
      <Panel title="Playground Slot">Drop Sandpack here</Panel>
    </div>
  );
}
`;

const drillingSnippet = `type ProfileProps = {
  name: string;
  stats: {
    lessons: number;
    streak: number;
  };
};

function Profile({name, stats}: ProfileProps) {
  return (
    <div className="rounded-xl border border-rose-200 p-4">
      <h3 className="font-semibold">{name}</h3>
      <p>Lessons: {stats.lessons}</p>
      <p>Streak: {stats.streak} days</p>
    </div>
  );
}

function Dashboard({children}: {children: React.ReactNode}) {
  return <div className="space-y-3">{children}</div>;
}

export default function App() {
  const stats = {lessons: 8, streak: 3};
  return (
    <Dashboard>
      <Profile name="Fahsai" stats={stats} />
      <Profile name="Boss" stats={stats} />
    </Dashboard>
  );
}
`;

const routingSnippet = `const routes = [
  {href: '/th', label: 'หน้าแรก'},
  {href: '/th/lesson/react-intro', label: 'React Intro'},
  {href: '/th/lesson/jsx', label: 'JSX'}
];

export default function App() {
  return (
    <nav className="flex flex-col gap-2 p-6">
      {routes.map((route) => (
        <a key={route.href} className="rounded border border-slate-200 p-3" href={route.href}>
          {route.label}
        </a>
      ))}
    </nav>
  );
}
`;

const dynamicSnippet = `const lessons = ['intro', 'jsx', 'state'];

export default function App() {
  return (
    <div className="space-y-2 p-6">
      {lessons.map((slug) => (
        <div key={slug} className="rounded border border-lime-300 p-3">
          <p className="text-sm text-slate-500">/lesson/{` + '${slug}' + `}</p>
          <p className="text-lg font-semibold">Dynamic page for {slug}</p>
        </div>
      ))}
    </div>
  );
}
`;

const notFoundSnippet = `export default function App() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-600">Friendly empty state keeps learners calm.</p>
    </div>
  );
}
`;

const organizeSnippet = `const folders = ['app/', 'components/', 'lessons/', 'lib/'];

export default function App() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Project Folders</h2>
      <ul className="mt-3 space-y-2">
        {folders.map((folder) => (
          <li key={folder} className="rounded border border-slate-200 p-3 font-mono">{folder}</li>
        ))}
      </ul>
    </div>
  );
}
`;

const miniLayoutSnippet = `type Lesson = {
  title: string;
  status: 'todo' | 'doing' | 'done';
};

const plan: Lesson[] = [
  {title: 'Design hero', status: 'done'},
  {title: 'Build cards', status: 'doing'},
  {title: 'Add playground', status: 'todo'}
];

export default function App() {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-3">
      {plan.map((block) => (
        <article key={block.title} className="rounded-xl border border-amber-200 p-4">
          <p className="text-sm uppercase text-amber-500">{block.status}</p>
          <h3 className="text-xl font-semibold">{block.title}</h3>
        </article>
      ))}
    </div>
  );
}
`;

const miniFetchSnippet = `import {useState} from 'react';

const mockLessons = [
  {slug: 'mini-setup', completed: true},
  {slug: 'mini-ui-layout', completed: false},
  {slug: 'mini-fetch', completed: false}
];

export default function App() {
  const [items, setItems] = useState(mockLessons);

  const markDone = (slug: string) => {
    setItems((prev) => prev.map((item) => (item.slug === slug ? {...item, completed: !item.completed} : item)));
  };

  return (
    <div className="space-y-2 p-6">
      {items.map((item) => (
        <div key={item.slug} className="flex items-center justify-between rounded border border-emerald-200 p-3">
          <span>{item.slug}</span>
          <button onClick={() => markDone(item.slug)} className="text-sm text-emerald-600">
            {item.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      ))}
    </div>
  );
}
`;

const miniRoutingSnippet = `const pages = [
  {slug: 'overview', description: 'Show project goals'},
  {slug: 'lessons', description: 'List lesson modules'},
  {slug: 'playground', description: 'Embed Sandpack'}
];

export default function App() {
  return (
    <section className="space-y-3 p-6">
      {pages.map((page) => (
        <article key={page.slug} className="rounded border border-slate-200 p-3">
          <h3 className="font-semibold">/mini/{page.slug}</h3>
          <p className="text-sm text-slate-600">{page.description}</p>
        </article>
      ))}
    </section>
  );
}
`;

const deploySnippet = `const checklist = [
  'Connect GitHub repo to Vercel',
  'Set environment variables',
  'Verify build output'
];

export default function App() {
  return (
    <ul className="space-y-3 p-6">
      {checklist.map((item) => (
        <li key={item} className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sky-900">
          ✅ {item}
        </li>
      ))}
    </ul>
  );
}
`;

const structureSnippet = `const folders = [
  {name: 'src/app', tip: 'Route handlers & layouts'},
  {name: 'src/components', tip: 'Reusable UI pieces'},
  {name: 'src/lib', tip: 'Pure helpers & data'},
  {name: 'src/lessons', tip: 'Localized MDX content'}
];

export default function App() {
  return (
    <div className="space-y-3 p-6">
      {folders.map((folder) => (
        <div key={folder.name} className="rounded border border-slate-200 p-3">
          <p className="font-mono">{folder.name}</p>
          <p className="text-sm text-slate-500">{folder.tip}</p>
        </div>
      ))}
    </div>
  );
}
`;

const debuggingSnippet = `import {useState} from 'react';

type Log = {
  id: number;
  message: string;
};

export default function App() {
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = () => {
    setLogs((items) => [
      ...items,
      {id: Date.now(), message: ` + '`Checked component tree in React DevTools`' + `}
    ]);
  };

  return (
    <div className="space-y-4 p-6">
      <button onClick={addLog} className="rounded bg-slate-900 px-4 py-2 text-white">
        Add debug log
      </button>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="rounded border border-slate-300 p-2 font-mono text-sm">
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

function assign(slugs: string[], snippet?: string) {
  slugs.forEach((slug) => snippetMap.set(slug, snippet));
}

assign(['web-basics', 'js-essentials', 'react-intro']);
assign(['composition'], componentSnippet);
assign(['jsx'], jsxSnippet);
assign(['first-component'], componentSnippet);
assign(['props'], propsSnippet);
assign(['state'], stateSnippet);
assign(['events'], eventsSnippet);
assign(['conditional-rendering'], conditionalSnippet);
assign(['list-rendering'], listSnippet);
assign(['use-effect'], effectSnippet);
assign(['fetch-api', 'mini-fetch'], fetchSnippet);
assign(['forms'], formSnippet);
assign(['props-drilling'], drillingSnippet);
assign(['routing-basics'], routingSnippet);
assign(['dynamic-params'], dynamicSnippet);
assign(['not-found'], notFoundSnippet);
assign(['organizing-files'], organizeSnippet);
assign(['mini-setup', 'mini-ui-layout'], miniLayoutSnippet);
assign(['mini-reuse'], componentSnippet);
assign(['mini-routing'], miniRoutingSnippet);
assign(['mini-deploy', 'deploy-vercel'], deploySnippet);
assign(['project-structure'], structureSnippet);
assign(['debugging'], debuggingSnippet);

export const lessons: Lesson[] = lessonsData.map((lesson) => {
  const snippet = snippetMap.get(lesson.slug);
  return {
    ...lesson,
    ...(snippet ? { defaultCode: snippet } : {})
  };
});

export const orderedLessons = [...lessons].sort((a, b) => a.order - b.order);

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const index = orderedLessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: index > 0 ? orderedLessons[index - 1] : null,
    next: index < orderedLessons.length - 1 ? orderedLessons[index + 1] : null
  };
}

export function getLessonSlugs() {
  return lessons.map((lesson) => lesson.slug);
}
