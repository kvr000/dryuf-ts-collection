module net.dryuf.collection {


export interface MapEntry<K, V>
{
	getKey(): K;

	getValue(): V;

	setValue(value: V): V;
}

export interface Map<K, V>
{
	clear(): void;

	compute(key: K, computer: (key: K, value: V) => V): V;

	computeIfAbsent(key: K, computer: (key: K) => V): V;

	computeIfPresent(key: K, computer: (key: K, value: V) => V): V;

	containsKey(key: K): boolean;

	containsValue(value: V): boolean;

	entrySet(): Set<MapEntry<K, V>>;

	forEach(consumer: (key: K, value: V) => void): void;

	get(key: K): V;

	getOrDefault(key: K, defaultValue: V): V;

	isEmpty(): boolean;

	keySet(): Set<K>;

	merge(key: K, value: V, remappingFunction: (oldValue: V, newValue: V) => V): V;

	put(key: K, value: V): V;

	putAll(adding: Map<K, V>): void;

	putIfAbsent(key: K, value: V): V;

	remove(key: K): V;

	removeOld(key: K, value: V): boolean;

	replace(key: K, value: V): V;

	replaceOld(key: K, old: V, value: V): boolean;

	replaceAll(computer: (key: K, value: V) => V): void;

	size(): number;

	values(): Collection<V>;
}


}
