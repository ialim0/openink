export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription?: string;
  imageUrls: string[];
  tags: string[];
  links: {
    github?: string;
    video?: string;
    live?: string;
  };
}

export const projects: Project[];
