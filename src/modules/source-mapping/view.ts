import { createElement } from "~utils";
import { CodeIcon, PlayIcon } from "~utils/icons";

export class SourceMappingView {

	displayCodeBtn: HTMLButtonElement;
	returnToGameBtn: HTMLButtonElement;
	btnContainer: HTMLDivElement;
	codeContainer: HTMLDivElement;

	constructor() {
		this.displayCodeBtn = this.makeDisplayCodeBtn();
		this.displayCodeBtn.style.display = "inline-flex";

		this.returnToGameBtn = this.makeReturnToGameBtn();

		this.btnContainer = document.createElement('div');
		this.btnContainer.style.display = "inline-block"
		this.btnContainer.appendChild(this.displayCodeBtn);
		this.btnContainer.appendChild(this.returnToGameBtn);

		this.codeContainer = document.createElement('div');
		this.codeContainer.dataset.specter = "true";
		this.codeContainer.id = "specter-code-container";

		this.mount();
	}

	mount() {
		const menu: HTMLParagraphElement = document.querySelector("#buttons");
		menu.appendChild(this.btnContainer);
	}

	makeDisplayCodeBtn(): HTMLButtonElement {
		return createElement({
			tagName: "button",
			props: {
				className: "spacedLink",
				style: {
					display: "none",
					alignItems: "center",
					justifyContent: "center",
				},
				innerHTML: `
					${CodeIcon}
					<span 
						style="
							weight: bold; 
							padding-inline: 4px;
						"
					>|</span>
					View Code
				`,
				onclick: e => this.displayCode(e)
			},
		}) as HTMLButtonElement;
	}

	makeReturnToGameBtn(): HTMLButtonElement {
		return createElement({
			tagName: "button",
			props: {
				className: "spacedLink",
				style: {
					display: "none",
					alignItems: "center",
					justifyContent: "center",
				},
				innerHTML: `
					${PlayIcon}
					<span 
						style="
							weight: bold; 
							padding-inline: 4px;
						"
					>|</span>
					Return to the Game
				`,
				onclick: e => this.returnToGame(e)
			},
		}) as HTMLButtonElement;
	}

	displayCode(event) {
		// @ts-ignore
		document.querySelector("#container1").appendChild(this.codeContainer);

		// @ts-ignore
		const main = window.main;

		[...document.querySelectorAll("[data-specter]"), main].forEach(div => (div as any).style.display = "none");
		this.codeContainer.innerHTML = "";
		this.codeContainer.style.display = "block";

		const mark = Number((main.querySelector("#text span") as HTMLElement)?.dataset.line || 0)
		const codeView = this.generateCodeView(mark);
		// @ts-ignore
		this.codeContainer.appendChild(codeView);
		codeView.querySelector("mark")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

		// toggle buttons
		this.displayCodeBtn.style.display = 'none';
		this.returnToGameBtn.style.display = "inline-flex";
	}

	returnToGame(event) {
		// @ts-ignore
		const main = window.main;

		[...document.querySelectorAll("[data-specter]"), main].forEach(div => (div as any).style.display = "none");
		this.codeContainer.innerHTML = "";

		main.style.display = 'block';

		// toggle buttons
		this.displayCodeBtn.style.display = "inline-flex";
		this.returnToGameBtn.style.display = "none";
	}

	generateCodeView(mark?: number) {
		// @ts-ignore
		let lines = window.stats.scene.lines;

		const codeContainer = document.createElement('div');
		codeContainer.style.maxHeight = '400px';
		codeContainer.style.overflow = 'auto';

		const codeList = document.createElement('ol');
		codeList.style.listStyleType = 'none';
		codeList.style.padding = '0';
		codeList.style.margin = '0';
		codeList.style.fontFamily = 'monospace';

		for (let i = 0; i < lines.length; i++) {
			let displayIndex = i + 1;

			const codeItem = document.createElement('li');
			codeItem.style.padding = '0.5em 0';

			const codeLine = document.createElement('code');
			codeLine.innerHTML = this.wrapLine(lines[i]);

			const codePre = document.createElement('pre');
			codePre.style.margin = "0";
			codePre.style.display = "inline";
			codePre.appendChild(codeLine);
			
			if (mark && mark === i) {
				const markEl = document.createElement('mark');
				markEl.appendChild(codePre);
				codeItem.appendChild(markEl);
			} else {
				codeItem.appendChild(codePre);
			}


			const lineNumber = document.createElement('span');
			lineNumber.style.display = 'inline-block';
			lineNumber.style.width = '30px';
			lineNumber.style.textAlign = 'right';
			lineNumber.style.marginRight = '0.5em';
			lineNumber.textContent = String(displayIndex);

			codeItem.prepend(lineNumber);
			codeList.appendChild(codeItem);
		}

		codeContainer.appendChild(codeList);
		return codeContainer;
	}

	wrapLine(line: string) {
		return line.split(" ").reduce((acc, cur, idx) => {
			if ((idx + 1) % 12 === 0) acc += "<br>"
			acc += " " + cur;
			return acc;
		}, "");
	}
}

