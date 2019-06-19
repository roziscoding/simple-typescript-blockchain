#!/usr/bin/env node

import debug from 'debug'
import { Block } from './Block'

const mainLog = debug('blockchain:main')

export function createGenesisBlock () {
    return new Block(0, Date.now(), 'Genesis block', '0')
}

export function getNextBlock (lastBlock: Block, data: any) {
    return new Block(lastBlock.index + 1, Date.now(), data, lastBlock.hash)
}

export function createBlockChain (size: number) {
    const genesisBlock = createGenesisBlock()
    return Array(size)
        .fill(0)
        .reduce<Block[]>((previousBlocks, _, index) => {
            return [
                ...previousBlocks,
                getNextBlock(previousBlocks.slice(-1).pop()!, `This is block ${index + 1}`)
            ]
        }, [ genesisBlock ])
}

export function fatal (message: string) {
    console.error(message)
    process.exit(1)
}

export function main (args: string[]) {
    mainLog('Received args: %o', args)

    const [,,sizeParam] = args

    if (!sizeParam) fatal('Missing size param')

    const size = parseInt(sizeParam, 10)

    if (isNaN(size)) fatal('Invalid size param. Should be an integer')

    return { blockchain: createBlockChain(size), size }
}

const start = Date.now()
const { blockchain, size } = main(process.argv)
const elapsed = Date.now() - start

console.log(JSON.stringify(blockchain, null, 4))
console.log(`Mined ${size + 1} blocks (including genesis). Took ${elapsed} ms`)