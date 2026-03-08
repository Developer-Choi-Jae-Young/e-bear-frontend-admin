import './Editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table/row";
import { TableHeader } from "@tiptap/extension-table/header";
import { TableCell } from "@tiptap/extension-table/cell";
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LinkIcon, ImageIcon, OrderedListIcon, BulletListIcon } from './CustomTag';



const MenuBar = ({ editor }) => {
    if (!editor) return null;

    // 블록 타입
    const blockOptions = [
        { value: 'paragraph', label: 'Normal' },
        { value: 'heading-1', label: 'H1' },
        { value: 'heading-2', label: 'H2' },
        { value: 'heading-3', label: 'H3' },
    ];

    // editor 변화에 반응하여 리렌더
    const [, forceUpdate] = useState(0);

    // 현재 블록 타입 계산
    const currentBlockValue = useMemo(() => {
        if (editor.isActive('heading', { level: 1 })) return 'heading-1';
        if (editor.isActive('heading', { level: 2 })) return 'heading-2';
        if (editor.isActive('heading', { level: 3 })) return 'heading-3';
        return 'paragraph';
    }, [editor, editor.state]);

    const blockLabel = useMemo(() => {
        switch (currentBlockValue) {
            case 'heading-1': return 'H1';
            case 'heading-2': return 'H2';
            case 'heading-3': return 'H3';
            default: return 'Normal';
        }
    }, [currentBlockValue]);

    const applyBlock = (value) => {
        if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
            return;
        }
        if (value.startsWith('heading-')) {
            const level = Number(value.split('-')[1]);
            editor.chain().focus().setHeading({ level }).run();
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isActiveBlock = (value) => value === currentBlockValue;

    useEffect(() => {
        const onClickOutside = (e) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    useEffect(() => {
        if (!editor) return;

        const fn = () => forceUpdate(v => v + 1);

        editor.on('transaction', fn);
        return () => {
            editor.off('transaction', fn);
        };
    }, [editor]);

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('링크 URL을 입력하세요', previousUrl || 'https://');

        // 취소
        if (url === null) return;
        // 빈 값이면 링크 제거
        if (url === '') {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('이미지 URL을 입력하세요');
        if (!url) return;

        editor.chain().focus().setImage({ src: url }).run();
    };

    return (
        <div className="editor-toolbar">
            {/* 블록 타입 드롭다운 */}
            <div className="blocktype" ref={dropdownRef}>
                <button
                    className="blocktype-btn"
                    onClick={() => setIsOpen((v) => !v)}
                >
                    <span className="blocktype-label">{blockLabel}</span>
                    <span className={`blocktype-caret ${isOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isOpen && (
                    <div className="blocktype-menu">
                        {blockOptions.map((item) => (
                            <button
                                key={item.value}
                                className={`blocktype-item ${isActiveBlock(item.value) ? 'is-active' : ''}`}
                                onClick={() => {
                                    applyBlock(item.value);
                                    setIsOpen(false);
                                }}>
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 인라인 스타일 */}
            <button
                type="button"
                className={
                    editor.isActive('bold')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <span className="icon-bold">B</span>
            </button>
            <button
                type="button"
                className={
                    editor.isActive('italic')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <span className="icon-italic">I</span>
            </button>
            <button
                type="button"
                className={
                    editor.isActive('underline')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <span className="icon-underline">U</span>
            </button>
            <button
                type="button"
                className={
                    editor.isActive('strike')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <span className="icon-strike">S</span>
            </button>

            {/* 인용 */}
            <button
                type="button"
                className={
                    editor.isActive('blockquote')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                “ ”
            </button>

            <span className="toolbar-divider" />

            {/* 정렬 */}
            <button
                type="button"
                className={
                    editor.isActive({ textAlign: 'left' })
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
            >
                <AlignLeftIcon className="toolbar-icon" />
            </button>

            <button
                type="button"
                className={
                    editor.isActive({ textAlign: 'center' })
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
            >
                <AlignCenterIcon className="toolbar-icon" />
            </button>

            <button
                type="button"
                className={
                    editor.isActive({ textAlign: 'right' })
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
            >
                <AlignRightIcon className="toolbar-icon" />
            </button>

            <span className="toolbar-divider" />

            {/* 링크 / 이미지 */}
            <button
                type="button"
                className={
                    editor.isActive('link')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={setLink}
            >
                <LinkIcon className="toolbar-icon" />
            </button>
            <button
                type="button"
                className="editor-btn"
                onClick={addImage}
            >
                <ImageIcon className="toolbar-icon" />
            </button>

            <span className="toolbar-divider" />

            {/* 리스트 */}
            <button
                type="button"
                className={
                    editor.isActive('orderedList')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <OrderedListIcon className="toolbar-icon" />
            </button>
            <button
                type="button"
                className={
                    editor.isActive('bulletList')
                        ? 'editor-btn is-active'
                        : 'editor-btn'
                }
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <BulletListIcon className="toolbar-icon" />
            </button>
        </div>
    );
};

const Editor = ({ value = '', onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    useEffect(() => { console.log(editor); console.log(editor.getAttributes('link')) }, [editor]);

    return (
        <div className="editor">
            <MenuBar editor={editor} />
            <div className="editor-content">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
