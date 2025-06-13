
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ProductGrid } from '@/components/woocommerce/ProductGrid';
import { ProductSearch } from '@/components/woocommerce/ProductSearch';
import { SortAndFilterSidebar } from '@/components/home/SortAndFilterSidebar';
import { WCCategory, woocommerceApi } from '@/lib/woocommerce';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface EnhancedCategoryPageProps {
  categorySlug: string;
  title: string;
  description: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export function EnhancedCategoryPage({ 
  categorySlug, 
  title, 
  description, 
  heroImage,
  seoTitle,
  seoDescription
}: EnhancedCategoryPageProps) {
  const [categories, setCategories] = useState<WCCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('menu_order');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const allCategories = await woocommerceApi.getCategories();
        
        // Find the main category and its subcategories
        const mainCategory = allCategories.find(cat => cat.slug === categorySlug);
        if (mainCategory) {
          const subcategories = allCategories.filter(cat => cat.parent === mainCategory.id);
          setCategories([mainCategory, ...subcategories]);
          setSelectedCategory(mainCategory.id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categorySlug]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (newSort: string) => {
    setSortOption(newSort);
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle || `${title} - Kaprayé`}</title>
        <meta name="description" content={seoDescription || description} />
        <meta property="og:title" content={seoTitle || `${title} - Kaprayé`} />
        <meta property="og:description" content={seoDescription || description} />
        <meta property="og:type" content="website" />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <link rel="canonical" href={`https://kapraye.com/${categorySlug}`} />
      </Helmet>

      <MainLayout>
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative h-64 md:h-80 bg-gradient-to-r from-kapraye-burgundy to-kapraye-pink overflow-hidden">
            {heroImage && (
              <div className="absolute inset-0">
                <img
                  src={heroImage}
                  alt={title}
                  className="w-full h-full object-cover opacity-30"
                  loading="eager"
                />
              </div>
            )}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center text-white"
                >
                  <h1 className="text-4xl md:text-6xl font-playfair font-medium mb-4">
                    {title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                    {description}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Category Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              {/* Search and Filters */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <ProductSearch 
                      onSearchResults={(query) => handleSearch(query)}
                      placeholder="Search in this category..."
                      className="max-w-lg"
                    />
                  </div>
                  <div className="lg:w-80">
                    <SortAndFilterSidebar
                      categories={categories.map(cat => cat.name)}
                      selectedCategory={categories.find(cat => cat.id === selectedCategory)?.name || ''}
                      onCategoryChange={(categoryName) => {
                        const category = categories.find(cat => cat.name === categoryName);
                        setSelectedCategory(category?.id);
                      }}
                      sortOption={sortOption}
                      onSortChange={handleSortChange}
                    />
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <ProductGrid
                categoryId={selectedCategory}
                search={searchQuery}
                orderby={sortOption}
                perPage={24}
              />
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
}

export default EnhancedCategoryPage;
