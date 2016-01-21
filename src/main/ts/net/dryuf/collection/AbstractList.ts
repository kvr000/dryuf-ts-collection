/// <reference path="AbstractCollection.ts"/>
/// <reference path="List.ts"/>

module net.dryuf.collection {


export class BackListIterator<E> implements ListIterator<E>
{
	public constructor(list: List<E>, index: number)
	{
		this.list = list;
		this.index = index;
	}

	public add(item: E): void
	{
		this.list.addIndexed(this.index++, item);
	}

	public hasPrevious(): boolean
	{
		return this.index > 0;
	}

	public hasNext(): boolean
	{
		return this.index < this.list.size();
	}

	public next(): E
	{
		return this.list.get(this.index++);
	}

	public nextIndex(): number
	{
		return this.index;
	}

	public previous(): E
	{
		return this.list.get(--this.index);
	}

	public previousIndex(): number
	{
		return this.index-1;
	}

	public set(item: E): void
	{
		this.list.set(this.index, item);
	}

	public remove(): void
	{
		this.list.removeIndexed(this.index);
	}

	protected list: List<E>;

	protected index: number;
}


export abstract class AbstractList<E> extends AbstractCollection<E> implements List<E>
{
	public add(item: E): boolean
	{
		this.addIndexed(this.size(), item);
		return true;
	}

	public addIndexed(index: number, item: E): void
	{
		this.listIteratorIndexed(index).add(item);
	}

	public addAllIndexed(index: number, items: Collection<E>): void
	{
		var iterator: ListIterator<E> = this.listIteratorIndexed(index);
		items.forEach((e: E) => iterator.add(e));
	}

	public get(index: number): E
	{
		return this.listIteratorIndexed(index).next();
	}

	public indexOf(item: E): number
	{
		var i: number = 0;
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ++i) {
			if (Objects.objectsNullEqual(item, it.next()))
				return i;
		}
		return -1;
	}

	public iterator(): Iterator<E>
	{
		return this.listIterator();
	}

	public lastIndexOf(item: E): number
	{
		var i: number = this.size();
		for (var it: ListIterator<E> = this.listIteratorIndexed(i); it.hasPrevious(); --i) {
			if (Objects.objectsNullEqual(item, it.previous()))
				return i;
		}
		return -1;
	}

	public abstract listIterator(): ListIterator<E>;

	public abstract listIteratorIndexed(index: number): ListIterator<E>;

	public removeIndexed(index: number): E
	{
		var it: Iterator<E> = this.listIteratorIndexed(index);
		var e: E = it.next();
		it.remove();
		return e;
	}

	public set(index: number, item: E): E
	{
		this.listIteratorIndexed(index).set(item);
		return item;
	}

	public subList(from: number, end: number): List<E>
	{
		return new AbstractSubList(this, from, end);
	}
}


export class AbstractSubList<E> extends AbstractList<E>
{
	public constructor(list: AbstractList<E>, from: number, end: number)
	{
		super();
		this.list = list;
		this.from = from;
		this.end = end;
	}

	public add(item: E): boolean
	{
		this.list.addIndexed(this.end, item);
		return true;
	}

	public get(index: number): E
	{
		return this.list.get(this.from+index);
	}

	public iterator(): Iterator<E>
	{
		return new BackListIterator<E>(this, 0);
	}

	public listIterator(): ListIterator<E>
	{
		return new BackListIterator<E>(this, 0);
	}

	public listIteratorIndexed(index: number): ListIterator<E>
	{
		return new BackListIterator<E>(this, index);
	}

	public set(index: number, item: E): E
	{
		return this.list.set(this.from+index, item);
	}

	public size(): number
	{
		return this.end-this.from;
	}

	protected from: number;

	protected end: number;

	protected list: AbstractList<E>;
}


}
