import globby from 'globby'

export async function findFiles(contentPaths: string[]) {
  return await globby(contentPaths)
}
