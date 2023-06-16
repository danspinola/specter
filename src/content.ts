import type { PlasmoCSConfig } from "plasmo";
import { commonConfig } from "~utils/config";
import { SourceMappingModel, SourceMappingView } from "~modules/source-mapping";
import { ScopeWatchView } from "~modules/scope-watching";
import { clearScreen } from "~utils/replacements";

export const config: PlasmoCSConfig = {
	...commonConfig,
	world: 'MAIN',
};

// const w: MyWindow = window;

window.clearScreen = clearScreen;

(document.querySelector("#taglines") as any).style.display = "none";

SourceMappingModel.init();
const sourceMappingView = new SourceMappingView();

// const scopeWatchView = new ScopeWatchView();

console.log("[SPECTER]");

export {};
