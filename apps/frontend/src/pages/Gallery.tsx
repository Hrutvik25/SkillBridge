import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import ThreeDImageCarousel from '@/components/ThreeDImageCarousel';
import { galleryApi } from '@/lib/api';
import InstagramFeed from "@/components/InstagramFeed";

interface Slide {
  id: number;
  src: string;
  href?: string;
}

export default function Gallery() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const data = await galleryApi.getAll();
      const mapped = (data as any[]).map((d: any, i: number) => ({
        id: i,
        src: d.image_url.startsWith('http') ? d.image_url : d.image_url,
        href: '#',
      }));
      setSlides(mapped);
    } catch (err) {
      console.error('Failed to fetch gallery', err);
    }
  }

  return (
    <Layout>
      {/* Hero Header */}
      <section className="bg-gradient-hero pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-3">
              Gallery
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Memories, events, and student work — curated visuals from SKILLBRIDGE.
            </p>
          </div>
        </div>
      </section>


      {/* Instagram Feed Section (NEW) */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
              Follow Us on Instagram
            </h2>

            <InstagramFeed />
          </div>
        </div>
      </section>
    </Layout>
  );
}
