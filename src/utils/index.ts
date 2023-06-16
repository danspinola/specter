export function isMobileDevice(): boolean {
	const userAgent = navigator.userAgent.toLowerCase();

	return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

type ElementDef<K extends string> = {
	tagName: K;
	props?: { [key: string]: any };
	children?: (ElementDef<any> | string)[];
};

export function createElement<K extends string>(el: ElementDef<K>): HTMLElement {
	let { tagName, props, children } = el;
	const element = document.createElement(tagName);

	// Set props
	for (const [prop, value] of Object.entries(props)) {
		if (prop === "className")
			element.classList.add(value as string);
		if (prop === "style")
			Object.assign(element.style, value);
		else element[prop] = value;
	}

	if (!children) children = [];
	// Create children recursively
	for (const child of children) {
		let childElement;

		if (typeof child === 'string')
			childElement = document.createTextNode(child);
		else if (!(child instanceof Element))
			childElement = createElement(child)
		else childElement = child;

		element.appendChild(childElement);
	}

	return element;
}

