module net.dryuf.collection {


export class AbstractMapKeySetIterator<K, V> implements Iterator<K>
{
	public constructor(keySet: AbstractMapKeySet<K, V>)
	{
		this.keySet = keySet;
		this.entryIterator = this.keySet.getEntrySet().iterator();
	}

	public hasNext(): boolean
	{
		return this.entryIterator.hasNext();
	}

	public next(): K
	{
		return this.entryIterator.next().getKey();
	}

	public remove(): void
	{
		this.entryIterator.remove();
	}

	keySet: AbstractMapKeySet<K, V>;

	entryIterator: Iterator<MapEntry<K, V>>;
}


export class AbstractMapKeySet<K, V> extends AbstractSet<K>
{
	public constructor(map: AbstractMap<K, V>)
	{
		super();
		this.map = map;
	}

	public add(entry: K): boolean
	{
		throw new Error("Unsupported");
	}

	public clear(): void
	{
		this.map.clear();
	}

	public contains(key: K): boolean
	{
		return this.map.containsKey(key);
	}

	public iterator(): Iterator<K>
	{
		return new AbstractMapKeySetIterator(this);
	}

	public remove(key: K): boolean
	{
		return this.map.remove(key) != null;
	}

	public size(): number
	{
		return this.map.size();
	}

	public getEntrySet(): Set<MapEntry<K, V>>
	{
		return this.map.entrySet();
	}

	protected map: Map<K, V>;
}


export class AbstractMapValuesIterator<K, V> implements Iterator<V>
{
	public constructor(values: AbstractMapValues<K, V>)
	{
		this.values = values;
		this.entryIterator = this.values.getEntrySet().iterator();
	}

	public hasNext(): boolean
	{
		return this.entryIterator.hasNext();
	}

	public next(): V
	{
		return this.entryIterator.next().getValue();
	}

	public remove(): void
	{
		this.entryIterator.remove();
	}

	values: AbstractMapValues<K, V>;

	entryIterator: Iterator<MapEntry<K, V>>;
}


	export class AbstractMapValues<K, V> extends AbstractCollection<V>
{
	public constructor(map: AbstractMap<K, V>)
	{
		super();
		this.map = map;
	}

	public add(entry: V): boolean
	{
		throw new Error("Unsupported");
	}

	public clear(): void
	{
		this.map.clear();
	}

	public contains(value: V): boolean
	{
		return this.map.containsValue(value);
	}

	public iterator(): Iterator<V>
	{
		return new AbstractMapValuesIterator(this);
	}

	public remove(value: V): boolean
	{
		throw new Error("Unsupported");
	}

	public size(): number
	{
		return this.map.size();
	}

	public getEntrySet(): Set<MapEntry<K, V>>
	{
		return this.map.entrySet();
	}

	protected map: Map<K, V>;
}


export abstract class AbstractMap<K, V> implements Map<K, V>
{
	public clear(): void
	{
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			it.next();
			it.remove();
		}
	}

	public abstract clone(): Object;

	public compute(key: K, computer: (key: K, value: V) => V): V
	{
		var v: V = computer(key, this.get(key));
		if (v == null) {
			this.remove(key);
		}
		else {
			this.put(key, v);
		}
		return v;
	}

	public computeIfAbsent(key: K, computer: (key: K) => V): V
	{
		var v: V = null;
		if (this.get(key) == null && (v = computer(key)) != null)
			this.put(key, v);
		return v;
	}

	public computeIfPresent(key: K, computer: (key: K, value: V) => V): V
	{
		var v: V = null;
		if ((v = this.get(key)) != null) {
			if ((v = computer(key, v)) != null) {
				this.put(key, v);
			}
			else {
				this.remove(key);
			}
		}
		return v;
	}

	public containsKey(key: K): boolean
	{
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			if (Objects.objectsEqual(key, it.next().getKey()))
				return true;
		}
	}

	public containsValue(value: V): boolean
	{
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			if (Objects.objectsEqual(value, it.next().getValue()))
				return true;
		}
	}

	public abstract entrySet(): Set<MapEntry<K, V>>;

	public equals(o: Object): boolean
	{
		if (!(o instanceof AbstractMap))
			return false;
		var m: Map<K, V> = <Map<K, V>>o;
		if (m.size() != this.size())
			return false;
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			var e: MapEntry<K, V> = it.next();
			if (!m.containsKey(e.getKey()))
				return false;
			if (!Objects.objectsNullEqual(e.getValue(), m.get(e.getKey())))
				return false;
		}
		return true;
	}

	public forEach(consumer: (key: K, value: V) => void): void
	{
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			var e: MapEntry<K, V> = it.next();
			consumer(e.getKey(), e.getValue());
		}
	}

	public abstract get(key: K): V;

	public getOrDefault(key: K, defaultValue: V): V
	{
		var v: V = this.get(key);
		if (v == null && !this.containsKey(key))
			v = defaultValue;
		return v;
	}

	public hashCode(): number
	{
		var h: number = 0;
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			h = (h*37+Objects.objectNullHashCode(Objects.objectNullHashCode(it.next())))&0xffffffff;
		}

		return h;
	}

	public isEmpty(): boolean
	{
		return this.size() == 0;
	}

	public keySet(): Set<K>
	{
		return new AbstractMapKeySet<K, V>(this);
	}

	public merge(key: K, value: V, remappingFunction: (oldValue: V, newValue: V) => V): V
	{
		var oldValue: V = this.get(key);
		var newValue: V = oldValue == null ? value : remappingFunction(oldValue, value);
		if (newValue == null) {
			this.remove(key);
		}
		else {
			this.put(key, newValue);
		}
		return newValue;
	}

	public abstract put(key: K, value: V): V;

	public putAll(m: Map<K, V>): void
	{
		m.forEach((key: K, value: V) => this.put(key, value));
	}

	public putIfAbsent(key: K, value: V): V
	{
		var old: V = this.get(key);
		if (old == null)
			this.put(key, value);
		return old;
	}

	public abstract remove(key: K): V;

	public removeOld(key: K, value: V): boolean
	{
		var old: V = this.get(key);
		if (old == value) {
			this.remove(key);
			return true;
		}
		return false;
	}

	public replace(key: K, value: V): V
	{
		if (this.containsKey(key)) {
			return this.put(key, value);
		}
		return null;
	}

	public replaceOld(key: K, old: V, value: V): boolean
	{
		var old: V = this.get(key);
		if (old == value) {
			this.put(key, value);
			return true;
		}
		return false;
	}

	replaceAll(computer: (key: K, value: V) => V): void
	{
		for (var it: Iterator<MapEntry<K, V>> = this.entrySet().iterator(); it.hasNext(); ) {
			var e: MapEntry<K, V> = it.next();
			this.put(e.getKey(), computer(e.getKey(), e.getValue()));
		}
	}

	public abstract size(): number;

	public values(): Collection<V>
	{
		return new AbstractMapValues<K, V>(this);
	}
}


}
