
      {/* Internal Gallery Carousel */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {slides.length > 0 ? (
            <ThreeDImageCarousel
              slides={slides}
              itemCount={5}
              autoplay={true}
              delay={4}
              className="mx-auto"
            />
          ) : (
            <p className="text-muted-foreground text-center">No images yet.</p>
          )}
        </div>
      </section>