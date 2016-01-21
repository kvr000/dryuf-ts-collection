module net.dryuf.collection {


export class Objects
{
	public static objectHashCode(o: Object): number
	{
		if (o.hasOwnProperty("hashCode")) {
			return (<any>o).hashCode();
		}
		else if (o instanceof Number) {
			return Number(o)&0xffffffff;
		}
		else if (o instanceof String) {
			return this.stringHashCode(String(o));
		}
	}

	public static objectNullHashCode(o: Object): number
	{
		if (o == null)
			return 0;
		return Objects.objectHashCode(o);
	}

	public static stringHashCode(s: String): number
	{
		var h: number = 0;
		for (var i: number = 0; i < s.length; ++i) {
			h = (h*37+s.charCodeAt(i))&0xffffffff;
		}
		return h;
	}

	public static objectsEqual(o0: Object, o1: Object): boolean
	{
		if (o0.hasOwnProperty("equals")) {
			return (<any>o0).equals(o1);
		}
		else {
			return o0 == o1;
		}
	}

	public static objectsNullEqual(o0: Object, o1: Object): boolean
	{
		if (o0 == null || o1 == null) {
			return o0 == o1;
		}
		return Objects.objectsEqual(o0, o1);
	}
}


}
