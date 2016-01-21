module net.dryuf.collection {


export class LinkedListIterator<E> implements ListIterator<E>
{
	public constructor(list: LinkedList<E>, position: LinkedListNode<E>)
	{
		this.list = list;
		this.position = position;
	}

	public add(item: E): void
	{
		this.list.addBeforeNode(this.position, new LinkedListNode<E>(item));
	}

	public hasNext(): boolean
	{
		return this.position != null;
	}

	public hasPrevious(): boolean
	{
		return this.position.previous != null;
	}

	public next(): E
	{
		try {
			return this.position.value;
		}
		finally {
			this.position = this.position.next;
		}
	}

	public nextIndex(): number
	{
		return this.list.nodeIndex(this.position);
	}

	public previous(): E
	{
		this.position = this.position.previous;
		return this.position.value;
	}

	public previousIndex(): number
	{
		return this.list.nodeIndex(this.position)-1;
	}

	public remove(): void
	{
		this.list.removeNode(this.position);
		this.position = this.position.next;
	}

	public set(item: E): void
	{
		this.position.value = item;
	}

	protected list: LinkedList<E>;

	protected position: LinkedListNode<E>;
}

export class LinkedListNode<E>
{
	public constructor(value: E)
	{
		this.value = value;
	}

	public previous: LinkedListNode<E>;

	public next: LinkedListNode<E>;

	public value: E;
}

export class LinkedList<E> extends AbstractList<E>
{
	public add(item: E): boolean
	{
		this.addBeforeNode(null, new LinkedListNode<E>(item));
		return true;
	}

	public addIndexed(index: number, item: E): void
	{
		this.addBeforeNode(this.nodeAt(index), new LinkedListNode<E>(item));
	}

	public get(index: number): E
	{
		return this.nodeAt(index).value;
	}

	public listIterator(): ListIterator<E>
	{
		return new LinkedListIterator(this, this.linkedHead);
	}

	public listIteratorIndexed(index: number): ListIterator<E>
	{
		return new LinkedListIterator(this, this.nodeAt(index));
	}

	public removeIndexed(index: number): E
	{
		return this.removeNode(this.nodeAt(index));
	}

	public size(): number
	{
		return this.itemCount;
	}

	public nodeAt(index: number): LinkedListNode<E>
	{
		for (var current: LinkedListNode<E> = this.linkedHead; --index >= 0; ) {
			current = current.next;
		}
		return current;
	}

	public nodeIndex(node: LinkedListNode<E>): number
	{
		var index: number = 0;
		for (var current: LinkedListNode<E> = this.linkedHead; node != current; node = node.next) {
			++index;
		}
		return index;
	}

	public removeNode(node: LinkedListNode<E>): E
	{
		if (node.previous == null) {
			this.linkedHead = node.next;
		}
		else {
			node.previous.next = node.next;
		}
		if (node.next == null) {
			this.linkedLast = node.previous;
		}
		else {
			node.next.previous = node.previous;
		}
		--this.itemCount;
		return node.value;
	}

	public addBeforeNode(afterNode: LinkedListNode<E>, adding: LinkedListNode<E>): void
	{
		if ((adding.next = afterNode) != null) {
			if ((adding.previous = afterNode.previous) != null) {
				adding.previous.next = adding;
			}
			else {
				this.linkedHead = adding;
			}
		}
		else {
			this.linkedLast = adding;
			if (this.linkedHead == null)
				this.linkedHead = adding;
		}
		++this.itemCount;
	}

	protected itemCount: number = 0;

	protected linkedHead: LinkedListNode<E> = null;

	protected linkedLast: LinkedListNode<E> = null;
}


}
