/// <reference path="Collection.ts"/>

module net.dryuf.collection {


export interface List<E> extends Collection<E>
{
	addIndexed(index: number, item: E): void;

	addAllIndexed(index: number, items: Collection<E>): void;

	get(index: number): E;

	indexOf(item: E): number;

	lastIndexOf(item: E): number;

	listIterator(): ListIterator<E>;

	listIteratorIndexed(index: number): ListIterator<E>;

	removeIndexed(index: number): E;

	set(index: number, item: E): E;

	subList(from: number, end: number): List<E>;

}


}
