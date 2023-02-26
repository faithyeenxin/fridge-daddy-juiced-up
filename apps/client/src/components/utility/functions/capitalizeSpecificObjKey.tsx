import { capitalizeWords } from "./capitalizeWord";

interface Person {
    name: string;
    age: number;
    isFemale: boolean;
}

export function capitalizeSpecificObjKey<T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] {
    return arr.map(obj => {
        const newObj = { ...obj };
        newObj[key] = capitalizeWords(obj[key]) as T[K];
        return newObj;
    });
}