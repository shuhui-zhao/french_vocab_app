export interface Word {
    id: number
    word: string,
    type: string,
    definition: string,
    starred: boolean,
    example: string
}

export interface TestResult {
    id: number,
    date: string,
    testItems: TestItem[],
    deckId: number
}

export interface TestItem {
    entered: string,
    expected: string,
    definition: string
}

export interface Deck {
    id: number,
    name: string,
    words: Word[],
    testResults: TestResult[]
}