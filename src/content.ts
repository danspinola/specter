import type { PlasmoCSConfig } from "plasmo";
import { commonConfig } from "~utils/config";
import { SourceMappingModel, SourceMappingView } from "~modules/source-mapping";

export const config: PlasmoCSConfig = {
	...commonConfig,
	world: 'MAIN',
};

// const w: MyWindow = window;

SourceMappingModel.init();
const sourceMappingView = new SourceMappingView();
sourceMappingView;

console.log("[SPECTER]");

export {};
