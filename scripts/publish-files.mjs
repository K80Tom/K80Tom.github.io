import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Keep GitHub Pages' existing main/root publishing source. Source lives in web/;
// generated pages are checked in at the root, with a manifest for safe cleanup.
async function list(dir, prefix = '') {
  const result = []
  for (const item of await readdir(dir, {withFileTypes:true})) {
    const relative = path.posix.join(prefix, item.name)
    if (item.isDirectory()) result.push(...await list(path.join(dir,item.name), relative))
    else result.push(relative)
  }
  return result
}
const next = await list('dist')
let previous = []
try { previous = JSON.parse(await readFile('.published-files.json', 'utf8')) } catch {}
for (const file of previous) {
  if (file.includes('..') || path.isAbsolute(file) || /^(web|scripts|docs|\.git)\//.test(file)) throw new Error(`Unsafe generated path: ${file}`)
  if (!next.includes(file)) await rm(file, {force:true})
}
for (const file of next) await cp(`dist/${file}`, file, {recursive:true, force:true})
await writeFile('.published-files.json',JSON.stringify(next.sort(),null,2)+'\n')
console.log(`Prepared ${next.length} files at the repository root for GitHub Pages.`)
