import { Fragment, Key } from 'react';
import Link from 'next/link';

import Texte from './Texte';
import styles from '@/app/post.module.css';

interface Block {
  id: string;
  type: string;
  [key: string]: any;
}

export function renderBlock(block: Block) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p key={id}>
          <Texte title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={id}>
          <Texte title={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={id}>
          <Texte title={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={id}>
          <Texte title={value.rich_text} />
        </h3>
      );
    case 'bulleted_list':
      return (
        <ul key={id}>
          {value.children.map((child: Block) => renderBlock(child))}
        </ul>
      );
    case 'numbered_list':
      return (
        <ol key={id}>
          {value.children.map((child: Block) => renderBlock(child))}
        </ol>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={id}>
          <Texte title={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div key={id}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Texte title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details key={id}>
          <summary>
            <Texte title={value.rich_text} />
          </summary>
          {block.children?.map((child: Block) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className={styles.childPage} key={id}>
          <strong>{value?.title}</strong>
          {block.children.map((child: Block) => renderBlock(child))}
        </div>
      );
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure key={id}>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre className={styles.pre} key={id}>
          <code className={styles.code_block}>{value.rich_text[0].plain_text}</code>
        </pre>
      );
    case 'file': {
      const srcFile = value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure key={id}>
          <div className={styles.file}>
            📎{' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case 'bookmark': {
      const href = value.url;
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark} key={id}>
          {href}
        </a>
      );
    }
    case 'table':
      return (
        <table className={styles.table} key={id}>
          <tbody>
            {block.children?.map((child: { id: Key | null | undefined; table_row: { cells: any[]; }; }, index: number) => {
              const RowElement = value.has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells.map((cell: any, idx: number) => (
                    <RowElement key={idx}>{cell[0].plain_text}</RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    case 'column_list':
      return <div className={styles.row} key={id}>{block.children.map((child: Block) => renderBlock(child))}</div>;
    case 'column':
      return (
        <div key={id}>
          {block.children.map((child: Block) => renderBlock(child))}
        </div>
      );
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`;
  }
}

const renderNestedList = (block: Block) => {
  const { type, id } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return (
      <ol key={id}>
        {value.children.map((child: Block) => renderBlock(child))}
      </ol>
    );
  }
  return (
    <ul key={id}>
      {value.children.map((child: Block) => renderBlock(child))}
    </ul>
  );
};

const Text = ({ title }: { title: any }) => {
  if (!title) {
    return null;
  }
  return title.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={text.content}
        className={[
          bold ? styles.bold : '',
          code ? styles.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};
