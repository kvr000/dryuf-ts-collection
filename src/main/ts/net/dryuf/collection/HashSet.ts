module net.dryuf.collection {


export class HashSet<E> extends BackedSet<E> implements Set<E>
{
	public constructor()
	{
		super(new HashMap<E, Boolean>());
	}
}


}
