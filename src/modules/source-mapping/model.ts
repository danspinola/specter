import type { MyWindow } from "~content.d";

declare class Scene { [k: string]: any }

export class SourceMappingModel {

	static init() {
		SourceMappingModel.replaceChoiceScriptNativeFunctions();
	}

	static replaceChoiceScriptNativeFunctions() {
		const w: MyWindow = window;
		
		/**	
		 * Replaces any occurrences of `[line=number]`
		 * with an HTML `<span>` element with a `line`
		 * attribute set to the corresponding number,
		 * and replaces any occurrences of `[/line]` 
		 * with a closing `</span>` tag. 
		 */
		if (!w._replaceBbCode) {
			w._replaceBbCode = w.replaceBbCode;
			w.replaceBbCode = function (msg) {
				return w._replaceBbCode(msg)
					.replace(/\[line=([0-9]+) scene=([^\]]*)\]/g, '<span data-line="$1" data-scene="$2">')
					.replace(/\[\/line\]/g, "</span>");
			};
		}

		/**
		 * Replaces native implementation of `printLine`
		 * function in order to include line and file data.
		 */
		if (!Scene.prototype._printLine) {
			Scene.prototype._printLine = Scene.prototype.printLine;
			Scene.prototype.printLine = function (line) {
				if (!line) return null;
				this.screenEmpty = false;
				let modLine = this.replaceVariables(line.replace(/^\s*/, ""));
				this.accumulatedParagraph.push(
					`[line=${String(this.lineNum)} scene=${this.name}]` + modLine
				);
				// insert extra space unless the line ends with hyphen or dash
				if (!/([-\u2011-\u2014]|\[c\/\])$/.test(modLine))
					this.accumulatedParagraph.push(" ");
				this.accumulatedParagraph.push("[/line]")
			};
		}
	}
}