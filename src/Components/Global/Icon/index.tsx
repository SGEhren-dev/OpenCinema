import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconSize =
	"2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";

interface IIconProps {
	name: string;
	size?: IconSize;
	spinning?: boolean;
}

export default function Icon(props: IIconProps) {
	const { name, size, spinning } = props;

	return (
		<FontAwesomeIcon
			icon={ name as IconProp }
			size={ size ?? "sm" }
			spin={ spinning }
		/>
	);
}
