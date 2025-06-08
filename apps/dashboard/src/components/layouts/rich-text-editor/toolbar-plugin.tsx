/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Heading1,
  Heading3,
  ItalicIcon,
  Redo,
  StrikethroughIcon,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

const LowPriority = 1;

function Divider() {
  return <div className='divider' />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className='flex mb-[1px] bg-card p-1 rounded-t-[10px] align-middle gap-0.5'
      ref={toolbarRef}
    >
      <Button
        size='icon'
        variant='ghost'
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label='Undo'
      >
        <Undo size={18} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label='Redo'
      >
        <Redo size={18} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        onClick={() =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode("h3"));
            }
          })
        }
        aria-label='Heading 3'
      >
        <Heading3 />
      </Button>
      <Button
        size='icon'
        variant={isBold ? "default" : "ghost"}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        aria-label='Format Bold'
      >
        <BoldIcon />
      </Button>
      <Button
        size='icon'
        variant={isItalic ? "default" : "ghost"}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        aria-label='Format Italics'
      >
        <ItalicIcon size={18} />
      </Button>
      <Button
        size='icon'
        variant={isUnderline ? "default" : "ghost"}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        aria-label='Format Underline'
      >
        <UnderlineIcon size={18} />
      </Button>
      <Button
        size='icon'
        variant={isStrikethrough ? "default" : "ghost"}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        aria-label='Format Strikethrough'
      >
        <StrikethroughIcon size={18} />
      </Button>
      <Divider />
      <Button
        size='icon'
        variant='ghost'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        aria-label='Left Align'
      >
        <AlignLeft size={18} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        aria-label='Center Align'
      >
        <AlignCenter size={18} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        aria-label='Right Align'
      >
        <AlignRight size={18} />
      </Button>
      <Button
        size='icon'
        variant='ghost'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className='toolbar-item'
        aria-label='Justify Align'
      >
        <AlignJustify size={18} />
      </Button>{" "}
    </div>
  );
}
