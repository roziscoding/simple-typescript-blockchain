import { mine } from './miner'

export class Block {
    private static readonly MINING_DIFFICULTY = 4
    readonly hash: string
    readonly nonce: string

    constructor (
        readonly index: number,
        readonly timestamp: number,
        readonly data: any,
        readonly previousHash: string
    ) {
        const { hash, nonce } = mine(this, Block.MINING_DIFFICULTY)

        this.nonce = nonce
        this.hash = hash
    }

    get payload () {
        return this.index + this.timestamp + this.data + this.previousHash
    }
}