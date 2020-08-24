export interface Trie<T> {
    value: T;
    children: readonly Trie<T>[];
}
