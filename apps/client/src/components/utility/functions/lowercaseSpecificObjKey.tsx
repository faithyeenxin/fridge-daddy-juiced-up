interface Person {
    name: string;
    age: number;
    isFemale: boolean;
}

export function lowercaseSpecificObjKey<T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] {
    return arr.map(obj => {
        const newObj = { ...obj };
        newObj[key] = obj[key].toLowerCase() as T[K];
        return newObj;
    });
}