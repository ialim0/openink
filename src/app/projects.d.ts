export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  imageUrls: string[];
  tags: string[];
  previewType?: 'image' | 'video';
  links: {
    github?: string;
    video?: string;
    live?: string;
  };
}

export const projects: Project[];
