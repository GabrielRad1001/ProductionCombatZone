import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { mockData } from '../mock';
import { Card, CardContent } from '../components/ui/card';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <ImageIcon className="page-icon" />
          <h1 className="page-title">COLECȚIE FOTO</h1>
          <p className="page-subtitle">Descoperiți atmosfera și energia Combat Zone Moisei</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-main-section">
        <div className="container">
          <div className="gallery-masonry">
            {mockData.gallery.map((image) => (
              <Card 
                key={image.id} 
                className="gallery-card"
                onClick={() => openLightbox(image)}
              >
                <CardContent className="gallery-card-content">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="gallery-card-image" 
                  />
                  <div className="gallery-card-overlay">
                    <h3 className="gallery-card-title">{image.title}</h3>
                    <p className="gallery-card-description">{image.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X className="close-icon" />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="lightbox-image" 
            />
            <div className="lightbox-info">
              <h3 className="lightbox-title">{selectedImage.title}</h3>
              <p className="lightbox-description">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
