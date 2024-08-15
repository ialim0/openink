import React, { Fragment, FC, memo } from 'react';
import Link from 'next/link';
import styles from '@/app/post.module.css';

interface TexteProps {
  title: Array<{
    annotations: {
      bold: boolean;
      code: boolean;
      color: string;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
    };
    text: {
      content: string;
      link?: { url: string };
    };
  }>;
}

const Texte: FC<TexteProps> = ({ title }) => {
  if (!title) return null;
  return (
    <>
      {title.map((value, index) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <span
            key={`${text.content}-${index}`}
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
      })}
    </>
  );
};

interface BlockProps {
  block: {
    type: string;
    id: string;
    [key: string]: any;
  };
}

const Block: FC<BlockProps> = memo(({ block }) => {
  const { type, id } = block;
  const value = block[type];

  const renderContent = () => {
    switch (type) {
      case 'paragraph':
        return <Paragraph content={value.rich_text} />;
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        return <Heading level={type.split('_')[1]} content={value.rich_text} />;
      case 'to_do':
        return <ToDo id={id} checked={value.checked} content={value.rich_text} />;
      case 'toggle':
        return <Toggle summary={value.rich_text} children={block.children} />;
      case 'image':
        return <Image value={value} />;
      case 'divider':
        return <hr />;
      case 'quote':
        return <Quote content={value.rich_text} />;
      case 'code':
        return <Code content={value.rich_text} />;
      case 'file':
        return <File value={value} />;
      case 'bookmark':
        return <Bookmark href={value.url} />;
      case 'table':
        return <Table value={value} children={block.children} />;
      case 'column_list':
        return <ColumnList children={block.children} />;
      case 'column':
        return <Column children={block.children} />;
      case 'bulleted_list_item':
        return <BulletedListItem content={value.rich_text} />;
      case 'numbered_list_item':
        return <NumberedListItem content={value.rich_text} />;
      default:
        return <UnsupportedBlock type={type} />;
    }
  };


  return (
    <div className={`${styles.block} ${styles[type]}`} key={id}>
      {renderContent()}
    </div>
  );
});

interface ParagraphProps {
  content: any;
}

const Paragraph: FC<ParagraphProps> = ({ content }) => (
  <p><Texte title={content} /></p>
);

interface HeadingProps {
  level: string;
  content: any;
}

const Heading: FC<HeadingProps> = ({ level, content }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <HeadingTag><Texte title={content} /></HeadingTag>;
};





interface ToDoProps {
  id: string;
  checked: boolean;
  content: any;
}

const ToDo: FC<ToDoProps> = ({ id, checked, content }) => (
  <div className={styles.todo}>
    <input type="checkbox" id={id} defaultChecked={checked} />
    <label htmlFor={id}><Texte title={content} /></label>
  </div>
);

interface ToggleProps {
  summary: any;
  children?: any[];
}

const Toggle: FC<ToggleProps> = ({ summary, children }) => (
  <details>
    <summary><Texte title={summary} /></summary>
    {children?.map((child) => <Block key={child.id} block={child} />)}
  </details>
);

interface ImageProps {
  value: {
    type: string;
    external?: { url: string };
    file?: { url: string };
    caption?: { plain_text: string }[];
  };
}

const Image: FC<ImageProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  const caption = value.caption ? value.caption[0]?.plain_text : '';
  return (
    <figure className={styles.image}>
      <img src={src} alt={caption} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

interface QuoteProps {
  content: any;
}

const Quote: FC<QuoteProps> = ({ content }) => (
  <blockquote><Texte title={content} /></blockquote>
);

interface CodeProps {
  content: { plain_text: string }[];
}

const Code: FC<CodeProps> = ({ content }) => (
  <pre className={styles.pre}>
    <code className={styles.code_block}>{content[0].plain_text}</code>
  </pre>
);

interface FileProps {
  value: {
    type: string;
    external?: { url: string };
    file?: { url: string };
    caption?: { plain_text: string }[];
  };
}

const File: FC<FileProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  const splitSourceArray = src.split('/');
  const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
  const caption = value.caption ? value.caption[0]?.plain_text : '';
  return (
    <figure className={styles.file}>
      <div>
        📎 <Link href={src}>{lastElementInArray.split('?')[0]}</Link>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

interface BookmarkProps {
  href: string;
}

const Bookmark: FC<BookmarkProps> = ({ href }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className={styles.bookmark}>
    {href}
  </a>
);

interface TableProps {
  value: {
    has_column_header: boolean;
  };
  children?: any[];
}

const Table: FC<TableProps> = ({ value, children }) => (
  <table className={styles.table}>
    <tbody>
      {children?.map((row, rowIndex) => (
        <tr key={row.id}>
          {row.table_row?.cells.map((cell: any, cellIndex: number) => {
            const CellTag = value.has_column_header && rowIndex === 0 ? 'th' : 'td';
            return <CellTag key={`${row.id}-${cellIndex}`}>{cell[0].plain_text}</CellTag>;
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

interface ColumnListProps {
  children: any[];
}

const ColumnList: FC<ColumnListProps> = ({ children }) => (
  <div className={styles.row}>
    {children.map((column) => <Block key={column.id} block={column} />)}
  </div>
);

interface ColumnProps {
  children: any[];
}

const Column: FC<ColumnProps> = ({ children }) => (
  <div className={styles.column}>
    {children.map((child) => <Block key={child.id} block={child} />)}
  </div>
);

interface ListItemProps {
  content: any;
}

const BulletedListItem: FC<ListItemProps> = ({ content }) => (
  <li className={styles.bulletedListItem}>
    <Texte title={content} />
  </li>
);

const NumberedListItem: FC<ListItemProps> = ({ content }) => (
  <li className={styles.numberedListItem}>
    <Texte title={content} />
  </li>
);


interface UnsupportedBlockProps {
  type: string;
}

const UnsupportedBlock: FC<UnsupportedBlockProps> = ({ type }) => (
  <div className={styles.unsupported}>
    Unsupported block type: {type === 'unsupported' ? 'unsupported by Notion API' : type}
  </div>
);

export const renderBlock = (block: any) => <Block block={block} />;
