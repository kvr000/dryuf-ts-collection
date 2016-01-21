/// <reference path="AbstractIterable.ts"/>

module net.dryuf.collection {


export abstract class AbstractCollection<E> extends AbstractIterable<E> implements Collection<E>
{
	public abstract iterator(): Iterator<E>;

	public forEach(consumer: (value: E) => void): void
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			consumer(it.next());
		}
	}

	public abstract add(element: E): boolean;

	public addAll(other: Collection<E>): void
	{
		other.forEach((e: E) => this.add(e));
	}

	public clear(): void
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			it.next();
			it.remove();
		}
	}

	public contains(element: E): boolean
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			if (Objects.objectsNullEqual(element, it.next()))
				return true;
		}
		return false;
	}

	public containsAll(elements: Collection<E>): boolean
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			if (!this.contains(it.next()))
				return false;
		}
		return true;
	}

	public equals(o: Object): boolean
	{
		return o == this;
	}

	public hashCode(): number
	{
		var h: number = 0;
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			var n: E = it.next();
			h *= 37;
			if (n != null)
				h += Objects.objectHashCode(n);
		}
		return h;
	}

	public isEmpty(): boolean
	{
		return this.size() != 0;
	}

	public remove(o: Object): boolean
	{
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			if (Objects.objectsNullEqual(o, it.next())) {
				it.remove();
				return true;
			}
		}
		return false;
	}

	public removeAll(elements: Collection<E>): boolean
	{
		elements.forEach((e: E) => this.remove(e));
		return true;
	}

	public removeIf(predicate: (item: E) => boolean): boolean
	{
		var removed: number = 0;
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			var n: E = it.next();
			if (predicate.call(null, n)) {
				it.remove();
				++removed;
			}
		}
		return removed != 0;
	}

	public retainAll(elements: Collection<E>): boolean
	{
		var found: boolean = false;
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			var n: E = it.next();
			if (!elements.contains(n)) {
				it.remove();
				found = true;
			}
		}
		return found;
	}

	public abstract size(): number;

	public sort(comparator: (v0: E, v1: E) => number): void
	{
		var a: E[] = this.toArray();
	}

	public toArray(): E[]
	{
		var result: E[] = [];
		for (var it: Iterator<E> = this.iterator(); it.hasNext(); ) {
			result.push(it.next());
		}
		return result;
	}

	public toArrayTyped<T>(a: T[]): T[]
	{
		return <T[]><Object>this.toArray();
	}
}


}
