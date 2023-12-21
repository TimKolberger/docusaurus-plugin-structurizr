import childProcess from 'node:child_process'
import util from 'node:util'

export const exec = util.promisify(childProcess.exec)
