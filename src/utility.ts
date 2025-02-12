import { SorbetError } from './types';

const PREFIX: string = "Sorbet =>";

export function printError(kind: SorbetError, message: string): void {
    switch (kind) {
        case SorbetError.Syntax:
            console.log(`${PREFIX} Syntax error: ${message}`);
            break;
        case SorbetError.SyntaxException:
            console.log(`${PREFIX} !EXCEPTION RAISED! Syntax error: ${message}`);
            break;
    }
}

export function checkFileExtension(sorbetFilePath: string): boolean {
    return sorbetFilePath.endsWith(".srb") || sorbetFilePath.endsWith(".sorbet");
}
