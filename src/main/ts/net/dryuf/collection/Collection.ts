module net.dryuf.collection {


export interface Collection<E> extends Iterable<E>
{
	add(element: E): boolean;
}


}
