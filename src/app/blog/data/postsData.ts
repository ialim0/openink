export interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    readTime: number;
    imageUrl: string;
    category: string;
    isFeatured?: boolean;
    slug: string;
    contentFilePath?: string;
    excerpt?: string;
  }
  
  
    export const posts: Post[] = [
      {
        id: 1,
        title: "Mastering React Hooks",
        excerpt:
          "Dive deep into React Hooks and learn how they revolutionize state management and side effects in functional components.",
        author: "Alimoudine IDRISSOU",
        date: "June 4, 2024",
        readTime: 8,
        imageUrl: "/images/react-hooks.jpg",
        category: "React",
        isFeatured: true,
        slug: "mastering-react-hooks",
        contentFilePath: "mastering-react-hooks.md",
      },
      {
        id: 2,
        title: "Blockchain Beyond Crypto",
        excerpt:
          "Explore innovative applications of blockchain technology in supply chain, healthcare, and digital identity.",
        author: "Alimoudine IDRISSOU",
        date: "May 18, 2024",
        readTime: 12,
        imageUrl: "/images/blockchain.jpg",
        category: "Blockchain",
        slug: "blockchain-beyond-crypto",
        contentFilePath: "blockchain-beyond-crypto.md",
      },
      {
        id: 3,
        title: "Implementing AI-Powered Search Systems",
        excerpt:
          "Learn how to build advanced search systems using AI techniques like semantic search and natural language understanding.",
        author: "Alimoudine IDRISSOU",
        date: "July 2, 2024",
        readTime: 15,
        imageUrl: "/images/ai-search.jpg",
        category: "AI",
        isFeatured: true,
        slug: "implementing-ai-powered-search-systems",
        contentFilePath: "implementing-ai-powered-search-systems.md",
      },
      {
        id: 4,
        title: "Financial Literacy in the Age of Crypto",
        excerpt:
          "Explore the intersection of traditional financial literacy and the emerging world of cryptocurrencies and decentralized finance.",
        author: "Alimoudine IDRISSOU",
        date: "August 15, 2024",
        readTime: 10,
        imageUrl: "/images/crypto-literacy.jpg",
        category: "Digital Finance",
        slug: "financial-literacy-crypto-age",
        contentFilePath: "financial-literacy-crypto-age.md",
      },
      {
        id: 5,
        title: "Optimizing AI Model Deployment in the Cloud",
        excerpt:
          "Discover best practices for deploying and scaling AI models in cloud environments for maximum efficiency and performance.",
        author: "Alimoudine IDRISSOU",
        date: "September 3, 2024",
        readTime: 13,
        imageUrl: "/images/ai-cloud-deployment.jpg",
        category: "Cloud",
        isFeatured: true,
        slug: "optimizing-ai-model-deployment-cloud",
        contentFilePath: "optimizing-ai-model-deployment-cloud.md",
      },
      {
        id: 6,
        title: "Advanced NLP Techniques with Transformers",
        excerpt:
          "Delve into cutting-edge natural language processing techniques using transformer models and the Hugging Face ecosystem.",
        author: "Alimoudine IDRISSOU",
        date: "October 7, 2024",
        readTime: 14,
        imageUrl: "/images/nlp-transformers.jpg",
        category: "AI",
        slug: "advanced-nlp-techniques-transformers",
        contentFilePath: "advanced-nlp-techniques-transformers.md",
      },
      {
        id: 7,
        title: "Building Scalable APIs with FastAPI",
        excerpt:
          "Learn how to create high-performance, easily scalable APIs using FastAPI and best practices in API design.",
        author: "Alimoudine IDRISSOU",
        date: "November 12, 2024",
        readTime: 11,
        imageUrl: "/images/fastapi-scalable.jpg",
        category: "Web Development",
        slug: "building-scalable-apis-fastapi",
        contentFilePath: "building-scalable-apis-fastapi.md",
      },
      {
        id: 8,
        title: "AI in Financial Risk Assessment",
        excerpt:
          "Explore how AI and machine learning are revolutionizing risk assessment in the financial sector, from credit scoring to fraud detection.",
        author: "Alimoudine IDRISSOU",
        date: "December 5, 2024",
        readTime: 16,
        imageUrl: "/images/ai-financial-risk.jpg",
        category: "AI",
        isFeatured: true,
        slug: "ai-financial-risk-assessment",
        contentFilePath: "ai-financial-risk-assessment.md",
      },
      {
        id: 9,
        title: "Rust for AI Developers",
        excerpt:
          "Discover how Rust's performance and safety features make it an excellent choice for AI and machine learning applications.",
        author: "Alimoudine IDRISSOU",
        date: "January 20, 2025",
        readTime: 18,
        imageUrl: "/images/rust-ai.jpg",
        category: "Programming",
        slug: "rust-for-ai-developers",
        contentFilePath: "rust-for-ai-developers.md",
      },
      {
        id: 10,
        title: "Ethical Considerations in AI Development",
        excerpt:
          "Examine the ethical challenges in AI development and learn strategies for building responsible and fair AI systems.",
        author: "Alimoudine IDRISSOU",
        date: "February 14, 2025",
        readTime: 20,
        imageUrl: "/images/ai-ethics.jpg",
        category: "AI",
        isFeatured: true,
        slug: "ethical-considerations-ai-development",
        contentFilePath: "ethical-considerations-ai-development.md",
      }
    ];
  