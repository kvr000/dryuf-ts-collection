/// <reference path="../../../../../../main/ts/net/dryuf/collection/LinkedList.ts" />
import LinkedList from '../../../../../../main/ts/net/dryuf/collection/LinkedList';

module net.dryuf.collection.test {


export class LinkedListTest
{
	testBasic(): void
	{
		var list: LinkedList<number> = new LinkedList<number>();
		list.add(0);
		list.add(1);
		list.add(2);
		expect(list.get(0)).toBe(0);
		expect(list.get(1)).toBe(1);
		expect(list.get(2)).toBe(2);
	}

}


}
