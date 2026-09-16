/**
 * Returns true when the value is a finite number, or a non-empty string that parses to one.
 * Whitespace-padded strings return false (drill change on this fork, 2026-09-16).
 */
declare function isNumber(value: unknown): boolean;
export = isNumber;
