import styles from '@/app/post.module.css';

interface Annotation {
  bold?: boolean;
  code?: boolean;
  color?: string;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
}

interface TextValue {
  annotations: Annotation;
  text: {
    content: string;
    link?: {
      url: string;
    };
  };
}

interface TextProps {
  title: TextValue[];
}

export default function Texte({ title }: TextProps) {
  if (!title) {
    return null;
  }
  
  return (
    <>
      {title.map((value, index) => {
        const {
          annotations: {
            bold, code, color, italic, strikethrough, underline,
          },
          text,
        } = value;

        return (
          <span
            key={index} // Using index as key is generally not recommended, but it's acceptable here as a fallback.
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
}
