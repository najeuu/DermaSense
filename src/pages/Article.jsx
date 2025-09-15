import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data
import { articlesListData } from '../data/articlesListData';
import { heroArticleData } from '../data/heroArticleData';

const Article = () => {
  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <HeroArticle />
      <LatestArticles />
      <Footer />
    </div>
  );
};

// Hero Article Component
const HeroArticle = () => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div className="bg-white shadow rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-center">
      <HeroImage />
      <HeroContent />
    </div>
  </section>
);

// Hero Image Component
const HeroImage = () => (
  <img
    src={heroArticleData.image}
    alt={heroArticleData.title}
    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
  />
);

// Hero Content Component
const HeroContent = () => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 leading-snug">
      {heroArticleData.title}
    </h2>
    <HeroMeta author={heroArticleData.author} date={heroArticleData.date} />
    <p className="text-gray-700 leading-relaxed">{heroArticleData.content}</p>
  </div>
);

// Hero Meta Component
const HeroMeta = ({ author, date }) => (
  <div className="flex items-center text-sm text-gray-500 mb-4">
    <span className="mr-2">{author}</span>
    <Calendar size={16} className="mr-1" />
    <span>{date}</span>
  </div>
);

// Latest Articles Section Component
const LatestArticles = () => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
    <ArticlesHeader />
    <ArticlesGrid />
  </section>
);

// Articles Header Component
const ArticlesHeader = () => (
  <>
    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">Artikel Terbaru</h3>
    <p className="text-gray-600 mb-8">
      Selamat datang di section artikel, berikut merupakan kumpulan beberapa artikel yang telah kami
      buat sedemikian rupa untuk membantu Anda memahami perawatan kulit yang tepat dan aman.
    </p>
  </>
);

// Articles Grid Component
const ArticlesGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {articlesListData.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ))}
  </div>
);

// Article Card Component
const ArticleCard = ({ article }) => (
  <Link to={`/article/${article.id}`}>
    <article className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer transform hover:-translate-y-1">
      <ArticleCardImage src={article.img} alt={article.title} />
      <ArticleCardContent article={article} />
    </article>
  </Link>
);

// Article Card Image Component
const ArticleCardImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-40 object-cover" />
);

// Article Card Content Component
const ArticleCardContent = ({ article }) => (
  <div className="p-4">
    <CategoryBadge category={article.category} />
    <ArticleTitle title={article.title} />
    <ArticleExcerpt content={article.content} />
    <ArticleMeta author={article.author} date={article.date} />
  </div>
);

// Category Badge Component
const CategoryBadge = ({ category }) => (
  <span className="text-xs font-semibold text-primary uppercase tracking-wide">{category}</span>
);

// Article Title Component
const ArticleTitle = ({ title }) => (
  <h4 className="mt-2 font-semibold text-lg text-gray-800 line-clamp-2">{title}</h4>
);

// Article Excerpt Component
const ArticleExcerpt = ({ content }) => (
  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{content}</p>
);

// Article Meta Component
const ArticleMeta = ({ author, date }) => (
  <div className="text-xs text-gray-500 mt-3 flex items-center">
    <span className="mr-2">{author}</span>
    <span>•</span>
    <span className="ml-2">{date}</span>
  </div>
);

export default Article;
