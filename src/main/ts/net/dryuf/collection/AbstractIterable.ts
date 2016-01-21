/// <reference path="Iterable.ts"/>

module net.dryuf.collection {


export abstract class AbstractIterable<E> implements Iterable<E>
{
	public forEach(consumer: (value: E) => void): void
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			consumer(it.next());
		}
	}

	public abstract iterator(): Iterator<E>;
}


}
