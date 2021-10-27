import { useLoading } from "@agney/react-loading";
import { ReactElement } from "react";

interface LoadingProperties {
    indicator: ReactElement;
    loading: boolean;
}

export const Loading = (props: LoadingProperties) => {
    const { containerProps, indicatorEl } = useLoading({
        loading: props.loading,
        indicator: props.indicator,
    });

    return <div {...containerProps}>{indicatorEl}</div>;
};
