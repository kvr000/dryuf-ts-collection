module net.dryuf.collection {


export class LinkedHashSet<E> extends BackedSet<E> implements Set<E>
{
	public constructor()
	{
		super(new LinkedHashMap<E, Boolean>());
	}
}


}
