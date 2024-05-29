import { mergeDefaultProps } from "@kobalte/utils";
import { ValidComponent } from "solid-js";

import { FormControlDataSet, useFormControlContext } from "../form-control";
import { ElementOf, Polymorphic, PolymorphicProps } from "../polymorphic";
import { SwitchDataSet, useSwitchContext } from "./switch-context";

export interface SwitchThumbOptions {}

export interface SwitchThumbCommonProps<T extends HTMLElement = HTMLElement> {
	id: string;
}

export interface SwitchThumbRenderProps
	extends SwitchThumbCommonProps,
		FormControlDataSet,
		SwitchDataSet {}

export type SwitchThumbProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = SwitchThumbOptions & Partial<SwitchThumbCommonProps<ElementOf<T>>>;

/**
 * The thumb that is used to visually indicate whether the switch is on or off.
 */
export function SwitchThumb<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, SwitchThumbProps<T>>,
) {
	const formControlContext = useFormControlContext();
	const context = useSwitchContext();

	const mergedProps = mergeDefaultProps(
		{
			id: context.generateId("thumb"),
		},
		props as SwitchThumbProps,
	);

	return (
		<Polymorphic<SwitchThumbRenderProps>
			as="div"
			{...formControlContext.dataset()}
			{...context.dataset()}
			{...mergedProps}
		/>
	);
}
