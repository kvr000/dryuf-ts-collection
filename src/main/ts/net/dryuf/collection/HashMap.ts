module net.dryuf.collection {


export class HashMapEntrySetIterator<K, V> implements Iterator<MapEntry<K, V>>
{
	public constructor(entrySet: HashMapEntrySet<K, V>)
	{
		this.map = entrySet.getMap();
	}

	public hasNext(): boolean
	{
		while (this.currentNode == null) {
			if (++this.currentHash >= this.map.getNodeTable().length)
				break;
			this.currentNode = this.map.getNodeTable()[this.currentHash];
		}
		return this.currentNode != null;
	}

	public next(): MapEntry<K, V>
	{
		if (this.currentNode == null)
			this.hasNext();
		var old: HashMapNode<K, V> = this.currentNode;
		this.currentNode = old.nextHashed;
		this.currentKey = old.key
		return old;
	}

	public remove(): void
	{
		this.map.remove(this.currentKey);
	}

	protected currentNode: HashMapNode<K, V> = null;

	protected currentHash: number = -1;

	protected currentKey: K;

	protected map: HashMap<K, V>;
}

export class HashMapEntrySet<K, V> extends AbstractSet<MapEntry<K, V>>
{
	public constructor(map: HashMap<K, V>)
	{
		super();
		this.map = map;
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

	public getMap(): HashMap<K, V>
	{
		return this.map;
	}

	protected map: HashMap<K, V>;
}


export class HashMapNode<K, V> implements MapEntry<K, V>
{
	public constructor(key: K, value: V, hash: number)
	{
		this.key = key;
		this.value = value;
		this.hash = hash;
	}

	public getKey(): K
	{
		return this.key;
	}

	public getValue(): V
	{
		return this.value;
	}

	public setValue(v: V): V
	{
		var old = this.value;
		this.value = v;
		return old;
	}

	public key: K;

	public value: V;

	public nextHashed: HashMapNode<K, V>;

	public hash: number;
}

export class HashMap<K, V> extends AbstractMap<K, V>
{
	public clone(): Object
	{
		var ret: HashMap<K, V> = new HashMap<K, V>();
		this.forEach((key: K, value: V) => ret.put(key, value));
		return ret;
	}

	public containsKey(key: K): boolean
	{
		return this.findNode(key) != null;
	}

	public entrySet(): Set<MapEntry<K, V>>
	{
		return new HashMapEntrySet(this);
	}

	public get(key: K): V
	{
		return this.getOrDefault(key, null);
	}

	public getOrDefault(key: K, defaultValue: V): V
	{
		var node: HashMapNode<K, V> = this.findNode(key);
		if (node != null)
			return node.value;
		return defaultValue;
	}

	public put(key: K, value: V): V
	{
		var node: HashMapNode<K, V> = this.findNode(key);
		if (node != null) {
			var old: V = node.value;
			node.value = value;
			return old;
		}
		node = this.addNode(key, value, Objects.objectHashCode(key));
		node.nextHashed = this.table[this.computeHashMasked(node.hash)];
		this.table[this.computeHashMasked(node.hash)] = node;
		if (++this.itemCount > this.table.length*3/4) {
			var ot: HashMapNode<K, V>[] = this.table;
			this.table = [ ];
			this.table.length = ot.length*2;
			ot.forEach((c: HashMapNode<K, V>) => {
				for (var n: HashMapNode<K, V> = c.nextHashed; c != null; n = (c = n).nextHashed) {
					c.nextHashed = this.table[this.computeHashMasked(c.hash)];
					this.table[this.computeHashMasked(c.hash)] = c;
				}
			});
		}
		return null;
	}

	public remove(key: K): V
	{
		var node: HashMapNode<K, V> = this.findNode(key);
		if (node != null) {
			if (this.table[this.computeHashMasked(node.hash)] == node) {
				this.table[this.computeHashMasked(node.hash)] = null;
			}
			else {
				for (var t: HashMapNode<K, V> = this.table[this.computeHashMasked(node.hash)]; t.nextHashed != node; t = t.nextHashed) ;
				t.nextHashed = node.nextHashed;
			}
			this.removeNodeLink(node);
			--this.itemCount;
			return node.value;
		}
		return null;
	}

	public size(): number
	{
		return this.itemCount;
	}

	protected computeHashMasked(hash: number): number
	{
		return hash&(this.table.length-1);
	}

	protected findNode(key: K): HashMapNode<K, V>
	{
		var hash: number = Objects.objectHashCode(key);
		for (var node: HashMapNode<K, V> = this.table[hash&(this.table.length-1)]; node != null; node = node.nextHashed) {
			if (node.hash == hash && Objects.objectsEqual(key, node.key))
				return node;
		}
		return null;
	}

	protected addNode(key: K, value: V, hash: number): HashMapNode<K, V>
	{
		return new HashMapNode<K, V>(key, value, hash);
	}

	protected removeNodeLink(node: HashMapNode<K, V>): void
	{
	}

	public getNodeTable(): HashMapNode<K, V>[]
	{
		return this.table;
	}

	protected itemCount: number = 0;

	protected table: HashMapNode<K, V>[] = [ null, null, null, null, null, null, null, null ];
}


}
