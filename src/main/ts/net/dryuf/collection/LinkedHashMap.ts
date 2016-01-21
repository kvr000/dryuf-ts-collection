/// <reference path="HashMap.ts"/>

module net.dryuf.collection {


export class LinkedHashMapEntrySetIterator<K, V> implements Iterator<MapEntry<K, V>>
{
	public constructor(entrySet: LinkedHashMapEntrySet<K, V>)
	{
		this.linkedMap = entrySet.getMap();
		this.currentNode = this.linkedMap.linkedHead;
	}

	public hasNext(): boolean
	{
		return this.currentNode != null;
	}

	public next(): MapEntry<K, V>
	{
		try {
			return this.currentNode;
		}
		finally {
			this.currentNode = this.currentNode.nextLinked;
		}
	}

	public remove(): void
	{
		this.linkedMap.remove(this.currentNode.previousLinked.key);
	}

	protected currentNode: LinkedHashMapNode<K, V> = null;

	protected linkedMap: LinkedHashMap<K, V>;
}

export class LinkedHashMapEntrySet<K, V> extends HashMapEntrySet<K, V>
{
	public constructor(map: LinkedHashMap<K, V>)
	{
		super(map);
		this.linkedMap = map;
	}

	public add(entry: MapEntry<K, V>): boolean
	{
		throw new Error("Unsupported operation");
	}

	public iterator(): Iterator<MapEntry<K, V>>
	{
		return new HashMapEntrySetIterator<K, V>(this);
	}

	public size(): number
	{
		return this.map.size();
	}

	public getMap(): LinkedHashMap<K, V>
	{
		return this.linkedMap;
	}

	protected linkedMap: LinkedHashMap<K, V>;
}


export class LinkedHashMapNode<K, V> extends HashMapNode<K, V>
{
	public constructor(key: K, value: V, hash: number)
	{
		super(key, value, hash);
	}

	public nextLinked: LinkedHashMapNode<K, V>;

	public previousLinked: LinkedHashMapNode<K, V>;
}

export class LinkedHashMap<K, V> extends HashMap<K, V>
{
	public clone(): Object
	{
		var ret: LinkedHashMap<K, V> = new LinkedHashMap<K, V>();
		this.forEach((key: K, value: V) => ret.put(key, value));
		return ret;
	}

	public entrySet(): Set<MapEntry<K, V>>
	{
		return new LinkedHashMapEntrySet(this);
	}

	protected addNode(key: K, value: V, hash: number): HashMapNode<K, V>
	{
		var node: LinkedHashMapNode<K, V> = new LinkedHashMapNode<K, V>(key, value, hash);
		if ((node.previousLinked = this.linkedLast) != null) {
			this.linkedLast.nextLinked = node;
		}
		else {
			this.linkedHead = node;
		}
		this.linkedLast = node;
		return node;
	}

	protected removeNodeLink(node0: HashMapNode<K, V>): void
	{
		var node: LinkedHashMapNode<K, V> = <LinkedHashMapNode<K, V>>node0;
		if (this.linkedHead == node) {
			if ((this.linkedHead = node.nextLinked) != null) {
				this.linkedHead.previousLinked = null;
			}
			else {
				this.linkedLast = null;
			}
		}
		else if (this.linkedLast == node) {
			this.linkedLast = node.previousLinked;
			this.linkedLast.nextLinked = null;
		}
		else {
			node.nextLinked.previousLinked = node.previousLinked;
			node.previousLinked.nextLinked = node.nextLinked;
		}
	}

	public linkedHead: LinkedHashMapNode<K, V>;

	public linkedLast: LinkedHashMapNode<K, V>;
}


}
