import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import Text from './Text';
import styles from '@/app/post.module.css';

interface RichText {
  plain_text: string;
}

interface Block {
  id: string;
  type: string;
  [key: string]: any;
}

interface ChildBlock extends Block {
  children?: Block[];
}

interface TableRow {
  cells: RichText[];
}

interface File {
  url: string;
}

interface ImageValue {
  type: 'external' | 'file';
  external?: File;
  file?: File;
  caption?: RichText[];
}

export function renderBlock(block: Block): ReactNode {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p key={id}>
          <Text title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={id}>
          <Text title={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={id}>
          <Text title={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={id}>
          <Text title={value.rich_text} />
        </h3>
      );
    case 'bulleted_list':
      return <ul key={id}>{value.children.map(renderBlock)}</ul>;
    case 'numbered_list':
      return <ol key={id}>{value.children.map(renderBlock)}</ol>;
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={id}>
          <Text title={value.rich_text} />
          {value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div key={id}>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />
            {' '}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details key={id}>
          <summary>
            <Text title={value.rich_text} />
          </summary>
          {block.children?.map((child: Block) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div key={id} className={styles.childPage}>
          <strong>{value?.title}</strong>
          {block.children?.map(renderBlock)}
        </div>
      );
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure key={id}>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      return (
        <pre key={id} className={styles.pre}>
          <code className={styles.code_block}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file':
      const srcFile = value.type === 'external' ? value.external.url : value.file.url;
      const fileName = srcFile.split('/').pop()?.split('?')[0];
      const captionFile = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure key={id}>
          <div className={styles.file}>
            📎
            <Link href={srcFile} passHref>
              {fileName}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    case 'bookmark':
      return (
        <a key={id} href={value.url} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
          {value.url}
        </a>
      );
    case 'table':
      return (
        <table key={id} className={styles.table}>
          <tbody>
            {block.children?.map((child: ChildBlock, index: number) => {
              const RowElement = value.has_column_header && index === 0 ? 'th' : 'td';
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: RichText, i: number) => (
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    case 'column_list':
      return (
        <div key={id} className={styles.row}>
          {block.children?.map(renderBlock)}
        </div>
      );
    case 'column':
      return <div key={id}>{block.children?.map(renderBlock)}</div>;
    default:
      return <span key={id}>❌ Unsupported block ({type === 'unsupported' ? 'unsupported by Notion API' : type})</span>;
  }
}

export function renderNestedList(blocks: Block): ReactNode {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return <ol>{value.children.map(renderBlock)}</ol>;
  }
  return <ul>{value.children.map(renderBlock)}</ul>;
}

// Component to render the section with blocks
interface BlocksSectionProps {
  blocks: Block[];
}

const BlocksSection: React.FC<BlocksSectionProps> = ({ blocks }) => (
  <section>
    {blocks.map((block) => renderBlock(block))}
  </section>
);

export default BlocksSection;
