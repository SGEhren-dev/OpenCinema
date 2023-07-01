import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

export function initializeIcons() {
	library.add(fas);

	dom.watch();
}
