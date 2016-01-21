module net.dryuf.collection {


export interface Iterable<E>
{
	forEach(consumer: (value: E) => void): void;

	iterator(): Iterator<E>;
}


}
