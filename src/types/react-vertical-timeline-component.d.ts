declare module 'react-vertical-timeline-component' {
  import { ReactNode } from 'react';

  export interface VerticalTimelineProps {
    animate?: boolean;
    children?: ReactNode;
    className?: string;
    layout?: '1-column' | '2-columns';
    lineColor?: string;
  }

  export interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentArrowStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    date?: string;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: React.CSSProperties;
    intersectionObserverProps?: any;
    onTimelineElementClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
    textClassName?: string;
    visible?: boolean;
  }

  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}
