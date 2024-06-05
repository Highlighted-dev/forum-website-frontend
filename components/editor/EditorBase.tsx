"use client";
import React from "react";
import { EditorToolbar } from "./EditorToolbar";
import { Editor, EditorContent } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";
import { UseFormRegister } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface IFormData {
  title: string;
  category: string;
}

export default function EditorBase({
  editor,
  title,
  register,
  selectableCategory = true,
  editorClassName = "",
}: {
  editor: Editor;
  title?: string;
  register?: UseFormRegister<IFormData>;
  selectableCategory?: boolean;
  editorClassName?: string;
}) {
  return (
    <div className={editorClassName ? editorClassName : "mx-auto"}>
      {register ? (
        <TextareaAutosize
          autoFocus
          id="name"
          defaultValue={title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-2"
          {...register("title")}
        />
      ) : null}
      {selectableCategory && register ? (
        <div className="my-2">
          <Select {...register("category")}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ideas & Feedback">Ideas & Feedback</SelectItem>
              <SelectItem value="Recruitment">Recruitment</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}
      {editor ? <EditorToolbar editor={editor} /> : null}
      <EditorContent
        editor={editor}
        className={
          editorClassName ? "min-h-[400px]" : "max-w-[800px] min-h-[400px]"
        }
        id={"editor"}
      />
    </div>
  );
}
