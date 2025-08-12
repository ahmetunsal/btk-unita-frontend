import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { CheckCircle, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

type CollapsibleProps = {
    title: string;
    array: string[];
};

const CollapsibleMap = ({ title, array }: CollapsibleProps) => {
  return (
    <Collapsible>
      <div className="w-fit flex items-center justify-between gap-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown className="w-6 h-auto" />
            <span className="sr-only">Aç/Kapat</span>
          </Button>
        </CollapsibleTrigger>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {array.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm border px-2 py-1 rounded-md"
          >
            <CheckCircle className="text-green-500" />
            {item}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleMap;
