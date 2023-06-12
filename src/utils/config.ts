import type { PlasmoCSConfig } from "plasmo";

export const commonConfig: Partial<PlasmoCSConfig> = {
    matches: [
        "http://localhost:52330/?id=*",
        "https://dashingdon.com/play/*",
        "https://moody.ink/play/*",
    ],
	run_at: "document_end",
}