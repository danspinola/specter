import { createElement } from "~utils";
import { FORBIDDEN_KEYS } from "./utils";

import { VariableIcon, PlayIcon } from "~utils/icons";

export class ScopeWatchView {

	displayVarsBtn: HTMLButtonElement;
	returnToGameBtn: HTMLButtonElement;
	btnContainer: HTMLDivElement;
	varsContainer: HTMLDivElement;

	constructor() {
		this.displayVarsBtn = this.makeDisplayVarsBtn();
		this.displayVarsBtn.style.display = "inline-flex";

		this.returnToGameBtn = this.makeReturnToGameBtn();

		this.btnContainer = document.createElement('div');
		this.btnContainer.style.display = "inline-block"
		this.btnContainer.appendChild(this.displayVarsBtn);
		this.btnContainer.appendChild(this.returnToGameBtn);

		this.mount();

		// @ts-ignore
		window.displayVars = this.displayVars.bind(this);
	}

	mount() {
		const menu: HTMLParagraphElement = document.querySelector("#buttons");
		menu.appendChild(this.btnContainer);
	}

	makeDisplayVarsBtn(): HTMLButtonElement {
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
					${VariableIcon}
					<span 
						style="
							weight: bold; 
							padding-inline: 4px;
						"
					>|</span>
					View Variables
				`,
				onclick: _ => this.displayVars()
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
				onclick: _ => this.returnToGame()
			},
		}) as HTMLButtonElement;
	}

	displayVars() {

		const varsContainer = document.createElement('div');
		this.varsContainer = varsContainer;
		varsContainer.dataset.specter = "true";
		varsContainer.id = "specter-vars-container";

		// @ts-ignore
		document.querySelector("#container1").appendChild(varsContainer);
		
		// @ts-ignore
		const main = window.main;

		[...document.querySelectorAll("[data-specter]"), main].forEach(div => (div as any).style.display = "none");
		varsContainer.innerHTML = "";
		varsContainer.style.display = "block";

		const varsForm = this.generateVarsForm();
		varsContainer.appendChild(varsForm);

		// toggle buttons
		this.displayVarsBtn.style.display = 'none';
		this.returnToGameBtn.style.display = "inline-flex";
	}

	returnToGame() {
		// @ts-ignore
		const main = window.main;

		[...document.querySelectorAll("[data-specter]"), main].forEach(div => (div as any).style.display = "none");
		this.varsContainer.innerHTML = "";

		main.style.display = 'block';

		// toggle buttons
		this.displayVarsBtn.style.display = "inline-flex";
		this.returnToGameBtn.style.display = "none";
	}

	generateVarsForm() {
		console.log("[GENERATE_VARS_FORM]");
		// @ts-ignore
		const stats = window.stats as Record<string, any>;

		const form = document.createElement('form');
		form.style.maxHeight = '400px';
		form.style.overflow = 'auto';

		Object.entries(stats)
			.filter(([key]) => !FORBIDDEN_KEYS.includes(key))
			.filter(([key]) => !key.match(/^(choice(script)?_|sm_|savemod_)/gim))
			.forEach(([key, value]) => {
				const label = document.createElement('label');
				label.style.display = "block";
				label.style.marginBlock = "1rem";
				label.textContent = key;
				
				const input = document.createElement('input');
				input.id = key;
				input.type = 'text';
				input.value = String(value);
				input.style.marginInline = "1rem";

				label.appendChild(input);
				form.appendChild(label);
			});

		const submitButton = document.createElement('button');
		submitButton.type = 'submit';
		submitButton.textContent = 'Persist State';
		form.appendChild(submitButton);

		form.onsubmit = this.persistState.bind(this);

		return form;
	}

	persistState(event: Event): void {
		event.preventDefault();
		const w = window as any;
		const stats = w.stats as any;

		const form = event.target as HTMLFormElement;
		const formData = [...form.querySelectorAll("input")].map(i => [i.id, i.value]);


		for (const [key, value] of formData) {
			// Update the corresponding property in the `stats` object
			if (key in stats)
				stats[key] = value.toString();

		}

		// console.log("stats.scene.temps", stats.scene.temps)

		// w.saveCookie(
		// 	() => w.restoreGame(
		// 		{ stats, temps: stats.scene.temps, indent: stats.scene.indent }, true, false
		// 	), 
		// 	"", 
		// 	stats, 
		// 	stats.scene.temps, 
		// 	stats.scene.lineNum, 
		// 	stats.scene.indent, 
		// 	stats.scene.debugMode, 
		// 	stats.scene.nav
		// );

		// console.log("stats.scene.temps", stats.scene.temps)

		this.returnToGame();
	}
}
