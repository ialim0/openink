import React, { Fragment, FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        return <Toggle summary={value.rich_text}>{block.children?.map((child: any) => <Block key={child.id} block={child} />)}</Toggle>;
      case 'image':
        return <NotionImage value={value} />;
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
        return <Table value={value} rows={block.children} />;
      case 'column_list':
        return <ColumnList columns={block.children} />;
      case 'column':
        return <Column blocks={block.children} />;
      case 'bulleted_list_item':
        return <BulletedListItem content={value.rich_text} />;
      case 'numbered_list_item':
        return <NumberedListItem content={value.rich_text} />;
      case 'callout':
        return <Callout icon={value.icon} content={value.rich_text} />;
      case 'equation':
        return <Equation content={value.expression} />;
      case 'synced_block':
        return <SyncedBlock block={block} />;
      case 'table_of_contents':
        return <TableOfContents />;
      case 'breadcrumb':
        return <Breadcrumb />;
      case 'video':
        return <Video value={value} />;
      case 'pdf':
        return <PDF value={value} />;
      case 'audio':
        return <Audio value={value} />;
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

Block.displayName = 'Block';

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
  children: React.ReactNode;
}

const Toggle: FC<ToggleProps> = ({ summary, children }) => (
  <details>
    <summary><Texte title={summary} /></summary>
    {children}
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

const NotionImage: FC<ImageProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  const caption = value.caption ? value.caption[0]?.plain_text : '';
  return (
    <figure className={styles.image}>
      <Image src={src} alt={caption || 'Notion image'} width={500} height={300} layout="responsive" />
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
  rows: any[];
}

const Table: FC<TableProps> = ({ value, rows }) => (
  <table className={styles.table}>
    <tbody>
      {rows.map((row, rowIndex) => (
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
  columns: any[];
}

const ColumnList: FC<ColumnListProps> = ({ columns }) => (
  <div className={styles.row}>
    {columns.map((column) => <Block key={column.id} block={column} />)}
  </div>
);

interface ColumnProps {
  blocks: any[];
}

const Column: FC<ColumnProps> = ({ blocks }) => (
  <div className={styles.column}>
    {blocks.map((block) => <Block key={block.id} block={block} />)}
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

interface CalloutProps {
  icon: string;
  content: any;
}

const Callout: FC<CalloutProps> = ({ icon, content }) => (
  <div className={styles.callout}>
    <span className={styles.calloutIcon}>{icon}</span>
    <div className={styles.calloutContent}>
      <Texte title={content} />
    </div>
  </div>
);

interface EquationProps {
  content: string;
}

const Equation: FC<EquationProps> = ({ content }) => (
  <div className={styles.equation}>{content}</div>
);

interface SyncedBlockProps {
  block: any;
}

const SyncedBlock: FC<SyncedBlockProps> = ({ block }) => (
  <div className={styles.syncedBlock}>
    {block.children?.map((child: any) => <Block key={child.id} block={child} />)}
  </div>
);

const TableOfContents: FC = () => (
  <div className={styles.tableOfContents}>Table of Contents placeholder</div>
);

const Breadcrumb: FC = () => (
  <div className={styles.breadcrumb}>Breadcrumb placeholder</div>
);

interface VideoProps {
  value: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
}

const Video: FC<VideoProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  return (
    <div className={styles.video}>
      <video controls src={src} />
    </div>
  );
};

interface PDFProps {
  value: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
}

const PDF: FC<PDFProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  return (
    <div className={styles.pdf}>
      <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(src)}&embedded=true`} />
    </div>
  );
};

interface AudioProps {
  value: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
}

const Audio: FC<AudioProps> = ({ value }) => {
  const src = value.type === 'external' ? value.external!.url : value.file!.url;
  return (
    <div className={styles.audio}>
      <audio controls src={src} />
    </div>
  );
};

interface UnsupportedBlockProps {
  type: string;
}

const UnsupportedBlock: FC<UnsupportedBlockProps> = ({ type }) => (
  <div className={styles.unsupported}>
    Unsupported block type: {type === 'unsupported' ? 'unsupported by Notion API' : type}
  </div>
);

export const renderBlock = (block: any) => <Block block={block} />;