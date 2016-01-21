/// <reference path="AbstractList.ts"/>

module net.dryuf.collection {


export class ArrayList<E> extends AbstractList<E>
{
	public add(item: E): boolean
	{
		this.storage.push(item);
		return true;
	}

	public addIndexed(index: number, item: E): void
	{
		this.storage.splice(index, 0, item);
	}

	public get(index: number): E
	{
		return this.storage[index];
	}

	public listIterator(): ListIterator<E>
	{
		return new BackListIterator(this, 0);
	}

	public listIteratorIndexed(index: number): ListIterator<E>
	{
		return new BackListIterator(this, index);
	}

	public removeIndexed(index: number): E
	{
		return this.storage.splice(index, 1)[0];
	}

	public set(index: number, item: E): E
	{
		var old: E = this.storage[index];
		this.storage[index] = item;
		return old;
	}

	public size(): number
	{
		return this.storage.length;
	}

	protected storage: E[] = [];
}


}
