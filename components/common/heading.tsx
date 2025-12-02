import { cn } from "@/lib/utils";

interface headingProps {
  title: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
}

const Heading = ({ center, title, lg, md }: headingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {
        <h1
          className={cn(
            "font-bold my-2 text-2xl",
            lg && "text-4xl",
            md && "text-3xl"
          )}
        >
          {title}
        </h1>
      }
    </div>
  );
};

export default Heading;
