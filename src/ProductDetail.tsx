import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag: string;
  category: string;
  description: string;
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

// Add your WhatsApp phone number here (without + or spaces)
const WHATSAPP_PHONE = "9003916931"; // Replace with your phone number

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState("XS/26");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string>("");

  // Scroll to top when product detail opens
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

  const handleBookNow = () => {
    const message = `Hi! I'm interested in booking the following product:\n\n*${product.name}*\nPrice: ${formatter.format(product.price)}\nSize: ${selectedSize}\n\nPlease provide more details and confirm availability.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const sizes = ["XS/26", "S/28", "M/30", "L/32"];
  
  // Generate multiple product images for carousel
  const productImages = [
    product.image,
    `https://picsum.photos/seed/${product.id}-1/600/800`,
    `https://picsum.photos/seed/${product.id}-2/600/800`,
    `https://picsum.photos/seed/${product.id}-3/600/800`,
  ];

  const coreFeatures = [
    "female specific",
    "fabric: 100% nylon",
    "relaxed fit",
    "wide leg",
    "color: black",
    "elasticated waistband with adjustable drawstring",
    "adjustable drawstring at hem for width control",
    "2 x side pockets",
    "1 x pouch pocket",
    "1 x back pocket",
    "UM flag label detailing",
    "made in India"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xs md:text-sm font-bold tracking-widest uppercase truncate">
              {product.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              key={mainImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] bg-gray-100 overflow-hidden"
            >
              <img 
                src={productImages[mainImageIndex]} 
                alt={`${product.name} view ${mainImageIndex + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 tracking-tighter">
                  {product.tag}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    mainImageIndex === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <p className="text-xs md:text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-xl md:text-2xl font-black tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-2xl md:text-3xl font-black text-red-600">
                {formatter.format(product.price)}
              </p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">tax included</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold tracking-widest uppercase">Choose Size</label>
                <a href="#" className="text-xs font-bold text-blue-600 tracking-widest uppercase hover:underline">
                  [SIZE GUIDE]
                </a>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 text-xs font-bold tracking-widest border-2 transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleBookNow}
              className="w-full bg-black text-white py-4 px-6 text-sm font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Book Now
            </button>

            {/* Core Features */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setExpandedSection(expandedSection === 'features' ? '' : 'features')}
                className="w-full flex justify-between items-center py-3 hover:bg-gray-50 px-0"
              >
                <span className="text-xs font-black tracking-widest uppercase">Core Features</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedSection === 'features' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === 'features' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    {coreFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-black font-bold mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setExpandedSection(expandedSection === 'description' ? '' : 'description')}
                className="w-full flex justify-between items-center py-3 hover:bg-gray-50 px-0"
              >
                <span className="text-xs font-black tracking-widest uppercase">Description</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedSection === 'description' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === 'description' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-700 mb-4">{product.description}</p>
                </motion.div>
              )}
            </div>

            {/* Shipping */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setExpandedSection(expandedSection === 'shipping' ? '' : 'shipping')}
                className="w-full flex justify-between items-center py-3 hover:bg-gray-50 px-0"
              >
                <span className="text-xs font-black tracking-widest uppercase">Shipping</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedSection === 'shipping' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSection === 'shipping' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-700 mb-4">
                    Free shipping on all orders above ₹1,000. Standard delivery takes 5-7 business days.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Note */}
            <div className="bg-gray-50 p-4 text-[11px] text-gray-600 text-center">
              *Actual product color may vary slightly due to different screen displays and lighting conditions.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <button 
          onClick={handleBookNow}
          className="w-full bg-black text-white py-3 px-6 text-sm font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          Book Now
        </button>
      </div>

      {/* Add padding to avoid overlap with sticky CTA on mobile */}
      <div className="md:hidden h-20" />
    </div>
  );
};

export default ProductDetail;
