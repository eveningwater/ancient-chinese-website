import { glob } from 'glob';
import path from 'path';

const mdFiles = glob.sync('./docs/**/*.md');

export const sidebar = mdFiles.map(filePath => {
    const relativePath = path.relative('docs', filePath).replace('.md', '');
    const segments = relativePath.split(path.sep);
    const text = segments[segments.length - 1];

    return {
        text,
        link: `/${filePath}`,
    };
}).sort((a, b) => a.text.localeCompare(b.text));