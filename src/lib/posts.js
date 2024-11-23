import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkParse from 'remark-parse'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const { content, data } = matterResult;
    // Use remark to convert markdown into HTML string
    const parsed = remark()
        .use(remarkParse)
        .parse(matterResult.content);
    let idCounter = 1;
    const titles = parsed.children.filter(r => r.type === 'heading').map(r => {
        return {
            id: idCounter++ * 2,
            level: r.depth,
            text: r.children[0].value
        }
    })

    // Combine the data with the id and contentHtml
    return {
        id,
        titles,
        content,
        ...data
    }
}