import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import ThreeDImageCarousel from '@/components/ThreeDImageCarousel';
import { galleryApi } from '@/lib/api';

interface Slide { id: number; src: string; href?: string }

export default function Gallery() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const data = await galleryApi.getAll();
      const mapped = data.map((d: any, i: number) => ({ id: i, src: d.image_url.startsWith('http') ? d.image_url : d.image_url, href: '#' }));
      setSlides(mapped);
    } catch (err) {
      console.error('Failed to fetch gallery', err);
    }
  }

  return (
    <Layout>
      {/* Hero header like Courses/Domains */}
      <section className="bg-gradient-hero pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-3">Gallery</h1>
            <p className="text-lg text-primary-foreground/80">Memories, events, and student work — curated visuals from SKILLBRIDGE.</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {slides.length > 0 ? (
            <ThreeDImageCarousel slides={slides} itemCount={5} autoplay={true} delay={4} className="mx-auto" />
          ) : (
            <p className="text-muted-foreground">No images yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
