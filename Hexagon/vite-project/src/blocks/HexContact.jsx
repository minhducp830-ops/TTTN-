import React from 'react';
import { buildBgStyle } from './helpers';

const HexContact = ({
  title = 'Liên hệ với chúng tôi',
  description = 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
  address = '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
  email = 'contact@hexagon.xyz',
  phone = '096 446 0333',
  socialLinks = [
    { platform: 'Facebook', url: '#' },
    { platform: 'LinkedIn', url: '#' },
    { platform: 'YouTube', url: '#' },
    { platform: 'Zalo', url: '#' },
  ],
  mapEmbed = 'https://maps.google.com/maps?width=600&height=400&hl=en&q=615 Âu Cơ&t=p&z=14&ie=UTF8&iwloc=B&output=embed',
  background = { type: 'color', color: '#f8fafc' },
  sectionId = 'lien-he',
}) => {
  const bgStyle = buildBgStyle(background);

  return (
    <section id={sectionId} className="py-16 lg:py-24" style={{ ...bgStyle, scrollMarginTop: '72px' }}>
      <div className="container max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
            </div>
            <div className="flex flex-col gap-4">
              {address && (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center bg-teal-500/10">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Trụ sở chính</p>
                    <p className="text-gray-700 text-sm">{address}</p>
                  </div>
                </div>
              )}
              {email && (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center bg-teal-500/10">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <a href={`mailto:${email}`} className="text-teal-600 text-sm hover:underline">{email}</a>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center bg-teal-500/10">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Hotline</p>
                    <a href={`tel:${phone}`} className="text-gray-700 text-sm hover:text-teal-600">{phone}</a>
                  </div>
                </div>
              )}
            </div>
            {socialLinks?.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 font-bold rounded-lg transition-all border border-teal-500/30 hover:border-teal-500/50 text-sm shadow-sm"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full min-h-[400px]"
              src={mapEmbed}
              title="Google Maps"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexContact;
