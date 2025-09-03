import { glob } from 'glob';
import path from 'path';
import { DefaultTheme } from 'vitepress';

/**
 * 读取所有的 md 文件，生成侧边栏，数据格式参考ts类型定义 DefaultTheme.Sidebar
 */
const mdWordFiles = glob.sync('./docs/**/*.md');

const mdExampleFiles = glob.sync('./example/**/*.md');

const mdArchaismFiles = glob.sync('./archaism/**/*.md');

const createSidebar = (files: string[], key = 'docs') => {
    return files.reduce<DefaultTheme.Sidebar>((acc, filePath) => {
        const relativePath = path.relative(key, filePath).replace('.md', '');
        const segments = relativePath.split(path.sep);
    
        const dirName = segments.slice(0, -1).join('/');
        const dirPath = `/${dirName}/`;
        const fileName = segments[segments.length - 1];
    
        if (!acc[dirPath]) {
            acc[dirPath] = [
                {
                    text: dirName,
                    collapsed: true,
                    items: []
                }
            ];
        }
    
        const sidebarItem = acc[dirPath][0];
        sidebarItem.items.push({
            text: fileName.toLowerCase(),
            link: `/${filePath}`,
        });
    
        return acc;
    }, {});
}
const wordSidebarMap = createSidebar(mdWordFiles);
const exampleSidebarMap = createSidebar(mdExampleFiles,'example');

const archaismSidebarMap = createSidebar(mdArchaismFiles,'archaism');

// 对侧边栏嵌套数组进行排序，按照中文拼音来排序
const collator = new Intl.Collator('zh', { sensitivity: 'base' });

for (const dir in wordSidebarMap) {
    const current = (wordSidebarMap?.[dir]?.[0] as DefaultTheme.SidebarItem);
    current?.items?.sort((a, b) => collator.compare(a.text!, b.text!));
}

// 对于第一层，由于是字母A ~ Z，因此可以按照字母来排序
const wordSidebarKeys = Object.keys(wordSidebarMap).sort((a, b) => a.localeCompare(b));

const exampleSidebarKeys = Object.keys(exampleSidebarMap).sort((a, b) => collator.compare(a,b));

// 中文数字映射
const chineseNumberMap: { [key: string]: number } = {
    '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, 
    '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
};

const archaismSidebarKeys = Object.keys(archaismSidebarMap).sort((a, b) => {
    const aNum = chineseNumberMap[a.slice(2,3)] || 0;
    const bNum = chineseNumberMap[b.slice(2,3)] || 0;
    return aNum - bNum;
});

export const sidebar = {
    "/": wordSidebarKeys.reduce<DefaultTheme.SidebarItem[]>((acc,key) => (acc.push(...wordSidebarMap[key]),acc), []),
    "/example/": exampleSidebarKeys.reduce<DefaultTheme.SidebarItem[]>((acc,key) => (acc.push(...exampleSidebarMap[key]),acc), []),
    "/archaism/": archaismSidebarKeys.reduce<DefaultTheme.SidebarItem[]>((acc,key) => (acc.push(...archaismSidebarMap[key]),acc), [])
}
