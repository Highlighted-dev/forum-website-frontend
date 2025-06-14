"use client";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const editorProps = {
  attributes: {
    class:
      "min-h-[300px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
  },
};

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal pl-4",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc pl-4",
      },
    },
  }),

  Color,
  TextStyle,
  Highlight.configure({
    HTMLAttributes: {
      class: "bg-[#1d283a] text-[#f8fafc] ",
    },
  }),
  Underline,
  Image.configure({
    //center image
    HTMLAttributes: {
      class: "mx-auto",
    },
  }),
  Link.configure({
    autolink: true,
    openOnClick: true,
    HTMLAttributes: {
      class: "text-primary underline hover:no-underline cursor-pointer",
    },
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "w-full",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class:
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class:
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] font-medium border-l border-r border-input",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "[&_tr]:border-b bg-muted/50 text-muted-foreground font-medium",
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];
