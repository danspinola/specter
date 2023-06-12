import * as App from '../components/app';

// ____ ____ ___ _  _ ___
// [__  |___  |  |  | |__]
// ___] |___  |  |__| |

// inject padding onto the original page html
const mainContainer = document.getElementById('container1');
const paddingTop = document.createElement('div');

Object.assign(paddingTop.style, {
    width: '100%',
    height: '74px',
    // backgroundColor: 'blue',
});

const paddingBottom = paddingTop.cloneNode(true);

mainContainer.insertBefore(paddingTop, mainContainer.firstChild);
mainContainer.appendChild(paddingBottom);

// hide original game title
const gameTitleStyle = document.createElement('style');
gameTitleStyle.textContent = `
	.gameTitle {
		display: none;
	}
`;
document.body.appendChild(gameTitleStyle);

// ____ _  _ ___  ____ ____ ___
// |___  \/  |__] |  | |__/  |
// |___ _/\_ |    |__| |  \  |

export const { config, getShadowHostId, getStyle } = App;
export default App.Component;
