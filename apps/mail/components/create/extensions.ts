import {
  AIHighlight,
  CharacterCount,
  Color,
  CustomKeymap,
  GlobalDragHandle,
  HighlightExtension,
  HorizontalRule,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  UploadImagesPlugin,
} from 'novel';

import { cx } from 'class-variance-authority';

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder;
// Custom link extension that exits the link mark when space is typed
import { Extension } from '@tiptap/core';

// Create a separate extension to handle exiting links on space
const ExitLinkOnSpace = Extension.create({
  name: 'exitLinkOnSpace',
  addKeyboardShortcuts() {
    return {
      Space: ({ editor }) => {
        if (editor.isActive('link')) {
          // Insert a space character first
          editor.commands.insertContent(' ');

          // Then explicitly unset the link mark
          editor.commands.unsetLink();

          return true;
        }
        return false;
      },
    };
  },
});

// Configure the link extension with standard options
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
    ),
  },
  openOnClick: false,
  autolink: true,
  linkOnPaste: true,
  protocols: ['http', 'https', 'mailto', 'tel'],
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg border border-stone-200'),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted'),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2 '),
  },
});

const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx('flex gap-2 items-start my-4'),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground'),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-2 -mt-2'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-2 -mt-2'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-2 border-primary'),
    },
  },
  heading: {
    levels: [1, 2, 3],
    HTMLAttributes: {
      class: cx('text-primary'),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium'),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
});

const characterCount = CharacterCount.configure();

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  ExitLinkOnSpace, // Add our custom extension to exit links on space
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  characterCount,
  TiptapUnderline,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  GlobalDragHandle,
];
