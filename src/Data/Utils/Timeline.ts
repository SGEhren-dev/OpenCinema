import { TimeUnits } from "@/Shared/Objects/Time";
import { TimelineZoomLevel } from "../Objects/Timeline";

export function TimeUnitsFromZoom(zoom: TimelineZoomLevel) {
	switch (zoom) {
		case TimelineZoomLevel.SECONDS:
			return 1 * TimeUnits.SECONDS;
		case TimelineZoomLevel.MINUTES:
			return 1 * TimeUnits.MINUTES;
		case TimelineZoomLevel.HOURS:
			return 60 * TimeUnits.MINUTES;
	}
}
