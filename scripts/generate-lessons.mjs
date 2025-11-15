import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const lessons = JSON.parse(readFileSync(path.join(root, 'src/lib/lessons-data.json'), 'utf8'));

function ensureDir(locale) {
  const dir = path.join(root, 'src/lessons', locale);
  mkdirSync(dir, {recursive: true});
  return dir;
}

const thDir = ensureDir('th');
const enDir = ensureDir('en');

const sharedNotes = {
  th: 'ใช้ Playground ด้านขวาเพื่อทดลองโค้ดและรีเซ็ตได้ตลอดเวลา.',
  en: 'Use the playground on the right to experiment with the code and reset any time.'
};

function thContent(lesson) {
  return `# ${lesson.title.th}

${lesson.summary.th}

## แนวคิดสำคัญ
1. ทำความเข้าใจว่า \
**${lesson.section}** ต้องการให้คุณเก่งเรื่องใดก่อนจะไปบทต่อไป
2. จับคู่คำศัพท์ใหม่กับประสบการณ์จริง เช่น ${lesson.title.th} ในชีวิตประจำวัน
3. อ่านตัวอย่างโค้ดแล้วลองอธิบายเป็นคำพูดของตัวเอง

## Workshop
- พิมพ์โค้ดเพิ่มใน Playground แล้วดูผลลัพธ์ทันที
- จดคำถามที่ยังสงสัยไว้เพื่อถามเพื่อนหรือเมนเทอร์
- แชร์สิ่งที่ลองทำในคอมมิวนิตี้ React ไทย

> 💡 ${sharedNotes.th}
`;
}

function enContent(lesson) {
  return `# ${lesson.title.en}

${lesson.summary.en}

## Key ideas
1. Connect the topic to the big picture of **${lesson.section}**
2. Translate the new vocabulary into your own words to improve retention
3. Read the code sample aloud so you can reason about each line

## Workshop
- Modify the playground code and describe what changed
- Write down any open questions you still have
- Share your experiments with a study buddy or community

> 💡 ${sharedNotes.en}
`;
}

for (const lesson of lessons) {
  writeFileSync(path.join(thDir, `${lesson.slug}.mdx`), thContent(lesson), 'utf8');
  writeFileSync(path.join(enDir, `${lesson.slug}.mdx`), enContent(lesson), 'utf8');
}

const toPascal = (slug) =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const importLines = [];
const thEntries = [];
const enEntries = [];

for (const lesson of lessons) {
  const base = toPascal(lesson.slug);
  const thName = `${base}Th`;
  const enName = `${base}En`;
  importLines.push(`import ${thName} from '@/lessons/th/${lesson.slug}.mdx';`);
  importLines.push(`import ${enName} from '@/lessons/en/${lesson.slug}.mdx';`);
  thEntries.push(`    '${lesson.slug}': ${thName}`);
  enEntries.push(`    '${lesson.slug}': ${enName}`);
}

const registryContent = `import type {ComponentType} from 'react';\nimport type {Locale} from '@/lib/i18n';\n${importLines.join('\n')}\n\ntype LessonComponentMap = Record<string, ComponentType<any>>;\n\nexport const lessonContent: Record<Locale, LessonComponentMap> = {\n  th: {\n${thEntries.join(',\n')}\n  },\n  en: {\n${enEntries.join(',\n')}\n  }\n};\n`;

writeFileSync(path.join(root, 'src/lessons/registry.ts'), registryContent, 'utf8');

console.log(`Generated ${lessons.length * 2} lesson files and registry.`);
