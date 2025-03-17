import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const SampleFile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="w-5 h-5 text-red-600 mr-2" />
          Sample file
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0">
        <DropdownMenuItem asChild>
          <a
            href="./Employee-List.xlsx"
            download
            className=" flex items-center justify-between w-full"
          >
            Employee List
            <DropdownMenuShortcut>
              <Download className="w-5 h-5 " />
            </DropdownMenuShortcut>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a
            href="/Secret-Santa-Game-Result.xlsx"
            download
            className=" flex items-center justify-between w-full"
          >
            Previous Assignments List
            <DropdownMenuShortcut>
              <Download className="w-5 h-5 " />
            </DropdownMenuShortcut>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SampleFile;
