/// <reference path="BackedSet.ts"/>

module net.dryuf.collection {


export class LinkedHashSet<E> extends BackedSet<E>
{
	public constructor()
	{
		super(new LinkedHashMap<E, Boolean>());
	}
}


}
