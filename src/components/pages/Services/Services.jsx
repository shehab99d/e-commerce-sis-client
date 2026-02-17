import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Truck, 
    Wallet, 
    Headphones, 
    Shield, 
    RefreshCw, 
    Award,
    MapPin,
    Clock
} from 'lucide-react';
import './Services.css';

const Services = () => {
    const navigate = useNavigate();

    const servicesData = [
        {
            id: 1,
            icon: <Truck size={48} />,
            title: "Fast Nationwide Delivery",
            description: "Quick and reliable delivery across all 64 districts of Bangladesh within 2-5 business days",
            color: "#3b82f6", // Blue
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            icon: <Wallet size={48} />,
            title: "Cash on Delivery",
            description: "Pay when you receive your order. Shop with confidence and zero risk",
            color: "#10b981", // Green
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            icon: <Headphones size={48} />,
            title: "24/7 Customer Support",
            description: "Our dedicated team is always ready to assist you anytime, anywhere",
            color: "#f59e0b", // Amber
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
            id: 4,
            icon: <Shield size={48} />,
            title: "Secure Shopping",
            description: "Your data is protected with industry-standard encryption and security measures",
            color: "#8b5cf6", // Purple
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        },
        {
            id: 5,
            icon: <RefreshCw size={48} />,
            title: "Easy Returns",
            description: "Hassle-free 7-day return policy. Not satisfied? We'll make it right",
            color: "#ec4899", // Pink
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        },
        {
            id: 6,
            icon: <Award size={48} />,
            title: "Authentic Products",
            description: "100% genuine products with warranty and quality guarantee",
            color: "#06b6d4", // Cyan
            gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
        },
        {
            id: 7,
            icon: <MapPin size={48} />,
            title: "All Over Bangladesh",
            description: "From Dhaka to Chittagong, Sylhet to Khulna - we deliver everywhere",
            color: "#14b8a6", // Teal
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        },
        {
            id: 8,
            icon: <Clock size={48} />,
            title: "Same Day Dispatch",
            description: "Orders placed before 2 PM are dispatched the same day for faster delivery",
            color: "#f97316", // Orange
            gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
        }
    ];

    return (
        <div className="services-section my-20">
            {/* Header Section */}
            <div className="services-header">
                <div className="header-content">
                    <span className="header-badge">WHY CHOOSE US</span>
                    <h1 className="services-title">
                        Premium Services for Your
                        <span className="title-highlight"> Shopping Experience</span>
                    </h1>
                    <p className="services-subtitle">
                        We're committed to providing exceptional service across all of Bangladesh. 
                        From fast delivery to secure payments, we've got you covered.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="services-container">
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div 
                            key={service.id} 
                            className="service-card"
                            style={{ 
                                animationDelay: `${index * 0.1}s`,
                                '--card-gradient': service.gradient
                            }}
                        >
                            <div className="card-inner">
                                <div 
                                    className="icon-wrapper"
                                    style={{ background: service.gradient }}
                                >
                                    {service.icon}
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="card-shine"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bangladesh Coverage Section */}
            <div className="coverage-section">
                <div className="coverage-content">
                    <MapPin className="coverage-icon" size={64} />
                    <h2 className="coverage-title">Serving All 64 Districts of Bangladesh</h2>
                    <p className="coverage-text">
                        From the bustling streets of Dhaka to the serene beauty of Cox's Bazar, 
                        we're proud to serve customers in every corner of Bangladesh with the same 
                        dedication and quality.
                    </p>
                    <div className="districts-highlight">
                        <span>Dhaka</span>
                        <span>Chittagong</span>
                        <span>Sylhet</span>
                        <span>Rajshahi</span>
                        <span>Khulna</span>
                        <span>Barishal</span>
                        <span>Rangpur</span>
                        <span>Mymensingh</span>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Shopping?</h2>
                    <p className="cta-subtitle">
                        Explore our wide range of products and enjoy premium services
                    </p>
                    <button 
                        className="explore-btn"
                        onClick={() => navigate('/shop')}
                    >
                        <span>Explore Now</span>
                        <svg 
                            className="btn-arrow" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M13 7l5 5m0 0l-5 5m5-5H6" 
                            />
                        </svg>
                    </button>
                </div>
                <div className="cta-decoration">
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>
                    <div className="decoration-circle circle-3"></div>
                </div>
            </div>
        </div>
    );
};

export default Services;