import { type StringMap, SorbetError } from './types';
import { printError } from './utility';

export function parse(contents: string): StringMap {
    const map: StringMap = {};
    let currentKey: string | null = null;
    let currentValue: string = '';

    const lines = contents.split('\n');

    for (const line of lines) {
        if (line.includes('=>')) {
            if (currentKey !== null) {
                map[currentKey] = currentValue.trim();
                currentValue = '';
            }

            const parts: string[] = line.split('=>');
            if (parts.length === 2) {
                currentKey = parts[0].trim();
                currentValue = parts[1].trim();
            } else {
                printError(
                    SorbetError.Syntax,
                    `Syntax error! Expected [key] => [value] at: ${line}`
                );
            }
        } else if (line.trim().startsWith('>')) {
            if (currentKey !== null) {
                currentValue += '\n' + line.trimStart().replace(/^>/, '').trim();
            } else {
                printError(
                    SorbetError.SyntaxException,
                    `Continuation line without a key at: ${line}`
                );
            }
        }
    }

    if (currentKey !== null) {
        map[currentKey] = currentValue.trim();
    }

    return map;
}
