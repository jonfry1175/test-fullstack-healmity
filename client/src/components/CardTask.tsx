import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import Button from "./ui/button/Button";

export interface CardTaskProps {
  handleClick: (action: "undo" | "done") => void;
  title: string;
  description: string;
  body: string;
}

const CardtTask: React.FC<CardTaskProps> = ({
  handleClick,
  title,
  description,
  body,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{body}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleClick("undo")}>Undo</Button>
        <Button onClick={() => handleClick("done")} variant="neutral">
          Done
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardtTask;
