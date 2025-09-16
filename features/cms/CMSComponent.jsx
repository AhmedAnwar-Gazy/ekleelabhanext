// CMSComponent.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetHomepageContentQuery,
  useGetStaticPageQuery,
  useGetBannersQuery,
  selectHomepageContent,
  selectStaticPageContent,
  selectBannersByPosition
} from '../cms/cmsSlice';

const CMSComponent = () => {
  const [activePage, setActivePage] = useState('home');
  const [activeBannerPosition, setActiveBannerPosition] = useState('home');

  // Fetch data using RTK Query hooks
  const { 
    data: homepageData, 
    isLoading: homepageLoading, 
    error: homepageError 
  } = useGetHomepageContentQuery();
  
  const { 
    data: staticPageData, 
    isLoading: staticPageLoading, 
    error: staticPageError 
  } = useGetStaticPageQuery(activePage);
  
  const { 
    data: bannersData, 
    isLoading: bannersLoading, 
    error: bannersError 
  } = useGetBannersQuery({ position: activeBannerPosition });

  // Get data from Redux store using selectors
  const homepageContent = useSelector(selectHomepageContent);
  const staticPageContent = useSelector(selectStaticPageContent);
  const banners = useSelector(selectBannersByPosition);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' }
  ];

  // Banner positions
  const bannerPositions = [
    { id: 'home', label: 'Home Page' },
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'top', label: 'Top Banner' },
    { id: 'bottom', label: 'Bottom Banner' }
  ];

  return (
    <div className="cms-container">
      <header className="cms-header">
        <h1>Content Management System</h1>
        <nav className="cms-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="cms-content">
        {/* Banner Position Selector */}
        <div className="banner-position-selector">
          <h3>Banner Position:</h3>
          <div className="position-buttons">
            {bannerPositions.map(position => (
              <button
                key={position.id}
                className={`position-btn ${activeBannerPosition === position.id ? 'active' : ''}`}
                onClick={() => setActiveBannerPosition(position.id)}
              >
                {position.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="main-content">
          {activePage === 'home' ? (
            <div className="homepage-content">
              {homepageLoading && <div className="loading">Loading homepage...</div>}
              {homepageError && <div className="error">Error: {homepageError.message}</div>}
              
              {homepageContent && (
                <>
                  <h2>{homepageContent.title}</h2>
                  <div 
                    className="content-html" 
                    dangerouslySetInnerHTML={{ __html: homepageContent.content }} 
                  />
                </>
              )}
            </div>
          ) : (
            <div className="static-page-content">
              {staticPageLoading && <div className="loading">Loading page...</div>}
              {staticPageError && <div className="error">Error: {staticPageError.message}</div>}
              
              {staticPageContent && (
                <>
                  <h2>{staticPageContent.title}</h2>
                  <div 
                    className="content-html" 
                    dangerouslySetInnerHTML={{ __html: staticPageContent.content }} 
                  />
                </>
              )}
            </div>
          )}
        </main>

        {/* Banners Section */}
        <aside className="banners-section">
          <h3>Banners ({activeBannerPosition})</h3>
          
          {bannersLoading && <div className="loading">Loading banners...</div>}
          {bannersError && <div className="error">Error: {bannersError.message}</div>}
          
          <div className="banners-container">
            {banners && banners.length > 0 ? (
              banners.map(banner => (
                <div key={banner.id} className="banner-item">
                  <img src={banner.image_url} alt={banner.alt_text} />
                  <div className="banner-content">
                    <h4>{banner.title}</h4>
                    <p>{banner.description}</p>
                    {banner.cta_link && (
                      <a href={banner.cta_link} className="cta-button">
                        {banner.cta_text || 'Learn More'}
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-banners">No banners available for this position</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CMSComponent;