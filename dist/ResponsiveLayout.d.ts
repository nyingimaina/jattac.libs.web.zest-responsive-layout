import React, { PureComponent } from "react";
interface IProps {
    sidePane: {
        visible: boolean;
        /** Defaults to 30 if not provided by developer */
        widthRems?: number;
        pane: React.ReactNode;
        title: React.ReactNode;
        onClose?: () => void;
    };
    detailPane: React.ReactNode;
}
export default class ResponsiveLayout extends PureComponent<IProps> {
    #private;
    render(): React.JSX.Element;
}
export {};
