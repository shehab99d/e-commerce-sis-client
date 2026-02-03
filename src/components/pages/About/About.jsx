import { useState, useEffect, useRef } from "react";

const About = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 }
        );
        const current = sectionRef.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                background: "#faf9f7",
                padding: "100px 24px",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Subtle bg grain overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.035,
                    zIndex: 0,
                    backgroundImage: `url("https://i.ibb.co/ks5WYq1c/images-q-tbn-ANd9-Gc-TM9aai-BCvy5-Vn-Dr2-B3-CZn-XZU3js7qs-X96swg-s.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}

            />

            {/* Decorative blobs */}
            <div
                style={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(180,155,120,0.12) 0%, transparent 70%)",
                    top: "10%",
                    right: "-80px",
                    pointerEvents: "none",
                    zIndex: 0,
                    filter: "blur(60px)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(160,140,110,0.08) 0%, transparent 70%)",
                    bottom: "5%",
                    left: "-60px",
                    pointerEvents: "none",
                    zIndex: 0,
                    filter: "blur(50px)",
                }}
            />

            <div
                style={{
                    maxWidth: 1100,
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 64,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Image Card */}
                <div
                    style={{
                        flex: "1 1 380px",
                        maxWidth: 480,
                        position: "relative",
                        transform: visible ? "translateX(0)" : "translateX(-60px)",
                        opacity: visible ? 1 : 0,
                        transition:
                            "transform 1.1s cubic-bezier(.22,1,.36,1), opacity 1s ease",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 18,
                            left: 18,
                            right: -18,
                            bottom: -18,
                            border: "1.5px solid rgba(180,155,120,0.35)",
                            borderRadius: 20,
                            zIndex: 0,
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "relative",
                            borderRadius: 20,
                            overflow: "hidden",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.13)",
                            zIndex: 1,
                        }}
                    >
                        <img
                            src="https://i.ibb.co.com/rGpqsDPD/pexels-daniel-moises-magulado-199841-7612730.jpg"
                            alt="Ladies Dress"
                            style={{ width: "100%", height: 480, objectFit: "cover" }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 160,
                                background: "linear-gradient(transparent, rgba(0,0,0,0.25))",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div
                    style={{
                        flex: "1 1 380px",
                        maxWidth: 480,
                        transform: visible ? "translateY(0)" : "translateY(40px)",
                        opacity: visible ? 1 : 0,
                        transition:
                            "transform 1s cubic-bezier(.22,1,.36,1) 0.2s, opacity 0.9s ease 0.2s",
                    }}
                >
                    {/* Small label */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 20,
                            transform: visible ? "translateX(0)" : "translateX(-20px)",
                            opacity: visible ? 1 : 0,
                            transition:
                                "transform 0.8s cubic-bezier(.22,1,.36,1) 0.35s, opacity 0.7s ease 0.35s",
                        }}
                    >
                        <div style={{ width: 36, height: 1.5, background: "#b49b78" }} />
                        <span
                            style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: 12,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                color: "#b49b78",
                                fontWeight: 500,
                            }}
                        >
                            Our Story
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3.2rem)",
                            fontWeight: 700,
                            color: "#1a1a1a",
                            lineHeight: 1.15,
                            marginBottom: 24,
                            letterSpacing: "-0.5px",
                            transform: visible ? "translateY(0)" : "translateY(24px)",
                            opacity: visible ? 1 : 0,
                            transition:
                                "transform 0.9s cubic-bezier(.22,1,.36,1) 0.45s, opacity 0.8s ease 0.45s",
                        }}
                    >
                        Dresses Crafted
                        <br />
                        <span style={{ color: "#b49b78", fontStyle: "italic" }}>
                            for Elegance
                        </span>
                    </h2>

                    {/* Divider */}
                    <div
                        style={{
                            width: 52,
                            height: 2.5,
                            borderRadius: 2,
                            background: "linear-gradient(90deg, #b49b78, #d4c4a0)",
                            marginBottom: 28,
                            transform: visible ? "scaleX(1)" : "scaleX(0)",
                            transformOrigin: "left",
                            transition:
                                "transform 0.8s cubic-bezier(.22,1,.36,1) 0.6s",
                        }}
                    />

                    {/* Paragraphs */}
                    <p
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: 15.5,
                            color: "#5a5550",
                            lineHeight: 1.8,
                            marginBottom: 16,
                            fontWeight: 400,
                            transform: visible ? "translateY(0)" : "translateY(18px)",
                            opacity: visible ? 1 : 0,
                            transition:
                                "transform 0.85s cubic-bezier(.22,1,.36,1) 0.7s, opacity 0.75s ease 0.7s",
                        }}
                    >
                        We are a ladies' dress brand rooted in{" "}
                        <strong style={{ color: "#3d3530", fontWeight: 600 }}>
                            Cumilla
                        </strong>
                        , blending timeless elegance with everyday comfort. Every piece in our
                        collection is thoughtfully curated — stylish silhouettes, quality fabrics,
                        and a touch of modern flair.
                    </p>
                    <p
                        style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: 15.5,
                            color: "#5a5550",
                            lineHeight: 1.8,
                            marginBottom: 36,
                            fontWeight: 400,
                            transform: visible ? "translateY(0)" : "translateY(18px)",
                            opacity: visible ? 1 : 0,
                            transition:
                                "transform 0.85s cubic-bezier(.22,1,.36,1) 0.82s, opacity 0.75s ease 0.82s",
                        }}
                    >
                        From casual daily wear to stunning party dresses and rich traditional pieces — each
                        garment is finished with care and a genuine love for fashion.
                    </p>

                    {/* CTA */}
                    <CTA visible={visible} />
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Raleway:wght@400;500;600&display=swap');
      `}</style>
        </section>
    );
};

function CTA({ visible }) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href="/shop"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 50,
                textDecoration: "none",
                fontFamily: "'Raleway', sans-serif",
                fontSize: 14,
                letterSpacing: 1.8,
                textTransform: "uppercase",
                fontWeight: 600,
                color: hovered ? "#1a1a1a" : "#fff",
                background: hovered
                    ? "transparent"
                    : "linear-gradient(135deg, #2a2420, #1a1a1a)",
                border: "1.5px solid #2a2420",
                boxShadow: hovered ? "none" : "0 8px 28px rgba(0,0,0,0.18)",
                transform: visible
                    ? hovered
                        ? "translateY(-2px) scale(1.03)"
                        : "translateY(0) scale(1)"
                    : "translateY(24px)",
                opacity: visible ? 1 : 0,
                transition: "all 0.45s cubic-bezier(.22,1,.36,1)",
                transitionDelay: visible ? "0.9s" : "0s",
                cursor: "pointer",
            }}
        >
            Explore Collection
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
                }}
            >
                <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </a>
    );
}

export default About;
