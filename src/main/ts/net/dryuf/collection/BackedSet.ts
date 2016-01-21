module net.dryuf.collection {


export class BackedSet<E> extends AbstractSet<E> implements Set<E>
{
	public constructor(backingMap: Map<E, Boolean>)
	{
		super();
		this.backingMap = backingMap;
	}

	public add(item: E): boolean
	{
		return this.backingMap.put(item, true) == null;
	}

	public iterator(): Iterator<E>
	{
		return this.backingMap.keySet().iterator();
	}

	public size(): number
	{
		return this.backingMap.size();
	}

	protected backingMap: Map<E, Boolean>;
}


}
