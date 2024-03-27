'use client';

import type Editor from '@ckeditor/ckeditor5-build-classic';
import type { CKEditor, default as CKReactImport } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react';

export default function MyEditor(props: Partial<React.ComponentProps<typeof CKEditor>>) {
  const [editor, setEditor] = useState<{ default: typeof Editor }>();
  const [CK, setCK] = useState<typeof CKReactImport>();

  useEffect(() => {
    (async () => {
      setEditor((await import('@ckeditor/ckeditor5-build-classic')));
      setCK((await import('@ckeditor/ckeditor5-react')));
    })().catch(console.error)
  }, []);

  return (
    <>
      {CK && editor &&
        <CK.CKEditor
          editor={editor.default}
          {...props}
        />
      }
      {(!CK || !editor) &&
        'Loading...'
      }
    </>
  );
}
