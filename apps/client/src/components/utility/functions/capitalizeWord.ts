export function capitalizeWords(str: string) {
    return str.replace(/\b\w+/g, function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}