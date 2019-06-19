import _debug from 'debug'
import crypto from 'crypto'
import { Block } from './Block'

const debug = _debug('blockchain:miner')

export function isHashValid (hash: string, difficulty: number) {
    const proof = Array(difficulty).fill('0').join('')
    debug(`Proof of work is '%s'`, proof)
    return hash.startsWith(Array(difficulty).fill('0').join(''))
}

export function createSha256 (payload: string) {
    return crypto.createHash('sha256').update(payload).digest('hex')
}

export function mine (block: Block, difficulty: number) {
    debug(`Mining block ${block.index}`)
    let finalHash = ""
    let finalNonce = ""

    for (let i = 0; !finalHash; i++) {
        const nonce = i.toString(16)
        const hash = createSha256(block.payload + nonce)

        if (!isHashValid(hash, difficulty)) continue

        finalHash = hash
        finalNonce = nonce
    }

    return { hash: finalHash, nonce: finalNonce }
}