# OpenInk

**OpenInk** is my personal blog built with **Next.js, Redis, Notion** and hosted on **Vercel**. It has served as my official blog since 2024, and I am now open sourcing it to share the work behind it and provide a clean, scalable blogging platform for others.

Live site: [alimidrissou.com](https://alimidrissou.com)

---

## Key Features

- Built with **Next.js** for fast server-side rendering and SEO optimization  
- **Notion API** integration to manage articles without complex backend infrastructure  
- **Redis caching** powered by **Upstash** for efficient view counters and like/unlike functionality  
- Smart **tag-based article suggestions** to help users discover relevant content  
- Responsive **dark mode** design for comfortable reading across devices and environments  
- **User feedback system** that allows readers to share comments and suggestions directly, reflecting my commitment to continuous growth and valuing constructive input.

---

## Getting Started

1. Clone this repository and install dependencies:
   ```bash
   git clone https://github.com/ialim0/openink.git
   cd openink
   npm install
   ```

2. Create a `.env.local` file and add your credentials (see `.env.example` for reference):
   ```
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_notion_database_id
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   UPSTASH_REDIS_REST_URL=your_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
   ```

   - 🔗 [Use this Notion database template](https://www.notion.so/2cdb95a2b4934d1588dfa3f96f03f72d?v=6cf8894c35424bf6b711d33e12776e1f&source=copy_link) — feel free to **make a copy** and use it for your own blog.
   - 🔐 [Generate a Redis token via Upstash](https://upstash.com/)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view your blog.

---

## About Me

I’m **Alim Idrissou**, a software engineer passionate about building impactful and scalable applications using modern technologies. OpenInk reflects my focus on clean code, performance, and excellent user experience.

Learn more about me and my work at [alimidrissou.com](https://alimidrissou.com)

---

## Feedback & Contribution

I welcome feedback and contributions!  
Feel free to explore, use, or contribute to this project.

🙋 Need help or just want to chat about tech? Reach out at [alimidrissou.com/feedback](https://alimidrissou.com/feedback)

---

Thank you for checking out OpenInk!