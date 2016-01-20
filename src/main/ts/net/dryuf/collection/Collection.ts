module net.dryuf.collection {


export interface Collection<E> extends Iterable<E>
{
	add(element: E): boolean;

	addAll(other: Collection<E>): void;

	clear(): void;

	contains(element: E): boolean;

	containsAll(elements: Collection<E>): boolean;

	equals(o: Object): boolean;

	hashCode(): number;

	isEmpty(): boolean;

	remove(o: Object): boolean;

	removeAll(elements: Collection<E>): boolean;

	retainAll(elements: Collection<E>): boolean;

	size(): number;

	toArray(): E[];

	toArrayTyped<T>(a: T[]): T[];
}


}
