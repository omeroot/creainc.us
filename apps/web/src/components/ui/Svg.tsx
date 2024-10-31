import { motion, MotionProps } from "framer-motion";

// types
type AnimatedSvgProps = MotionProps & {
  animated: true;
  svg: string;
  className?: any;
};
interface NonAnimatedSvgProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  svg: string;
}

// real component
export const Svg = ({
  svg,
  animated = false,
  ...props
}: NonAnimatedSvgProps | AnimatedSvgProps) => {
  const Tag = animated ? motion.div : ("div" as any);
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: svg }}></Tag>;
};
