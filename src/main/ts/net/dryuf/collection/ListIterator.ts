/// <reference path="Iterator.ts"/>

module net.dryuf.collection {


export interface ListIterator<E> extends Iterator<E>
{
	add(item: E): void;

	hasPrevious(): boolean;

	nextIndex(): number;

	previous(): E;

	previousIndex(): number;

	set(item: E): void;
}


}