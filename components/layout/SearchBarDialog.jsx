import { SearchTop } from "./SearchBarDialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";

// ---------------- Search Dialog ----------------

export default function SearchBarDialog({ open, onOpenChange }) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-[100%] backdrop-blur-2xl"
    >
      <Command>
        <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />
        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <CommandGroup heading="العطور">
            <CommandItem>
              <Link href="/perfumes?cat=oud">عود</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=fruity">فواكه</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=vanilla">فانيلا</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
