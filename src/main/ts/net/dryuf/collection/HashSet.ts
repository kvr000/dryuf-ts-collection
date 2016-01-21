/// <reference path="BackedSet.ts"/>

module net.dryuf.collection {


export class HashSet<E> extends BackedSet<E>
{
	public constructor()
	{
		super(new HashMap<E, Boolean>());
	}
}


}
