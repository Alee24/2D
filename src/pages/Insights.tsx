import React, { useState } from 'react';
import { useRouter } from '../context/NavigationContext';
import { blogPosts } from '../data/coworkingData';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, BookOpen, ArrowRight, X, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Insights: React.FC = () => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  // Active full reading post state
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    'All', 'Business Growth', 'Productivity', 'Workspace Design', 'Remote Work', 'Leadership', 'Startups', 'Entrepreneurship', 'Technology'
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setSubscribed(true);
      setSubEmail('');
    }
  };

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  return (
    <div className="bg-offwhite text-charcoal pt-20 animate-fade-in relative min-h-screen">
      <SEO 
        title="Workspace Insights & Business Trends"
        description="Read the latest insights on hybrid work models, business trends in East Africa, productivity tips, and updates from the SecondDesk team."
      />
      <Breadcrumbs 
        activeSubItem={activePost ? activePost.title : undefined}
        onClearSubItem={() => setActivePost(null)}
      />
      {/* Editorial Hero */}
      <section className="bg-charcoal text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block mb-3">Second Desk Journal</span>
            <h1 className="font-display font-light text-4xl sm:text-5xl tracking-tight mb-4">
              Insights & <span className="font-serif italic text-sand">Spatial Ideas.</span>
            </h1>
            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed">
              Curated ideas covering regional venture capital, startup architecture, remote employee psychology, and spatial design trends in East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Featured & Filter bar */}
      <section className="py-16 max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Featured Article Box - Display-style banner */}
        {!searchQuery && selectedCategory === 'All' && (
          <div 
            onClick={() => setActivePost(featuredPost)}
            className="bg-white border border-concrete hover:border-sand transition-all duration-500 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden mb-20 shadow-xs group"
          >
            <div className="lg:col-span-7 bg-concrete overflow-hidden aspect-video lg:aspect-auto">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-sand/10 border border-sand/30 text-[9px] font-mono font-bold text-charcoal px-2.5 py-1 uppercase tracking-wider">
                    Featured article
                  </span>
                  <span className="text-[10px] font-mono text-charcoal/40 uppercase tracking-widest">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-display font-light text-2xl sm:text-3xl text-charcoal tracking-tight group-hover:text-sand transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-8 border-t border-concrete flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={featuredPost.author.name} 
                    className="w-8 h-8 rounded-full object-cover border border-concrete"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-xs">{featuredPost.author.name}</h4>
                    <span className="text-[9px] font-sans text-charcoal/40 block">{featuredPost.date}</span>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search panel */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 border-b border-concrete pb-8 mb-12">
          {/* Category Scroller */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 lg:pb-0 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-sans whitespace-nowrap border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-charcoal border-charcoal text-white font-semibold'
                    : 'bg-white border-concrete text-charcoal hover:border-sand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-concrete focus:border-sand px-4 py-2.5 pl-10 text-xs text-charcoal focus:outline-hidden transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          </div>
        </div>

        {/* Regular posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePost(post)}
                className="bg-white border border-concrete hover:border-sand transition-all duration-500 overflow-hidden group cursor-pointer shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-concrete relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-charcoal text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-sans text-charcoal/40">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-charcoal tracking-tight group-hover:text-sand transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-charcoal/60 line-clamp-3 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-concrete/40 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-display font-semibold text-charcoal text-[11px]">{post.author.name}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal flex items-center gap-1 group-hover:text-sand transition-colors">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-concrete rounded-none max-w-xl mx-auto">
            <span className="text-charcoal/30 text-4xl block mb-4 font-serif">Empty</span>
            <p className="font-sans text-sm text-charcoal/60">No articles match your search parameters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Modern Newsletter panel */}
      <section className="bg-white border-t border-b border-concrete py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="font-sans font-bold text-xs tracking-widest uppercase text-sand block">Insights Newsletter</span>
            <h2 className="font-display font-light text-3xl text-charcoal tracking-tight">
              Get Spatial Design Ideas Monthly
            </h2>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed max-w-sm mx-auto font-light">
              Join Nairobi founders, legal advisors, and corporate developers subscribing to our curated physical work strategy briefs.
            </p>

            {subscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-none max-w-md mx-auto">
                Thank you for subscribing! Check your inbox for our next dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto mt-6">
                <input
                  type="email"
                  required
                  placeholder="Your professional email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="w-full bg-offwhite border border-concrete focus:border-sand px-4 py-3 text-xs text-charcoal focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-charcoal border border-charcoal hover:bg-sand hover:border-sand text-white hover:text-charcoal text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Slide-over Immersive Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 bg-charcoal/70 z-50 flex justify-end backdrop-blur-xs">
          {/* Backdrop closer click */}
          <div className="absolute inset-0" onClick={() => setActivePost(null)}></div>
          
          <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between z-10 animate-slide-left">
            <div>
              {/* Close controls bar */}
              <div className="sticky top-0 bg-white border-b border-concrete px-6 lg:px-10 py-4 flex items-center justify-between z-10">
                <span className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">Article Reader</span>
                <button 
                  onClick={() => setActivePost(null)}
                  className="p-1.5 text-charcoal/60 hover:text-charcoal bg-offwhite rounded-full transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image */}
              <div className="aspect-[21/9] w-full bg-concrete overflow-hidden">
                <img 
                  src={activePost.image} 
                  alt={activePost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content body */}
              <div className="px-6 lg:px-12 py-10 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-charcoal/40 border-b border-concrete pb-4">
                  <span className="bg-sand/10 border border-sand/30 text-[9px] font-mono font-bold text-charcoal px-2.5 py-1 uppercase tracking-wider">
                    {activePost.category}
                  </span>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>

                <h1 className="font-display font-light text-2xl sm:text-4xl text-charcoal tracking-tight leading-tight">
                  {activePost.title}
                </h1>

                {/* Author profile */}
                <div className="flex items-center gap-3 py-2">
                  <img 
                    src={activePost.author.avatar} 
                    alt={activePost.author.name} 
                    className="w-9 h-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-xs">{activePost.author.name}</h4>
                    <span className="text-[10px] font-sans text-charcoal/50 block">{activePost.author.role}</span>
                  </div>
                </div>

                {/* Article core text content */}
                <div className="pt-4 font-sans text-sm text-charcoal/70 leading-relaxed font-light space-y-6">
                  {activePost.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Signoff */}
            <div className="bg-offwhite border-t border-concrete p-6 lg:px-12 flex items-center justify-between">
              <span className="font-display text-xs text-charcoal/50">© Second Desk Insights</span>
              <button 
                onClick={() => { setActivePost(null); navigate('/book-tour'); }}
                className="bg-charcoal text-white hover:bg-sand hover:text-charcoal text-xs font-bold uppercase tracking-widest px-6 py-3 transition-all cursor-pointer"
              >
                Tour Second Desk Spaces
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Insights;
