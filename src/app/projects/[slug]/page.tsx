import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '../../projects';
import { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} | Projects`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.imageUrls?.[0] ? [project.imageUrls[0]] : [],
    },
  };
}

// Server Component - handles data fetching and params
export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Pass project data to client component
  return <ProjectDetailClient project={project} />;
}
