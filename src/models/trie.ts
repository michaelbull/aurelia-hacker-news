export interface Trie<T> {
    value: T;
    children: (Trie<T> | null)[];
}
