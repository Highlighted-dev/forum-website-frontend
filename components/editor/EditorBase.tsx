"use client";
import React from "react";
import { EditorToolbar } from "./EditorToolbar";
import { Editor, EditorContent } from "@tiptap/react";
import TextareaAutosize from "react-textarea-autosize";
import { UseFormRegister } from "react-hook-form";

export interface IFormData {
  title: string;
  content: string;
}

export default function EditorBase({
  editor,
  title,
  register,
}: {
  editor: Editor;
  title: string;
  register: UseFormRegister<IFormData>;
}) {
  return (
    <div className="mx-auto">
      <TextareaAutosize
        autoFocus
        id="name"
        defaultValue={title}
        placeholder="Post title"
        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none p-2"
        {...register("title")}
      />
      {editor ? <EditorToolbar editor={editor} /> : null}
      <EditorContent
        editor={editor}
        className=" max-w-[800px] min-h-[400px]"
        id={"editor"}
      />
    </div>
  );
}
