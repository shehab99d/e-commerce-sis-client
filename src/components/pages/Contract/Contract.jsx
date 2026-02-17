import React from 'react';
import { Mail, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const contacts = [
        {
            id: 1,
            icon: <MessageCircle size={32} />,
            label: 'WhatsApp',
            value: '+880 1984991947',
            link: 'https://wa.me/8801984991947',
            type: 'whatsapp',
            description: 'Chat with us instantly'
        },
        {
            id: 2,
            icon: <Facebook size={32} />,
            label: 'Facebook',
            value: '@YourBusiness',
            link: 'https://www.facebook.com/profile.php?id=61587476100730',
            type: 'facebook',
            description: 'Follow us on Facebook'
        },
        {
            id: 3,
            icon: <Instagram size={32} />,
            label: 'Instagram',
            value: '@yourbusiness',
            link: '/instagram',
            type: 'instagram',
            description: 'See our latest updates'
        },
        {
            id: 4,
            icon: <Twitter size={32} />,
            label: 'Twitter',
            value: '@yourbusiness',
            link: '/twitter',
            type: 'twitter',
            description: 'Follow our tweets'
        },
        {
            id: 5,
            icon: <Mail size={32} />,
            label: 'Email',
            value: 'shehabulislam429@gmail.com',
            link: 'shehabulislam429@gmail.com', // mailto will be added in handler
            type: 'email',
            description: 'Send us an email'
        }
    ];

    const handleContactClick = (contact) => {
        if (contact.type === 'whatsapp' || contact.type === 'facebook') {
            window.open(contact.link, '_blank', 'noopener,noreferrer');
        } else if (contact.type === 'email') {
            window.location.href = `mailto:${contact.link}`;
        }
    };

    return (
        <div className="contact-section">
            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        We'd love to hear from you! Choose your preferred way to connect with us.
                    </p>
                    <div className="title-underline"></div>
                </div>

                {/* Contact Cards Grid */}
                <div className="contact-grid">
                    {contacts.map((contact) => {
                        if (contact.type === 'instagram' || contact.type === 'twitter') {
                            return (
                                <Link
                                    key={contact.id}
                                    to={contact.link}
                                    className={`contact-card ${contact.type}`}
                                >
                                    <div className="contact-icon-wrapper">
                                        <div className="contact-icon">{contact.icon}</div>
                                        <div className="icon-ripple"></div>
                                    </div>
                                    <h3 className="contact-label">{contact.label}</h3>
                                    <p className="contact-value">{contact.value}</p>
                                    <p className="contact-description">{contact.description}</p>
                                    <div className="contact-arrow">→</div>
                                </Link>
                            );
                        }

                        return (
                            <div
                                key={contact.id}
                                className={`contact-card ${contact.type}`}
                                onClick={() => handleContactClick(contact)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleContactClick(contact);
                                }}
                            >
                                <div className="contact-icon-wrapper">
                                    <div className="contact-icon">{contact.icon}</div>
                                    <div className="icon-ripple"></div>
                                </div>
                                <h3 className="contact-label">{contact.label}</h3>
                                <p className="contact-value">{contact.value}</p>
                                <p className="contact-description">{contact.description}</p>
                                <div className="contact-arrow">→</div>
                            </div>
                        );
                    })}
                </div>

                {/* Call to Action */}
                <div className="contact-cta">
                    <div className="cta-content">
                        <h2>Ready to Start a Conversation?</h2>
                        <p>Don't hesitate to reach out! We're here to help and answer any questions you may have.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
