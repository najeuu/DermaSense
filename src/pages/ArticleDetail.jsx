import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Images
// import a1 from '../assets/images/a1.png';
// import a2 from '../assets/images/a2.png';
// import a7 from '../assets/images/a7.png';
// import a41 from '../assets/images/a4.1.png';
// import a51 from '../assets/images/a5.1.png';
// import a61 from '../assets/images/a6.1.png';
// import obat1 from '../assets/images/obat1.png';
// import obat2 from '../assets/images/obat2.png';
// import obat3 from '../assets/images/obat3.png';
// import obat4 from '../assets/images/obat4.png';

// Data
import { articles } from '../data/articlesData';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    const articleIndex = articles.findIndex((article) => article.id === parseInt(id));
    if (articleIndex !== -1) {
      setCurrentArticleIndex(articleIndex);
    }
  }, [id]);

  const currentArticle = articles[currentArticleIndex];

  if (!currentArticle) {
    return <ArticleNotFound navigate={navigate} />;
  }

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <ArticleHero article={currentArticle} navigate={navigate} />
      <ArticleContent article={currentArticle} navigate={navigate} />
      <Footer />
    </div>
  );
};

// Article Not Found Component
const ArticleNotFound = ({ navigate }) => (
  <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <button
          onClick={() => navigate('/article')}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Kembali ke Artikel
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

// Article Hero Component
const ArticleHero = ({ article, navigate }) => (
  <div className="relative bg-gradient-to-br from-green-50 to-blue-50 py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton navigate={navigate} />
      <CategoryBadge category={article.category} />
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>
      <ArticleMeta article={article} />
    </div>
  </div>
);

// Back Button Component
const BackButton = ({ navigate }) => (
  <button
    onClick={() => navigate('/article')}
    className="flex items-center text-gray-600 hover:text-primary transition-colors mb-6 group"
  >
    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
    <span>Kembali ke Artikel</span>
  </button>
);

// Category Badge Component
const CategoryBadge = ({ category }) => (
  <div className="inline-block mb-4">
    <span className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full shadow-sm">
      {category}
    </span>
  </div>
);

// Article Meta Component
const ArticleMeta = ({ article }) => (
  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
    <div className="flex items-center">
      <User size={16} className="mr-2" />
      <span className="font-medium">{article.author}</span>
    </div>
    <div className="flex items-center">
      <Calendar size={16} className="mr-2" />
      <span>{article.date}</span>
    </div>
    <div className="flex items-center">
      <Clock size={16} className="mr-2" />
      <span>{article.readTime}</span>
    </div>
  </div>
);

// Article Content Component
const ArticleContent = ({ article, navigate }) => (
  <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
    <ArticleImage image={article.img} title={article.title} />
    <ArticleIntro intro={article.content.intro} />
    <ArticleSections sections={article.content.sections} />
    <ArticleReferences references={article.content.references} />
    <CallToAction navigate={navigate} />
  </article>
);

// Article Image Component
const ArticleImage = ({ image, title }) => (
  <div className="relative mb-12">
    <img
      src={image}
      alt={title}
      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
  </div>
);

// Article Intro Component
const ArticleIntro = ({ intro }) => (
  <div className="prose prose-lg max-w-none mb-12">
    <p className="text-xl leading-relaxed text-gray-700 font-light border-l-4 border-primary pl-6 py-2 bg-gray-50 rounded-r-lg">
      {intro}
    </p>
  </div>
);

// Article Sections Component
const ArticleSections = ({ sections }) => (
  <div className="space-y-12">
    {sections.map((section, index) => (
      <ArticleSection key={index} section={section} index={index} />
    ))}
  </div>
);

// Article Section Component
const ArticleSection = ({ section, index }) => (
  <section className="scroll-mt-24">
    <SectionHeader title={section.title} index={index} />
    {section.img && <SectionImage image={section.img} title={section.title} />}
    {section.content && <SectionContent content={section.content} />}
    {section.list && <SectionList items={section.list} />}
  </section>
);

// Section Header Component
const SectionHeader = ({ title, index }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary/20">
    {String(index + 1).padStart(2, '0')}. {title}
  </h2>
);

// Section Image Component
const SectionImage = ({ image, title }) => (
  <div className="flex justify-center mb-6">
    <img src={image} alt={title} className="max-h-72 object-contain rounded-xl shadow-md" />
  </div>
);

// Section Content Component
const SectionContent = ({ content }) => (
  <div className="prose prose-lg max-w-none mb-6">
    {content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-gray-700 leading-relaxed mb-4">
        {paragraph}
      </p>
    ))}
  </div>
);

// Section List Component
const SectionList = ({ items }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-4" />
          <span className="text-gray-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Article References Component
const ArticleReferences = ({ references }) => (
  <div className="mt-16 pt-8 border-t border-gray-200">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Referensi</h3>
    <div className="bg-gray-50 rounded-xl p-6">
      <ul className="space-y-2">
        {references.map((reference, index) => (
          <li key={index} className="text-sm text-gray-600 leading-relaxed">
            <span className="font-medium">[{index + 1}]</span> {reference}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Call to Action Component
const CallToAction = ({ navigate }) => (
  <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-green-100 rounded-2xl p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">
      Tertarik dengan artikel kesehatan lainnya?
    </h3>
    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
      Jelajahi koleksi artikel kesehatan kami yang lain untuk mendapatkan tips dan informasi terbaru
      seputar kesehatan kulit dan tubuh.
    </p>
    <button
      onClick={() => navigate('/article')}
      className="px-8 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      Lihat Artikel Lainnya
    </button>
  </div>
);

export default ArticleDetail;
