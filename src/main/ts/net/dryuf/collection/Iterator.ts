module net.dryuf.collection {


export interface Iterator<E>
{
	hasNext(): boolean;

	next(): E;

	remove(): void;
}


}