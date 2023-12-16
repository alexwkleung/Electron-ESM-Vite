import { describe, it, expect } from 'vitest'

const helloWorld = (): string => {
    return "Hello World";
}

const sequentialNumber = (): number => {
    return 123;
}

describe('hello world', () => {
    it("should return 'hello world'", () => {
        expect(helloWorld()).toStrictEqual("Hello World");
    })
})

describe('three digit sequential number', () => {
    it('should return 123', () => {
        expect(sequentialNumber()).toStrictEqual(123);
    })
})